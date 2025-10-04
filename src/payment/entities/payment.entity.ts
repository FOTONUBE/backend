import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PaymentAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['mercadopago', 'stripe'],
    default: 'mercadopago',
  })
  provider: 'mercadopago' | 'stripe';

  @Column({ type: 'bigint', nullable: true })
  providerUserId: number; // mpUserId

  @Column({ type: 'text', nullable: true })
  accessToken: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;

  @Column({ type: 'timestamp', nullable: true })
  tokenExpiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* Relaciones */
  @ManyToOne(() => User, (user) => user.paymentAccounts, {
    onDelete: 'CASCADE',
  })
  user: User;
}
