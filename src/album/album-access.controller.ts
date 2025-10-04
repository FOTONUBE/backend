import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AlbumAccessService } from './album-access.service';

@Controller('album-access')
export class AlbumAccessController {
  constructor(private readonly albumAccessService: AlbumAccessService) {}

  @UseGuards(AuthGuard)
  @Post('/grant')
  async grantAccess(
    @Body() body: { userEvent: string; passwordEvent: string },
    @Request() req: any,
  ) {
    const userId = req.user.sub;
    return this.albumAccessService.grantAccess(
      userId,
      body.userEvent,
      body.passwordEvent,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/:albumId')
  async getAlbum(@Param('albumId') albumId: string, @Request() req: any) {
    const userId = req.user.sub;
    return await this.albumAccessService.getAlbumById(userId, albumId);
  }
}
