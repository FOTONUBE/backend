// adminOrder.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class AdminOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  // findAll (igual que tenías, pero normalizamos status a lowercase)
  async findAll({
    status,
    photographerId,
    clientId,
    page = 1,
    limit = 10,
  }: any) {
    const where: any = {};

    if (status) where.status = (status as string).toLowerCase();
    if (clientId) where.buyer = { id: clientId };
    if (photographerId) where.album = { photographer: { id: photographerId } };

    const [orders, total] = await this.orderRepo.findAndCount({
      where,
      relations: [
        'buyer',
        'album',
        'album.photographer',
        'items',
        // 'items.photo',
      ],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { orders, total, page, limit };
  }

  async findById(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: [
        'buyer',
        'album',
        'album.photographer',
        'items',
        // 'items.photo',
      ],
    });

    if (!order) throw new NotFoundException('Pedido no encontrado');
    return order;
  }

  // Métricas ampliadas
  async getStats() {
    const totalOrders = await this.orderRepo.count();

    const pendingCount = await this.orderRepo.count({
      where: { status: 'pending' },
    });
    const approvedCount = await this.orderRepo.count({
      where: { status: 'approved' },
    });
    const rejectedCount = await this.orderRepo.count({
      where: { status: 'rejected' },
    });
    const cancelledCount = await this.orderRepo.count({
      where: { status: 'cancelled' },
    });

    // deliveryStatus counts
    const deliveryPending = await this.orderRepo.count({
      where: { deliveryStatus: 'pending' },
    });
    const deliveryInProgress = await this.orderRepo.count({
      where: { deliveryStatus: 'in_progress' },
    });
    const deliveryDelivered = await this.orderRepo.count({
      where: { deliveryStatus: 'delivered' },
    });

    // Ingresos: sumatoria de total según estado
    const approvedRaw = await this.orderRepo
      .createQueryBuilder('order')
      .select('COALESCE(SUM(order.total), 0)', 'income')
      .where('order.status = :status', { status: 'approved' })
      .getRawOne();
    const pendingRaw = await this.orderRepo
      .createQueryBuilder('order')
      .select('COALESCE(SUM(order.total), 0)', 'income')
      .where('order.status = :status', { status: 'pending' })
      .getRawOne();

    const incomeApproved = parseFloat(approvedRaw?.income ?? 0);
    const incomePending = parseFloat(pendingRaw?.income ?? 0);

    return {
      totalOrders,
      pendingCount,
      approvedCount,
      rejectedCount,
      cancelledCount,
      delivery: {
        pending: deliveryPending,
        in_progress: deliveryInProgress,
        delivered: deliveryDelivered,
      },
      income: {
        approved: incomeApproved,
        pending: incomePending,
        total: incomeApproved + incomePending, // opcional
      },
    };
  }
}
