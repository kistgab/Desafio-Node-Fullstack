import { PlaceType } from '@domain/place/enums/place-type.enum';
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

export function mockInputCreatePlaceDto(): InputCreatePlaceDto {
  return {
    name: 'any_name',
    nickname: 'any_nickname',
    type: PlaceType.Stadium,
    address: {
      city: 'any_city',
      state: 'any_state',
    },
    contact: {
      mail: 'any_mail',
      phone: 'any_phone',
    },
    entries: ['any_entry'],
    ticketGates: ['any_ticket_gate'],
  };
}
