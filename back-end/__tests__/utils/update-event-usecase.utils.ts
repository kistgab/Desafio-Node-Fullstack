import { EventType } from '@domain/event/enums/event-type.enum';
import { UpdateEventRepository } from '@domain/event/repositories/update.event.repository';
import { InputUpdateEventDto } from '@usecases/event/update/dto/update.event.dto';

export function mockUpdateEventRepository(): UpdateEventRepository {
  class UpdateEventRepositoryStub implements UpdateEventRepository {
    async update(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdateEventRepositoryStub();
}

export function mockInputUpdateEventDto(
  props?: Partial<InputUpdateEventDto>,
): InputUpdateEventDto {
  return {
    ...{
      id: 'any_id',
      name: 'any_name',
      type: EventType.Presentation,
      contact: {
        email: 'any_email',
        phone: 'any_phone',
      },
      duration: {
        startsAt: new Date('2023-04-23'),
        endsAt: new Date('2023-04-24'),
      },
      placeId: 'any_id',
    },
    ...props,
  };
}
