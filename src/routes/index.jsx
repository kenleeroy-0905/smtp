import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import Domains from "../pages/Domains";
import VerifyDomain from "../pages/VerifyDomain";
import RegisterPage from "../pages/RegisterPage";
import EmailVerificationStatus from "../pages/EmailVerificationStatus";
import ManageDomain from "../pages/ManageDomain";
import EmailActivity from "../pages/EmailActivity";
import CompanyProfile from "../pages/CompanyProfile";
import ErrorHandler from "../errorHandler/ErrorHandler";
import HomePage from "../pages/HomePage";
import PricingPage from "../pages/PricingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorHandler />,
    children: [
      // {
      //   path: "/",
      //   index: true,
      //   element: <HomePage />,
      // },
      {
        path: "/",
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
        errorElement: <ErrorHandler />,
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
          {
            path: "manage-domain",
            index: true,
            element: <ManageDomain />,
          },
          {
            path: "profile",
            index: true,
            element: <CompanyProfile />,
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
      {
        path: "emails",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <EmailActivity />,
          },
        ],
      },
      {
        path: "pricing",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <PricingPage />,
          },
        ],
      },
    ],
  },
]);
