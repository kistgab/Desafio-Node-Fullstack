import { PlaceEntity } from '@domain/place/entity/place.entity';

export interface FindPlaceByIdRepository {
  findById(id: string): Promise<PlaceEntity | null>;
}
