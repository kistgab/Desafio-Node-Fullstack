import { Prisma } from '@prisma/client';

export type EventWithPlace = Prisma.EventGetPayload<{
  include: {
    place: {
      include: {
        place_address: true;
        entries: true;
        ticket_gates: true;
      };
    };
  };
}>;
