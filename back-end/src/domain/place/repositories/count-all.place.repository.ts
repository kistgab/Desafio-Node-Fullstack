import { PlaceFilters } from '@domain/place/filters/filters.place';

export interface CountAllPlacesRepository {
  countAll(filters?: PlaceFilters): Promise<number>;
}
