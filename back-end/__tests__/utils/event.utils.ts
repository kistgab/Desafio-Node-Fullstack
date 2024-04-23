import { EventEntity } from '@domain/event/entity/event.entity';
import { EventType } from '@domain/event/enums/event-type.enum';
import {
  EventEntityProps,
  EventFactory,
} from '@domain/event/factory/event.factory';
import { mockPlaceEntity } from '@test/utils/place.utils';

export function mockEventEntityProps(): EventEntityProps {
  return {
    id: 'any_id',
    name: 'any_name',
    type: EventType.Other,
    duration: {
      startsAt: new Date('2021-01-01'),
      endsAt: new Date('2021-01-02'),
    },
    place: mockPlaceEntity(),
    contact: {
      phone: 'any_phone',
      email: 'any_email',
    },
  };
}

export function mockEventEntity(): EventEntity {
  return EventFactory.create(mockEventEntityProps());
}
