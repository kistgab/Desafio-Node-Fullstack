import {
  PlaceAddress,
  PlaceContact,
} from '@domain/place/entity/place-attributes';
import { PlaceEntity } from '@domain/place/entity/place.entity';
import { PlaceType } from '@domain/place/enums/place-type.enum';

export abstract class PlaceFactory {
  static create(props: PlaceEntityProps): PlaceEntity {
    return new PlaceEntity(
      props.id ?? crypto.randomUUID(),
      props.name,
      props.type,
      props.address,
      props.contact,
      props.entries,
      props.ticketGates,
      props.nickname,
      props.createdAt,
      props.updatedAt,
      props.cnpj,
    );
  }
}

export type PlaceEntityProps = {
  id?: string;
  name: string;
  nickname: string;
  type: PlaceType;
  cnpj?: string;
  address: PlaceAddress;
  contact: PlaceContact;
  entries: string[];
  ticketGates: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
