import { PlaceAddress } from '@domain/place/entity/place-attributes';

export type OutputListPlaceDto = {
  id: string;
  name: string;
  nickname?: string;
  address: PlaceAddress;
  entries: string[];
  ticketGates: string[];
  updatedAt?: Date;
};
