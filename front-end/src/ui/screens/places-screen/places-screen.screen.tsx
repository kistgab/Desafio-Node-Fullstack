import { GenericTableScreen } from "@ui/screens/generic-table/generic-table.screen";
import { useState } from "react";

export function PlacesScreen() {
  const [page, setPage] = useState(1);
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
      data={placeData}
      events={{
        onDelete,
        onEdit,
      }}
      pagination={{
        totalPages: 10,
        onPageChange: setPage,
      }}
    />
  );
}

type PlaceDataSummary = {
  id: string;
  name: string;
  address: string;
  cityAndState: string;
  gates: string;
  updatedAt: string;
};

const placeData: PlaceDataSummary[] = [
  {
    id: "uuid-daf-999-adfs",
    name: "Morumbis",
    address: "Avenida Francisco Matarazzo, 1705 - Água Branca",
    cityAndState: "São Paulo; SP",
    gates: "A,B,C,D,E,F,G,H,I,J,K",
    updatedAt: "05/10/23",
  },
  {
    id: "uuid-daf-888-adfs",
    name: "Allianz Parque",
    address: "Avenida Francisco Matarazzo, 1705 - Água Branca",
    cityAndState: "São Paulo; SP",
    gates: "A,B,C,D,E,F,G,H,I,J,K",
    updatedAt: "05/10/23",
  },
  {
    id: "uuid-daf-777-adfs",
    name: "Neo Química Arena",
    address: "Avenida Francisco Matarazzo, 1705 - Água Branca",
    cityAndState: "São Paulo; SP",
    gates: "A,B,C,D,E,F,G,H,I,J,K",
    updatedAt: "05/10/23",
  },
  {
    id: "uuid-daf-666-adfs",
    name: "Audio Club.",
    address: "Avenida Francisco Matarazzo, 1705 - Água Branca",
    cityAndState: "São Paulo; SP",
    gates: "A,B,C,D,E,F,G,H,I,J,K",
    updatedAt: "05/10/23",
  },
  {
    id: "uuid-daf-555-adfs",
    name: "Audio Club.",
    address: "Avenida Francisco Matarazzo, 1705 - Água Branca",
    cityAndState: "São Paulo; SP",
    gates: "A,B,C,D,E,F,G,H,I,J,K",
    updatedAt: "05/10/23",
  },
];

function onDelete(id: string, refreshScreen: () => void): Promise<void> {
  console.log(`Deleted id: ${id}`);
  refreshScreen();
  return Promise.resolve();
}

function onEdit(id: string): Promise<void> {
  console.log(`Updated id: ${id}`);
  return Promise.resolve();
}
