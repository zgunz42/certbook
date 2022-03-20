import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';

export class EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly db: Repository<EventEntity>,
  ) {}

  findAll(): Promise<EventEntity[]> {
    return this.db.find();
  }

  findOne(id: number): Promise<EventEntity> {
    return this.db.findOne(id);
  }

  async create(createEventDto: EventEntity): Promise<EventEntity> {
    const event = this.db.create({
      ...createEventDto,
    });

    return this.db.save(event);
  }

  async update(id: number, updateEventDto: EventEntity): Promise<EventEntity> {
    const result = await this.db.update(id, updateEventDto);
    if (result.affected === 0) {
      throw new Error('Event not found');
    }
    return this.db.findOne(id);
  }

  async delete(id: number): Promise<EventEntity> {
    const result = await this.db.delete(id);
    if (result.affected === 0) {
      throw new Error('Event not found');
    }
    return this.db.findOne(id);
  }
}
