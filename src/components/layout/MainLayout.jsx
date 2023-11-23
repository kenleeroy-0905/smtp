import { Box } from "@mui/material";
import React from "react";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import FooterMenu from "../common/FooterMenu";

const sidebarWidth = 350;

const MainLayout = () => {
  return (
    <Box display="flex">
      {/* sidebar */}
      <Sidebar sidebarWidth={sidebarWidth} />
      {/* sidebar */}
      {/* TODO: FIX SIDEBAR ON MOBILE VIEW */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100vh",
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
        }}
      >
        <Header />
        <Outlet />
        <FooterMenu />
      </Box>
    </Box>
  );
};

export default MainLayout;
