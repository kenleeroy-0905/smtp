import {
  Box,
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useState } from "react";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { viewOptions } from "../../assets/utils";
import EmailOverview from "./EmailOverview";
import DomainOverview from "./DomainOverview";
import EmailVerificationOverview from "./EmailVerificationOverview";
import { useSelector } from "react-redux";

const HomeComponent = () => {
  const activeCompany = useSelector((state) => state.user.activeCompany);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [emailLimit, setEmailLimit] = useState(null);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (activeCompany.package.name === "Free") {
      setEmailLimit(1000);
    } else if (activeCompany.package.name === "Basic") {
      setEmailLimit(50000);
    } else {
      setEmailLimit(100000);
    }
  }, [activeCompany]);

  return (
    <>
      <Grid container width={"100%"} height={"100%"} gap={4}>
        <Grid
          item
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "500" }}>
            Howdy, Test
          </Typography>
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
          mt={2}
          p={2}
          bgcolor="#f3f4f6"
          borderRadius={1.5}
          border={"1px solid  #164c68"}
        >
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"flex-start"}
            spacing={2}
          >
            <Box
              p={1}
              borderRadius={1}
              bgcolor={"#00a3b1"}
              display={"flex"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
            >
              <MarkEmailReadIcon sx={{ color: "#fff" }} />
            </Box>

            <Stack
              alignItems="flex-start"
              spacing={1}
              justifyContent={"flex-start"}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "500", color: "#00a3b1" }}
              >
                Your account is verified!
              </Typography>
              <Typography variant="body1">
                Congratulations, your account approval is complete, allowing you
                to send up to {emailLimit} emails monthly. If you require
                additional capacity, simply click the upgrade button below to
                order a plan. The complimentary plan encompasses emails per
                month.
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#154b69",
                  "&:hover": {
                    backgroundColor: "#00a3b1",
                  },
                  mt: 2,
                }}
                variant="contained"
              >
                Upgrade
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
          mt={2}
          p={0}
          bgcolor="#f3f4f6"
          borderRadius={1.5}
          height={"100%"}
          border={".5px solid  #164c68"}
        >
          <Stack spacing={2} p={2} border={".5px solid #164c68"}>
            <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h5" fontWeight={"500"} color={"#00a3b1"}>
                Account Overview
              </Typography>
              <List
                component="nav"
                aria-label="View settings"
                sx={{
                  maxWidth: 360,
                  border: ".5px solid #00a3b1",
                  borderRadius: 1,
                }}
              >
                <ListItemButton
                  id="view-button"
                  aria-haspopup="listbox"
                  aria-controls="view-menu"
                  aria-label="Last Month"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
                >
                  <ListItemText primary={viewOptions[selectedIndex]} />
                  <ListItemIcon sx={{ ml: 0.5 }}>
                    <KeyboardArrowDownIcon />
                  </ListItemIcon>
                </ListItemButton>
              </List>
              <Menu
                id="view-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "viewbutton",
                  role: "listbox",
                }}
              >
                {viewOptions.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Stack>
          </Stack>
          <EmailOverview />
          <DomainOverview />
          <EmailVerificationOverview />
        </Grid>
      </Grid>
    </>
  );
};

export default HomeComponent;
