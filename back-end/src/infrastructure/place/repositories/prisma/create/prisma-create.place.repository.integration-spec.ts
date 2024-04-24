import { PrismaClient } from '@prisma/client';
import { mockPlaceEntity } from '@test/utils/place.utils';
import { clearDatabase, mockPlaceModelData } from '@test/utils/prisma.utils';
import { PrismaCreatePlaceRepository } from 'src/infrastructure/place/repositories/prisma/create/prisma-create.place.repository';
describe('PrismaCreate Place Repository', () => {
  let prismaCreatePlaceRepository: PrismaCreatePlaceRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    await clearDatabase(prismaClient);
    await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
    prismaCreatePlaceRepository = new PrismaCreatePlaceRepository(prismaClient);
  });

  beforeEach(async () => {
    await prismaClient.place.deleteMany();
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should create the Place in database', async () => {
    const placeToAdd = mockPlaceEntity();

    await prismaCreatePlaceRepository.create(placeToAdd);

    const wasPlaceInserted =
      (await prismaClient.place.count({ where: { id: placeToAdd.id } })) > 0;
    expect(wasPlaceInserted).toBeTruthy();
  });
});
