import { usePostData } from "@hooks/use-post-data";
import { PlaceType } from "@utils/place-type.enum";

export function useCreatePlace() {
  const { data, error, loading, postData } = usePostData<
    RequestCreatePlaceDto,
    OutputCreatePlaceDto
  >("/places");

  function createPlace(input: RequestCreatePlaceDto) {
    return postData(input);
  }

  return { data, error, loading, createPlace };
}

export type RequestCreatePlaceDto = {
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
    phone?: string;
  };
  entries: string[];
  ticketGates: string[];
};

export type OutputCreatePlaceDto = {
  id: string;
};
