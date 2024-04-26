import { Box, Center } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  variant?: "center";
};

export function ScreenContentWrapper({ children, variant }: Props) {
  if (variant === "center") {
    return (
      <Center
        p={"2.25rem 0"}
        maxW={"1300px"}
        mr={"auto"}
        ml={"auto"}
        h={"100%"}
        w={"100%"}
      >
        {children}
      </Center>
    );
  }
  return (
    <Box p={"2.25rem 0"} w={"100%"} maxW={"1300px"} h={"100%"}>
      {children}
    </Box>
  );
}
