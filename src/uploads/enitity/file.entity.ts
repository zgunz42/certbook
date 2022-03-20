import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BucketEntity } from './bucket.entity';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  baseName: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  encoding: string;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => BucketEntity, (bucket) => bucket.files)
  bucket: BucketEntity;
}
