import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Header } from "@ui/components/header/header.component";
import {
  BreadcrumbPage,
  PageBreadcrumbs,
} from "@ui/components/page-breadcrumbs/page-breadcrumbs.component";
import { ScreenContentWrapper } from "@ui/components/screen-content-wrapper/screen-content-wrapper.component";
import { useEffect, useState } from "react";

type IdObject = {
  id: string;
};

type Events = {
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (id: string) => Promise<void>;
};

type Texts = {
  title: string;
  caption: string;
};

type PropsPagination = {
  totalPages: number;
  onPageChange: (page: number) => void;
};

type Props<T extends IdObject> = {
  breadcrumbPages: BreadcrumbPage[];
  currentPageName: string;
  data: T[];
  dataPropertiesToShow: (keyof T)[];
  columsHeaderNames: string[];
  pagination: PropsPagination;
  events?: Events;
  texts: Texts;
};

export function GenericTableScreen<T extends IdObject>({
  breadcrumbPages,
  currentPageName,
  data,
  dataPropertiesToShow,
  columsHeaderNames,
  events,
  pagination,
  texts,
}: Props<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    pagination.onPageChange(currentPage);
  }, [currentPage]);

  return (
    <>
      <Header />
      <ScreenContentWrapper variant="center">
        <Box w={"100%"} h={"100%"} mt={"2.375rem"}>
          {getPageCrumbreads(breadcrumbPages, currentPageName)}
          {getHeader(texts)}
          <TableContainer>
            <Table variant={"striped"}>
              <Thead>
                <Tr>{mapColumsHeaders(columsHeaderNames)}</Tr>
              </Thead>
              <Tbody>{mapTableRows(data, dataPropertiesToShow, events)}</Tbody>
            </Table>
          </TableContainer>
          {getPagination(pagination?.totalPages, currentPage, setCurrentPage)}
        </Box>
      </ScreenContentWrapper>
    </>
  );
}

function getPageCrumbreads(
  breadcrumbPages: BreadcrumbPage[],
  currentPageName: string
) {
  return (
    <PageBreadcrumbs
      pages={breadcrumbPages}
      currentPageName={currentPageName}
    />
  );
}
function getHeader(texts: Texts) {
  return (
    <>
      <Box mb={"1.625rem"}>
        <Heading as={"h1"} size={"lg"} mt={"1.25rem"}>
          {texts.title}
        </Heading>
        <Text as={"h2"} size={"sm"} mt={"1.25rem"}>
          {texts.caption}
        </Text>
      </Box>
    </>
  );
}

function mapColumsHeaders(names: string[]) {
  return names.map((name) => {
    return <Th key={name}>{name}</Th>;
  });
}

function mapTableRows<T extends IdObject>(
  dataProvider: T[],
  dataPropertiesToShow: (keyof T)[],
  events?: Events
) {
  return dataProvider.map((data) => {
    return (
      <Tr key={data.id}>
        {dataPropertiesToShow.map((property) => {
          return (
            <Td
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              maxW={"310px"}
              key={String(property)}
            >
              {String(data[property])}
            </Td>
          );
        })}
        {events && (
          <Td>
            <Stack direction={"row"} spacing={"16px"}>
              {events.onDelete && (
                <IconButton
                  aria-label="Remover"
                  icon={<DeleteIcon />}
                  fontSize={"16px"}
                  variant={"ghost"}
                  onClick={() => events.onDelete!(data.id)}
                />
              )}
              {events.onEdit && (
                <IconButton
                  aria-label="Alterar"
                  icon={<EditIcon />}
                  fontSize={"16px"}
                  variant={"ghost"}
                  onClick={() => events.onEdit!(data.id)}
                />
              )}
            </Stack>
          </Td>
        )}
      </Tr>
    );
  });
}

function getPagination(
  totalPages: number,
  currentPage: number,
  onPageChange: (page: number) => void
) {
  return (
    <Center mt={"1.625rem"}>
      {Array.from(Array(totalPages).keys()).map((pageIndex) => {
        const realPage = pageIndex + 1;
        return (
          <Button
            variant={realPage === currentPage ? "solid" : "ghost"}
            key={realPage}
            maxW={"16px"}
            onClick={() => onPageChange(realPage)}
          >
            {realPage}
          </Button>
        );
      })}
    </Center>
  );
}
