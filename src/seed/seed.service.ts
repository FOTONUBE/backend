import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/dto/base-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionPlan } from 'src/subscription/entities/subscriptionPlan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(SubscriptionPlan)
    private readonly planRepo: Repository<SubscriptionPlan>,
  ) {}

  async seedUsers() {
    const usersToCreate = [
      // Fotógrafos
      {
        email: 'photographer1@test.com',
        role: UserRole.PHOTOGRAPHER,
        password: '123456',
        name: 'Fotógrafo 1',
      },
      {
        email: 'photographer2@test.com',
        role: UserRole.PHOTOGRAPHER,
        password: '123456',
        name: 'Fotógrafo 2',
      },
      {
        email: 'photographer3@test.com',
        role: UserRole.PHOTOGRAPHER,
        password: '123456',
        name: 'Fotógrafo 3',
      },
      {
        email: 'photographer4@test.com',
        role: UserRole.PHOTOGRAPHER,
        password: '123456',
        name: 'Fotógrafo 4',
      },
      {
        email: 'photographer5@test.com',
        role: UserRole.PHOTOGRAPHER,
        password: '123456',
        name: 'Fotógrafo 5',
      },

      // Compradores
      {
        email: 'buyer1@test.com',
        role: UserRole.BUYER,
        password: '123456',
        name: 'Comprador 1',
      },
      {
        email: 'buyer2@test.com',
        role: UserRole.BUYER,
        password: '123456',
        name: 'Comprador 2',
      },
      {
        email: 'buyer3@test.com',
        role: UserRole.BUYER,
        password: '123456',
        name: 'Comprador 3',
      },
      {
        email: 'buyer4@test.com',
        role: UserRole.BUYER,
        password: '123456',
        name: 'Comprador 4',
      },
      {
        email: 'buyer5@test.com',
        role: UserRole.BUYER,
        password: '123456',
        name: 'Comprador 5',
      },
    ];

    for (const u of usersToCreate) {
      const exists = await this.userService.findByEmail(u.email);
      if (exists) continue;

      const hashedPassword = await bcrypt.hash(u.password, 10);
      await this.userService.create({
        email: u.email,
        password: hashedPassword,
        role: u.role,
        name: u.name,
        provider: 'credentials',
      });
      console.log(`Usuario creado: ${u.email} (${u.role})`);
    }

    return { message: 'Seed completado con 10 usuarios' };
  }

  async seedSubscriptionPlans() {
    const plans = [
      {
        name: 'Free',
        description: 'Plan gratuito inicial',
        durationMonths: 0,
        price: 0,
        discountPercentage: 0,
      },
      {
        name: 'Pro',
        description: 'Suscripción de 1 mes',
        durationMonths: 1,
        price: 40000,
        discountPercentage: 0,
      },
      {
        name: 'Pro',
        description: 'Suscripción de 3 meses con 10% de descuento',
        durationMonths: 3,
        price: 108000,
        discountPercentage: 10,
      },
      {
        name: 'Pro',
        description: 'Suscripción de 6 meses con 20% de descuento',
        durationMonths: 6,
        price: 192000,
        discountPercentage: 20,
      },
    ];

    for (const planData of plans) {
      const exists = await this.planRepo.findOne({
        where: {
          name: planData.name,
          durationMonths: planData.durationMonths,
        },
      });

      if (!exists) {
        const plan = this.planRepo.create(planData);
        await this.planRepo.save(plan);
        console.log(`Plan creado: ${plan.name} (${plan.durationMonths} meses)`);
      }
    }

    return { message: 'Seed de planes completado' };
  }
}
