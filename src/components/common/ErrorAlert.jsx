import * as React from "react";
import Alert from "@mui/material/Alert";

const ErrorAlert = ({ message }) => {
  return (
    <>
      <Alert variant="filled" severity="error">
        {message}
      </Alert>
    </>
  );
};

export default ErrorAlert;
