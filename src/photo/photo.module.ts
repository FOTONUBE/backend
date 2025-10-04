import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { FilesModule } from 'src/files/files.module';
import { UserModule } from 'src/user/user.module';
import { Photo } from './entities/photo.entity';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    UserModule,
    FilesModule,
    forwardRef(() => AlbumModule),
  ],
  providers: [PhotoService],
  controllers: [PhotoController],
  exports: [PhotoService],
})
export class PhotoModule {}
