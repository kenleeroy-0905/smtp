import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import emailVerified from "../assets/images/verified email.png";

const EmailVerificationStatus = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      axios
        .get(`/user/verify.php?token=${token}`)
        .then((res) => {
          console.log(res);
          setIsVerified(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    verifyEmail();
  });
  return (
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
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={2}
        width={"60%"}
        height={"auto"}
        bgcolor={"whitesmoke"}
        p={8}
      >
        <img src={emailVerified} alt="email" height={300} width={300} />
      </Box>
    </Box>
  );
};

export default EmailVerificationStatus;
