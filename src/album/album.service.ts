import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumModel } from './album.model';
import { DBService } from '../db/db.service';
import { NOT_FOUND_ALBUM_ERROR } from './album.constants';

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
    if (!album) {
      throw new NotFoundException(NOT_FOUND_ALBUM_ERROR);
    }
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

  async remove(id: string): Promise<void> {
    const db = await this.dbService.getDb();
    const index = db.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException(NOT_FOUND_ALBUM_ERROR);
    }
    db.albums.splice(index, 1);
  }

  async validateId(id: string): Promise<boolean> {
    return validate(id);
  }
}
