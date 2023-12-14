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
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { useAddDomainMutation } from "../../app/redux/features/slices/api/usersApiSlice";

const DomainInput = ({ open, close, next, title, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { activeCompany } = useSelector((state) => state.user);
  const [validDomain, setValidDomain] = React.useState(false);
  const [domain, setDomain] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClose = () => {
    close();
  };

  const handleDomainInput = (e) => {
    setDomain(e.target.value);
    const domainRegex = /^([\da-z.-]+)\.([a-z.]{1,6})([\/\w .-]*)*\/?$/;
    if (domainRegex.test(domain)) {
      setValidDomain(true);
    } else {
      setValidDomain(false);
      toast.error("Please enter a valid domain name");
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
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DomainInput;
