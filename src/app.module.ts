import { FavoritesModule } from './favorites/favorites.module';
import { Module } from '@nestjs/common';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    FavoritesModule,
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
