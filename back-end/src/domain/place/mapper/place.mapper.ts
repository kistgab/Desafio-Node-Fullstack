import { PlaceEntity } from '@domain/place/entity/place.entity';
import { OutputDetailPlaceDto } from '@usecases/place/detail/dto/detail.place.dto';

export abstract class PlaceMapper {
  static toDetailedDto(entity: PlaceEntity): OutputDetailPlaceDto {
    return {
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      address: entity.address,
      contact: entity.contact,
      entries: entity.entries,
      nickname: entity.nickname,
      ticketGates: entity.ticketGates,
      type: entity.type,
      cnpj: entity.cnpj,
    };
  }
}
