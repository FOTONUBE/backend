// album.service.ts
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PhotoService } from 'src/photo/photo.service';
import { UserHelpers } from 'src/user/helpers/user.helpers';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,

    private readonly userService: UserService,

    @Inject(forwardRef(() => PhotoService))
    private readonly photoService: PhotoService,
  ) {}

  async save(album: Album): Promise<Album> {
    return this.albumRepo.save(album);
  }

  // Incrementa o decrementa el contador de fotos de un álbum
  async incrementPhotosCount(albumId: string, value: number) {
    await this.albumRepo.increment({ id: albumId }, 'photosCount', value);
  }

  async create(dto: CreateAlbumDto, userId: string) {
    const photographer = await this.userService.findById(userId);
    if (!photographer || photographer.role !== 'photographer') {
      throw new NotFoundException('Fotógrafo no encontrado');
    }

    if (!UserHelpers.canCreateAlbum(photographer)) {
      throw new BadRequestException('No puede crear más álbumes');
    }

    const existing = await this.albumRepo.findOne({
      where: { userEvent: dto.userEvent, photographerId: userId },
    });
    if (existing) {
      throw new BadRequestException(
        'Ya existe un álbum con ese usuario de evento para este fotógrafo',
      );
    }

    const passwordEventHash = await bcrypt.hash(dto.passwordEvent, 10);

    const album = this.albumRepo.create({
      ...dto,
      passwordEventHash,
      photographer,
    });

    try {
      const savedAlbum = await this.albumRepo.save(album);
      return {
        message: 'Álbum creado correctamente',
        album: { id: savedAlbum.id },
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'Ya existe un álbum con ese nombre o usuario de evento',
        );
      }
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto, userId: string) {
    const { limit = 10, offset = 0 } = paginationDto;

    const photographer = await this.userService.findById(userId);
    if (!photographer || photographer.role !== 'photographer') {
      throw new NotFoundException('Fotógrafo no encontrado');
    }

    const albums = await this.albumRepo.find({
      where: { photographer: { id: userId } },
      take: limit,
      skip: offset,
      relations: ['photos'],
    });

    return albums.map((album) => ({
      id: album.id,
      name: album.title,
      clientEmail: album.clientEmail,
      clientPhoneNumber: album.clientPhoneNumber,
      createdAt: album.createdAt,
      isActiveFolder: album.isActiveFolder,
      description: album.description,
      photos: album.photos,
    }));
  }

  async findOne(term: string, photographerId: string) {
    const album = await this.albumRepo.findOne({
      where: { id: term, photographer: { id: photographerId } },
      relations: ['photos', 'photographer', 'orders'],
    });

    if (!album) {
      throw new NotFoundException(
        `Álbum con identificador '${term}' no encontrado o no autorizado`,
      );
    }
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto, userId: string) {
    const album = await this.albumRepo.findOne({
      where: { id, photographer: { id: userId } },
    });

    if (!album) {
      throw new NotFoundException(
        `Álbum con id ${id} no encontrado o no pertenece al fotógrafo autenticado`,
      );
    }

    if (dto.passwordEvent) {
      album.passwordEventHash = await bcrypt.hash(dto.passwordEvent, 10);
      delete (dto as any).passwordEvent;
    }

    this.albumRepo.merge(album, dto);

    try {
      const updatedAlbum = await this.albumRepo.save(album);
      return {
        message: 'Álbum actualizado correctamente',
        album: {
          id: updatedAlbum.id,
          title: updatedAlbum.title,
          description: updatedAlbum.description,
          clientEmail: updatedAlbum.clientEmail,
          clientPhoneNumber: updatedAlbum.clientPhoneNumber,
          isActiveFolder: updatedAlbum.isActiveFolder,
        },
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Ya existe un álbum con ese nombre');
      }
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    const album = await this.albumRepo.findOne({
      where: { id, photographer: { id: userId } },
    });

    if (!album) {
      throw new NotFoundException(
        `Álbum con id ${id} no encontrado o no pertenece al fotógrafo autenticado`,
      );
    }

    // Eliminar todas las fotos
    await this.photoService.removeAllByAlbum(id, userId);

    // Soft delete
    album.isActiveFolder = false;
    album.deletedAt = new Date();
    await this.albumRepo.save(album);

    return {
      message:
        'Álbum y fotos eliminados correctamente (DB + Cloudinary + usuario actualizado)',
    };
  }
}
