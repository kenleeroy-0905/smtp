import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  Typography,
  circularProgressClasses,
  colors,
} from "@mui/material";
import React, { useState } from "react";
import { images } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import Animate from "../components/common/Animate";
import CustomTextFieldComponent from "../components/common/CustomTextField";
import { validateEmail } from "../assets/utils";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SimpleBackdrop from "../components/common/Backdrop";
import axios from "axios";
import CustomizedSnackbar from "../components/common/Snackbar";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [lowerValid, setLowerValid] = useState(false);
  const [upperValid, setUpperValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [lengthValid, setLengthValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    password: "",
  });
  const handleClose = () => {
    setOpen(false);
  };

  const register = (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    const { company, name, email, password } = formData;
    if (emailError) {
      setOpen(true);
      setMessage("Email is invalid");
      setSeverity("error");
    } else if (!name || !company || !email || !password) {
      setOpen(true);
      setMessage("Please fill all the fields");
      setSeverity("error");
    } else {
      const data = {
        name: name,
        email: email,
        password: password,
        agree_condition: 1,
        company_name: company,
      };
      axios
        .post("/user/signup.php", data)
        .then((res) => {
          console.log(res);
          setOpenBackdrop(false);
          setOpen(true);
          setMessage("Application submitted successfully");
          setSeverity("success");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setOpenBackdrop(false);
          setOpen(true);
          setMessage("Error in submitting registration");
          setSeverity("error");
        });
    }
  };

  const changeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeHandler = (e) => {
    if (e.target.name === "email") {
      setEmailError(!validateEmail(e.target.value));
    }
    if (e.target.name === "password") {
      if (/[a-z]/.test(e.target.value)) {
        setLowerValid(true);
      } else {
        setLowerValid(false);
      }
      if (/[A-Z]/.test(e.target.value)) {
        setUpperValid(true);
      } else {
        setUpperValid(false);
      }
      if (/\d/.test(e.target.value)) {
        setNumberValid(true);
      } else {
        setNumberValid(false);
      }
      if (e.target.value.length >= 8) {
        setLengthValid(true);
      } else {
        setLengthValid(false);
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* background box */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "60%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${images.signUpBg})`,
        }}
      />
      {/* background box */}

      {/* Login form */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          height: "100%",
          width: isLoggedIn
            ? "100%"
            : { xl: "40%", lg: "50%", md: "60%", xs: "100%" },
          transition: "all 1s ease-in-out",
          bgcolor: colors.common.white,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: isLoggedIn ? 0 : 1,
            transition: "all 0.3s ease-in-out",
            height: "100%",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/* logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Animate type="fade" delay={0.5}>
              <img src={images.logo} alt="logo" height={120}></img>
              <Typography variant="h3" fontWeight="500">
                Let's Get Started
              </Typography>
              <Typography variant="h4" fontWeight="400">
                Sign up to continue!
              </Typography>
            </Animate>
          </Box>
          {/* logo */}

          {/* form */}
          <Box
            sx={{
              mt: 10,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Animate type="fade" sx={{ maxWidth: 400, width: "100%" }}>
              <Box
                component="form"
                maxWidth={400}
                width="100%"
                onSubmit={register}
              >
                <Stack spacing={3}>
                  <CustomTextFieldComponent
                    handler={changeHandler}
                    value={formData.company}
                    label={"Company Name"}
                    name="company"
                  />
                  <CustomTextFieldComponent
                    handler={changeHandler}
                    value={formData.name}
                    label={"Name"}
                    name="name"
                  />
                  <CustomTextFieldComponent
                    handler={changeHandler}
                    value={formData.email}
                    label={"Email Address"}
                    name="email"
                  />
                  <CustomTextFieldComponent
                    type="password"
                    handler={changeHandler}
                    value={formData.password}
                    label={"Password"}
                    name="password"
                    showPassword={showPassword}
                    setShowPassword={changeShowPassword}
                  />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack spacing={1} justifyContent="flex-start">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <TaskAltIcon
                          sx={{
                            color: lowerValid ? "#00a3b1" : "grey",
                            fontSize: "20px",
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          fontWeight="400"
                          sx={{ color: lowerValid ? "#00a3b1" : "grey" }}
                        >
                          One Lower Case
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <TaskAltIcon
                          sx={{
                            color: numberValid ? "#00a3b1" : "grey",
                            fontSize: "20px",
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          fontWeight="400"
                          sx={{ color: numberValid ? "#00a3b1" : "grey" }}
                        >
                          One Number
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack spacing={1} justifyContent="flex-start">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <TaskAltIcon
                          sx={{
                            color: upperValid ? "#00a3b1" : "grey",
                            fontSize: "20px",
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          fontWeight="400"
                          sx={{ color: upperValid ? "#00a3b1" : "grey" }}
                        >
                          One Upper Case
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <TaskAltIcon
                          sx={{
                            color: lengthValid ? "#00a3b1" : "grey",
                            fontSize: "20px",
                          }}
                        />
                        <Typography
                          variant="subtitle1"
                          fontWeight="400"
                          sx={{ color: lengthValid ? "#00a3b1" : "grey" }}
                        >
                          8 Characters Minimum
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <FormControlLabel
                    required
                    control={<Checkbox checked={checked} />}
                    label="I agree to all the Terms of Use"
                    onChange={() => setChecked(!checked)}
                  />
                  <Button
                    disabled={checked ? false : true}
                    type="submit"
                    size="large"
                    variant="contained"
                    sx={{
                      bgcolor: "#154b69",
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              </Box>
            </Animate>
          </Box>
          {/* form */}

          {/* footer */}
          <Box sx={{ textAlign: "center", p: 5, zIndex: 2 }}>
            <Animate type="fade" delay={1}>
              <Typography
                display="inline"
                fontWeight="bold"
                sx={{ "& > a": { color: "#154b69", ml: "5px" } }}
              >
                Already have an account -<Link to="/">Login now</Link>
              </Typography>
            </Animate>
          </Box>
          {/* footer */}
        </Box>
      </Box>
      {/* Login form */}

      {/* Alert Snackbar */}
      <CustomizedSnackbar
        open={open}
        message={message}
        severity={severity}
        handleClose={handleClose}
      />
      {/* Alert Snackbar */}

      {/* Loading Backdrop */}
      <SimpleBackdrop status={openBackdrop} />
      {/* Loading Backdrop */}
    </Box>
  );
};

export default RegisterPage;
