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
      address: {
        city: 'new_city',
        complement: 'new_complement',
        line: 'new_line',
        state: 'new_state',
        zipCode: 'new_zip_code',
      },
    });

    await prismaUpdatePlaceRepository.update(place);

    const placeInDb = (await prismaClient.place.findUnique({
      where: { id: place.id },
    }))!;
    const placeAddressInDb = (await prismaClient.placeAddress.findUnique({
      where: { place_id: place.id },
    }))!;
    expect(placeInDb).toEqual({
      contact_email: place.contact.mail,
      contact_phone: place.contact.phone,
      name: place.name,
      id: place.id,
      type: place.type,
      cpnj: place.cnpj,
      created_at: place.createdAt,
      nickname: place.nickname,
      updated_at: place.updatedAt,
    });
    expect(placeAddressInDb).toEqual({
      address: place.address.line,
      city: place.address.city,
      complement: place.address.complement,
      id: 'any_id',
      place_id: place.id,
      state: place.address.state,
      zip_code: place.address.zipCode,
    });
  });
});
