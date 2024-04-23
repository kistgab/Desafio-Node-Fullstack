import { EventEntity } from '@domain/event/entity/event.entity';
import { OutputListEventDto } from '@usecases/event/list-all/dto/list-all.event.dto';

export abstract class EventMapper {
  static toSimpleDto(event: EventEntity): OutputListEventDto {
    return {
      duration: event.duration,
      id: event.id,
      name: event.name,
      place: {
        address: event.place.address,
        entries: event.place.entries,
        id: event.place.id,
        name: event.place.name,
      },
      type: event.type,
    };
  }
}
