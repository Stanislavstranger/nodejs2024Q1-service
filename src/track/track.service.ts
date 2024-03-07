import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackModel } from './track.model';
import { DbService } from '../db/db.service';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DbService) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackModel> {
    const db = await this.dbService.getDb();
    const newTrack: TrackModel = {
      id: uuidv4(),
      ...createTrackDto,
    };
    db.tracks.push(newTrack);
    return newTrack;
  }

  async findAll(): Promise<TrackModel[]> {
    const db = await this.dbService.getDb();
    return db.tracks;
  }

  async findOne(id: string): Promise<TrackModel> {
    const db = await this.dbService.getDb();
    const track = db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackModel> {
    const db = await this.dbService.getDb();
    const track = await this.findOne(id);
    const updatedTrack = {
      ...track,
      ...updateTrackDto,
      updatedAt: Date.now(),
    };
    const index = db.tracks.findIndex((track) => track.id === id);
    db.tracks[index] = updatedTrack;
    return updatedTrack;
  }

  async remove(id: string): Promise<void> {
    const db = await this.dbService.getDb();
    const index = db.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException('Track not found');
    }
    db.tracks.splice(index, 1);
  }

  async validateId(id: string): Promise<boolean> {
    return validate(id);
  }
}
