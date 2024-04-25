import { useToast } from "@chakra-ui/react";
import { useDeletePlace } from "@hooks/api/use-delete-place";
import { useGetPlaces } from "@hooks/api/use-get-places";
import { GenericTableScreen } from "@ui/screens/generic-table/generic-table.screen";
import { PlaceMapper } from "@utils/mappers/Place.mapper";
import { useEffect, useState } from "react";

export function PlacesScreen() {
  const [page, setPage] = useState(1);
  const { data: paginatedData, enableTrigger: refreshPlaces } =
    useGetPlaces(page);
  const { deletePlace, finished: finishedDeletePlace } = useDeletePlace();
  const toast = useToast();

  useEffect(() => {
    if (!finishedDeletePlace) return;
    toast({
      title: "Sucesso",
      status: "success",
      description: "O local foi apagado",
      position: "bottom-left",
    });
    refreshPlaces((trigger) => !trigger);
  }, [finishedDeletePlace]);

  function onDelete(id: string): Promise<void> {
    deletePlace(id);
    return Promise.resolve();
  }

  function onEdit(id: string): Promise<void> {
    console.log(`Updated id: ${id}`);
    return Promise.resolve();
  }

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
