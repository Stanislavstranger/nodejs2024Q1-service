import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistModel } from './artist.model';
import { DbService } from '../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistModel> {
    const db = await this.dbService.getDb();
    const newArtist: ArtistModel = {
      id: uuidv4(),
      ...createArtistDto,
    };
    db.artists.push(newArtist);
    return newArtist;
  }

  async findAll(): Promise<ArtistModel[]> {
    const db = await this.dbService.getDb();
    return db.artists;
  }

  async findOne(id: string): Promise<ArtistModel> {
    const db = await this.dbService.getDb();
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistModel> {
    const db = await this.dbService.getDb();
    const artist = await this.findOne(id);
    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
      updatedAt: Date.now(),
    };
    const index = db.artists.findIndex((artist) => artist.id === id);
    db.artists[index] = updatedArtist;
    return updatedArtist;
  }

  async remove(id: string): Promise<void> {
    const db = await this.dbService.getDb();
    const index = db.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }
    db.artists.splice(index, 1);
  }
}
