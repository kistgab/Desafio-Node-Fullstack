import {
  RequestPagination,
  ResponsePagination,
} from '@domain/@shared/utils/pagination.dto';
import { EventFilters } from '@domain/event/filters/filters.event';
import { EventMapper } from '@domain/event/mapper/event.mapper';
import { CountAllEventsRepository } from '@domain/event/repositories/count-all.event.repository';
import { FindAllEventsRepository } from '@domain/event/repositories/find-all.event.repository';
import { OutputListEventDto } from '@usecases/event/list-all/dto/list-all.event.dto';

export class ListAllEventsUseCase {
  constructor(
    private readonly findAllEventsRepository: FindAllEventsRepository,
    private readonly countAllEventsRepository: CountAllEventsRepository,
  ) {}

  async execute(
    input: RequestPagination<EventFilters>,
  ): Promise<ResponsePagination<OutputListEventDto> | Error> {
    const events = await this.findAllEventsRepository.findAll(input);
    const totalEvents = await this.countAllEventsRepository.countAll(
      input.filters,
    );
    const mappedEvents = events.map(EventMapper.toSimpleDto);
    return new ResponsePagination(
      mappedEvents,
      input.page,
      input.take,
      totalEvents,
    );
  }
}
