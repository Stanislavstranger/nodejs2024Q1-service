import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async findAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    return this.favoriteService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  async deleteTrackFromFavorites(@Param('id') id: string) {
    return this.favoriteService.deleteTrackFromFavorites(id);
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    return this.favoriteService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  async deleteAlbumFromFavorites(@Param('id') id: string) {
    return this.favoriteService.deleteAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    return this.favoriteService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  async deleteArtistFromFavorites(@Param('id') id: string) {
    return this.favoriteService.deleteArtistFromFavorites(id);
  }
}
