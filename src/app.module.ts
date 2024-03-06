import { FavoriteModule } from './favorite/favorite.module';
import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [FavoriteModule, AlbumModule, ArtistModule, TrackModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
