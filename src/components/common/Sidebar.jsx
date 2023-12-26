import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SportsMotorsportsOutlinedIcon from "@mui/icons-material/SportsMotorsportsOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  colors,
} from "@mui/material";
import { images } from "../../assets";
import Animate from "./Animate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/redux/features/slices/auth/authSlice";
import { setActiveCompany } from "../../app/redux/features/slices/user/userSlice";
import { setActivePath } from "../../app/redux/features/slices/global/globalSlice";

const menus = [
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

const serviceMenus = [
  {
    title: "Mortage",
    icon: <OtherHousesOutlinedIcon />,
    state: "mortage",
  },
  {
    title: "Car loans",
    icon: <DirectionsCarFilledOutlinedIcon />,
    state: "carloan",
  },
  {
    title: "Insurance",
    icon: <SportsMotorsportsOutlinedIcon />,
    state: "insurance",
  },
];

const investmentMenus = [
  {
    title: "Stocks reade",
    icon: <SwapHorizOutlinedIcon />,
    state: "stocktrade",
  },
  {
    title: "Finance advice",
    icon: <ChatBubbleOutlineOutlinedIcon />,
    state: "financeadvice",
  },
  {
    title: "Savings accounts",
    icon: <SavingsOutlinedIcon />,
    state: "savingaccount",
  },
];

const Sidebar = ({ sidebarWidth }) => {
  const isGlobalLoading = useSelector((state) => state.global.isGlobalLoading);
  const activePath = useSelector((state) => state.global.activePath);

  const navigate = useNavigate();
  const [activeState, setActiveState] = useState(activePath);
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveState(activePath);
  }, [activePath]);

  const logOut = () => {
    dispatch(logout());
    dispatch(setActiveCompany(null));
    navigate("/");
  };

  const MenuItem = (props) => {
    return (
      <ListItem
        key={props.index}
        disableGutters
        disablePadding
        sx={{ py: 0.5 }}
      >
        <ListItemButton
          disabled={isGlobalLoading ? true : false}
          sx={{
            borderRadius: "10px",
            bgcolor: activeState === props.item.state ? "#154b69" : "",
            color: activeState === props.item.state ? colors.common.white : "",
            "&:hover": {
              bgcolor: activeState === props.item.state ? "#5cc4cd" : "",
              color:
                activeState === props.item.state ? colors.common.white : "",
            },
          }}
          onClick={
            props.item.title === "Logout"
              ? logOut
              : () => {
                  setActiveState(props.item.state);
                  dispatch(setActivePath(props.item.state));
                  navigate(props.item.path);
                }
          }
        >
          <ListItemIcon
            sx={{
              minWidth: "40px",
              color:
                activeState === props.item.state ? colors.common.white : "",
            }}
          >
            {props.item.icon}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography fontWeight={600}>{props.item.title}</Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <Box
      padding={3}
      paddingBottom={0}
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {/* logo */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Animate type="fade" delay={1}>
          <img src={images.logo} alt="logo" height={60} />
        </Animate>
      </Box>
      {/* logo */}

      <Animate sx={{ flexGrow: 1 }}>
        <Paper
          elevation={0}
          square
          sx={{
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            p: 2,
            height: "100%",
            boxShadow:
              "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
          }}
        >
          {/* menu group 1 */}
          <List>
            {menus.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={item.state === activeState}
              />
            ))}
          </List>
          <List>
            <MenuItem item={{ title: "Logout", icon: <LogoutIcon /> }} />
          </List>
          {/* menu group 1 */}
        </Paper>
      </Animate>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: sidebarWidth },
        flexShrink: { md: 0 },
      }}
    >
      {/* large screen */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
            borderWidth: 0,
            bgcolor: "transparent",
            "::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      {/* large screen */}
    </Box>
  );
};

export default Sidebar;
