import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteDomainMutation } from "../../app/redux/features/slices/api/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setIsGlobalLoading } from "../../app/redux/features/slices/global/globalSlice";
import { CircularProgress, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { setSelectedDomain } from "../../app/redux/features/slices/domain/domainSlice";
import { useNavigate } from "react-router-dom";

const DeleteDialog = ({ open, close, title, type, domain }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClose = () => {
    close();
  };

  const [deleteDomain] = useDeleteDomainMutation();

  const handleDeleteDomain = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(setIsGlobalLoading(true));
    try {
      const res = await deleteDomain({
        token: userInfo.token,
        id: domain,
        action: "delete",
      }).unwrap();
      console.log("success");
      console.log(res);
      setIsLoading(false);
      navigate("/domains");
      dispatch(setIsGlobalLoading(false));
      handleClose();
      toast.success("Domain deleted");
    } catch (err) {
      console.log("failed");
      console.log(err);
      setIsLoading(false);
      dispatch(setIsGlobalLoading(false));
      handleClose();
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this domain?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body1" fontWeight={"500"}>
              {`Deleting ${title} will remove all the data associated with it from our app.`}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={isLoading ? true : false}
            variant="contained"
            sx={{
              backgroundColor: "#154b69",
              "&:hover": {
                backgroundColor: "#00a3b1",
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
              backgroundColor: "red",
              borderColor: "red",
              "&:hover": {
                backgroundColor: "#ff5050",
                borderColor: "#ff5050",
              },
              color: "#fff",
            }}
            onClick={type === "domain" ? handleDeleteDomain : handleClose}
            loadingIndicator={<CircularProgress size={20} />}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
