import { ChakraProvider } from "@chakra-ui/react";
import { router } from "@router/router";
import theme from "libs/chakra-config/theme";
import { RouterProvider } from "react-router-dom";

function App() {
  // configDotenv();
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
