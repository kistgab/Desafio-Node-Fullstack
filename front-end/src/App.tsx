import theme from "@chakra-config/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { router } from "@router/router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
