import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { DBModule } from '../db/db.module';

@Module({
  imports: [DBModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [],
})
export class TrackModule {}
