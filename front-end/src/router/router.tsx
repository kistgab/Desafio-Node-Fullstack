import { EventsScreen } from "@ui/screens/events/events-screen.screen";
import { MainDashboardScreen } from "@ui/screens/main-dashboard/main-dashboard.screen";
import { PlacesScreen } from "@ui/screens/places/places.screen";
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
  {
    path: "/eventos",
    element: <EventsScreen />,
  },
]);
