import { PrismaClient } from '@prisma/client';
import { clearDatabase, mockPlaceModelData } from '@test/utils/prisma.utils';
import { PrismaDeletePlaceRepository } from 'src/infrastructure/place/repositories/prisma/delete/prisma-delete.place.repository';

describe('PrismaDelete Place Repository', () => {
  let prismaDeletePlaceRepository: PrismaDeletePlaceRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await clearDatabase(prismaClient);
    await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
    prismaDeletePlaceRepository = new PrismaDeletePlaceRepository(prismaClient);
  });

  beforeEach(async () => {
    await prismaClient.place.deleteMany();
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should delete the Place from database', async () => {
    const insertedPlace = await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
    await prismaDeletePlaceRepository.delete(insertedPlace.id);

    const wasPlaceDeleted =
      (await prismaClient.place.count({ where: { id: insertedPlace.id } })) ===
      0;
    expect(wasPlaceDeleted).toBeTruthy();
  });
});
