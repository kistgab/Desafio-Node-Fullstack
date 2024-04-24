import { EventEntity } from '@domain/event/entity/event.entity';
import { PrismaClient } from '@prisma/client';
import {
  clearDatabase,
  mockManyEventModelData,
  mockPlaceModelData,
} from '@test/utils/prisma.utils';
import { EventModelMapper } from 'src/infrastructure/event/models/prisma/event-model.mapper';
import { PrismaFindEventByIdRepository } from 'src/infrastructure/event/repositories/prisma/find-by-id/prisma-find-by-id.event.repository';

describe('PrismaFindById Event Repository', () => {
  let prismaFindEventByIdRepository: PrismaFindEventByIdRepository;
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
    prismaFindEventByIdRepository = new PrismaFindEventByIdRepository(
      prismaClient,
    );
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should find the Event when the id exists', async () => {
    const result = await prismaFindEventByIdRepository.findById('any_id');

    const foundEntity = await prismaClient.event.findUnique({
      where: { id: 'any_id' },
      include: {
        place: {
          include: {
            place_address: true,
            entries: true,
            ticket_gates: true,
          },
        },
      },
    });
    const expectedResult = EventModelMapper.toEntity(foundEntity!);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(EventEntity);
    expect(result).toEqual(expectedResult);
  });

  it('should return null for no id matches', async () => {
    const result =
      await prismaFindEventByIdRepository.findById('any_not_found_id');

    expect(result).toBeNull();
  });
});
