import { EventEntity } from '@domain/event/entity/event.entity';

export interface FindEventByIdRepository {
  findById(id: string): Promise<EventEntity | null>;
}
