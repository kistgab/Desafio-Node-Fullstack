import { PrismaClient } from '@prisma/client';
import { clearDatabase, mockPlaceModelData } from '@test/utils/prisma.utils';
import { PrismaFindAllPlacesRepository } from 'src/infrastructure/place/repositories/prisma/find-all/prisma-find-all.place.repository';

describe('PrismaFindAll Place Repository', () => {
  let prismaFindAllPlaceRepository: PrismaFindAllPlacesRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await clearDatabase(prismaClient);
    await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
    await prismaClient.place.create({
      data: mockPlaceModelData({
        name: 'other_name',
        id: 'other_id',
        addressId: 'other_id',
        nickname: 'copacabana',
      }),
    });
    await prismaClient.place.create({
      data: mockPlaceModelData({
        name: 'another_name',
        id: 'another_id',
        addressId: 'another_id',
      }),
    });
    prismaFindAllPlaceRepository = new PrismaFindAllPlacesRepository(
      prismaClient,
    );
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should findAll Places from database when there are no filters', async () => {
    const result = await prismaFindAllPlaceRepository.findAll({
      page: 1,
      take: 10,
    });

    const totalPlacesCount = await prismaClient.place.count();

    expect(result.length).toBe(totalPlacesCount);
  });

  it('should findAll Places that match the name filters', async () => {
    const result = await prismaFindAllPlaceRepository.findAll({
      page: 1,
      take: 10,
      filters: { name: 'other_name' },
    });

    const totalPlacesCount = await prismaClient.place.count({
      where: { name: { contains: 'other_name' } },
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBe(totalPlacesCount);
  });

  it('should findAll Places that match the nickname filters', async () => {
    const result = await prismaFindAllPlaceRepository.findAll({
      page: 1,
      take: 10,
      filters: { nickname: 'copacab' },
    });

    const totalPlacesCount = await prismaClient.place.count({
      where: { nickname: { contains: 'copacab' } },
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBe(totalPlacesCount);
  });

  it('should findAll Places but limited to pageSize', async () => {
    const result = await prismaFindAllPlaceRepository.findAll({
      page: 1,
      take: 2,
    });

    expect(result.length).toBe(2);
  });

  it('should find Places to the second page that are not in the first page', async () => {
    const totalPlacesCount = await prismaClient.place.count();
    const page1 = await prismaFindAllPlaceRepository.findAll({
      page: 1,
      take: 2,
    });

    const page2 = await prismaFindAllPlaceRepository.findAll({
      page: 2,
      take: 2,
    });

    const pagesHasTheSamePlace = page2.some((place) => page1.includes(place));
    expect(page1.length).toBe(2);
    expect(page2.length).toBe(totalPlacesCount - 2);
    expect(pagesHasTheSamePlace).toBeFalsy();
  });

  it('should return an empty array when no Place matches the filter', async () => {
    const result = await prismaFindAllPlaceRepository.findAll({
      page: 1,
      take: 10,
      filters: { name: 'not_found_filtered_name' },
    });

    expect(result.length).toBe(0);
  });
});
