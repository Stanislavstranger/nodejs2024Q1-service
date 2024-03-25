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

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async findAll() {
    return this.favoriteService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('artist/:id')
  async addArtistToFavorites(@Param('id', IdValidationPipe) id: string) {
    const artist = await this.favoriteService.addArtistToFavorites(id);

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

  @UsePipes(new ValidationPipe())
  @Post('album/:id')
  async addAlbumToFavorites(@Param('id', IdValidationPipe) id: string) {
    const album = await this.favoriteService.addAlbumToFavorites(id);

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
  @Post('track/:id')
  async addTrackToFavorites(@Param('id', IdValidationPipe) id: string) {
    const track = await this.favoriteService.addTrackToFavorites(id);

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
}
