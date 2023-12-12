import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Slide, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import ManageSmtpUser from "./ManageSmtpUser";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateSmtpUserDialog = ({ open, close, domainID }) => {
  const [smtpUsername, setSmtpUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [manageSmtpUser, setManageSmtpUser] = useState(false);

  const handleClose = () => {
    close();
  };

  const handleNext = () => {
    close();
    setManageSmtpUser(true);
  };

  const handleCloseManageSmtpUser = () => {
    setManageSmtpUser(false);
  };

  //   const handleCreateSmtpUser = async (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     try {
  //       const res = await createSmtpUser({
  //         name: smtpUsername,
  //         company_id: activeCompany.id,
  //         domain_id: domainID,
  //         token: userInfo.token,
  //       }).unwrap();
  //       if (res.message === "Successfully Create account") {
  //         setIsLoading(false);
  //         close();
  //       } else {
  //         setIsLoading(false);
  //         close();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Create SMTP User
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" sx={{ fontWeight: "400" }}>
              Generate a fresh SMTP user for sending emails, verifying your
              account, and monitoring data. The SMTP relay is an ideal choice
              when you seek a fast and straightforward solution to integrate
              into your website or automation platform, and it proves beneficial
              for personal projects.
            </Typography>
          </DialogContentText>
          <TextField
            onChange={(e) => setSmtpUsername(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="SMTP Username"
            type="text"
            fullWidth
            variant="standard"
          />
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
            loading={isLoading}
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
            onClick={handleNext}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <ManageSmtpUser
        open={manageSmtpUser}
        closeSmtp={handleCloseManageSmtpUser}
        smtpUsername={smtpUsername}
        domainID={domainID}
      />
    </>
  );
};

export default CreateSmtpUserDialog;
