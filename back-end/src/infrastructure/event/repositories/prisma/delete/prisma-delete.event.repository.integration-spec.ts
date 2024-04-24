import { PrismaClient } from '@prisma/client';
import {
  clearDatabase,
  mockEventModelData,
  mockPlaceModelData,
} from '@test/utils/prisma.utils';
import { PrismaDeleteEventRepository } from 'src/infrastructure/event/repositories/prisma/delete/prisma-delete.event.repository';

describe('PrismaDelete Event Repository', () => {
  let prismaDeleteEventRepository: PrismaDeleteEventRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await clearDatabase(prismaClient);
    await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
    prismaDeleteEventRepository = new PrismaDeleteEventRepository(prismaClient);
  });

  beforeEach(async () => {
    await prismaClient.event.deleteMany();
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should delete the Event from database', async () => {
    const insertedEvent = await prismaClient.event.create({
      data: mockEventModelData(),
    });
    await prismaDeleteEventRepository.delete(insertedEvent.id);

    const wasEventDeleted =
      (await prismaClient.event.count({ where: { id: insertedEvent.id } })) ===
      0;
    expect(wasEventDeleted).toBeTruthy();
  });
});
