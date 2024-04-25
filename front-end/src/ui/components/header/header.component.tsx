import OnTreeLogoSvg from "@assets/logos/ontree-logo.svg";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Link, Text, WrapItem } from "@chakra-ui/layout";

export function Header() {
  return (
    <Flex padding={"1.5rem 6.75rem"} justifyContent={"space-between"}>
      <Box>
        <Image src={OnTreeLogoSvg} />
      </Box>

      <Flex flex={1} ml={"5.625rem"} gap={"1.5rem"}>
        <Link href="/">Home</Link>
        <Link href="/eventos">Eventos</Link>
        <Link href="/locais">Locais</Link>
      </Flex>

      <Flex alignItems={"center"} gap={".5rem"}>
        <WrapItem>
          <Avatar size={"sm"} name="T A" />
        </WrapItem>
        <Text>Olá, Nome</Text>
      </Flex>
    </Flex>
  );
}
