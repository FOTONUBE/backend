// src/auth/services/password-reset.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { User } from 'src/user/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { isUUID } from 'class-validator';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordResetToken)
    private resetRepo: Repository<PasswordResetToken>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private mailService: MailService,
  ) {}

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const token = await this.createToken(user.id);

    // 🔹 enviar email con link
    await this.mailService.sendPasswordResetEmail(
      user.email,
      `http://localhost:3000/reset-password?token=${token}`,
    );
  }

  async createToken(userId: string): Promise<string> {
    const token = this.resetRepo.create({
      id: uuid(),
      user: { id: userId } as User,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
    });

    await this.resetRepo.save(token);
    return token.id;
  }

  async consumeToken(tokenId: string, newPassword: string): Promise<void> {
    if (!isUUID(tokenId)) {
      throw new BadRequestException('Token inválido');
    }

    const token = await this.resetRepo.findOne({
      where: { id: tokenId },
      relations: ['user'],
    });
    if (!token) throw new BadRequestException('Token no encontrado o inválido');
    if (token.used) throw new BadRequestException('Este token ya fue usado');
    if (token.expiresAt < new Date())
      throw new BadRequestException('El token ha expirado');

    token.user.password = await bcrypt.hash(newPassword, 10);
    token.used = true;

    await this.userRepo.save(token.user);
    await this.resetRepo.save(token);
  }
}
