import { Stack, Tooltip, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { CustomTextField } from "../../assets/utils";
import React, { useState } from "react";
import { SealCheck, SealWarning } from "@phosphor-icons/react";

const VerifyDomainTxt = ({ mainTxt, secondaryTxt, textField, error, type }) => {
  const [open, setOpen] = useState(false);
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textField).then(
        () => {
          setOpen(true);
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    } else {
      // Fallback for browsers that don't support the Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = textField;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        const msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };
  return (
    <>
      <Stack spacing={1.5} sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          {mainTxt}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "500", color: "#535353de", maxWidth: "800px" }}
        >
          {secondaryTxt}
        </Typography>
        {error === true && (
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            spacing={1}
          >
            <SealWarning size={32} color="#ff5050" />
            <Typography
              variant="body1"
              sx={{ fontWeight: "500", color: "#ff5050", maxWidth: "800px" }}
            >
              This record is not correct!
            </Typography>
          </Stack>
        )}
        {error === false && type === "record" ? (
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            spacing={1}
          >
            <SealCheck size={32} color="green" />
            <Typography
              variant="body1"
              sx={{ fontWeight: "500", color: "green", maxWidth: "800px" }}
            >
              This record is correct!
            </Typography>
          </Stack>
        ) : null}

        {textField && (
          <Tooltip title="Click to copy" placement="top">
            <CustomTextField
              onClick={handleCopy}
              value={textField}
              id="fullWidth"
              sx={{
                width: "100%",
              }}
              multiline
              iserror={error}
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
