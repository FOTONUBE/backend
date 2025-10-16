import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumAccessService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async grantAccess(userId: string, userEvent: string, passwordEvent: string) {
    // Buscar el álbum con sus accesos
    const album = await this.albumRepo.findOne({
      where: { userEvent },
      relations: ['accessibleUsers', 'photos'],
    });

    if (!album) throw new NotFoundException('Album not found');
    if (album.userEvent !== userEvent)
      throw new UnauthorizedException('Invalid credentials');
    if (!(await bcrypt.compare(passwordEvent, album.passwordEventHash)))
      throw new UnauthorizedException('Invalid credentials');

    // Buscar usuario real en DB
    const dbUser = await this.userService.findById(userId);

    if (!dbUser) throw new NotFoundException('User not found');

    // Asociar usuario al álbum si no está ya
    if (!album.accessibleUsers.find((u) => u.id === dbUser.id)) {
      album.accessibleUsers.push(dbUser);
      await this.albumRepo.save(album);
    }

    return {
      success: true,
      album: {
        id: album.id,
        title: album.title,
        createdAt: album.createdAt,
        photos: album.photos,
      },
    };
  }

  async getAlbumById(userId: string, albumId: string) {
    const album = await this.albumRepo.findOne({
      where: {
        id: albumId,
        accessibleUsers: { id: userId },
      },
      relations: ['photos', 'accessibleUsers', 'photographer'],
    });

    if (!album) return null;

    return {
      id: album.id,
      title: album.title,
      eventDate: album.eventDate,
      prices: album.prices,
      priceDigital: album.priceDigital,
      priceSchoolSports: album?.priceSchoolSports,
      photos: album.photos.map((photo) => ({
        id: photo.id,
        url: photo.url,
        urlWeb: photo.urlWeb,
        urlThumbnail: photo.urlThumbnail,
      })),
      photographer: album.photographer.name,
    };
  }
}
