import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryStatus, Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PhotographerOrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOrdersForPhotographer(photographerId: string) {
    const photographer = await this.userRepository.findOne({
      where: { id: photographerId, role: 'photographer' },
    });
    if (!photographer) throw new NotFoundException('El fotógrafo no existe');

    const orders = await this.orderRepository.find({
      where: { album: { photographer: { id: photographerId } } },
      relations: ['album', 'buyer', 'items'],
      order: { createdAt: 'DESC' },
    });

    /*     if (!orders.length)
      throw new NotFoundException('Este fotógrafo no tiene órdenes'); */
    return orders;
  }

  async getOrderById(photographerId: string, orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: [
        'album',
        'album.photographer',
        'buyer',
        'items',
        // 'items.photo',
      ],
    });

    if (!order) throw new NotFoundException('La orden no existe');

    // 🔐 Validar que la orden pertenezca al fotógrafo autenticado
    if (order.album.photographer.id !== photographerId) {
      throw new ForbiddenException('No tienes acceso a esta orden');
    }

    return order;
  }

  // 🔹 Nuevo método para actualizar deliveryStatus
  async updateDeliveryStatus(
    photographerId: string,
    orderId: string,
    deliveryStatus: string,
  ) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['album', 'album.photographer'],
    });

    if (!order) throw new NotFoundException('La orden no existe');

    if (order.album.photographer.id !== photographerId) {
      throw new ForbiddenException('No tienes acceso a esta orden');
    }

    // Actualizar solo si el pago no fue rechazado
    if (order.status.toLowerCase() === 'rejected') {
      throw new ForbiddenException(
        'No se puede actualizar una orden con pago rechazado',
      );
    }

    order.deliveryStatus = deliveryStatus as DeliveryStatus;
    await this.orderRepository.save(order);

    return order;
  }
}
