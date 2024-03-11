import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UnprocessableEntityException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Controller('favs')
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  async findAll() {
    const favorites = this.favoriteService.findAll();

    const artistsData = [];
    for (const artist of favorites.artists) {
      const artistData = await this.artistService.findOne(artist);
      if (artistData) {
        artistsData.push(artistData);
      }
    }

    const albumsData = [];
    for (const album of favorites.albums) {
      const albumData = await this.albumService.findOne(album);
      if (albumData) {
        albumsData.push(albumData);
      }
    }

    const tracksData = [];
    for (const track of favorites.tracks) {
      const trackData = await this.trackService.findOne(track);
      if (trackData) {
        tracksData.push(trackData);
      }
    }

    const favoriteResponse = {
      artists: [...artistsData],
      albums: [...albumsData],
      tracks: [...tracksData],
    };

    return favoriteResponse;
  }

  @UsePipes(new ValidationPipe())
  @Post('track/:id')
  async addTrackToFavorites(@Param('id', IdValidationPipe) id: string) {
    await this.favoriteService.addTrackToFavorites(id);
    const track = await this.trackService.findOne(id);

    if (track === undefined) {
      throw new UnprocessableEntityException();
    }

    return track;
  }

  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  @Delete('track/:id')
  async deleteTrackFromFavorites(@Param('id', IdValidationPipe) id: string) {
    return this.favoriteService.deleteTrackFromFavorites(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('album/:id')
  async addAlbumToFavorites(@Param('id', IdValidationPipe) id: string) {
    this.favoriteService.addAlbumToFavorites(id);
    const album = await this.albumService.findOne(id);

    if (album === undefined) {
      throw new UnprocessableEntityException();
    }

    return album;
  }

  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  @Delete('album/:id')
  async deleteAlbumFromFavorites(@Param('id', IdValidationPipe) id: string) {
    return this.favoriteService.deleteAlbumFromFavorites(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('artist/:id')
  async addArtistToFavorites(@Param('id', IdValidationPipe) id: string) {
    this.favoriteService.addArtistToFavorites(id);
    const artist = await this.artistService.findOne(id);

    if (artist === undefined) {
      throw new UnprocessableEntityException();
    }

    return artist;
  }

  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  @Delete('artist/:id')
  async deleteArtistFromFavorites(@Param('id', IdValidationPipe) id: string) {
    return this.favoriteService.deleteArtistFromFavorites(id);
  }
}
