import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Artist } from '../artist/artist.model';
import { Album } from '../album/album.model';
import { Track } from '../track/track.model';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[];
}
