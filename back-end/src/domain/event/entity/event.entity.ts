import {
  EventContact,
  EventDuration,
} from '@domain/event/entity/event-attributes';
import { EventType } from '@domain/event/enums/event-type.enum';
import { PlaceEntity } from '@domain/place/entity/place.entity';

export class EventEntity {
  constructor(
    private _id: string,
    private _name: string,
    private _type: EventType,
    private _date: EventDuration,
    private _place: PlaceEntity,
    private _contact: EventContact,
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get type(): EventType {
    return this._type;
  }

  get date(): EventDuration {
    return this._date;
  }

  get place(): PlaceEntity {
    return this._place;
  }

  get contact(): EventContact {
    return this._contact;
  }
}
