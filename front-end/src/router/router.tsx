import { MainDashboardScreen } from "@ui/screens/main-dashboard/main-dashboard.screen";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainDashboardScreen />,
  },
]);
