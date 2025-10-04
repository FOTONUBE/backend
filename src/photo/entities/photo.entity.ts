import { Album } from 'src/album/entities/album.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column('float')
  sizeMb: number;

  @Column()
  publicId: string;

  @Column()
  urlWeb: string;

  @Column()
  urlThumbnail: string;

  @ManyToOne(() => Album, (album) => album.photos, {
    // Sirve para que al borrar un álbum, se borren sus fotos en cascada
    onDelete: 'CASCADE',
  })
  album: Album;
}
