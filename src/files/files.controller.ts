import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userId = req.user.sub;

    if (!file) {
      throw new BadRequestException('No se envió ningún archivo');
    }

    // Validar que sea formato webp
    if (file.mimetype !== 'image/webp') {
      throw new BadRequestException(
        'Solo se permiten archivos en formato .webp',
      );
    }

    return this.filesService.uploadImage(file, userId);
  }
}
