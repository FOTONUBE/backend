import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { SubscriptionPlan } from './subscriptionPlan.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date | null;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => SubscriptionPlan, { eager: true })
  plan: SubscriptionPlan;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
