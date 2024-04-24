import { PrismaClient } from '@prisma/client';
import {
  clearDatabase,
  mockEventModelData,
  mockPlaceModelData,
} from '@test/utils/prisma.utils';
import { PrismaIsPlaceAvailableAtRepository } from 'src/infrastructure/place/repositories/prisma/is-place-available-at/prisma-is-place-available-at.place.repository';

describe('PrismaExistsByName Place Repository', () => {
  let prismaIsPlaceAvailableAtRepository: PrismaIsPlaceAvailableAtRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await clearDatabase(prismaClient);
    await prismaClient.place.create({
      data: mockPlaceModelData({ name: 'any_name' }),
    });
    await prismaClient.event.create({
      data: mockEventModelData({
        startDate: new Date(2022, 1, 10, 20, 30),
        endDate: new Date(2022, 1, 11, 5, 30),
      }),
    });
    prismaIsPlaceAvailableAtRepository = new PrismaIsPlaceAvailableAtRepository(
      prismaClient,
    );
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should return true when the place is available after an schedule', async () => {
    const result = await prismaIsPlaceAvailableAtRepository.isAvailableAt(
      'any_id',
      new Date(2022, 1, 11, 6, 30),
      new Date(2022, 1, 11, 10, 30),
    );

    expect(result).toBeTruthy();
  });

  it('should return true when the place is available before an schedule', async () => {
    const result = await prismaIsPlaceAvailableAtRepository.isAvailableAt(
      'any_id',
      new Date(2022, 1, 10, 10, 30),
      new Date(2022, 1, 10, 20, 0),
    );

    expect(result).toBeTruthy();
  });

  it('should return false when the place is occupied (starts in the middle, ends in the middle)', async () => {
    const result = await prismaIsPlaceAvailableAtRepository.isAvailableAt(
      'any_id',
      new Date(2022, 1, 10, 21, 30),
      new Date(2022, 1, 10, 23, 50),
    );

    expect(result).toBeFalsy();
  });

  it('should return false when the place is occupied (starts in the middle, ends after)', async () => {
    const result = await prismaIsPlaceAvailableAtRepository.isAvailableAt(
      'any_id',
      new Date(2022, 1, 11, 0, 30),
      new Date(2022, 1, 11, 23, 50),
    );

    expect(result).toBeFalsy();
  });

  it('should return false when the place is occupied (starts before, ends in the middle)', async () => {
    const result = await prismaIsPlaceAvailableAtRepository.isAvailableAt(
      'any_id',
      new Date(2022, 1, 9, 0, 30),
      new Date(2022, 1, 11, 3, 0),
    );

    expect(result).toBeFalsy();
  });

  it('should return false when the place is occupied (starts before, ends after)', async () => {
    const result = await prismaIsPlaceAvailableAtRepository.isAvailableAt(
      'any_id',
      new Date(2022, 1, 9, 0, 30),
      new Date(2022, 1, 15, 3, 0),
    );

    expect(result).toBeFalsy();
  });
});
