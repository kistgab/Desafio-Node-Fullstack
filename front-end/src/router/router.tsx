import { MainDashboardScreen } from "@ui/screens/main-dashboard/main-dashboard.screen";
import { PlacesScreen } from "@ui/screens/places-screen/places-screen.screen";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainDashboardScreen />,
  },
  {
    path: "/locais",
    element: <PlacesScreen />,
  },
]);
