import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

type Props = {
  icon: string;
  title: string;
  text: string;
  buttonText: string;
  bgColor: string;
  href: string;
};

export function MainDashboardOptionMenuButton({
  buttonText,
  icon,
  text,
  title,
  bgColor,
  href,
}: Props) {
  return (
    <Box
      w={"100%"}
      bg={bgColor}
      p={"1.5rem"}
      borderRadius={"16px"}
      maxW={"600px"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"1.5rem"}
      >
        <Box flex={2} mr={"16px"}>
          <Flex gap={".5rem"}>
            <Image sizes={"sm"} src={icon} alt={`${title} icon`} />
            <Heading>{title}</Heading>
          </Flex>
          <Text>{text}</Text>
        </Box>
        <Link to={href}>
          <Button
            variant={"solid"}
            bg={"#CAD6EC"}
            color={"#10141D"}
            _hover={{ bg: "#828fa8", color: "white" }}
          >
            {buttonText}
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
