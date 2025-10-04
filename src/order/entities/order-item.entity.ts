// order-item.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  // ❌ Eliminamos la relación directa a Photo
  // @ManyToOne(() => Photo, { eager: true })
  // photo: Photo;

  // ✅ Guardamos un snapshot de los datos importantes de la foto
  @Column()
  photoUrl: string;

  @Column({ nullable: true })
  photoWebUrl: string;

  @Column({ nullable: true })
  photoThumbnailUrl: string;

  @Column({ nullable: true })
  originalPhotoId: string; // opcional: para referencia histórica, pero sin FK

  @Column()
  size: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;
}
