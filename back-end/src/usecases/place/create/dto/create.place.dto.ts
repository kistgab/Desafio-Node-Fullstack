import { PlaceType } from 'src/domain/place/enums/place-type.enum';

export type InputCreatePlaceDto = {
  name: string;
  nickname: string;
  type: PlaceType;
  cnpj?: string;
  address: {
    city: string;
    state: string;
  };
  contact: {
    mail: string;
    phone: string;
  };
  entries: string[];
  ticketGates: string[];
};

export type OutputCreatePlaceDto = {
  id: string;
};
