import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDomain } from "../../app/redux/features/slices/domain/domainSlice";
import CustomizedSnackbar from "./Snackbar";
import { setChosenDomain } from "../../app/redux/features/actions/actions";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

const DomainInput = ({ open, close, next, title, type }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { activeCompany } = useSelector((state) => state.user);
  const [validDomain, setValidDomain] = React.useState(false);
  const [domain, setDomain] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const handleClose = () => {
    close();
  };

  const handleCloseSnackbar = () => {
    setIsError(false);
  };

  const handleDomainInput = (e) => {
    setDomain(e.target.value);
    const domainRegex = /^([\da-z.-]+)\.([a-z.]{1,6})([\/\w .-]*)*\/?$/;
    if (domainRegex.test(domain)) {
      setValidDomain(true);
      setIsError(false);
    } else {
      setValidDomain(false);
      setIsError(true);
      setMessage("Please enter a valid domain");
      setSeverity("warning");
    }
  };

  const handleNext = async () => {
    setIsLoading(true);
    const data = await setChosenDomain(
      domain,
      activeCompany.id,
      userInfo.token
    );
    console.log(data);
    if (data.data.message === "Successfully add domain") {
      dispatch(setSelectedDomain(domain));
      setIsLoading(false);
      setMessage(data.data.message);
      setSeverity("success");
      setIsError(true);
      next();
      close();
    } else {
      setIsError(true);
      setMessage(data.data.message);
      setSeverity("error");
      setIsLoading(false);
    }

    // if (next) {
    //   next();
    // }
    // close();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="domain"
            label={type === "domain" ? "Domain Name" : "Account Name"}
            type="text"
            fullWidth
            variant="standard"
            placeholder={type === "domain" ? "example.com" : "Account Name"}
            onChange={handleDomainInput}
            disabled={isLoading ? true : false}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={isLoading ? true : false}
            sx={{
              bgcolor: "red",
              color: "#fff",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
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
            }}
            onClick={handleNext}
            disabled={validDomain ? false : true}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbar
        open={isError}
        message={message}
        severity={severity}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};

export default DomainInput;
