import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
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
    // console.log(favorites);
    return favorites;
  }

  @UsePipes(new ValidationPipe())
  @Post('track/:id')
  async addTrackToFavorites(@Param('id', IdValidationPipe) id: string) {
    await this.favoriteService.addTrackToFavorites(id);
    const track = await this.trackService.findOne(id);
    console.log(track);
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
    return await this.albumService.findOne(id);
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
    return await this.artistService.findOne(id);
  }

  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  @Delete('artist/:id')
  async deleteArtistFromFavorites(@Param('id', IdValidationPipe) id: string) {
    return this.favoriteService.deleteArtistFromFavorites(id);
  }
}
