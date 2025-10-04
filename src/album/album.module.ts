import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { UserModule } from 'src/user/user.module';
import { PhotoModule } from 'src/photo/photo.module';
import { AlbumAccessController } from './album-access.controller';
import { AlbumAccessService } from './album-access.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    UserModule,
    forwardRef(() => PhotoModule),
  ],
  controllers: [AlbumController, AlbumAccessController],
  providers: [AlbumService, AlbumAccessService],
  exports: [AlbumService, AlbumAccessService],
})
export class AlbumModule {}
