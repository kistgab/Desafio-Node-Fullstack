import { useFetchData } from "@hooks/use-fetch-data";
import { Pagination } from "@utils/pagination.dto";
import { useState } from "react";

export function useGetPlaces(page: number, filter?: string) {
  console.log("atualizou os locais");
  const [trigger, enableTrigger] = useState(false);
  const PLACES_PER_PAGE = 5;
  let url = `/places?take=${PLACES_PER_PAGE}&page=${page}`;
  if (filter) {
    url += `&filter=${filter}`;
  }
  const { data, error, loading } = useFetchData<Pagination<OutputGetPlacesDto>>(
    url,
    undefined,
    trigger
  );
  return { data, error, loading, enableTrigger };
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
