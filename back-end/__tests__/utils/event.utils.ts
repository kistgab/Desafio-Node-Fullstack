import { EventType } from '@domain/event/enums/event-type.enum';
import { EventEntityProps } from '@domain/event/factory/event.factory';
import { mockPlaceEntity } from '@test/utils/place.utils';

export function mockEventEntityProps(): EventEntityProps {
  return {
    id: 'any_id',
    name: 'any_name',
    type: EventType.Other,
    date: new Date('2021-01-01'),
    place: mockPlaceEntity(),
    contact: {
      phone: 'any_phone',
      email: 'any_email',
    },
  };
}
