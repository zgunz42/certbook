import { ParticipanEntity } from '@/events/entities/participan.entity';
import { FileEntity } from '@/uploads/enitity/file.entity';
import { UserEntity } from '@/users/enitites/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SignEntity } from './sign.entity';

@Entity({ name: 'certificates' })
export class CertificateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  serialNumber: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  file: File;

  @Column({ nullable: true })
  issueAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => SignEntity, (sign) => sign.documents)
  signer: SignEntity;

  @OneToOne(() => ParticipanEntity)
  @JoinColumn()
  receiver: ParticipanEntity;
}
