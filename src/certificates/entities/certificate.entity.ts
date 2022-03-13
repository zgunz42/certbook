import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CertificateProperties } from '../interfaces/certificate-properties.interface';
import { PersonEntity } from './owner.entity';

@Entity({ name: 'certificates' })
export class CertificateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  templateFile: string;

  @Column({ type: 'json' })
  templateData: CertificateProperties;

  @Column({ nullable: true })
  certificateFile: string;

  @Column({ nullable: true })
  issueAt: Date;

  @Column(() => PersonEntity)
  owner: PersonEntity;

  @Column(() => PersonEntity)
  receiver: PersonEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
