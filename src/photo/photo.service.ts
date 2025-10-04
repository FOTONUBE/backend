import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { AlbumService } from 'src/album/album.service';
import { UserService } from 'src/user/user.service';
import { FilesService } from 'src/files/files.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHelpers } from 'src/user/helpers/user.helpers';
import { log } from 'console';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,

    private readonly userService: UserService,
    private readonly filesService: FilesService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  // Subir una foto
  async upload(file: Express.Multer.File, albumId: string, userId: string) {
    if (file.mimetype !== 'image/webp') {
      throw new BadRequestException(
        'Solo se permiten archivos en formato .webp',
      );
    }

    const photographer = await this.userService.findById(userId);
    if (!photographer || photographer.role !== 'photographer') {
      throw new NotFoundException('Fotógrafo no encontrado');
    }

    const album = await this.albumService.findOne(albumId, userId);
    if (!album) throw new NotFoundException('Álbum no encontrado');

    // Validar cantidad de fotos por álbum
    const maxPhotos = UserHelpers.getMaxPhotosPerAlbum(photographer);
    if (album.photosCount + 1 > maxPhotos) {
      throw new BadRequestException(
        `No puedes subir más de ${maxPhotos} fotos a este álbum`,
      );
    }
    // Subir a Cloudinary (FilesService ya valida tamaño y almacenamiento)
    const { url, public_id, sizeMb, urlThumbnail, urlWeb } =
      await this.filesService.uploadImage(file, userId);

    // Guardar la foto en la DB
    const photo = this.photoRepository.create({
      url,
      publicId: public_id,
      sizeMb,
      album,
      urlWeb,
      urlThumbnail,
    });

    const savedPhoto = await this.photoRepository.save(photo);

    // Actualizar almacenamiento usado del fotógrafo
    const newStorage = (photographer.storageUsedMb ?? 0) + sizeMb;
    await this.userService.update(userId, {
      storageUsedMb: parseFloat(newStorage.toFixed(2)),
    });

    // Incrementar contador de fotos en el álbum de manera segura
    await this.albumService.incrementPhotosCount(album.id, 1);

    return {
      id: savedPhoto.id,
      url: savedPhoto.url,
      publicId: savedPhoto.publicId,
      sizeMb: savedPhoto.sizeMb,
      urlWeb: savedPhoto.urlWeb,
      urlThumbnail: savedPhoto.urlThumbnail,
    };
  }

  // Subir múltiples fotos
  async uploadMultiple(
    files: Express.Multer.File[],
    albumId: string,
    userId: string,
    totalSizeMb?: number, // recibido desde el frontend
  ) {
    if (!files || files.length === 0)
      throw new BadRequestException('No se enviaron archivos');

    files.forEach((file) => {
      if (file.mimetype !== 'image/webp') {
        throw new BadRequestException(
          'Solo se permiten archivos en formato .webp',
        );
      }
    });

    const photographer = await this.userService.findById(userId);
    if (!photographer || photographer.role !== 'photographer')
      throw new NotFoundException('Fotógrafo no encontrado');

    const album = await this.albumService.findOne(albumId, userId);
    if (!album) throw new NotFoundException('Álbum no encontrado');

    // Validar límite de fotos por álbum
    const maxPhotos = UserHelpers.getMaxPhotosPerAlbum(photographer);
    if (album.photosCount + files.length > maxPhotos) {
      throw new BadRequestException(
        `No puedes subir más de ${maxPhotos} fotos a este álbum`,
      );
    }

    // Validar almacenamiento total usando totalSizeMb enviado
    const totalMb =
      totalSizeMb ?? files.reduce((sum, f) => sum + f.size / (1024 * 1024), 0);
    const maxStorage = UserHelpers.getMaxStorageMb(photographer);
    if ((photographer.storageUsedMb ?? 0) + totalMb > maxStorage) {
      throw new BadRequestException(
        `No tienes suficiente espacio. Límite máximo: ${maxStorage} MB`,
      );
    }

    // Subir todas las fotos en paralelo (FilesService validará tamaño individual)
    const uploadedToCloud = await Promise.all(
      files.map((file) => this.filesService.uploadImage(file, userId)),
    );

    // Crear entidades en memoria
    const photosToSave = uploadedToCloud.map((p) =>
      this.photoRepository.create({
        url: p.url,
        publicId: p.public_id,
        sizeMb: p.sizeMb,
        album,
        urlWeb: p.urlWeb,
        urlThumbnail: p.urlThumbnail,
      }),
    );

    // Guardar todas las fotos en DB
    const savedPhotos = await this.photoRepository.save(photosToSave);

    // 🔹 Actualizar almacenamiento del fotógrafo sumando lo enviado en la request
    /*     console.log('--- Detalles de almacenamiento ---');
    console.log('Usuario: ', photographer);

    console.log('Almacenamiento actual:', photographer.storageUsedMb);
    console.log('Tamaño total de subida:', totalMb); */

    const newStorage = photographer.storageUsedMb + totalMb;

    await this.userService.update(userId, {
      storageUsedMb: parseFloat(newStorage),
    });

    // Incrementar contador de fotos en álbum
    await this.albumService.incrementPhotosCount(album.id, savedPhotos.length);

    return savedPhotos.map((p) => ({
      id: p.id,
      url: p.url,
      publicId: p.publicId,
      sizeMb: p.sizeMb,
      urlWeb: p.urlWeb,
      urlThumbnail: p.urlThumbnail,
    }));
  }

  // Listar fotos
  async findAll(userId: string) {
    const photographer = await this.userService.findById(userId);
    if (!photographer || photographer.role !== 'photographer') {
      throw new NotFoundException('Fotógrafo no encontrado');
    }

    return this.photoRepository.find({
      where: { album: { photographer: { id: userId } } },
      relations: ['album'],
    });
  }

  // Eliminar una foto
  async removeById(photoId: string, userId: string) {
    const photo = await this.photoRepository.findOne({
      where: { id: photoId, album: { photographer: { id: userId } } },
      relations: ['album', 'album.photographer'],
    });

    if (!photo) throw new NotFoundException('Imagen no encontrada');

    const photographer = photo.album.photographer;

    try {
      await this.filesService.deleteImage(photo.publicId);
      await this.photoRepository.delete(photo.id);

      const newStorage = Math.max(
        0,
        (photographer.storageUsedMb ?? 0) - (photo.sizeMb ?? 0),
      );
      await this.userService.update(userId, {
        storageUsedMb: parseFloat(newStorage.toFixed(2)),
      });

      // Reducir contador de fotos
      await this.albumService.incrementPhotosCount(photo.album.id, -1);

      return { message: 'Imagen eliminada correctamente' };
    } catch (err) {
      console.error('Error eliminando la foto:', err);
      throw new BadRequestException('No se pudo eliminar la foto');
    }
  }

  // Eliminar todas las fotos de un álbum
  async removeAllByAlbum(albumId: string, userId: string) {
    const album = await this.albumService.findOne(albumId, userId);
    if (!album) throw new NotFoundException('Álbum no encontrado');

    const photographer = album.photographer;
    if (!photographer) throw new NotFoundException('Fotógrafo no encontrado');

    const photos = await this.photoRepository.find({
      where: { album: { id: albumId } },
    });

    if (photos.length === 0) {
      return { message: 'No hay fotos para eliminar' };
    }

    const totalSize = photos.reduce((sum, p) => sum + (p.sizeMb ?? 0), 0);

    await this.userService.update(userId, {
      storageUsedMb: Math.max(0, (photographer.storageUsedMb ?? 0) - totalSize),
    });

    await Promise.all(
      photos.map((p) => this.filesService.deleteImage(p.publicId)),
    );
    await this.photoRepository.delete(photos.map((p) => p.id));

    // Resetear contador de fotos a 0
    await this.albumService.incrementPhotosCount(albumId, -album.photosCount);

    return { message: 'Todas las fotos eliminadas correctamente' };
  }
}
