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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { NOT_FOUND_TRACK_ERROR } from './track.constants';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    try {
      const newTrack = await this.trackService.create(createTrackDto);
      return newTrack;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @HttpCode(200)
  @Get()
  async findAll() {
    try {
      const tracks = await this.trackService.findAll();
      return tracks;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Get(':id')
  async findOne(@Param('id', IdValidationPipe) id: string) {
    try {
      const track = await this.trackService.findOne(id);
      if (!track) {
        throw new NotFoundException(NOT_FOUND_TRACK_ERROR);
      }
      return track;
    } catch (error) {
      throw new NotFoundException(NOT_FOUND_TRACK_ERROR);
    }
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      const updatedTrack = await this.trackService.update(id, updateTrackDto);
      return updatedTrack;
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
    const deleted = await this.trackService.remove(id);
    if (!deleted) throw new NotFoundException(NOT_FOUND_TRACK_ERROR);
    res.status(HttpStatus.NO_CONTENT).end();
  }
}
