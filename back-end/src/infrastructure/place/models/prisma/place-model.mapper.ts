import { PlaceEntity } from '@domain/place/entity/place.entity';
import { PlaceType } from '@domain/place/enums/place-type.enum';
import { PlaceWithoutEventModel } from 'src/infrastructure/place/models/prisma/place.model';

export abstract class PlaceModelMapper {
  static toEntity(model: PlaceWithoutEventModel): PlaceEntity {
    return new PlaceEntity(
      model.id,
      model.name,
      PlaceType[model.type],
      {
        city: model.place_address!.city,
        line: model.place_address!.address,
        state: model.place_address!.state,
        zipCode: model.place_address!.zip_code,
        complement: model.place_address?.complement ?? undefined,
      },
      { mail: model.contact_email, phone: model.contact_phone ?? undefined },
      model.entries.map((entry) => entry.name),
      model.ticket_gates.map((ticketGate) => ticketGate.name),
      model.nickname ?? undefined,
      model.created_at,
      model.updated_at,
    );
  }
}
