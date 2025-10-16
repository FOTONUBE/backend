import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
@Index(['userEvent', 'photographerId'], { unique: true }) // 🔹 índice único por fotógrafo
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  userEvent: string; // Usuario para acceder al álbum

  @Column()
  passwordEventHash: string; // Contraseña hasheada para acceder

  @Column('jsonb')
  prices: { size: string; price: number }[];

  @Column('float')
  priceDigital: number;

  @Column('float')
  priceSchoolSports?: number;

  @Column({ type: 'date' })
  eventDate: string;

  @Column()
  clientEmail: string;

  @Column()
  clientPhoneNumber: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isActiveFolder: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Column()
  photographerId: string;

  @Column({ type: 'int', default: 0 })
  photosCount: number;

  // Fotógrafo dueño del álbum
  @ManyToOne(() => User, (user) => user.albums)
  photographer: User;

  // Usuarios que pueden acceder a este álbum
  @ManyToMany(() => User, (user) => user.accessibleAlbums)
  @JoinTable()
  accessibleUsers: User[];

  @OneToMany(() => Photo, (photo) => photo.album, { cascade: true })
  photos: Photo[];

  @OneToMany(() => Order, (order) => order.album, { cascade: true })
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
