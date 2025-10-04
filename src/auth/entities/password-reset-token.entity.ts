// src/auth/entities/password-reset-token.entity.ts
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class PasswordResetToken {
  @PrimaryGeneratedColumn('uuid')
  id: string; // el token opaco

  @Column({ default: false })
  used: boolean;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  /* Relaciones */
  @ManyToOne(() => User, (user) => user.resetTokens, { onDelete: 'CASCADE' })
  user: User;
}
