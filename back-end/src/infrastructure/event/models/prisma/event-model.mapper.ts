import { EventEntity } from '@domain/event/entity/event.entity';
import { EventType } from '@domain/event/enums/event-type.enum';
import { EventWithPlace } from 'src/infrastructure/event/models/prisma/event.model';
import { PlaceModelMapper } from 'src/infrastructure/place/models/prisma/place-model.mapper';

export abstract class EventModelMapper {
  static toEntity(model: EventWithPlace): EventEntity {
    return new EventEntity(
      model.id,
      model.name,
      EventType[model.type],
      {
        startsAt: model.startDate,
        endsAt: model.endDate,
      },
      PlaceModelMapper.toEntity(model.place),
      {
        email: model.contact_email,
        phone: model.contact_phone ?? undefined,
      },
      model.created_at,
      model.updated_at,
    );
  }
}
