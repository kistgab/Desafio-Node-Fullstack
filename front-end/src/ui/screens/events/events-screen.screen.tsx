import { useToast } from "@chakra-ui/react";
import { useDeleteEvent } from "@hooks/api/use-delete-event";
import { useGetEvents } from "@hooks/api/use-get-events";
import { GenericTableScreen } from "@ui/screens/generic-table/generic-table.screen";
import { EventType } from "@utils/event-type.enum";
import { EventMapper } from "@utils/mappers/Event.mapper";
import { useEffect, useState } from "react";

export function EventsScreen() {
  const [page, setPage] = useState(1);
  const [searchArgument, setSearchArgument] = useState("");
  const { data: paginatedData, enableTrigger: refreshEvents } = useGetEvents(
    page,
    searchArgument
  );
  const { deleteEvent, finished: finishedDeleteEvent } = useDeleteEvent();
  const toast = useToast();

  useEffect(() => {
    if (!finishedDeleteEvent) return;
    toast({
      title: "Sucesso",
      status: "success",
      description: "O evento foi apagado",
      position: "bottom-left",
    });
    refreshEvents((trigger) => !trigger);
  }, [finishedDeleteEvent]);

  function onDelete(id: string): Promise<void> {
    deleteEvent(id);
    return Promise.resolve();
  }

  function onEdit(id: string): Promise<void> {
    console.log(`Updated id: ${id}`);
    return Promise.resolve();
  }

  const mappedData = paginatedData?.data.map(EventMapper.mapEventDataSummary);
  return (
    <GenericTableScreen<EventDataSummary>
      breadcrumbPages={[
        { name: "Home", href: "/" },
        { name: "Eventos", href: "/eventos" },
      ]}
      currentPageName="Eventos"
      columsHeaderNames={[
        "Evento",
        "Tipo",
        "Local associado",
        "Endereço",
        "Portões cadastrados",
        "Data",
      ]}
      dataPropertiesToShow={[
        "name",
        "type",
        "placeName",
        "address",
        "gates",
        "startsAt",
      ]}
      data={mappedData || []}
      events={{
        onDelete,
        onEdit,
        onCreateHref: "/eventos/criar",
      }}
      pagination={{
        totalPages: paginatedData?.pageCount || 1,
        onPageChange: setPage,
      }}
      texts={{
        caption: "Confira a lista de todos os eventos cadastrados",
        title: "Eventos",
        addButtonLabel: "Adicionar evento",
        searchBarPlaceholder: "Pesquise por nome do evento",
      }}
      setSearchArgument={setSearchArgument}
    />
  );
}

export type EventDataSummary = {
  id: string;
  name: string;
  type: EventType;
  placeName: string;
  address: string;
  gates: string;
  startsAt: string;
};
