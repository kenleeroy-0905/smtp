import { Stack, TextField, Tooltip, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { CustomTextField } from "../../assets/utils";
import React, { useState } from "react";

const VerifyDomainTxt = ({ mainTxt, secondaryTxt, textField }) => {
  const [open, setOpen] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(textField);
    setOpen(true);
  };

  return (
    <>
      <Stack spacing={1.5}>
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          {mainTxt}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "500", color: "#535353de", maxWidth: "800px" }}
        >
          {secondaryTxt}
        </Typography>
        {textField && (
          <Tooltip title="Click to copy" placement="top">
            <CustomTextField
              onClick={handleCopy}
              value={textField}
              id="fullWidth"
              sx={{ width: "800px" }}
            />
          </Tooltip>
        )}
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        message="Copied to clipboard"
      />
    </>
  );
};

export default VerifyDomainTxt;
