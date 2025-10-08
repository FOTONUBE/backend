import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PasswordResetToken } from 'src/auth/entities/password-reset-token.entity';
import { PaymentAccount } from 'src/payment/entities/payment.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Album } from '../../album/entities/album.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: ['google', 'credentials'],
    default: 'credentials',
  })
  provider: 'google' | 'credentials';

  @Column({ type: 'enum', enum: ['buyer', 'photographer', 'SUPER_ADMIN'] })
  role: 'buyer' | 'photographer' | 'SUPER_ADMIN';

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetRequestedAt?: Date;

  @Column({ type: 'float', default: 0 })
  storageUsedMb: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* Relaciones */
  @OneToMany(() => Album, (album) => album.photographer)
  albums: Album[];

  @ManyToMany(() => Album, (album) => album.accessibleUsers)
  accessibleAlbums: Album[];

  @OneToMany(() => Order, (order) => order.buyer)
  orders: Order[];

  @OneToMany(() => Subscription, (subscription) => subscription.user, {
    cascade: true,
  })
  subscriptions: Subscription[];

  @OneToMany(() => PaymentAccount, (pa) => pa.user)
  paymentAccounts: PaymentAccount[];

  @OneToMany(() => PasswordResetToken, (prt) => prt.user)
  resetTokens: PasswordResetToken[];
}
