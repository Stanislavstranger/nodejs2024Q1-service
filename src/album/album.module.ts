import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [],
  exports: [],
})
export class AlbumModule {}
