import EventIcon from "@assets/icons/event-icon.svg";
import FestivalIcon from "@assets/icons/festival-icon.svg";
import HomeBackgroundImage from "@assets/images/home-background-image.png";
import { Box, Center, Flex } from "@chakra-ui/layout";
import { Header } from "@ui/components/header/header.component";
import { SmallTable } from "@ui/components/small-table/small-table.component";
import { MainDashboardTitle } from "@ui/screens/main-dashboard/components/header/main-dashboard-title.component";
import { MainDashboardOptionMenuButton } from "@ui/screens/main-dashboard/components/option-menu-button/main-dashboard-option-menu-button.component";

export function MainDashboardScreen() {
  return (
    <Box bg={HomeBackgroundImage}>
      <Header />
      <Center p={"3.25rem 5.125rem 1.5rem"}>
        <Box w={"100%"} maxW={"1300px"}>
          <MainDashboardTitle userName="Mariana" />
          <Flex mt={"1.5rem"} gap={"1.5rem"} justifyContent={"space-between"}>
            <Flex w={"100%"} flexDir={"column"} gap={"2rem"}>
              <MainDashboardOptionMenuButton
                buttonText="Conferir locais"
                icon={FestivalIcon}
                text="Confira todos os locais cadastrados!"
                title="Locais"
                bgColor="#2F3B28"
                href="/locais"
              />
              <SmallTable
                data={placesData}
                propertiesToShow={placesPropertiesToShow}
                title="Últimos locais adicionados"
                keyProperty={"id"}
              />
            </Flex>
            <Flex w={"100%"} flexDir={"column"} gap={"2rem"}>
              <MainDashboardOptionMenuButton
                buttonText="Conferir eventos"
                icon={EventIcon}
                text="Confira todos os eventos cadastrados!"
                title="Eventos"
                bgColor="#461527"
                href="/eventos"
              />
              <SmallTable
                data={eventsData}
                propertiesToShow={eventsPropertiesToShow}
                title="Últimos eventos adicionados"
                keyProperty={"id"}
              />
            </Flex>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
}

type PlaceDto = {
  name: string;
  address: string;
  entries: string[];
  id: string;
};

const placesData: PlaceDto[] = [
  {
    id: "randomUUID",
    name: "Morumbis",
    address: "Avenida Francisco Xavier Machado",
    entries: ["C", "D", "E", "F", "G", "H", "I", "J", "K"],
  },
  {
    id: "randomUUID2",
    name: "Allianz Parque",
    address: "Avenida Francisco Xavier Machado",
    entries: ["3", "4", "5", "6", "7", "8", "9", "10"],
  },
  {
    id: "randomUUID3",
    name: "Neo Química Arena",
    address: "Avenida Francisco Xavier Machado",
    entries: ["email@chakra-ui.com"],
  },
];

const placesPropertiesToShow: (keyof PlaceDto)[] = [
  "name",
  "address",
  "entries",
];

type EventDto = {
  name: string;
  tag: string;
  placeName: string;
  id: string;
};

const eventsData: EventDto[] = [
  {
    id: "randomUUID",
    name: "Final Copa América",
    tag: "Futebol",
    placeName: "Morumbis",
  },
  {
    id: "randomUUID2",
    name: "Semi Final Copa América",
    tag: "Futebol",
    placeName: "Morumbis",
  },
  {
    id: "randomUUID3",
    name: "Love on tour - Harry Styles",
    tag: "Show",
    placeName: "Morumbis",
  },
];

const eventsPropertiesToShow: (keyof EventDto)[] = ["name", "tag", "placeName"];
