// adminAlbum.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/entities/album.entity';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class AdminAlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async getStats() {
    const totalAlbums = await this.albumRepo.count();

    // Intentamos contar albums activos si existe la columna isActive (no romper si no existe)
    let activeAlbums: number | undefined = undefined;
    try {
      // Ajustá 'isActive' si tu columna tiene otro nombre (ej. published, visible)
      activeAlbums = await this.albumRepo.count({
        where: { isActiveFolder: true },
      });
    } catch (e) {
      activeAlbums = undefined;
    }

    // Cantidad de álbumes que tuvieron al menos 1 orden (contar DISTINCT album.id desde orders)
    const raw = await this.orderRepo
      .createQueryBuilder('order')
      .select('COUNT(DISTINCT order.albumId)', 'albumsWithOrders')
      .getRawOne();

    const albumsWithOrders = parseInt(raw?.albumsWithOrders ?? '0', 10);

    return { totalAlbums, activeAlbums, albumsWithOrders };
  }
}
