import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { PasswordResetService } from './password-reset.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly resetService: PasswordResetService,
  ) {}

  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const register = await this.authService.register(dto);

    return { response: register, message: 'Registro exitoso' };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const login = await this.authService.login(dto);

    // Retornamos algo (puede ser info del usuario o mensaje)
    return { response: login, message: 'Login exitoso' };
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    await this.resetService.requestPasswordReset(email);
    return { message: 'Email de reseteo enviado correctamente' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    await this.resetService.consumeToken(token, newPassword);
    return { message: 'Contraseña actualizada correctamente' };
  }
}

// Seteamos la cookie HTTP-only con el token
/*   ('token', login.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
      domain: 'next-foto-nube.vercel.app',
    }); */
