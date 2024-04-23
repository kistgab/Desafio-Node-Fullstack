import { EventFactory } from '@domain/event/factory/event.factory';
import { CreateEventRepository } from '@domain/event/repositories/create.event.repository';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository copy';
import { IsPlaceAvailableAtRepository } from '@domain/place/repositories/is-place-available-at.place.repository';
import {
  InputCreateEventDto,
  OutputCreateEventDto,
} from '@usecases/event/create/dto/create.event.dto';

export class CreateEventUseCase {
  constructor(
    private readonly findPlaceByIdRepository: FindPlaceByIdRepository,
    private readonly createEventRepository: CreateEventRepository,
    private readonly isPlaceAvailableAtRepository: IsPlaceAvailableAtRepository,
  ) {}

  async execute(
    input: InputCreateEventDto,
  ): Promise<OutputCreateEventDto | Error> {
    const place = await this.findPlaceByIdRepository.findById(input.placeId);
    if (!place) {
      return new Error('There is no place with specified id.');
    }
    const isPlaceAvailable =
      await this.isPlaceAvailableAtRepository.isAvailableAt(
        place.id,
        input.duration.startsAt,
        input.duration.endsAt,
      );
    if (!isPlaceAvailable) {
      return new Error('The place is not available at the specified date.');
    }
    const { contact, duration, name, type } = input;
    const event = EventFactory.create({ contact, duration, name, place, type });
    await this.createEventRepository.create(event);
    return {
      id: event.id,
    };
  }
}
