import {
  PlaceAddress,
  PlaceContact,
} from '@domain/place/entity/place-attributes';
import { PlaceType } from '@domain/place/enums/place-type.enum';

export class PlaceEntity {
  constructor(
    private _id: string,
    private _name: string,
    private _type: PlaceType,
    private _address: PlaceAddress,
    private _contact: PlaceContact,
    private _entries: string[],
    private _ticketGates: string[],
    private _nickname?: string,
    private _createdAt: Date = new Date(),
    private _updatedAt?: Date,
    private _cnpj?: string,
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get nickname(): string | undefined {
    return this._nickname;
  }

  get type(): PlaceType {
    return this._type;
  }

  get address(): PlaceAddress {
    return this._address;
  }

  get contact(): PlaceContact {
    return this._contact;
  }

  get entries(): string[] {
    return this._entries;
  }

  get ticketGates(): string[] {
    return this._ticketGates;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  get cnpj(): string | undefined {
    return this._cnpj;
  }
}
