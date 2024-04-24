import { PlaceEntity } from '@domain/place/entity/place.entity';
import { DeletePlaceRepository } from '@domain/place/repositories/delete.place.repository';
import { FindPlaceByIdRepository } from '@domain/place/repositories/find-by-id.place.repository';
import { mockPlaceEntity } from '@test/utils/place.utils';
import { InputDeletePlaceDto } from '@usecases/place/delete/dto/delete.place.dto';

export function mockDeletePlaceRepository(): DeletePlaceRepository {
  class DeletePlaceRepositoryStub implements DeletePlaceRepository {
    async delete(): Promise<void> {
      return Promise.resolve();
    }
  }
  return new DeletePlaceRepositoryStub();
}

export function mockFindPlaceByIdRepository(): FindPlaceByIdRepository {
  class FindPlaceByIdRepositoryStub implements FindPlaceByIdRepository {
    async findById(): Promise<PlaceEntity | null> {
      return Promise.resolve(mockPlaceEntity());
    }
  }
  return new FindPlaceByIdRepositoryStub();
}

export function mockInputDeletePlaceDto(): InputDeletePlaceDto {
  return {
    id: 'any_id',
  };
}
