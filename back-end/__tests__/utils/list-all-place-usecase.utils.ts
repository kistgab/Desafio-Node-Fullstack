import { RequestPagination } from '@domain/@shared/utils/pagination.dto';
import { PlaceEntity } from '@domain/place/entity/place.entity';
import { PlaceFilters } from '@domain/place/filters/filters.place';
import { CountAllPlacesRepository } from '@domain/place/repositories/count-all.place.repository';
import { FindAllPlacesRepository } from '@domain/place/repositories/find-all.place.repository';
import { mockPlaceEntity } from '@test/utils/place.utils';

export function mockFindAllPlacesRepository(): FindAllPlacesRepository {
  class FindAllPlacesRepositoryStub implements FindAllPlacesRepository {
    async findAll(): Promise<PlaceEntity[]> {
      return Promise.resolve([
        mockPlaceEntity(),
        mockPlaceEntity(),
        mockPlaceEntity(),
      ]);
    }
  }
  return new FindAllPlacesRepositoryStub();
}

export function mockCountAllPlacesRepository(): CountAllPlacesRepository {
  class CountAllPlacesRepositoryStub implements CountAllPlacesRepository {
    async countAll(): Promise<number> {
      return Promise.resolve(3);
    }
  }
  return new CountAllPlacesRepositoryStub();
}

export function mockInputListAllPlacesDto(): RequestPagination<PlaceFilters> {
  return {
    page: 1,
    take: 10,
  };
}
