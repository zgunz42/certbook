import { UserEntity } from '@/users/enitites/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventStatus } from '../models/event-status';
import { ParticipanEntity } from './participan.entity';

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.PENDING,
  })
  status: EventStatus;

  @Column()
  image: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @Column()
  price: string;

  @Column()
  capacity: string;

  @ManyToOne(() => UserEntity, (user) => user.events)
  author: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ParticipanEntity, (participan) => participan.event)
  participants: ParticipanEntity[];
}
