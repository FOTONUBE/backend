import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // ======================
  // Registro de usuario
  // ======================
  async register(dto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) throw new BadRequestException('El usuario ya existe');

    let newUser;
    if (dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      newUser = await this.userService.create({
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        provider: 'credentials',
      });
    } else if (dto.name && dto.image) {
      newUser = await this.userService.create({
        email: dto.email,
        role: dto.role,
        name: dto.name,
        image: dto.image,
        provider: 'google',
      });
    } else {
      throw new BadRequestException('Datos insuficientes para registrar');
    }

    // Crear la suscripción inicial
    await this.subscriptionService.createInitialSubscription(newUser.id);

    // Enviar email de bienvenida
    await this.mailService.sendWelcomeEmail(newUser.email, newUser.role);

    return this.generateToken(newUser);
  }

  // ======================
  // Login
  // ======================
  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new BadRequestException('Usuario no registrado');

    // Login tradicional
    if (dto.password) {
      if (user.provider !== 'credentials') {
        throw new BadRequestException('El usuario se registró con Google');
      }

      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) throw new BadRequestException('Credenciales inválidas');
    }

    // Login con Google
    else if (dto.name && dto.image) {
      if (user.provider !== 'google') {
        throw new BadRequestException('Usuario no registrado con Google');
      }
    } else {
      throw new BadRequestException('Datos insuficientes para login');
    }

    // Verificación de usuario activo
    if (!user.isActive) throw new BadRequestException('Usuario desactivado');

    return this.generateToken(user);
  }

  // ======================
  // Solicitar reseteo de contraseña
  // ======================
  async requestPasswordReset(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const now = new Date();
    const waitTimeMinutes = 15;

    if (user.passwordResetRequestedAt) {
      const diffMinutes =
        (now.getTime() - user.passwordResetRequestedAt.getTime()) / (1000 * 60);
      if (diffMinutes < waitTimeMinutes) {
        throw new BadRequestException(
          `Ya solicitaste un cambio hace poco, espera ${Math.ceil(
            waitTimeMinutes - diffMinutes,
          )} minutos`,
        );
      }
    }

    // Actualizar fecha de solicitud
    await this.userService.updatePasswordResetRequestedAt(user.id, now);

    // Crear token y enviar email
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.mailService.sendPasswordResetEmail(user.email, resetLink);

    return { message: 'Email para recuperar contraseña enviado' };
  }

  // ======================
  // Resetear contraseña
  // ======================
  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findById(payload.sub);
      if (!user) throw new NotFoundException('Usuario no encontrado');

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userService.update(user.id, { password: hashedPassword });

      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      throw new BadRequestException('Token inválido o expirado');
    }
  }

  // ======================
  // Generar JWT
  // ======================
  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      role: user.role,
      name: user.name || null,
      phone: user.phone || null,
      paymentAccounts: user.paymentAccounts || [],
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name || null,
        image: user.image || null,
        phone: user.phone || null,
      },
    };
  }
}
