import { AlbumService } from './album.service';
import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [],
})
export class AlbumModule {}
