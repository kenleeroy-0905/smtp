import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import VerificationComponent from "../components/common/VerificationComponent";
import HomeComponent from "../components/common/HomeComponent";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { activeCompany } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (activeCompany) {
  //     const domains = activeCompany.domain?.filter((domain) => {
  //       return domain.status === "active";
  //     });
  //     if (domains.length > 0) {
  //       setIsVerified(true);
  //     }
  //   }
  // }, [activeCompany]);
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
