import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailVerified from "../assets/images/verified email.png";
import notVerified from "../assets/images/not-verified.png";
import SimpleBackdrop from "../components/common/Backdrop";
import CustomizedSnackbar from "../components/common/Snackbar";
import Animate from "../components/common/Animate";
import ConfettiExplosion from "react-confetti-explosion";

const EmailVerificationStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isExploding, setIsExploding] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    const verifyEmail = async () => {
      setIsLoading(true);
      await axios
        .get(`/user/verify.php?token=${token}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.statusCode === 401) {
            setIsLoading(false);
            setIsVerified(false);
            setIsError(true);
            const message = res.data.message.toUpperCase();
            setErrorMessage(message);
            return;
          } else {
            setIsVerified(true);
            setIsLoading(false);
            setIsExploding(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    verifyEmail();
  }, []);

  return (
    <Animate type="fade" delay={0.5}>
      {isLoading ? (
        <Box
          position="relative"
          height="100vh"
          bgcolor={"#00a3b1"}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Box>
      ) : (
        <Box
          position="relative"
          height="100vh"
          bgcolor={"#00a3b1"}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SimpleBackdrop status={isLoading} />

          {isVerified ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              gap={2}
              borderRadius={2}
              width={"50%"}
              height={"auto"}
              bgcolor={"whitesmoke"}
              p={8}
            >
              <Box sx={{ width: "100%" }}>
                <img
                  src={emailVerified}
                  alt="email"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>

              <Typography variant="h3" fontWeight={"500"}>
                Congratulations!
              </Typography>
              <Typography variant="h5" fontWeight={"500"}>
                Your email has been verified! Please login to continue.
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#154b69",
                  "&:hover": {
                    backgroundColor: "#00a3b1",
                  },
                }}
                variant="contained"
                size="large"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    navigate("/");
                  }, 1000);
                }}
              >
                Login
              </Button>
            </Box>
          ) : (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              gap={2}
              borderRadius={2}
              width={"50%"}
              height={"auto"}
              bgcolor={"whitesmoke"}
              p={8}
            >
              {isExploding && (
                <ConfettiExplosion
                  force={0.8}
                  duration={3000}
                  particleCount={250}
                  width={1600}
                />
              )}
              <Box
                sx={{ width: "100%" }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <img
                  src={
                    errorMessage === "THIS TOKEN IS ALREADY UPDATED"
                      ? emailVerified
                      : notVerified
                  }
                  alt="email"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
              <Typography variant="h5" fontWeight={"500"}>
                {errorMessage === "THIS TOKEN IS ALREADY UPDATED"
                  ? "You are already verified. Please Login to continue."
                  : "Verification Failed!"}
              </Typography>
              {errorMessage === "THIS TOKEN IS ALREADY UPDATED" ? (
                <Button
                  sx={{
                    backgroundColor: "#154b69",
                    "&:hover": {
                      backgroundColor: "#00a3b1",
                    },
                  }}
                  variant="contained"
                  size="large"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      navigate("/");
                    }, 1000);
                  }}
                >
                  Login
                </Button>
              ) : (
                <>
                  <Typography variant="h5" fontWeight={"500"}>
                    Please check your email again or Contact Us.
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: "#154b69",
                      "&:hover": {
                        backgroundColor: "#00a3b1",
                      },
                    }}
                    variant="contained"
                    href="mailto:info@thefuturevision.com"
                  >
                    Contact Us
                  </Button>
                </>
              )}
            </Box>
          )}
          <CustomizedSnackbar
            open={isError}
            message={
              errorMessage === "THIS TOKEN IS ALREADY UPDATED"
                ? "You are already verified. Please Login to continue."
                : errorMessage
            }
            severity={
              errorMessage === "THIS TOKEN IS ALREADY UPDATED"
                ? "success"
                : "error"
            }
            handleClose={() => setIsError(false)}
          />
        </Box>
      )}
    </Animate>
  );
};

export default EmailVerificationStatus;
