import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
  colors,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import { images } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import Animate from "../components/common/Animate";
import SimpleBackdrop from "../components/common/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useResendEmailVerificationMutation,
} from "../app/redux/features/slices/api/usersApiSlice";
import { setCredentials } from "../app/redux/features/slices/auth/authSlice";
import { fetchActiveCompany } from "../assets/utils";
import { setActiveCompany } from "../app/redux/features/slices/user/userSlice";
import CustomizedSnackbar from "../components/common/Snackbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [severity, setSeverity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/domains");
      }, 1000);
    }
  }, [userInfo, navigate]);

  const [resendEmailVerification] = useResendEmailVerificationMutation();

  const resendVerificationEmail = async () => {
    try {
      const res = await resendEmailVerification({ token }).unwrap();
      setIsError(true);
      setSeverity("success");
      setErrorMessage("Verification email sent successfully");
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (err) {
      return console.log(err?.data?.message || err?.error);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [login] = useLoginMutation();

  const onSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = formData;
    try {
      const res = await login({ email, password }).unwrap();
      if (res.status === "Success") {
        if (res.data.email_verify !== "true") {
          setIsLoading(false);
          setToken(res.data.token);
          setOpen(true);
          setSeverity("success");
          setErrorMessage(res.message);
        } else {
          dispatch(setCredentials(res.data));
          dispatch(setActiveCompany(fetchActiveCompany(res.data.company)));
          setIsError(true);
          setIsLoading(false);
          setSeverity("success");
          setErrorMessage(res.message);
          setTimeout(() => {
            navigate("/domains");
          }, 1000);
        }
      } else {
        setIsError(true);
        setSeverity("error");
        setErrorMessage("Incorrect email or password");
        setIsLoading(false);
      }
    } catch (err) {
      return console.log(err?.data?.message || err?.error);
    }
  };

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      <SimpleBackdrop status={isLoading} />
      {/* background box */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "70%",
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
            : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
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
          <Box
            sx={{
              textAlign: "center",
              p: 5,
              mb: { xs: 5, sm: 5, md: 5, lg: 0, xl: 0 },
            }}
          >
            <Animate type="fade" delay={0.5}>
              <img src={images.logo} alt="logo" height={"120"}></img>
              <Typography variant="h5" fontWeight="500">
                Sign in to your V-Relay Account
              </Typography>
            </Animate>
          </Box>
          {/* logo */}

          {/* form */}
          <Box
            sx={{
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
                onSubmit={onSignIn}
              >
                <Stack spacing={3}>
                  <TextField
                    label="Email Address"
                    type="email"
                    name="email"
                    fullWidth
                    onChange={onChange}
                  />
                  <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    fullWidth
                    onChange={onChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <VisibilityIcon sx={{ color: "#00a3b1" }} />
                            ) : (
                              <VisibilityOffIcon sx={{ color: "#154b69" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    sx={{
                      bgcolor: "#154b69",
                    }}
                  >
                    sign in
                  </Button>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                      />
                    </FormGroup>
                    <Typography color="error" fontWeight="bold">
                      <Link to="#">Forgot password?</Link>
                    </Typography>
                  </Stack>
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
                Don't have an account -<Link to="/signup">Register now</Link>
              </Typography>
            </Animate>
          </Box>
          {/* footer */}
        </Box>
      </Box>
      {/* Login form */}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={() => setOpen(false)}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "#d32f2f" }}>
          {"Email is not verified!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontWeight: 500 }}
          >
            Your Email is not yet verified. Please check your email and verify.
            If you did not receive any email, please click on resend button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              resendVerificationEmail();
            }}
            autoFocus
            sx={{
              backgroundColor: "#154b69",
              "&:hover": {
                backgroundColor: "#00a3b1",
              },
            }}
            variant="contained"
          >
            Resend
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbar
        open={isError}
        message={errorMessage}
        severity={severity}
        handleClose={() => setIsError(false)}
      />
    </Box>
  );
};

export default LoginPage;
