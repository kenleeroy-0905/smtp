import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDomain } from "../../app/redux/features/slices/domain/domainSlice";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { useAddDomainMutation } from "../../app/redux/features/slices/api/usersApiSlice";
import CustomizedSnackbar from "./Snackbar";
import { setActivePath } from "../../app/redux/features/slices/global/globalSlice";

const DomainInput = ({ open, close, next, title, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { activeCompany } = useSelector((state) => state.user);
  const [validDomain, setValidDomain] = useState(false);
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
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

  const [addDomain] = useAddDomainMutation();

  const handleNext = async () => {
    setIsLoading(true);
    try {
      const res = await addDomain({
        action: "add",
        domain_name: domain,
        company_id: activeCompany.id,
        token: userInfo.token,
      }).unwrap();
      if (res.message === "Successfully add domain") {
        setIsLoading(false);
        toast.success("Domain added successfully");
        if (next) {
          dispatch(setSelectedDomain(res.data));
          next();
        } else {
          dispatch(setSelectedDomain(res.data));
          dispatch(setActivePath("dashboard"));
          navigate("/dashboard/verify-domain");
        }
        close();
      } else {
        setIsLoading(false);
        toast.error("Error adding domain. Please try again");
      }
    } catch (error) {
      console.log(error);
    }
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
            loadingIndicator={<CircularProgress size={20} />}
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
