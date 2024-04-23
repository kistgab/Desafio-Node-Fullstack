import { DeleteEventRepository } from '@domain/event/repositories/delete.event.repository';
import { FindEventByIdRepository } from '@domain/event/repositories/find-by-id.event.repository';
import { InputDeleteEventDto } from '@usecases/event/delete/dto/delete.event.dto';

export class DeleteEventUseCase {
  constructor(
    private readonly findEventByIdRepository: FindEventByIdRepository,
    private readonly deleteEventRepository: DeleteEventRepository,
  ) {}

  async execute(input: InputDeleteEventDto): Promise<void | Error> {
    const event = await this.findEventByIdRepository.findById(input.id);
    if (!event) {
      return new Error('There is no event with the specified id.');
    }
    await this.deleteEventRepository.delete(event.id);
  }
}
