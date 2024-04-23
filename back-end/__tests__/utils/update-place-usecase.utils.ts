import { PlaceType } from '@domain/place/enums/place-type.enum';
import { UpdatePlaceRepository } from '@domain/place/repositories/update.place.repository';
import { InputUpdatePlaceDto } from '@usecases/place/update/dto/update.place.dto';

export function mockUpdatePlaceRepository(): UpdatePlaceRepository {
  class UpdatePlaceRepositoryStub implements UpdatePlaceRepository {
    async update(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdatePlaceRepositoryStub();
}

export function mockInputUpdatePlaceDto(
  props?: Partial<InputUpdatePlaceDto>,
): InputUpdatePlaceDto {
  return {
    ...{
      id: 'any_id',
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
    },
    ...props,
  };
}
