import { EventEntity } from '@domain/event/entity/event.entity';
import { EventType } from '@domain/event/enums/event-type.enum';
import {
  EventEntityProps,
  EventFactory,
} from '@domain/event/factory/event.factory';
import { mockPlaceEntity } from '@test/utils/place.utils';

export function mockEventEntityProps(
  props?: Partial<EventEntityProps>,
): EventEntityProps {
  return {
    id: props?.id ?? 'any_id',
    name: props?.name ?? 'any_name',
    type: props?.type ?? EventType.Other,
    duration: props?.duration ?? {
      startsAt: new Date('2021-01-01'),
      endsAt: new Date('2021-01-02'),
    },
    place: props?.place ?? mockPlaceEntity(),
    contact: props?.contact ?? {
      phone: 'any_phone',
      email: 'any_email',
    },
  };
}

export function mockEventEntity(
  props?: Partial<EventEntityProps>,
): EventEntity {
  return EventFactory.create(mockEventEntityProps(props));
}
