import { Box, Center } from "@chakra-ui/layout";
import { Header } from "@ui/components/header/header.component";
import { MainDashboardTitle } from "@ui/screens/main-dashboard/components/header/main-dashboard-title.component";

export function MainDashboardScreen() {
  return (
    <>
      <Header />
      <Center>
        <Box w={"80%"} p={"3.25rem 5.125rem 1.5rem"}>
          <MainDashboardTitle userName="Mariana" />
        </Box>
      </Center>
    </>
  );
}
