import { CertificatePresetEntity } from '@/certificates/entities/certificate-preset.entity';
import { SignEntity } from '@/certificates/entities/sign.entity';
import { EventEntity } from '@/events/entities/event.entity';
import { ParticipanEntity } from '@/events/entities/participan.entity';
import { BucketEntity } from '@/uploads/enitity/bucket.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ParticipanEntity, (participan) => participan.user)
  participants: ParticipanEntity[];

  @OneToMany(() => EventEntity, (event) => event.author)
  events: EventEntity[];

  @OneToOne(() => BucketEntity, (bucket) => bucket.owner)
  @JoinColumn()
  bucket: BucketEntity;

  @OneToMany(
    () => CertificatePresetEntity,
    (certificatePreset) => certificatePreset.publisher,
  )
  certificatePresets: CertificatePresetEntity[];

  @OneToOne(() => SignEntity, (sign) => sign.person)
  signs: SignEntity;
}
