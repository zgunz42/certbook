import { UserEntity } from '@/users/enitites/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { ParticipanEntity } from '../entities/participan.entity';

@Injectable()
export class ParticipanRepository {
  constructor(
    @InjectRepository(ParticipanEntity)
    private readonly db: Repository<ParticipanEntity>,
  ) {}

  findAll(): Promise<ParticipanEntity[]> {
    return this.db.find();
  }

  findOne(id: number): Promise<ParticipanEntity> {
    return this.db.findOne(id);
  }

  async create(
    createParticipanDto: ParticipanEntity,
  ): Promise<ParticipanEntity> {
    const participan = this.db.create({
      ...createParticipanDto,
    });

    return this.db.save(participan);
  }

  async update(
    id: number,
    updateParticipanDto: ParticipanEntity,
  ): Promise<ParticipanEntity> {
    const result = await this.db.update(id, updateParticipanDto);
    if (result.affected === 0) {
      throw new Error('Participan not found');
    }
    return this.db.findOne(id);
  }

  async delete(id: number): Promise<ParticipanEntity> {
    const result = await this.db.delete(id);
    if (result.affected === 0) {
      throw new Error('Participan not found');
    }
    return this.db.findOne(id);
  }

  async joinEvent(
    user: UserEntity,
    event: EventEntity,
  ): Promise<ParticipanEntity> {
    const participan = new ParticipanEntity();
    participan.user = user;
    participan.event = event;
    // fill more field

    return this.db.save(participan);
  }
}
