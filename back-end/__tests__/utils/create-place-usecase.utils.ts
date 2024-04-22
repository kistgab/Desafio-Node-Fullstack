import { PlaceType } from '@domain/place/enums/place-type.enum';
import { CreatePlaceRepository } from '@domain/place/repositories/create.place.repository';
import { PlaceExistsByNameRepository } from '@domain/place/repositories/exists-by-name.place.repository';
import { InputCreatePlaceDto } from '@usecases/place/create/dto/create.place.dto';

export function mockPlaceExistsByNameRepository(): PlaceExistsByNameRepository {
  class PlaceExistsByNameRepositoryStub implements PlaceExistsByNameRepository {
    async existsByName(): Promise<boolean> {
      return Promise.resolve(false);
    }
  }
  return new PlaceExistsByNameRepositoryStub();
}

export function mockCreatePlaceRepository(): CreatePlaceRepository {
  class CreatePlaceRepositoryStub implements CreatePlaceRepository {
    async create(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new CreatePlaceRepositoryStub();
}

export function mockInputCreatePlaceDto(): InputCreatePlaceDto {
  return {
    name: 'any_name',
    nickname: 'any_nickname',
    type: PlaceType.Stadium,
    address: {
      city: 'any_city',
      state: 'any_state',
      line: 'any_address',
      zipCode: 'any_zip_code',
      complement: 'any_complement',
    },
    contact: {
      mail: 'any_mail',
      phone: 'any_phone',
    },
    entries: ['any_entry'],
    ticketGates: ['any_ticket_gate'],
  };
}
