import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [],
  exports: [],
})
export class ArtistModule {}
