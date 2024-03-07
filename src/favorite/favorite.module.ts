import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { DBModule } from '../db/db.module';

@Module({
  imports: [DBModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [],
})
export class FavoriteModule {}
