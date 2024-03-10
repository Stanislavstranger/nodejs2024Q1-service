import { AlbumService } from './album.service';
import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { TrackService } from '../track/track.service';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService, TrackService],
  exports: [],
})
export class AlbumModule {}
