import { PlaceType } from 'src/domain/place/enums/place-type.enum';

export type InputUpdatePlaceDto = {
  id: string;
  name: string;
  nickname?: string;
  type: PlaceType;
  cnpj?: string;
  address: {
    city: string;
    state: string;
    zipCode: string;
    line: string;
    complement?: string;
  };
  contact: {
    mail: string;
    phone: string;
  };
  entries: string[];
  ticketGates: string[];
};
