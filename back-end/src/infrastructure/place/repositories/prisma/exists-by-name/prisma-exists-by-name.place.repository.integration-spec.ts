import { PrismaClient } from '@prisma/client';
import { clearDatabase, mockPlaceModelData } from '@test/utils/prisma.utils';
import { PrismaPlaceExistsByNameRepository } from 'src/infrastructure/place/repositories/prisma/exists-by-name/prisma-exists-by-name.place.repository';

describe('PrismaExistsByName Place Repository', () => {
  let prismaPlaceExistsByNameRepository: PrismaPlaceExistsByNameRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await clearDatabase(prismaClient);
    await prismaClient.place.create({
      data: mockPlaceModelData({ name: 'any_name' }),
    });
    prismaPlaceExistsByNameRepository = new PrismaPlaceExistsByNameRepository(
      prismaClient,
    );
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should return true when a Place with the name exists', async () => {
    const result =
      await prismaPlaceExistsByNameRepository.existsByName('any_name');

    expect(result).toBeTruthy();
  });

  it('should return false for no name matches', async () => {
    const result =
      await prismaPlaceExistsByNameRepository.existsByName(
        'any_not_found_name',
      );

    expect(result).toBeFalsy();
  });
});
