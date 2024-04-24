import { PrismaClient } from '@prisma/client';
import { clearDatabase, mockPlaceModelData } from '@test/utils/prisma.utils';
import { PrismaCountAllPlacesRepository } from 'src/infrastructure/place/repositories/count-all/prisma-count-all.place.repository';

describe('PrismaCountAll Place Repository', () => {
  let prismaCountAllPlaceRepository: PrismaCountAllPlacesRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    prismaCountAllPlaceRepository = new PrismaCountAllPlacesRepository(
      prismaClient,
    );
    // await prismaClient.place.create({ data: mockPlaceModelData() });
    await prismaClient.place.create({
      data: mockPlaceModelData({ name: 'copacabana', id: 'other_id' }),
    });
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should return the number of all places', async () => {
    const places = await prismaClient.place.findMany();
    const count = await prismaCountAllPlaceRepository.countAll();

    expect(count).toBe(places.length);
    expect(count).toBeGreaterThan(0);
  });

  it('should return 0 when there are no places', async () => {
    const count = await prismaCountAllPlaceRepository.countAll({
      name: 'not_found_name',
    });

    expect(count).toBe(0);
  });

  it('should return the count of only the filtered places', async () => {
    const places = await prismaClient.place.findMany();
    const count = await prismaCountAllPlaceRepository.countAll({
      name: 'copacaba',
    });

    expect(count).toBe(
      places.filter((place) => place.name.includes('copacaba')).length,
    );
  });
});
