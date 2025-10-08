import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @UseGuards(AuthGuard)
  @Post('upload/:albumId')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 15 * 1024 * 1024 } }),
  ) // Límite de 15MB
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('albumId') albumId: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;

    return this.photoService.upload(file, albumId, userId);
  }

  @UseGuards(AuthGuard)
  @Post('upload-multiple/:albumId')
  @UseInterceptors(
    FilesInterceptor('files', 20, { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('albumId') albumId: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;

    // Leer totalSizeMb enviado desde el frontend
    const totalSizeMb = parseFloat(req.body.totalSizeMb);

    return this.photoService.uploadMultiple(
      files,
      albumId,
      userId,
      totalSizeMb,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async getPhotos(@Req() req: any) {
    const userId = req.user.sub;
    return this.photoService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePhoto(@Req() req: any, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.photoService.removeById(id, userId);
  }

  @UseGuards(AuthGuard)
  @Delete('/album/:albumId')
  async deleteAllByAlbum(@Param('albumId') albumId: string, @Req() req) {
    const userId = req.user.id; // según tu auth
    return this.photoService.removeAllByAlbum(albumId, userId);
  }
}
