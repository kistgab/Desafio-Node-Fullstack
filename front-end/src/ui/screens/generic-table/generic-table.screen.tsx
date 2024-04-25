import { DeleteIcon, EditIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
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
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type IdObject = {
  id: string;
};

type Events = {
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (id: string) => Promise<void>;
  onCreateHref: string;
};

type Texts = {
  searchBarPlaceholder: string;
  title: string;
  caption: string;
  addButtonLabel: string;
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
  setSearchArgument: (arg: string) => void;
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
  setSearchArgument,
}: Props<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    pagination.onPageChange(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchArgument(search);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <>
      <Header />
      <ScreenContentWrapper variant="center">
        <Box w={"100%"} h={"100%"} mt={"2.375rem"}>
          {getPageCrumbreads(breadcrumbPages, currentPageName)}
          {getHeader(texts)}
          <Box>
            <Flex justifyContent={"space-between"} mb={"1.5rem"}>
              <InputGroup maxW={"400px"}>
                <InputLeftElement>
                  <Search2Icon />
                </InputLeftElement>
                <Input
                  placeholder={texts.searchBarPlaceholder}
                  value={search}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                />
              </InputGroup>

              {events?.onCreateHref && (
                <Link to={events.onCreateHref}>
                  <Button
                    bg={"#EBF0F9"}
                    color={"#333B49"}
                    _hover={{ bg: "#d4d8e0" }}
                  >
                    {texts.addButtonLabel}
                  </Button>
                </Link>
              )}
            </Flex>
            <TableContainer>
              <Table variant={"striped"}>
                <Thead>
                  <Tr>{mapColumsHeaders(columsHeaderNames)}</Tr>
                </Thead>
                <Tbody>
                  {mapTableRows(data, dataPropertiesToShow, events)}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
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
