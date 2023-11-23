import { Grid } from "@mui/material";
import React, { useState } from "react";
import Header from "../components/common/Header";
import VerificationComponent from "../components/common/VerificationComponent";
import HomeComponent from "../components/common/HomeComponent";

const DashboardPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{ mt: 10 }}
      >
        {isVerified ? <HomeComponent /> : <VerificationComponent />}
      </Grid>
    </>
  );
};

export default DashboardPage;
