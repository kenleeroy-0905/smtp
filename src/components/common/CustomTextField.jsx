import React from "react";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
  "& value.Mui-focused": {
    color: "#00a3b1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#00a3b1",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#00a3b1",
    },
    "&:hover fieldset": {
      borderColor: "#00a3b1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00a3b1",
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
  },
});

const CustomTextFieldComponent = ({
  handler,
  value,
  name,
  label,
  helper,
  error,
  type,
}) => {
  return (
    <CustomTextField
      required
      id="outlined-required"
      name={name}
      label={label}
      fullWidth
      value={value}
      onChange={handler}
      helperText={helper}
      error={error}
      type={type && type}
    />
  );
};

export default CustomTextFieldComponent;
