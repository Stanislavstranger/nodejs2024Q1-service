import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService, TrackService, AlbumService],
  exports: [],
})
export class ArtistModule {}
