import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trackService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trackService.remove(+id);
  }
}
