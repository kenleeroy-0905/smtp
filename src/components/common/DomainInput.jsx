import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DomainInput = ({ open, close, next, setDomain, title, type }) => {
  const [chosenDomain, setChosenDomain] = React.useState("");
  const handleClose = () => {
    close();
  };
  const handleNext = () => {
    setDomain(chosenDomain);
    if (next) {
      next();
    }
    close();
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
            onChange={(e) => setChosenDomain(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
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
          <Button
            onClick={handleNext}
            sx={{
              bgcolor: "#154b69",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#00a3b1",
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DomainInput;
