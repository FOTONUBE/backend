// order.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Album } from '../../album/entities/album.entity';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from './order-item.entity';

export type OrderStatus =
  | 'pending'
  | 'approved'
  | 'authorized'
  | 'in_process'
  | 'in_mediation'
  | 'rejected'
  | 'cancelled'
  | 'refunded'
  | 'charged_back';

export type DeliveryStatus =
  | 'pending' // aún no entregado
  | 'delivered' // entregado (digital o físico)
  | 'in_progress'; // si querés estados intermedios (ej: preparando)

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

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
  status: OrderStatus;

  // 🔹 Estado de entrega (para el fotógrafo)
  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'delivered'],
    default: 'pending',
  })
  deliveryStatus: DeliveryStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* Relaciones */
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  buyer: User;

  @ManyToOne(() => Album, (album) => album.orders, { eager: true })
  album: Album;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];
}
