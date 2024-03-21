import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './track.model';
import { DBService } from '../db/db.service';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DBService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const db = await this.dbService.getDb();
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    db.tracks.push(newTrack);
    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    const db = await this.dbService.getDb();
    return db.tracks;
  }

  async findOne(id: string): Promise<Track> {
    const db = await this.dbService.getDb();
    const track = db.tracks.find((track) => track.id === id);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const db = await this.dbService.getDb();
    const track = await this.findOne(id);
    const updatedTrack = {
      ...track,
      ...updateTrackDto,
      updatedAt: Date.now(),
    };
    const index = db.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      db.tracks[index] = updatedTrack;
      return updatedTrack;
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<boolean> {
    const db = await this.dbService.getDb();
    const index = db.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      db.tracks.splice(index, 1);
      return true;
    }
    return false;
  }

  async setTrackAlbumIdNull(albumId: string): Promise<void> {
    const db = await this.dbService.getDb();
    const index = db.tracks.findIndex((track) => track.albumId === albumId);
    if (index !== -1) {
      db.tracks[index].albumId = null;
    }
  }

  async setTrackArtistIdNull(artistId: string): Promise<void> {
    const db = await this.dbService.getDb();
    const index = db.tracks.findIndex((track) => track.artistId === artistId);
    if (index !== -1) {
      db.tracks[index].artistId = null;
    }
  }
}
