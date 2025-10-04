import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Album } from 'src/album/entities/album.entity';
import { AdminAlbumDto, AdminUserDto } from './dto/admin-user.dto';
import { AdminPhotographerByIdDto } from './dto/admin-user-by-id.dto';
import { AdminAlbumByIdDto } from './dto/admin-album-by-id.dto';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,
  ) {}

  async findAll(): Promise<AdminUserDto[]> {
    const users = await this.userRepo.find({
      relations: ['orders', 'paymentAccounts', 'albums', 'subscriptions'],
    });

    return users.map((user) => {
      const {
        password,
        provider,
        passwordResetRequestedAt,
        createdAt,
        updatedAt,
        storageUsedMb,
        accessibleAlbums,
        ...safeUser
      } = user;

      const formattedAlbums: AdminAlbumDto[] = accessibleAlbums?.map(
        (album) => ({
          id: album.id,
          title: album.title,
          description: album.description,
          prices: album.prices,
          priceDigital: album.priceDigital,
          priceSchoolSports: album.priceSchoolSports,
          eventDate: album.eventDate,
          photos: album.photos?.map((photo) => ({
            id: photo.id,
            url: photo.url,
          })),
        }),
      );

      return {
        ...safeUser,
        accessibleAlbums: formattedAlbums,
      };
    });
  }

  async setActiveStatus(userId: string, active: boolean) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.isActive = active;
    return this.userRepo.save(user);
  }

  async getStats() {
    const totalUsers = await this.userRepo.count();
    const photographers = await this.userRepo.count({
      where: { role: 'photographer' },
    });
    const buyers = await this.userRepo.count({ where: { role: 'buyer' } });

    return { totalUsers, photographers, buyers };
  }

  async getAllPhotographers() {
    const photographers = await this.userRepo
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.email', 'user.image'])
      .leftJoin('user.albums', 'album')
      .leftJoin('album.orders', 'order')
      .addSelect('COUNT(order.id)', 'totalOrders')
      .addSelect(
        `SUM(CASE WHEN order.status = 'pending' THEN 1 ELSE 0 END)`,
        'pendingOrders',
      )
      .addSelect(
        `SUM(CASE WHEN order.status = 'approved' THEN 1 ELSE 0 END)`,
        'approvedOrders',
      )
      .where('user.role = :role', { role: 'photographer' })
      .groupBy('user.id')
      .getRawMany();

    return photographers.map((p) => ({
      id: p.user_id,
      name: p.user_name,
      email: p.user_email,
      image: p.user_image,
      totalOrders: parseInt(p.totalOrders, 10),
      pendingOrders: parseInt(p.pendingOrders, 10),
      approvedOrders: parseInt(p.approvedOrders, 10),
    }));
  }

  async getPhotographerById(id: string): Promise<AdminPhotographerByIdDto> {
    const user = await this.userRepo.findOne({
      where: { id, role: 'photographer' },
      relations: {
        albums: {
          orders: true,
          photos: true,
        },
      },
    });

    if (!user) throw new NotFoundException('Fotógrafo no encontrado');

    let totalOrders = 0;
    let pendingOrders = 0;
    let approvedOrders = 0;
    let rejectedOrders = 0;

    user.albums.forEach((album) => {
      totalOrders += album.orders.length;
      pendingOrders += album.orders.filter(
        (o) => o.status === 'pending',
      ).length;
      approvedOrders += album.orders.filter(
        (o) => o.status === 'approved',
      ).length;
      rejectedOrders += album.orders.filter(
        (o) => o.status === 'rejected',
      ).length;
    });

    const albums = user.albums.map((album) => ({
      id: album.id,
      title: album.title,
      description: album.description || '',
      totalOrders: album.orders.length,
      coverUrl: album.photos.length > 0 ? album.photos[0].urlWeb : undefined,
    }));

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      isActive: user.isActive,
      totalOrders,
      pendingOrders,
      approvedOrders,
      rejectedOrders,
      albums,
    };
  }

  async getAlbumByIdForAdmin(albumId: string): Promise<AdminAlbumByIdDto> {
    const album = await this.albumRepo.findOne({
      where: { id: albumId },
      relations: ['photos', 'orders', 'photographer'],
    });

    if (!album) throw new NotFoundException('Álbum no encontrado');

    return {
      id: album.id,
      title: album.title,
      prices: album.prices,
      description: album.description || '',
      eventDate: new Date(album.eventDate),
      clientEmail: album.clientEmail,
      clientPhoneNumber: album.clientPhoneNumber,
      portada: album.photos.length > 0 ? album.photos[0].urlWeb : undefined,
      totalOrders: album.orders.length,
      orders: album.orders.map((o) => ({
        id: o.id,
        status: o.status,
        deliveryStatus: o.deliveryStatus,
        total: o.total,
        createdAt: o.createdAt,
      })),
    };
  }
}
