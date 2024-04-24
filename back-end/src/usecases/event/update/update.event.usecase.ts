import { EventFactory } from '@domain/event/factory/event.factory';
import { FindEventByIdRepository } from '@domain/event/repositories/find-by-id.event.repository';
import { UpdateEventRepository } from '@domain/event/repositories/update.event.repository';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository';
import { IsPlaceAvailableAtRepository } from '@domain/place/repositories/is-place-available-at.place.repository';
import { InputUpdateEventDto } from '@usecases/event/update/dto/update.event.dto';

export class UpdateEventUseCase {
  constructor(
    private readonly findEventByIdRepository: FindEventByIdRepository,
    private readonly findPlaceByIdRepository: FindPlaceByIdRepository,
    private readonly updateEventRepository: UpdateEventRepository,
    private readonly isPlaceAvailableAtRepository: IsPlaceAvailableAtRepository,
  ) {}

  async execute(input: InputUpdateEventDto): Promise<void | Error> {
    const eventToEdit = await this.findEventByIdRepository.findById(input.id);
    if (!eventToEdit) {
      return new Error('There is no event with the specified id.');
    }
    const newPlace = await this.findPlaceByIdRepository.findById(input.placeId);
    if (!newPlace) {
      return new Error('There is no place with the specified id.');
    }
    const isAvailable = await this.isPlaceAvailableAtRepository.isAvailableAt(
      newPlace.id,
      input.duration.startsAt,
      input.duration.endsAt,
    );
    if (!isAvailable) {
      return new Error('The place is not available at the specified time.');
    }
    const editedEvent = EventFactory.create({
      id: input.id,
      contact: input.contact,
      duration: input.duration,
      name: input.name,
      place: newPlace,
      type: input.type,
      createdAt: eventToEdit.createdAt,
      updatedAt: new Date(),
    });
    await this.updateEventRepository.update(editedEvent);
  }
}
