import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop({ status }) {
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={status}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}
