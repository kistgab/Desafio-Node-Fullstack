import { EventType, PlaceType, Prisma, PrismaClient } from '@prisma/client';

export function mockPlaceModelData(): Prisma.PlaceCreateInput {
  return {
    id: 'any_id',
    name: 'name',
    contact_email: 'contact_email',
    type: PlaceType.Stadium,
    cpnj: 'cpnj',
    created_at: new Date(),
    updated_at: new Date(),
    nickname: 'nickname',
    contact_phone: 'contact_phone',
    entries: {
      createMany: {
        data: [
          { name: 'entry', id: 'any_id' },
          { name: 'entry2', id: 'any_other_id' },
          { name: 'entry3', id: 'any_another_id' },
        ],
      },
    },
    ticket_gates: {
      createMany: {
        data: [
          { name: 'gate', id: 'any_id' },
          { name: 'gate2', id: 'any_other_id' },
          { name: 'gate3', id: 'any_another_id' },
        ],
      },
    },
    place_address: {
      create: {
        address: 'address',
        city: 'city',
        state: 'state',
        zip_code: 'zip_code',
        complement: 'complement',
        id: 'any_id',
      },
    },
  };
}

export function mockEventModelData(props?: {
  id: string;
  name: string;
}): Prisma.EventCreateInput {
  return {
    contact_email: 'contact_email',
    contact_phone: 'contact_phone',
    endDate: new Date(),
    id: props?.id ?? 'any_id',
    name: props?.name ?? 'name',
    startDate: new Date(),
    type: EventType.Soccer,
    place: {
      connect: {
        id: 'any_id',
      },
    },
  };
}

type MockManyEventModelDataArgs = {
  id: string;
  name: string;
};

export function mockManyEventModelData(
  props: MockManyEventModelDataArgs[],
): Prisma.EventCreateManyInput[] {
  return props.map((props) => {
    return {
      contact_email: 'contact_email',
      contact_phone: 'contact_phone',
      created_at: new Date(),
      updated_at: new Date(),
      endDate: new Date(),
      id: props?.id ?? 'any_id',
      name: props?.name ?? 'name',
      startDate: new Date(),
      type: EventType.Soccer,
      place_id: 'any_id',
    };
  });
}

export async function clearDatabase(prismaClient: PrismaClient): Promise<void> {
  await prismaClient.event.deleteMany();
  await prismaClient.placeAddress.deleteMany();
  await prismaClient.ticketGate.deleteMany();
  await prismaClient.entry.deleteMany();
  await prismaClient.place.deleteMany();
}
