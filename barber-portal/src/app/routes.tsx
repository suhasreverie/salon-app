import { createBrowserRouter, Outlet } from "react-router";
import { Layout } from "./components/Layout";
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

function Root() {
  return (
    <Layout>
      <Outlet />
    </Layout>
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
    ],
  },
]);
