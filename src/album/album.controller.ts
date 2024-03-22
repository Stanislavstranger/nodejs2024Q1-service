import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { Response } from 'express';
import { NOT_FOUND_ALBUM_ERROR } from './album.constants';
import { TrackService } from '../track/track.service';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      const newAlbum = await this.albumService.create(createAlbumDto);
      return newAlbum;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @HttpCode(200)
  @Get()
  async findAll() {
    try {
      const albums = await this.albumService.findAll();
      return albums;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Get(':id')
  async findOne(@Param('id', IdValidationPipe) id: string) {
    try {
      const album = await this.albumService.findOne(id);
      if (album !== undefined) {
        return album;
      }
      throw new NotFoundException(NOT_FOUND_ALBUM_ERROR);
    } catch (error) {
      throw new NotFoundException(NOT_FOUND_ALBUM_ERROR);
    }
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      const updatedAlbum = await this.albumService.update(id, updateAlbumDto);
      if (updatedAlbum === null) {
        throw new NotFoundException(NOT_FOUND_ALBUM_ERROR);
      }
      return updatedAlbum;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }

  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async remove(
    @Param('id', IdValidationPipe) id: string,
    @Res() res: Response,
  ) {
    await this.albumService.remove(id);
    res.status(HttpStatus.NO_CONTENT).end();
  }
}
