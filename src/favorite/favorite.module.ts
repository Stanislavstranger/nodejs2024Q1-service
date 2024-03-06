import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';

@Module({
  imports: [],
  controllers: [FavoriteController],
  providers: [],
  exports: [],
})
export class FavoriteModule {}
