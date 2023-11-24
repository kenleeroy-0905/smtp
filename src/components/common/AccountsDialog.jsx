import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slide from "@mui/material/Slide";
import { Box, Grid, Stack, Tooltip } from "@mui/material";
import Logo from "../../assets/images/logo.png";
import DeleteIcon from "@mui/icons-material/Delete";
import DomainInput from "./DomainInput";
import { useDispatch } from "react-redux";
import { setActiveCompany } from "../../app/redux/features/slices/user/userSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AccountsDialog = ({ open, close, users }) => {
  const [domain, setDomain] = React.useState("");
  const [openDomainInput, setOpenDomainInput] = React.useState(false);
  const [accounts, setAccounts] = React.useState(users);
  const dispatch = useDispatch();
  const handleClose = () => {
    close();
  };
  const handleCloseDomainInput = () => {
    setOpenDomainInput(false);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "#c8faff" }}>
          <Toolbar>
            <Tooltip title="Back" arrow>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <ArrowBackIcon sx={{ color: "#154b69" }} />
              </IconButton>
            </Tooltip>
            <Typography
              sx={{ ml: 2, flex: 1, color: "#154b69" }}
              variant="h6"
              component="div"
            >
              Choose Account
            </Typography>
            <Button
              autoFocus
              sx={{
                backgroundColor: "#154b69",
                "&:hover": {
                  backgroundColor: "#00a3b1",
                },
              }}
              variant="contained"
            >
              Add Account
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          margin="auto"
          container
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          {accounts?.map((account) => {
            return (
              <Box
                key={account?.name}
                bgcolor="#f4f4f5"
                px={4}
                py={3}
                borderRadius={2}
                width={{ xs: "90%", sm: "75%", md: "60%", lg: "510px" }}
                height={"120px"}
                display="flex"
                justifyContent="start"
                alignItems="center"
                sx={{
                  "&:hover": {
                    backgroundColor: "#d6ebed",
                  },
                }}
                onClick={() => {
                  dispatch(setActiveCompany(account));
                  handleClose();
                }}
              >
                <Stack
                  account={account?.name}
                  width="100%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <img
                      src={Logo}
                      alt="logo"
                      style={{ width: 40, height: 40 }}
                    />
                    <Stack alignItems="flex-start">
                      <Typography variant="h6" sx={{ fontWeight: "400" }}>
                        {account?.name}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Button
                    sx={{
                      backgroundColor: "red",
                      "&:hover": {
                        backgroundColor: "#ff6b6b",
                      },
                    }}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </Stack>
              </Box>
            );
          })}
        </Grid>
        {/* <DomainInput
          type={"account"}
          title={"Enter New Account Name:"}
          open={openDomainInput}
          close={handleCloseDomainInput}
          next={handleNext}
          setDomain={setDomain}
        /> */}
      </Dialog>
    </>
  );
};

export default AccountsDialog;
