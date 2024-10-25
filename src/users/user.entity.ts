import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlists/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Jane',
    description: 'User first name',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'jane_doe@gmail.com',
    description: 'User email address',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'User password',
  })
  @Column()
  @Exclude() // Это поле будет исключено из ответа, но его можно задокументировать
  password: string;

  @ApiProperty({
    nullable: true,
    description: 'User two-factor authentication secret',
  })
  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @ApiProperty({
    default: false,
    description: 'Indicates if two-factor authentication is enabled',
  })
  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @ApiProperty({ description: 'API key for the user' })
  @Column()
  apiKey: string;

  @ApiProperty({ type: [Playlist], description: 'List of user playlists' })
  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];
}
