import { EventType } from '@domain/event/enums/event-type.enum';
import { PlaceAddress } from '@domain/place/entity/place-attributes';

export type OutputListEventDto = {
  id: string;
  name: string;
  type: EventType;
  place: {
    id: string;
    name: string;
    address: PlaceAddress;
    entries: string[];
  };
  duration: {
    startsAt: Date;
    endsAt: Date;
  };
};
