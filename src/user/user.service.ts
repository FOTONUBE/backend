import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    try {
      const user = await this.userRepo.findOne({
        where: { id },
        relations: [
          'orders',
          'accessibleAlbums',
          'accessibleAlbums.photos',
          'paymentAccounts',
        ],
      });

      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      const plainUser: any = user;

      delete plainUser.password;
      delete plainUser.provider;
      delete plainUser.passwordResetRequestedAt;
      delete plainUser.createdAt;
      delete plainUser.updatedAt;

      plainUser.accessibleAlbums = plainUser.accessibleAlbums.map(
        (album: any) => ({
          id: album.id,
          title: album.title,
          description: album.description,
          prices: album.prices,
          priceDigital: album.priceDigital,
          priceSchoolSports: album.priceSchoolSports,
          eventDate: album.eventDate,
          storageUsedMb: album.storageUsedMb,
          photos: album.photos.map((photo: any) => ({
            id: photo.id,
            url: photo.url,
            name: photo.name,
            // otros campos que quieras exponer
          })),
        }),
      );

      return plainUser;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Error fetching user');
    }
  }

  async create(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async update(
    userId: string,
    updateData: UpdateUserDto,
  ): Promise<
    Omit<
      User,
      | 'password'
      | 'provider'
      | 'createdAt'
      | 'updatedAt'
      | 'passwordResetRequestedAt'
    >
  > {
    const user = await this.userRepo.preload({ id: userId, ...updateData });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const savedUser = await this.userRepo.save(user);

    const {
      password,
      provider,
      createdAt,
      updatedAt,
      passwordResetRequestedAt,
      ...safeUser
    } = savedUser;

    return safeUser;
  }

  /* Time de Recuperar contraseña  */
  async updatePasswordResetRequestedAt(userId: string, date: Date) {
    await this.userRepo.update(userId, { passwordResetRequestedAt: date });
  }
}
