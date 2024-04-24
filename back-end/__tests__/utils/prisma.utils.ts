import { EventType, PlaceType, Prisma, PrismaClient } from '@prisma/client';

export function mockPlaceModelData(): Prisma.PlaceCreateInput {
  return {
    city: 'city',
    id: 'any_id',
    name: 'name',
    state: 'state',
    contact_email: 'contact_email',
    type: PlaceType.Stadium,
    cpnj: 'cpnj',
    createdAt: new Date(),
    contact_phone: 'contact_phone',
  };
}

export function mockEventModelData(): Prisma.EventCreateInput {
  return {
    contact_email: 'contact_email',
    contact_phone: 'contact_phone',
    endDate: new Date(),
    id: 'any_id',
    name: 'name',
    startDate: new Date(),
    type: EventType.Soccer,
    place: {
      connect: {
        id: 'any_id',
      },
    },
  };
}

export async function clearDatabase(prismaClient: PrismaClient): Promise<void> {
  await prismaClient.event.deleteMany();
  await prismaClient.place.deleteMany();
}
