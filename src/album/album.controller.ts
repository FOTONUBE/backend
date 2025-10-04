import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto, @Req() req: any) {
    const userId = req.user.sub;
    return this.albumService.create(createAlbumDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @Req() req: any) {
    const userId = req.user.sub;
    return this.albumService.findAll(paginationDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get(':term')
  async findOne(@Param('term') term: string, @Req() req: any) {
    // console.log('Term recibido:', term);

    const userId = req.user.sub;
    return this.albumService.findOne(term, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return this.albumService.update(id, updateAlbumDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.albumService.remove(id, userId);
  }
}
