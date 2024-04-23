import { EventType } from '@domain/event/enums/event-type.enum';
import { PlaceEntity } from '@domain/place/entity/place.entity';

export class EventEntity {
  constructor(
    private id: string,
    private name: string,
    private type: EventType,
    private date: Date,
    private place: PlaceEntity,
    private contact: { phone?: string; email: string },
  ) {}
}
