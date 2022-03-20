import { FileEntity } from '@/uploads/enitity/file.entity';
import { UserEntity } from '@/users/enitites/user.entity';
import {
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CertificateEntity } from './certificate.entity';

export class SignEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  file: FileEntity;

  @UpdateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CertificateEntity, (certificate) => certificate.signer)
  documents: CertificateEntity[];

  @OneToOne(() => UserEntity, (user) => user.signs)
  @JoinColumn()
  person: any;
}
