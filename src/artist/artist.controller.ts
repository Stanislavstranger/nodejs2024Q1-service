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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from './artist.service';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { NOT_FOUND_ARTIST_ERROR } from './artist.constants';
import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    try {
      const newArtist = await this.artistService.create(createArtistDto);
      return newArtist;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @HttpCode(200)
  @Get()
  async findAll() {
    try {
      const artists = await this.artistService.findAll();
      return artists;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Get(':id')
  async findOne(@Param('id', IdValidationPipe) id: string) {
    try {
      const artist = await this.artistService.findOne(id);
      if (!artist) {
        throw new NotFoundException(`Artist with id ${id} not found`);
      }
      return artist;
    } catch (error) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      const updatedArtist = await this.artistService.update(
        id,
        updateArtistDto,
      );
      return updatedArtist;
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
    const deleted = await this.artistService.remove(id);
    if (!deleted) throw new NotFoundException(NOT_FOUND_ARTIST_ERROR);
    res.status(HttpStatus.NO_CONTENT).end();
  }
}
