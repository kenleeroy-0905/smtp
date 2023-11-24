import React from "react";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

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
  showPassword,
  setShowPassword,
}) => {
  const changeShowPassword = () => {
    setShowPassword();
  };
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
      type={showPassword ? "text" : type}
      InputProps={{
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={changeShowPassword}>
                {showPassword ? (
                  <VisibilityIcon sx={{ color: "#00a3b1" }} />
                ) : (
                  <VisibilityOffIcon sx={{ color: "#154b69" }} />
                )}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
};

export default CustomTextFieldComponent;
