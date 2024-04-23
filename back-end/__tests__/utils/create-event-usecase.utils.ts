import { EventType } from '@domain/event/enums/event-type.enum';
import { CreateEventRepository } from '@domain/event/repositories/create.event.repository';
import { IsPlaceAvailableAtRepository } from '@domain/place/repositories/is-place-available-at.place.repository';
import { InputCreateEventDto } from '@usecases/event/create/dto/create.event.dto';

export function mockIsPlaceAvailableAtRepository(): IsPlaceAvailableAtRepository {
  class IsPlaceAvailableAtRepositoryStub
    implements IsPlaceAvailableAtRepository
  {
    async isAvailableAt(): Promise<boolean> {
      return true;
    }
  }
  return new IsPlaceAvailableAtRepositoryStub();
}

export function mockCreateEventRepository(): CreateEventRepository {
  class CreateEventRepositoryStub implements CreateEventRepository {
    async create(): Promise<void> {
      return;
    }
  }
  return new CreateEventRepositoryStub();
}

export function mockInputCreateEventDto(): InputCreateEventDto {
  return {
    name: 'any_name',
    contact: {
      email: 'any_email',
      phone: 'any_phone',
    },
    type: EventType.Other,
    placeId: 'any_id',
    duration: {
      startsAt: new Date(),
      endsAt: new Date(),
    },
  };
}
