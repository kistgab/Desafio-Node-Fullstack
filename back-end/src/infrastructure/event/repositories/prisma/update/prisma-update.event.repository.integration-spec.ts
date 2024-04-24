import { EventType } from '@domain/event/enums/event-type.enum';
import { PrismaClient } from '@prisma/client';
import { mockEventEntity } from '@test/utils/event.utils';
import {
  clearDatabase,
  mockEventModelData,
  mockPlaceModelData,
} from '@test/utils/prisma.utils';
import { PrismaUpdateEventRepository } from 'src/infrastructure/event/repositories/prisma/update/prisma-update.event.repository';

describe('PrismaCountAll Event Repository', () => {
  let prismaUpdateEventRepository: PrismaUpdateEventRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    prismaUpdateEventRepository = new PrismaUpdateEventRepository(prismaClient);
    jest.setSystemTime(new Date('2023-04-23'));
  });

  beforeEach(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.place.create({ data: mockPlaceModelData() });
    await prismaClient.event.create({
      data: mockEventModelData(),
    });
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
    jest.useRealTimers();
  });

  it('should update the event', async () => {
    const event = mockEventEntity({
      contact: { email: 'new_email', phone: 'new_phone' },
      name: 'new_name',
      duration: {
        startsAt: new Date('2024-01-01'),
        endsAt: new Date('2024-01-01'),
      },
      type: EventType.Show,
    });

    await prismaUpdateEventRepository.update(event);

    const eventInDb = (await prismaClient.event.findUnique({
      where: { id: event.id },
    }))!;
    expect(eventInDb).toEqual({
      id: event.id,
      name: event.name,
      place_id: event.place.id,
      startDate: event.duration.startsAt,
      endDate: event.duration.endsAt,
      type: event.type,
      contact_phone: event.contact.phone,
      contact_email: event.contact.email,
      created_at: eventInDb.created_at,
      updated_at: eventInDb.updated_at,
    });
  });
});
