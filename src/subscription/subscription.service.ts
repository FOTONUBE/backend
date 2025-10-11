import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionPlan } from './entities/subscriptionPlan.entity';
import {
  SubscriptionOrder,
  SubscriptionOrderStatus,
} from './entities/subscription-order.entity';
import axios from 'axios';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepo: Repository<Subscription>,

    @InjectRepository(SubscriptionPlan)
    private planRepo: Repository<SubscriptionPlan>,

    @InjectRepository(SubscriptionOrder)
    private orderRepo: Repository<SubscriptionOrder>,

    private userService: UserService,
    private mailService: MailService,
  ) {}

  /** --------------------
   *  SUSCRIPCIONES
   * -------------------- */

  // Crear suscripción inicial (FREE)
  async createInitialSubscription(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const freePlan = await this.planRepo.findOne({ where: { name: 'Free' } });
    if (!freePlan) throw new NotFoundException('Plan FREE no configurado');

    return this.activateSubscription(user, freePlan);
  }

  // Cambiar de plan (FREE -> pago o pago -> pago)
  async changeSubscription(userId: string, planId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const plan = await this.planRepo.findOne({ where: { id: planId } });
    if (!plan) throw new NotFoundException('Plan no encontrado');

    return this.activateSubscription(user, plan);
  }

  // Obtener suscripción activa
  async getActiveSubscription(userId: string) {
    let subscription = await this.subscriptionRepo.findOne({
      where: { user: { id: userId }, isActive: true },
    });

    if (!subscription) {
      subscription = await this.subscriptionRepo.findOne({
        where: { user: { id: userId }, plan: { name: 'Free' } },
        order: { startDate: 'DESC' },
      });
    }

    if (!subscription)
      throw new NotFoundException(
        'No hay suscripción registrada para este usuario',
      );

    return subscription;
  }

  // Listar planes disponibles
  async getPlans() {
    return this.planRepo.find();
  }

  /** --------------------
   *  ORDENES
   * -------------------- */

  // Crear orden de suscripción pendiente
  async createSubscriptionOrder(userId: string, planId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const plan = await this.planRepo.findOne({ where: { id: planId } });
    if (!plan) throw new NotFoundException('Plan no encontrado');

    const order = this.orderRepo.create({
      user,
      plan,
      amount: plan.price,
      status: 'pending',
    });

    return this.orderRepo.save(order);
  }

  async createSubscriptionPayment(orderId: string, userId: string) {
    // 1️⃣ Obtener orden pendiente
    const order = await this.orderRepo.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ['user', 'plan'],
    });
    if (!order) throw new NotFoundException('Orden no encontrada');
    if (order.status !== 'pending')
      throw new BadRequestException('Orden ya fue pagada');

    // 2️⃣ Crear payload de preferencia
    const preferencePayload = {
      items: [
        {
          title: order.plan.name,
          quantity: 1,
          unit_price: Number(order.amount),
          currency_id: 'ARS',
        },
      ],
      payer: { email: order.user.email },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/dashboard/subscription/success`,
        failure: `${process.env.FRONTEND_URL}/dashboard/subscription/failure`,
      },
      notification_url: `${process.env.BACKEND_URL}/mercadopago/webhook`,

      external_reference: `subscription-${order.id}`,
    };

    // 3️⃣ Crear preferencia en MercadoPago con tu access token
   try {
  const { data } = await axios.post(
    'https://api.mercadopago.com/checkout/preferences',
    preferencePayload,
    {
      headers: {
        Authorization: `Bearer ${process.env.MP_MARKETPLACE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  );

  console.log('✅ Preference creada:', data);
  return { init_point: data.init_point, preferenceId: data.id };
} catch (error) {
  console.error('❌ Error al crear preferencia:', error.response?.data || error);
  throw new BadRequestException('Error al crear la preferencia en Mercado Pago');
}

  }

  // Finalizar orden de suscripción pagada
  async updateSubscriptionOrderStatus(
    orderId: string,
    newStatus: SubscriptionOrderStatus,
  ): Promise<void> {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
    });

    if (!order) {
      console.error(`Subscription order with ID ${orderId} not found.`);
      return;
    }

    // Aquí solo asignamos el nuevo estado sin validar nada
    order.status = newStatus;
    await this.orderRepo.save(order);

    console.log(
      `Subscription order ${orderId} status updated to: ${newStatus}`,
    );

    // 👇 Si el pago fue aprobado, activar la suscripción con ese plan
    if (newStatus === 'approved') {
      await this.activateSubscription(order.user, order.plan);
    }
  }

  // Listar órdenes del usuario
  async getUserOrders(userId: string) {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['plan'],
      order: { createdAt: 'DESC' },
    });
  }

  /** --------------------
   *  MÉTODO PRIVADO
   * -------------------- */

  // Activa una suscripción (desactiva previas + crea nueva)
  private async activateSubscription(user: any, plan: SubscriptionPlan) {
    // Desactivar suscripciones previas
    const activeSubs = await this.subscriptionRepo.find({
      where: { user: { id: user.id }, isActive: true },
    });

    for (const sub of activeSubs) {
      sub.isActive = false;
      sub.endDate = new Date();
      await this.subscriptionRepo.save(sub);
    }

    // Crear nueva suscripción activa
    const now = new Date();
    const endDate = plan.durationMonths
      ? new Date(now.setMonth(now.getMonth() + plan.durationMonths))
      : null;

    const subscription = this.subscriptionRepo.create({
      user,
      plan,
      startDate: new Date(),
      endDate,
      isActive: true,
    });

    await this.subscriptionRepo.save(subscription);

    // Enviar mail si no es Free
    if (plan.name !== 'Free') {
      await this.mailService.sendProWelcomeEmail(user.email, user.name);
    }

    return subscription;
  }
}
