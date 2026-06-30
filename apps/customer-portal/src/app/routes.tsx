import { createBrowserRouter, Outlet } from "react-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLiveStore } from "../store/liveStore";
import { Layout } from "./components/Layout";

const queryClient = new QueryClient();
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { SelectService } from "./components/SelectService";
import { ChooseBarber } from "./components/ChooseBarber";
import { SelectDateTime } from "./components/SelectDateTime";
import { ReviewBooking } from "./components/ReviewBooking";
import { Confirmation } from "./components/Confirmation";
import { MyAppointments } from "./components/MyAppointments";
import { AppointmentDetails } from "./components/AppointmentDetails";
import { BarberProfile } from "./components/BarberProfile";
import { JoinQueue } from "./components/JoinQueue";
import { QueueStatus } from "./components/QueueStatus";

import { Profile } from "./components/Profile";
import { EditProfile } from "./components/EditProfile";
import { NotificationSettings } from "./components/NotificationSettings";
import { SavedPreferences } from "./components/SavedPreferences";

function Root() {
  const connect = useLiveStore((state) => state.connect);
  
  useEffect(() => {
    connect("ws://localhost:8000/ws");
  }, [connect]);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Outlet />
      </Layout>
    </QueryClientProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "book/service", Component: SelectService },
      { path: "book/barber", Component: ChooseBarber },
      { path: "book/datetime", Component: SelectDateTime },
      { path: "book/review", Component: ReviewBooking },
      { path: "book/confirmation", Component: Confirmation },
      { path: "appointments", Component: MyAppointments },
      { path: "appointment/:id", Component: AppointmentDetails },
      { path: "barber/:id", Component: BarberProfile },
      { path: "queue/join", Component: JoinQueue },
      { path: "queue/status", Component: QueueStatus },
      { path: "profile", Component: Profile },
      { path: "profile/edit", Component: EditProfile },
      { path: "profile/notifications", Component: NotificationSettings },
      { path: "profile/preferences", Component: SavedPreferences },
    ],
  },
]);
