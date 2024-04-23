import { EventType } from '@domain/event/enums/event-type.enum';

export type InputCreateEventDto = {
  name: string;
  type: EventType;
  duration: {
    startsAt: Date;
    endsAt: Date;
  };
  placeId: string;
  contact: {
    phone?: string;
    email: string;
  };
};

export type OutputCreateEventDto = {
  id: string;
};
