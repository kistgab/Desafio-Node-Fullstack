import BodyIllustration from "@assets/images/body-illustration.svg";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";

type Props = {
  userName: string;
};

export function MainDashboardTitle({ userName }: Props) {
  return (
    <Flex alignItems={"center"}>
      <Image src={BodyIllustration} />

      <Box>
        <Heading as={"h2"}>Olá, {userName}</Heading>
        <Text>Confira todos os seus eventos e locais em um só lugar!</Text>
      </Box>
    </Flex>
  );
}
