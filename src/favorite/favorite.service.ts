import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly repository: Repository<Favorite>,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  private async getOrCreateDefaultFavorites() {
    try {
      return await this.repository.findOneOrFail({
        where: {
          id: Not(IsNull()),
        },
        relations: {
          artists: true,
          albums: true,
          tracks: true,
        },
      });
    } catch (e) {
      return Favorite.create();
    }
  }

  async findAll() {
    return this.getOrCreateDefaultFavorites();
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    const artist = await this.artistService.findOne(artistId);
    const favorites = await this.getOrCreateDefaultFavorites();

    favorites.addArtist(artist);

    await this.repository.save(favorites);
  }

  async deleteArtistFromFavorites(artistId: string): Promise<void> {
    const favorites = await this.getOrCreateDefaultFavorites();

    if (!favorites.removeArtist(artistId)) {
      throw new NotFoundException('Artist not found in favorites');
    }

    await this.repository.save(favorites);
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    const album = await this.albumService.findOne(albumId);
    const favorites = await this.getOrCreateDefaultFavorites();

    favorites.addAlbum(album);
    await this.repository.save(favorites);
  }

  async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    const favorites = await this.getOrCreateDefaultFavorites();

    if (!favorites.removeAlbum(albumId)) {
      throw new NotFoundException('Album not found in favorites');
    }

    await this.repository.save(favorites);
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    const track = await this.trackService.findOne(trackId);
    const favorites = await this.getOrCreateDefaultFavorites();

    favorites.addTrack(track);

    await this.repository.save(favorites);
  }

  async deleteTrackFromFavorites(trackId: string): Promise<void> {
    const favorites = await this.getOrCreateDefaultFavorites();

    if (!favorites.removeTrack(trackId)) {
      throw new NotFoundException('Track not found in favorites');
    }

    await this.repository.save(favorites);
  }
}
