import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../artist/artist.model';
import { Album } from '../album/album.model';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, { nullable: true })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;

  @Column()
  duration: number;
}
