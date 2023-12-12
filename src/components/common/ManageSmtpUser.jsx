import React, { useState } from "react";
import { useGetDnsRecordsQuery } from "../../app/redux/features/slices/api/usersApiSlice";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Slide, Stack, Typography } from "@mui/material";
import { useCreateSmtpUserMutation } from "../../app/redux/features/slices/api/usersApiSlice";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ManageSmtpUser = ({ open, closeSmtp, domainID, smtpUsername }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { activeCompany } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [newSmtpUsername, setNewSmtpUsername] = useState("");

  const { data, isSuccess } = useGetDnsRecordsQuery({
    domain_id: domainID,
    company_id: activeCompany.id,
    token: userInfo.token,
  });

  console.log(data);

  const handleClose = () => {
    closeSmtp();
  };
  const handleSave = () => {};
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
        maxHeight="xl"
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Manage SMTP user
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2" sx={{ fontWeight: "400" }}>
              Employ your SMTP credentials for email sending, account
              authentication, and data tracking. The SMTP relay is an excellent
              option when you need a swift and uncomplicated solution to
              integrate into your website or automation platform, making it
              particularly advantageous for personal projects.
            </Typography>
          </DialogContentText>
          <Stack justifyContent={"center"} alignItems={"start"} spacing={3}>
            <Stack alignItems={"start"} justifyContent={"flex-start"} mt={2}>
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                SMTP Username
              </Typography>
              <TextField
                onChange={(e) => setNewSmtpUsername(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                variant="standard"
                placeholder={smtpUsername}
              />
            </Stack>
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
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageSmtpUser;
