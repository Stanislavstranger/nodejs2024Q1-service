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

@Module({
  imports: [
    ConfigModule.forRoot(),
    FavoriteModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST || 'postgres',
      port: +process.env.TYPEORM_PORT || 5432,
      username: process.env.TYPEORM_USERNAME || 'user',
      password: process.env.TYPEORM_PASSWORD || 'password',
      database: process.env.TYPEORM_DATABASE || 'database',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
