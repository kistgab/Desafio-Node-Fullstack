import { EventEntity } from '@domain/event/entity/event.entity';

export interface UpdateEventRepository {
  update(event: EventEntity): Promise<void>;
}
