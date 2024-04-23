import { EventMapper } from '@domain/event/mapper/event.mapper';
import { FindEventByIdRepository } from '@domain/event/repositories/find-by-id.event.repository';
import {
  InputDetailEventDto,
  OutputDetailEventDto,
} from '@usecases/event/detail/dto/detail.event.dto';

export class DetailEventUseCase {
  constructor(
    private readonly findEventByIdRepository: FindEventByIdRepository,
  ) {}

  async execute(
    input: InputDetailEventDto,
  ): Promise<OutputDetailEventDto | Error> {
    const event = await this.findEventByIdRepository.findById(input.id);
    if (!event) {
      return new Error('There is no event with the specified id.');
    }
    return EventMapper.toDetailedDto(event);
  }
}
