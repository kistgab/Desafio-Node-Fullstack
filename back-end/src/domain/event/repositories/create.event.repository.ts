import { EventEntity } from '@domain/event/entity/event.entity';

export interface CreateEventRepository {
  create(event: EventEntity): Promise<void>;
}
