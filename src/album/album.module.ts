import { AlbumService } from './album.service';
import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { DBModule } from '../db/db.module';

@Module({
  imports: [DBModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [],
})
export class AlbumModule {}
