import OnTreeLogoSvg from "@assets/logos/ontree-logo.svg";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Flex, Link, Text, WrapItem } from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <Flex
      padding={"1.5rem 0"}
      justifyContent={"space-between"}
      maxW={"1300px"}
      ml={"auto"}
      mr={"auto"}
    >
      <NavLink to={"/"}>
        <Image src={OnTreeLogoSvg} alt="OnEntree logo" />
      </NavLink>

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
