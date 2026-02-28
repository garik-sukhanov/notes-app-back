import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { NoteEntity } from './note.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column({ type: 'text', array: true, default: ['user'] })
  roles: string[];

  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;

  @Column()
  password: string;

  @OneToMany(() => NoteEntity, (note) => note.user)
  notes: NoteEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
