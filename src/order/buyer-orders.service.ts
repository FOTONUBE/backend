import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderResponseDto } from './dto/order-buyer.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Album } from 'src/album/entities/album.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { PaymentService } from 'src/payment/payment.service';
import axios from 'axios';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BuyerOrdersService {
  private readonly mercadoPagoProviderUserId: number;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,

    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly paymentService: PaymentService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {
    this.mercadoPagoProviderUserId = Number(
      this.configService.get<string>('MERCADOPAGO_PROVIDER_USER_ID'),
    );
  }

  async createOrder(
    dto: CreateOrderDto,
    buyerId: string,
  ): Promise<OrderResponseDto> {
    const buyer = await this.userRepository.findOneByOrFail({ id: buyerId });
    const album = await this.albumRepository.findOneByOrFail({
      id: dto.albumId,
    });

    // Verificar fotos
    const photoIds = dto.items.map((i) => i.photoId);
    const photos = await this.photoRepository
      .createQueryBuilder('photo')
      .where('photo.id IN (:...ids)', { ids: photoIds })
      .andWhere('photo.albumId = :albumId', { albumId: dto.albumId })
      .getMany();

    if (photos.length !== dto.items.length) {
      throw new BadRequestException(
        'Una o más fotos no pertenecen a este álbum',
      );
    }

    // Crear items
    const orderItems = dto.items.map((itemDto) => {
      const photo = photos.find((p) => p.id === itemDto.photoId)!;
      return this.orderRepository.manager.create(OrderItem, {
        photoUrl: photo.url,
        photoWebUrl: photo.urlWeb,
        photoThumbnailUrl: photo.urlThumbnail,
        originalPhotoId: photo.id, // opcional
        size: itemDto.size,
        quantity: itemDto.quantity,
        unitPrice: itemDto.unitPrice,
        subtotal: itemDto.unitPrice * itemDto.quantity,
      });
    });

    const total = orderItems.reduce((sum, i) => sum + Number(i.subtotal), 0);

    const order = this.orderRepository.create({
      buyer,
      album,
      items: orderItems,
      total,
      status: 'pending',
    });

    const savedOrder = await this.orderRepository.save(order);

    return this.mapToDto(savedOrder);
  }

  async getOrdersByBuyer(buyerId: string): Promise<OrderResponseDto[]> {
    const orders = await this.orderRepository.find({
      where: { buyer: { id: buyerId } },
      relations: ['items', 'album'],
      order: { createdAt: 'DESC' },
    });

    return orders.map(this.mapToDto);
  }

  async getOrderById(
    orderId: string,
    buyerId: string,
  ): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items', 'album', 'buyer'],
    });

    if (!order) throw new NotFoundException('Orden no encontrada');
    if (order.buyer.id !== buyerId)
      throw new ForbiddenException('No tienes acceso a esta orden');

    return this.mapToDto(order);
  }

  async verifyPayment(orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) throw new NotFoundException('Orden no encontrada');

    return { status: order.status, orderId: order.id };
  }

  async cancelOrder(
    orderId: string,
    buyerId: string,
  ): Promise<{ success: boolean; message: string }> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['buyer'],
    });

    if (!order) throw new NotFoundException('Orden no encontrada');
    if (order.buyer.id !== buyerId)
      throw new ForbiddenException('No tienes acceso a esta orden');

    if (order.status !== 'pending') {
      throw new BadRequestException(
        'Solo se pueden cancelar órdenes pendientes',
      );
    }

    await this.orderRepository.remove(order);

    return { success: true, message: 'Orden cancelada con éxito' };
  }

  async createPaymentPreference(orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['album', 'album.photographer', 'items'],
    });
    if (!order) throw new NotFoundException('Orden no encontrada');

    const photographer = order.album.photographer;
    const photographerAccount = await this.paymentService.getAccount(
      photographer.id,
    );
    if (
      !photographerAccount.accessToken ||
      !photographerAccount.providerUserId
    ) {
      throw new BadRequestException(
        'El fotógrafo no tiene cuenta MercadoPago vinculada',
      );
    }

    const items = order.items.map((i) => ({
      title: `Foto - ${i.size}`,
      picture_url: i.photoUrl,
      quantity: i.quantity,
      unit_price: Number(i.unitPrice),
      currency_id: 'ARS',
    }));

    const total = order.total;
    const marketplaceFee = Number((total * 0.1).toFixed(2));
    if (marketplaceFee > total) {
      console.error(
        'marketplaceFee is greater than total!',
        marketplaceFee,
        total,
      );
      throw new BadRequestException('Comisión del marketplace excesiva');
    }

    const marketplaceProviderUserId = this.mercadoPagoProviderUserId;

    const preferencePayload = {
      items,
      payer: { email: order.buyer.email },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment/success`,
        failure: `${process.env.FRONTEND_URL}/payment/failure`,
      },
      marketplace_fee: marketplaceFee,
      payment_methods: {
        excluded_payment_types: [{ id: 'ticket' }, { id: 'atm' }],
      },
      sponsor_id: marketplaceProviderUserId,
      notification_url: `${process.env.BACKEND_URL}/mercadopago/webhook`,
      external_reference: `buyerOrder-${order.id}`,
    };

    console.log(
      '⚙ Preference Payload:',
      JSON.stringify(preferencePayload, null, 2),
    );
    console.log(
      '📦 Access Token del vendedor:',
      photographerAccount.accessToken,
    );

    try {
      const { data } = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        preferencePayload,
        {
          headers: {
            Authorization: `Bearer ${photographerAccount.accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // console.log('✅ Preferencia creada:', data);

      return { init_point: data.init_point, preferenceId: data.id };
    } catch (err: any) {
      console.error(
        '❌ Error al crear preferencia:',
        err.response?.data || err.message,
      );
      throw new BadRequestException('Error al crear preferencia MercadoPago');
    }
  }

  async updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
  ): Promise<void> {
    let cleanOrderId = orderId;
    if (orderId.startsWith('buyerOrder-')) {
      cleanOrderId = orderId.replace('buyerOrder-', '');
    }

    const order = await this.orderRepository.findOne({
      where: { id: cleanOrderId },
      relations: ['buyer', 'items', 'album', 'album.photographer'],
    });

    if (!order) {
      console.error(`Order with ID ${orderId} not found.`);
      return;
    }

    order.status = newStatus;

    // Persistir los cambios en la base de datos
    await this.orderRepository.save(order);

    console.log(`Order ${orderId} status updated to: ${newStatus}`);

    // 👇 Si el pago fue aprobado, mandar mail
    if (newStatus === 'approved') {
      const total = Number(order.total).toFixed(2);
      const itemCount = order.items.length;

      // 📩 Mail al comprador (confirmación de compra)
      await this.mailService.sendOrderPaymentEmail(
        order.buyer.email,
        order.id,
        total,
        itemCount,
      );

      // 📩 Mail al vendedor (nuevo pedido confirmado)
      await this.mailService.sendNewOrderNotification(
        order.album.photographer.email,
        order.id,
        total,
        itemCount,
        order.buyer.name,
      );
    }
  }
  // Mapeo privado a DTO
  private mapToDto(order: Order): OrderResponseDto {
    return {
      id: order.id,
      album: {
        id: order.album.id,
        title: order.album.title,
        prices: order.album.prices,
        priceDigital: order.album.priceDigital,
        priceSchoolSports: order.album.priceSchoolSports,
        eventDate: order.album.eventDate,
        description: order.album.description || '',
      },
      items: order.items.map((item) => ({
        id: item.id,
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
        photo: {
          id: item.originalPhotoId,
          url: item.photoUrl,
          webUrl: item.photoWebUrl,
          thumbnailUrl: item.photoThumbnailUrl,
        },
      })),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    };
  }
}
