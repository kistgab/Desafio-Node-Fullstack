import {
  Box,
  Flex,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
} from "@chakra-ui/react";

type Props<T> = {
  data: T[];
  keyProperty: keyof T;
  propertiesToShow: (keyof T)[];
  title: string;
};

export function SmallTable<T>({
  data,
  propertiesToShow,
  title,
  keyProperty,
}: Props<T>) {
  return (
    <Box
      w={"100%"}
      maxW={"600px"}
      p={"2rem 1.5rem"}
      bg={"#10141D"}
      borderRadius={"20px"}
    >
      <Flex justifyContent={"space-between"}>
        <Heading as={"h1"} size="md" mb={"1.5rem"}>
          {title}
        </Heading>
        <Link color={"#6D99FB"} textDecoration={"underline"}>
          Ver todos
        </Link>
      </Flex>
      <TableContainer>
        <Table variant="striped" size={"sm"}>
          <Tbody>{mapToTableRow(data, propertiesToShow, keyProperty)}</Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function mapToTableRow<T>(
  data: T[],
  propertiesToShow: (keyof T)[],
  keyProperty: keyof T
) {
  {
    return data.map((item) => {
      return (
        <tr key={String(item[keyProperty])}>
          {propertiesToShow.map((property) => (
            <Td
              h={"3.25rem"}
              maxW={"125px"}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              key={String(property)}
            >
              {String(item[property])}
            </Td>
          ))}
        </tr>
      );
    });
  }
}
