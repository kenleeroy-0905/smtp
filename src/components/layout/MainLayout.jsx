import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Sidebar from "../common/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import FooterMenu from "../common/FooterMenu";
import { useSelector } from "react-redux";

const sidebarWidth = 350;

const MainLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);
  return (
    <Box display="flex">
      {/* sidebar */}
      <Sidebar sidebarWidth={sidebarWidth} />
      {/* sidebar */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100vh",
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
          overflow: "auto",
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
