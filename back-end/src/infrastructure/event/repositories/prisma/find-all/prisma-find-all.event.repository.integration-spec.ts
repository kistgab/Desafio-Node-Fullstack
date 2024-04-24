import { PrismaClient } from '@prisma/client';
import {
  clearDatabase,
  mockManyEventModelData,
  mockPlaceModelData,
} from '@test/utils/prisma.utils';
import { PrismaFindAllEventsRepository } from 'src/infrastructure/event/repositories/prisma/find-all/prisma-find-all.event.repository';

describe('PrismaFindAll Event Repository', () => {
  let prismaFindAllEventRepository: PrismaFindAllEventsRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await clearDatabase(prismaClient);
    await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
    await prismaClient.event.createMany({
      data: mockManyEventModelData([
        { id: 'any_id', name: 'any_name' },
        { id: 'other_id', name: 'other_name' },
        { id: 'another_id', name: 'another_name' },
      ]),
    });
    prismaFindAllEventRepository = new PrismaFindAllEventsRepository(
      prismaClient,
    );
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should findAll Events from database when there are no filters', async () => {
    const result = await prismaFindAllEventRepository.findAll({
      page: 1,
      take: 10,
    });

    const totalEventsCount = await prismaClient.event.count();

    expect(result.length).toBe(totalEventsCount);
  });

  it('should findAll Events that match the filters', async () => {
    const result = await prismaFindAllEventRepository.findAll({
      page: 1,
      take: 10,
      filters: { name: 'any_na' },
    });

    const totalEventsCount = await prismaClient.event.count({
      where: { name: { contains: 'any_na' } },
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBe(totalEventsCount);
  });
});
