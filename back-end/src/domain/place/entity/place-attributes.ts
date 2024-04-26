export type PlaceContact = {
  mail: string;
  phone?: string;
};

export type PlaceAddress = {
  city: string;
  state: string;
  zipCode: string;
  line: string;
  complement?: string;
};
