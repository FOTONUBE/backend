import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { SubscriptionPlan } from './subscriptionPlan.entity';

export type SubscriptionOrderStatus =
  | 'pending'
  | 'approved'
  | 'authorized'
  | 'in_process'
  | 'in_mediation'
  | 'rejected'
  | 'cancelled'
  | 'refunded'
  | 'charged_back';

@Entity()
export class SubscriptionOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => SubscriptionPlan, { eager: true })
  plan: SubscriptionPlan;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: [
      'pending',
      'approved',
      'authorized',
      'in_process',
      'in_mediation',
      'rejected',
      'cancelled',
      'refunded',
      'charged_back',
    ],
    default: 'pending',
  })
  status: SubscriptionOrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
