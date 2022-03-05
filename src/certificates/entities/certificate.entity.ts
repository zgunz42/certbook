import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CertificateProperties } from '../interfaces/certificate-properties.interface';
import { Person } from './owner.entity';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'template_file',
  })
  templateFile: string;

  @Column({
    type: 'json',
    name: 'template_data',
  })
  templateData: CertificateProperties;

  @Column({
    name: 'certificate_file',
  })
  certificateFile: string;

  @Column({ nullable: true, name: 'issue_at' })
  issueAt: Date;

  @Column(() => Person)
  owner: Person;

  @Column(() => Person)
  receiver: Person;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
