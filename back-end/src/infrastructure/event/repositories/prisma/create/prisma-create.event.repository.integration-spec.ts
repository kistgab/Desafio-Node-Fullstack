import { PrismaClient } from '@prisma/client';
import { mockEventEntity } from '@test/utils/event.utils';
import { mockPlaceModelData } from '@test/utils/prisma.utils';
import { beforeEach } from 'node:test';
import { PrismaCreateEventRepository } from 'src/infrastructure/event/repositories/prisma/create/prisma-create.event.repository';

describe('PrismaCreate Event Repository', () => {
  let prismaCreateEventRepository: PrismaCreateEventRepository;
  let prismaClient: PrismaClient;

  async function clearDatabase(): Promise<void> {
    await prismaClient.event.deleteMany();
    await prismaClient.place.deleteMany();
  }

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await clearDatabase();
    await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
    prismaCreateEventRepository = new PrismaCreateEventRepository(prismaClient);
  });

  beforeEach(async () => {
    await prismaClient.event.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
    await clearDatabase();
  });

  it('should create the Event in database', async () => {
    const eventToAdd = mockEventEntity();
    await prismaCreateEventRepository.create(eventToAdd);
    const wasEventInserted =
      (await prismaClient.event.count({ where: { id: eventToAdd.id } })) > 0;
    expect(wasEventInserted).toBeTruthy();
  });
});
