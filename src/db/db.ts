import { AlbumModel } from '../album/album.model';
import { ArtistModel } from '../artist/artist.model';
import { FavoriteModel } from '../favorite/favorite.model';
import { TrackModel } from '../track/track.model';
import { UserModel } from '../user/user.model';

export interface DB {
  users: UserModel[];
  tracks: TrackModel[];
  artists: ArtistModel[];
  albums: AlbumModel[];
  favorites: FavoriteModel[];
}

const db: DB = {
  users: [],
  tracks: [],
  artists: [],
  albums: [],
  favorites: [],
};

export default db;
