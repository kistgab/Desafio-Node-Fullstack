import { PlaceEntity } from '@domain/place/entity/place.entity';
import { PrismaClient } from '@prisma/client';
import { clearDatabase, mockPlaceModelData } from '@test/utils/prisma.utils';
import { PlaceModelMapper } from 'src/infrastructure/place/models/prisma/place-model.mapper';
import { PrismaFindPlaceByIdRepository } from 'src/infrastructure/place/repositories/prisma/find-by-id/prisma-find-by-id.place.repository';

describe('PrismaFindById Place Repository', () => {
  let prismaFindPlaceByIdRepository: PrismaFindPlaceByIdRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await clearDatabase(prismaClient);
    await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
    prismaFindPlaceByIdRepository = new PrismaFindPlaceByIdRepository(
      prismaClient,
    );
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should find the Place when the id exists', async () => {
    const result = await prismaFindPlaceByIdRepository.findById('any_id');

    const foundEntity = await prismaClient.place.findUnique({
      where: { id: 'any_id' },
      include: {
        entries: true,
        place_address: true,
        ticket_gates: true,
      },
    });
    const expectedResult = PlaceModelMapper.toEntity(foundEntity!);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(PlaceEntity);
    expect(result).toEqual(expectedResult);
  });

  it('should return null for no id matches', async () => {
    const result =
      await prismaFindPlaceByIdRepository.findById('any_not_found_id');

    expect(result).toBeNull();
  });
});
