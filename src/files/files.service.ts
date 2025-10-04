import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { randomUUID } from 'crypto';
import { UserService } from '../user/user.service';
import { UserHelpers } from 'src/user/helpers/user.helpers';

@Injectable()
export class FilesService {
  constructor(private readonly userService: UserService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{
    url: string;
    public_id: string;
    sizeMb: number;
    urlWeb: string;
    urlThumbnail: string;
  }> {
    const fileSizeInMb = file.size / (1024 * 1024);
    const maxFileSizeMb = 5; // 5 MB

    if (fileSizeInMb > maxFileSizeMb) {
      throw new BadRequestException(
        `El archivo excede el tamaño máximo permitido (${maxFileSizeMb} MB).`,
      );
    }

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // ✅ Usar helper para validar almacenamiento
    if (!UserHelpers.canUpload(user, fileSizeInMb)) {
      throw new BadRequestException(
        `No podés subir este archivo. Supera tu límite de almacenamiento (${UserHelpers.getMaxStorageMb(
          user,
        )} MB)`,
      );
    }

    const uniqueId = randomUUID().replace(/-/g, '').substring(0, 16);

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: uniqueId,
          folder: `FotoNube/user_${userId}`,
          resource_type: 'image',
          // format: 'webp',
          transformation: { quality: 'auto' },
        },
        (error, result) => {
          if (error) return reject(error);
          if (result) return resolve(result);
        },
      );

      uploadStream.end(file.buffer);
    });

    // ✅ actualizar storageUsedMb en BD
    await this.userService.update(userId, {
      storageUsedMb: (user.storageUsedMb ?? 0) + fileSizeInMb,
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
      sizeMb: fileSizeInMb, // 👈 Peso del archivo
      urlWeb: result.secure_url, // para vista individual
      urlThumbnail: result.secure_url, // para galerías/listados
    };
  }

  async deleteImage(publicId: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
