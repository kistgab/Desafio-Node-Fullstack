import { useGetPlaces } from "@hooks/api/use-get-places";
import { GenericTableScreen } from "@ui/screens/generic-table/generic-table.screen";
import { PlaceMapper } from "@utils/mappers/Place.mapper";
import { useState } from "react";

export function PlacesScreen() {
  const [page, setPage] = useState(1);
  const { data: paginatedData, error, loading } = useGetPlaces(page);
  const mappedData = paginatedData?.data.map(PlaceMapper.mapPlaceDataSummary);
  return (
    <GenericTableScreen<PlaceDataSummary>
      breadcrumbPages={[
        { name: "Home", href: "/" },
        { name: "Locais", href: "/locais" },
      ]}
      currentPageName="Locais"
      columsHeaderNames={[
        "Nome do local",
        "Endereço",
        "Cidade e Estado",
        "Portões cadastrados",
        "Atualização",
      ]}
      dataPropertiesToShow={[
        "name",
        "address",
        "cityAndState",
        "gates",
        "updatedAt",
      ]}
      data={mappedData || []}
      events={{
        onDelete,
        onEdit,
        onCreateHref: "/locais/criar",
      }}
      pagination={{
        totalPages: paginatedData?.pageCount || 1,
        onPageChange: setPage,
      }}
      texts={{
        caption: "Confira a lista de todos os locais cadastrados",
        title: "Locais",
        addButtonLabel: "Adicionar local",
        searchBarPlaceholder: "Pesquise por nome ou apelido do local",
      }}
    />
  );
}

export type PlaceDataSummary = {
  id: string;
  name: string;
  address: string;
  cityAndState: string;
  gates: string;
  updatedAt?: string;
};

function onDelete(id: string): Promise<void> {
  console.log(`Deleted id: ${id}`);
  return Promise.resolve();
}

function onEdit(id: string): Promise<void> {
  console.log(`Updated id: ${id}`);
  return Promise.resolve();
}
