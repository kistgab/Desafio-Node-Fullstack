import { useFetchData } from "@hooks/use-fetch-data";
import { Pagination } from "@utils/pagination.dto";

export function useGetPlaces(page: number, filter?: string) {
  const PLACES_PER_PAGE = 5;
  let url = `/places?take=${PLACES_PER_PAGE}&page=${page}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  const { data, error, loading } =
    useFetchData<Pagination<OutputGetPlacesDto>>(url);
  return { data, error, loading };
}

export type OutputGetPlacesDto = {
  id: string;
  name: string;
  nickname?: string;
  address: PlaceAddress;
  entries: string[];
  ticketGates: string[];
  updatedAt?: string;
};

type PlaceAddress = {
  city: string;
  state: string;
  zipCode: string;
  line: string;
  complement?: string;
};
