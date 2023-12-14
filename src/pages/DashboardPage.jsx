import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import VerificationComponent from "../components/common/VerificationComponent";
import HomeComponent from "../components/common/HomeComponent";
import { useSelector } from "react-redux";
import { useDomainListQuery } from "../app/redux/features/slices/api/usersApiSlice";

const DashboardPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { activeCompany } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);

  const { data } = useDomainListQuery({
    id: activeCompany?.id,
    token: userInfo?.token,
  });

  useEffect(() => {
    if (data) {
      data?.data?.filter((domain) => {
        return domain.status === "active";
      }).length > 0
        ? setIsVerified(true)
        : setIsVerified(false);
    }
  }, [data, activeCompany]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{ mt: 10 }}
      >
        {!isVerified ? <HomeComponent /> : <VerificationComponent />}
      </Grid>
    </>
  );
};

export default DashboardPage;
