import { FavoriteModule } from './favorite/favorite.module';
import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './config/data-source.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FavoriteModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    UserModule,
    TypeOrmModule.forRoot(dataSourceConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
