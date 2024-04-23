import {
  PlaceAddress,
  PlaceContact,
} from '@domain/place/entity/place-attributes';
import { PlaceType } from '@domain/place/enums/place-type.enum';

export type InputDetailPlaceDto = {
  id: string;
};

export type OutputDetailPlaceDto = {
  id: string;
  name: string;
  nickname?: string;
  type: PlaceType;
  cnpj?: string;
  address: PlaceAddress;
  contact: PlaceContact;
  entries: string[];
  ticketGates: string[];
  createdAt: Date;
  updatedAt?: Date;
};
