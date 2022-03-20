import { UserEntity } from '@/users/enitites/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CertificateProperties } from '../interfaces/certificate-properties.interface';

@Entity()
export class CertificatePresetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  metadata: CertificateProperties;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  thumbnail?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.certificatePresets)
  publisher: UserEntity;
}
