import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = new Track();
    newTrack.id = uuidv4();
    newTrack.name = createTrackDto.name;
    newTrack.albumId = createTrackDto.albumId;
    newTrack.artistId = createTrackDto.artistId;
    newTrack.duration = createTrackDto.duration;
    return await this.trackRepository.save(newTrack);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);
    track.name = updateTrackDto.name;
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;
    track.duration = updateTrackDto.duration;
    return await this.trackRepository.save(track);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Track not found');
    }
    return true;
  }

  async setTrackAlbumIdNull(albumId: string): Promise<void> {
    await this.trackRepository.update({ albumId }, { albumId: null });
  }

  async setTrackArtistIdNull(artistId: string): Promise<void> {
    await this.trackRepository.update({ artistId }, { artistId: null });
  }
}
