import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon />,
    state: "dashboard",
    path: "/dashboard",
  },
  {
    title: "Domains",
    icon: <PublicIcon />,
    state: "domains",
    path: "/domains",
  },
  {
    title: "Email Activity",
    icon: <EmailIcon />,
    state: "email",
    path: "/emails",
  },
];

const FooterMenu = () => {
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState("");
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        p={1.5}
        mt={5}
        borderTop={"1px solid #e0e0e0"}
        sx={{
          display: { md: "none", sm: "flex", xs: "flex" },
        }}
      >
        {menuItems.map((item, index) => {
          return (
            <Box
              key={item.title}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              p={1}
              bgcolor={activeState === item.state ? "#00a3b1" : "#fff"}
              borderRadius={1.5}
            >
              <Stack
                key={index}
                spacing={0.2}
                alignItems={"center"}
                justifyContent={"center"}
                onClick={() => {
                  setActiveState(item.state);
                  navigate(item.path);
                }}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#00a3b1",
                  },
                }}
              >
                <IconButton
                  sx={{
                    color: activeState === item.state ? "#fff" : "#154b69",
                  }}
                >
                  {item.icon}
                </IconButton>
                <Typography
                  variant={"caption"}
                  fontWeight={500}
                  sx={{
                    color: activeState === item.state ? "#fff" : "#154b69",
                  }}
                >
                  {item.title}
                </Typography>
              </Stack>
            </Box>
          );
        })}
        <Stack spacing={0.2} alignItems={"center"} justifyContent={"center"}>
          <IconButton onClick={() => navigate("/")}>
            <LogoutIcon
              sx={{
                color: "#154b69",
              }}
            />
          </IconButton>
          <Typography
            variant={"caption"}
            fontWeight={500}
            sx={{
              color: "#154b69",
            }}
          >
            Logout
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default FooterMenu;
