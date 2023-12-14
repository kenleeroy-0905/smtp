import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Slide, Stack, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

import { CustomTextField } from "../../assets/utils";
import { useEditSmtpUserMutation } from "../../app/redux/features/slices/api/usersApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
    height: "100%",
  },
}));

const StyledTextField = styled(TextField)({
  "& value.Mui-focused": {
    color: "#00a3b1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#00a3b1",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00a3b1",
    },
    "&:hover fieldset": {
      borderColor: "#00a3b1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00a3b1",
    },
    "& .MuiInputBase-input": {
      color: "#00a3b1",
      textAlign: "left",
      padding: "0px 8px",
    },
  },
});

const ManageSmtpUser = ({
  open,
  closeSmtp,
  domainID,
  name,
  username,
  password,
  id,
}) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSmtpUsername, setNewSmtpUsername] = useState("");

  useEffect(() => {
    setNewSmtpUsername(name);
  }, [id]);

  const handleClose = () => {
    closeSmtp();
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  const [editSmtpUser] = useEditSmtpUserMutation();

  const handleSave = async () => {
    setIsSubmitting(true);
    if (name !== newSmtpUsername) {
      try {
        const res = await editSmtpUser({
          name: newSmtpUsername,
          smtp_id: id,
          domain_id: domainID,
          token: userInfo.token,
        }).unwrap();
        if (res.status === "success") {
          setIsSubmitting(false);
          toast.success("SMTP user successfully updated");
          handleClose();
        } else {
          setIsSubmitting(false);
          toast.error(
            "There's an error updating the SMTP user. Please try again"
          );
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      handleClose();
    }
  };
  return (
    <>
      <BootstrapDialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="customized-dialog-title"
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h4" sx={{ fontWeight: "700" }}>
            Manage SMTP user
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: "1rem" }}>
            <Typography variant="body2" sx={{ fontWeight: "400" }}>
              Employ your SMTP credentials for email sending, account
              authentication, and data tracking. The SMTP relay is an excellent
              option when you need a swift and uncomplicated solution to
              integrate into your website or automation platform, making it
              particularly advantageous for personal projects.
            </Typography>
          </DialogContentText>
          <Stack justifyContent={"center"} alignItems={"start"} spacing={3}>
            <Stack
              alignItems={"start"}
              justifyContent={"flex-start"}
              sx={{ width: "100%" }}
            >
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                SMTP Username
              </Typography>
              <CustomTextField
                onChange={(e) => setNewSmtpUsername(e.target.value)}
                value={newSmtpUsername}
                autoFocus
                id="name"
                type="text"
                fullWidth
                sx={{ width: "100%", height: "max-content" }}
              />
            </Stack>
            <Box
              width={"100%"}
              border={".5px solid #00a3b1"}
              borderRadius={2}
              p={2}
              height={"max-content"}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={2}
              >
                <Stack
                  direction={{ md: "row", sm: "column", xs: "column" }}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={{ width: "100%" }}
                >
                  <Stack
                    justifyContent={"flex-start"}
                    alignItems={"start"}
                    sx={{ width: "100%" }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "400" }}>
                      Server
                    </Typography>
                    <Tooltip title="Click to copy" placement="top">
                      <StyledTextField
                        onClick={() => handleCopy("relay2.vision-relay.com")}
                        value={"relay2.vision-relay.com"}
                        id="fullWidth"
                        multiline
                        disabled
                        sx={{
                          width: "80%",
                          height: "max-content",
                        }}
                      />
                    </Tooltip>
                  </Stack>
                  <Stack
                    justifyContent={"flex-start"}
                    alignItems={"start"}
                    sx={{ width: "80%" }}
                  >
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{ width: "100%" }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "400" }}>
                        Port
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "400" }}>
                        Connection Security: TLS
                      </Typography>
                    </Stack>

                    <Tooltip title="Click to copy" placement="top">
                      <StyledTextField
                        onClick={() => handleCopy("25")}
                        value={"25"}
                        id="fullWidth"
                        multiline
                        disabled
                        sx={{
                          width: "100%",
                          height: "max-content",
                        }}
                      />
                    </Tooltip>
                  </Stack>
                </Stack>
                <Stack
                  direction={{ md: "row", sm: "column", xs: "column" }}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={{ width: "100%" }}
                >
                  <Stack
                    justifyContent={"flex-start"}
                    alignItems={"start"}
                    sx={{ width: "100%" }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "400" }}>
                      Username
                    </Typography>
                    <Tooltip title="Click to copy" placement="top">
                      <StyledTextField
                        onClick={() => handleCopy(username)}
                        value={username}
                        id="fullWidth"
                        multiline
                        disabled
                        sx={{
                          width: "80%",
                          height: "max-content",
                        }}
                      />
                    </Tooltip>
                  </Stack>
                  <Stack
                    justifyContent={"flex-start"}
                    alignItems={"start"}
                    sx={{ width: "80%" }}
                  >
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{ width: "100%" }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "400" }}>
                        Password
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "400" }}>
                        Reset Credentials
                      </Typography>
                    </Stack>

                    <Tooltip title="Click to copy" placement="top">
                      <StyledTextField
                        type="password"
                        onClick={() => handleCopy(password)}
                        value={password}
                        id="fullWidth"
                        multiline
                        disabled
                        sx={{
                          width: "100%",
                          height: "max-content",
                        }}
                      />
                    </Tooltip>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "darkred",
              },
              textTransform: "none",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            loadingPosition="start"
            startIcon={<SendIcon />}
            variant="outlined"
            sx={{
              bgcolor: "#154b69",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#00a3b1",
              },
              textTransform: "none",
            }}
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default ManageSmtpUser;
