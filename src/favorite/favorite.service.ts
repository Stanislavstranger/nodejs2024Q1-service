import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  private favoriteArtists: Set<string> = new Set();
  private favoriteAlbums: Set<string> = new Set();
  private favoriteTracks: Set<string> = new Set();

  findAll(): { artists: string[]; albums: string[]; tracks: string[] } {
    return {
      artists: Array.from(this.favoriteArtists),
      albums: Array.from(this.favoriteAlbums),
      tracks: Array.from(this.favoriteTracks),
    };
  }

  addArtistToFavorites(artistId: string): void {
    this.favoriteArtists.add(artistId);
  }

  deleteArtistFromFavorites(artistId: string): void {
    if (!this.favoriteArtists.has(artistId)) {
      throw new NotFoundException('Artist not found in favorites');
    }
    this.favoriteArtists.delete(artistId);
  }

  addAlbumToFavorites(albumId: string): void {
    this.favoriteAlbums.add(albumId);
  }

  deleteAlbumFromFavorites(albumId: string): void {
    if (!this.favoriteAlbums.has(albumId)) {
      throw new NotFoundException('Album not found in favorites');
    }
    this.favoriteAlbums.delete(albumId);
  }

  addTrackToFavorites(trackId: string): void {
    this.favoriteTracks.add(trackId);
  }

  deleteTrackFromFavorites(trackId: string): void {
    if (!this.favoriteTracks.has(trackId)) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.favoriteTracks.delete(trackId);
  }
}
