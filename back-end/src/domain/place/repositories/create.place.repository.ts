import { PlaceEntity } from '@domain/place/entity/place.entity';

export interface CreatePlaceRepository {
  create(place: PlaceEntity): Promise<void>;
}
