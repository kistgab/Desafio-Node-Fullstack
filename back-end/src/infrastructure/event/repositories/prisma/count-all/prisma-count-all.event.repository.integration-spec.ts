import { EventType, PrismaClient } from '@prisma/client';
import { clearDatabase, mockPlaceModelData } from '@test/utils/prisma.utils';
import { PrismaCountAllEventsRepository } from 'src/infrastructure/event/repositories/prisma/count-all/prisma-count-all.event.repository';

describe('PrismaCountAll Event Repository', () => {
  let prismaCountAllEventRepository: PrismaCountAllEventsRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    prismaCountAllEventRepository = new PrismaCountAllEventsRepository(
      prismaClient,
    );
    await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
  });

  beforeEach(async () => {
    await prismaClient.event.deleteMany();
    await prismaClient.event.createMany({
      data: [
        {
          contact_email: 'contact_email',
          startDate: new Date('2023-03-05'),
          endDate: new Date('2023-03-06'),
          name: 'name',
          place_id: 'any_id',
          type: EventType.Presentation,
          contact_phone: 'contact_phone',
          id: 'id',
        },
        {
          contact_email: 'other_contact_email',
          startDate: new Date('2023-03-03'),
          endDate: new Date('2023-03-04'),
          name: 'other_name',
          place_id: 'any_id',
          type: EventType.Show,
          contact_phone: 'other_contact_phone',
          id: 'other_id',
        },
      ],
    });
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should return the number of all events', async () => {
    const events = await prismaClient.event.findMany();
    const count = await prismaCountAllEventRepository.countAll();

    expect(count).toBe(events.length);
  });

  it('should return 0 when there are no events', async () => {
    const count = await prismaCountAllEventRepository.countAll({
      name: 'not_found',
    });

    expect(count).toBe(0);
  });

  it('should return the count of only the filtered events', async () => {
    const events = await prismaClient.event.findMany();
    const count = await prismaCountAllEventRepository.countAll({
      name: 'nam',
    });

    expect(count).toBe(
      events.filter((event) => event.name.includes('name')).length,
    );
  });
});
