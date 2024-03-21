import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './artist.model';
import { DBService } from '../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DBService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const db = await this.dbService.getDb();
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    db.artists.push(newArtist);
    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    const db = await this.dbService.getDb();
    return db.artists;
  }

  async findOne(id: string): Promise<Artist> {
    const db = await this.dbService.getDb();
    const artist = db.artists.find((artist) => artist.id === id);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const db = await this.dbService.getDb();
    const artist = await this.findOne(id);
    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
      updatedAt: Date.now(),
    };
    const index = db.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      db.artists[index] = updatedArtist;
      return updatedArtist;
    }
    throw new NotFoundException();
  }

  async remove(id: string): Promise<boolean> {
    const db = await this.dbService.getDb();
    const index = db.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      db.artists.splice(index, 1);
      return true;
    }
    return false;
  }
}
