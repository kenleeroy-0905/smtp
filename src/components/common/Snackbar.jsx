import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbar({
  open,
  message,
  severity,
  handleClose,
}) {
  const handleCloseBar = () => {
    handleClose();
  };
  return (
    <Snackbar open={open} autoHideDuration={1000} onClose={handleCloseBar}>
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
