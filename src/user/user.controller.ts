import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Req() req) {
    const userId = req.user.sub;

    return this.userService.findById(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  async updateMe(@Req() req, @Body() dto: UpdateUserDto) {
    const userId = req.user.sub;
    return this.userService.update(userId, dto);
  }
}
