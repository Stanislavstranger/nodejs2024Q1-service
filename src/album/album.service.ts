import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumRepository.create({
      id: uuidv4(),
      ...createAlbumDto,
    });
    return await this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return await this.albumRepository.save(album);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Album not found');
    }
    return true;
  }

  async setAlbumArtistIdNull(artistId: string): Promise<void> {
    await this.albumRepository.update({ artistId }, { artistId: null });
  }
}
