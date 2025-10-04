import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubscriptionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // "Free" o "Pro"

  @Column({ nullable: true })
  description?: string;

  @Column()
  durationMonths: number; // 0 = free, 1, 3, 6

  @Column({ type: 'decimal' })
  price: number; // 0 para free, 40000, 108000, 192000

  @Column({ type: 'decimal', default: 0 })
  discountPercentage: number; // 0, 10, 20
}
