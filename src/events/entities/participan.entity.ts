import { UserEntity } from '@/users/enitites/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity({ name: 'participants' })
export class ParticipanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attandance: boolean;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  position: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.participants)
  user: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.participants)
  event: EventEntity;
}
