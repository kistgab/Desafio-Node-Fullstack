import { Prisma } from '@prisma/client';

export type PlaceWithoutEventModel = Prisma.PlaceGetPayload<{
  include: {
    place_address: true;
    entries: true;
    ticket_gates: true;
  };
}>;
