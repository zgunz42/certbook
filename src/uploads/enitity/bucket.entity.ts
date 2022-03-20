import { UserEntity } from '@/users/enitites/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileEntity } from './file.entity';

@Entity({ name: 'buckets' })
export class BucketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => UserEntity, (user) => user.bucket)
  owner: UserEntity;

  @OneToMany(() => FileEntity, (file) => file.bucket)
  files: File[];

  @ManyToOne(() => BucketEntity, (parentBucket) => parentBucket.child, {
    nullable: true,
  })
  parent: BucketEntity;

  @OneToMany(() => BucketEntity, (childBucket) => childBucket.parent)
  child: BucketEntity[];
}
