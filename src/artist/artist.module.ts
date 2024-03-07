import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DBModule } from '../db/db.module';

@Module({
  imports: [DBModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [],
})
export class ArtistModule {}
