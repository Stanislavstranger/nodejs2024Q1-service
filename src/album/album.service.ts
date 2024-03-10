import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumModel } from './album.model';
import { DBService } from '../db/db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DBService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumModel> {
    const db = await this.dbService.getDb();
    const newAlbum: AlbumModel = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    db.albums.push(newAlbum);
    return newAlbum;
  }

  async findAll(): Promise<AlbumModel[]> {
    const db = await this.dbService.getDb();
    return db.albums;
  }

  async findOne(id: string): Promise<AlbumModel> {
    const db = await this.dbService.getDb();
    const album = db.albums.find((album) => album.id === id);
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumModel> {
    const db = await this.dbService.getDb();
    const album = await this.findOne(id);
    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
      updatedAt: Date.now(),
    };
    const index = db.albums.findIndex((album) => album.id === id);
    db.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  async remove(id: string): Promise<boolean> {
    const db = await this.dbService.getDb();
    const index = db.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      db.albums.splice(index, 1);
      return true;
    }
    return false;
  }
}
