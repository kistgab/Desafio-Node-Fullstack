import { CreateEventScreen } from "@ui/screens/create-event/create-event.screen";
import { CreatePlaceScreen } from "@ui/screens/create-place/create-place.screen";
import { EventsScreen } from "@ui/screens/events/events.screen";
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
    path: "/locais/criar",
    element: <CreatePlaceScreen />,
  },
  {
    path: "/eventos",
    element: <EventsScreen />,
  },
  {
    path: "/eventos/criar",
    element: <CreateEventScreen />,
  },
]);
