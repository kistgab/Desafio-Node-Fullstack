import { RequestPagination } from '@domain/@shared/utils/pagination.dto';
import { EventEntity } from '@domain/event/entity/event.entity';
import { EventFilters } from '@domain/event/filters/filters.event';

export interface FindAllEventsRepository {
  findAll(options: RequestPagination<EventFilters>): Promise<EventEntity[]>;
}
