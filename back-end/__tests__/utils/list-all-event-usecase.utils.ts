import { RequestPagination } from '@domain/@shared/utils/pagination.dto';
import { EventEntity } from '@domain/event/entity/event.entity';
import { EventFilters } from '@domain/event/filters/filters.event';
import { CountAllEventsRepository } from '@domain/event/repositories/count-all.event.repository';
import { FindAllEventsRepository } from '@domain/event/repositories/find-all.event.repository';
import { mockEventEntity } from '@test/utils/event.utils';

export function mockFindAllEventsRepository(): FindAllEventsRepository {
  class FindAllEventsRepositoryStub implements FindAllEventsRepository {
    async findAll(): Promise<EventEntity[]> {
      return Promise.resolve([
        mockEventEntity(),
        mockEventEntity(),
        mockEventEntity(),
      ]);
    }
  }
  return new FindAllEventsRepositoryStub();
}

export function mockCountAllEventsRepository(): CountAllEventsRepository {
  class CountAllEventsRepositoryStub implements CountAllEventsRepository {
    async countAll(): Promise<number> {
      return Promise.resolve(3);
    }
  }
  return new CountAllEventsRepositoryStub();
}

export function mockInputListAllEventsDto(): RequestPagination<EventFilters> {
  return {
    page: 1,
    take: 10,
  };
}
