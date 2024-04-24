import { PlaceType } from '@domain/place/enums/place-type.enum';
import { PrismaClient } from '@prisma/client';
import { mockPlaceEntity } from '@test/utils/place.utils';
import { clearDatabase, mockPlaceModelData } from '@test/utils/prisma.utils';
import { PrismaUpdatePlaceRepository } from 'src/infrastructure/place/repositories/prisma/update/prisma-update.place.repository';

describe('PrismaUpdate Place Repository', () => {
  let prismaUpdatePlaceRepository: PrismaUpdatePlaceRepository;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
    prismaUpdatePlaceRepository = new PrismaUpdatePlaceRepository(prismaClient);
  });

  beforeEach(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.place.create({ data: mockPlaceModelData() });
    await prismaClient.place.create({
      data: mockPlaceModelData(),
    });
  });

  afterAll(async () => {
    await clearDatabase(prismaClient);
    await prismaClient.$disconnect();
  });

  it('should update the place', async () => {
    const place = mockPlaceEntity({
      cnpj: 'new_cnpj',
      contact: {
        mail: 'new_mail',
        phone: 'new_phone',
      },
      name: 'new_name',
      nickname: 'new_nickname',
      type: PlaceType.Teather,
    });

    await prismaUpdatePlaceRepository.update(place);

    const placeInDb = (await prismaClient.place.findUnique({
      where: { id: place.id },
    }))!;
    expect(placeInDb).toEqual({
      id: place.id,
      name: place.name,
      place_id: place.place.id,
      startDate: place.duration.startsAt,
      endDate: place.duration.endsAt,
      type: place.type,
      contact_phone: place.contact.phone,
      contact_email: place.contact.email,
      created_at: placeInDb.created_at,
      updated_at: placeInDb.updated_at,
    });
  });
});
