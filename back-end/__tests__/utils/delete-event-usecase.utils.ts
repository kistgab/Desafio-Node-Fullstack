import { EventEntity } from '@domain/event/entity/event.entity';
import { DeleteEventRepository } from '@domain/event/repositories/delete.event.repository';
import { FindEventByIdRepository } from '@domain/event/repositories/find-by-id.event.repository';
import { mockEventEntity } from '@test/utils/event.utils';
import { InputDeleteEventDto } from '@usecases/event/delete/dto/delete.event.dto';

export function mockDeleteEventRepository(): DeleteEventRepository {
  class DeleteEventRepositoryStub implements DeleteEventRepository {
    async delete(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new DeleteEventRepositoryStub();
}

export function mockFindEventByIdRepository(): FindEventByIdRepository {
  class FindEventByIdRepositoryStub implements FindEventByIdRepository {
    async findById(): Promise<EventEntity | null> {
      return Promise.resolve(mockEventEntity());
    }
  }
  return new FindEventByIdRepositoryStub();
}

export function mockInputDeleteEventDto(): InputDeleteEventDto {
  return {
    id: 'any_id',
  };
}
