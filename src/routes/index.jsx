import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import Domains from "../pages/Domains";
import VerifyDomain from "../pages/VerifyDomain";
import RegisterPage from "../pages/RegisterPage";
import EmailVerificationStatus from "../pages/EmailVerificationStatus";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/login",
        index: true,
        element: <LoginPage />,
      },
      {
        path: "signup",
        index: true,
        element: <RegisterPage />,
      },
      {
        path: "verify-email",
        index: true,
        element: <EmailVerificationStatus />,
      },
      {
        path: "dashboard",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "verify-domain",
            index: true,
            element: <VerifyDomain />,
          },
        ],
      },
      {
        path: "domains",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Domains />,
          },
        ],
      },
    ],
  },
]);
