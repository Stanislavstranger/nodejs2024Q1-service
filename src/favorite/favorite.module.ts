import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';
import { Track } from 'src/track/track.entity';
import { Favorite } from './favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Artist, Album, Track])],
  controllers: [FavoriteController],
  providers: [FavoriteService, TrackService, AlbumService, ArtistService],
  exports: [],
})
export class FavoriteModule {}
