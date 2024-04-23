import { PlaceEntity } from '@domain/place/entity/place.entity';

export interface UpdatePlaceRepository {
  update(place: PlaceEntity): Promise<void>;
}
