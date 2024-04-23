import {
  EventContact,
  EventDuration,
} from '@domain/event/entity/event-attributes';
import { EventEntity } from '@domain/event/entity/event.entity';
import { EventType } from '@domain/event/enums/event-type.enum';
import { PlaceEntity } from '@domain/place/entity/place.entity';

export class EventFactory {
  static create(props: EventEntityProps): EventEntity {
    return new EventEntity(
      props.id ?? crypto.randomUUID(),
      props.name,
      props.type,
      props.duration,
      props.place,
      props.contact,
    );
  }
}

export type EventEntityProps = {
  id?: string;
  name: string;
  type: EventType;
  duration: EventDuration;
  place: PlaceEntity;
  contact: EventContact;
  createdAt?: Date;
  updatedAt?: Date;
};
