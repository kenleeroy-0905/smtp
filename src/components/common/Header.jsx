import {
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import HeaderMenu from "./HeaderMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import AccountsDialog from "./AccountsDialog";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAccountsDialog, setOpenAccountsDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleCloseAccountsDialog = () => {
    setOpenAccountsDialog(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Grid container alignItems="center" direction="row" sx={{ mt: 2 }}>
        <Grid
          item
          md={6}
          sm={12}
          sx={{
            display: { md: "flex", sm: "none", xs: "none" },
            justifyContent: "flex-start",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <img src={logo} alt="logo" style={{ width: 40, height: 40 }} />
              <Stack alignItems="flex-start">
                <Typography variant="h6" sx={{ fontWeight: "500" }}>
                  FutureVision
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: "400" }}>
                  Subscription: Basic
                </Typography>
              </Stack>
              <Tooltip title="Switch Account" arrow>
                <IconButton onClick={() => setOpenAccountsDialog(true)}>
                  <ExpandCircleDownIcon
                    sx={{
                      color: "#154b69",
                      "&:hover": {
                        color: "#00a3b1",
                      },
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
            <Button
              sx={{
                backgroundColor: "#154b69",
                "&:hover": {
                  backgroundColor: "#00a3b1",
                },
              }}
              variant="contained"
            >
              Upgrade
            </Button>
          </Stack>
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Stack sx={{ alignItems: { md: "flex-end", sm: "flex-start" } }}>
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                Test Name
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: "400" }}>
                test@thefuturevision.com
              </Typography>
            </Stack>
            <img src={logo} alt="logo" style={{ width: 40, height: 40 }} />
            <IconButton id="HeaderMenu" onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </Grid>
        <HeaderMenu anchor={anchorEl} open={open} close={handleClose} />
        <AccountsDialog
          open={openAccountsDialog}
          close={handleCloseAccountsDialog}
        />
      </Grid>
    </>
  );
};

export default Header;
