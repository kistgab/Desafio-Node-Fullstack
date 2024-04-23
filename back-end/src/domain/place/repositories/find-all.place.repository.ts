import { RequestPagination } from '@domain/@shared/utils/pagination.dto';
import { PlaceEntity } from '@domain/place/entity/place.entity';
import { PlaceFilters } from '@domain/place/filters/filters.place';

export interface FindAllPlacesRepository {
  findAll(options: RequestPagination<PlaceFilters>): Promise<PlaceEntity[]>;
}
