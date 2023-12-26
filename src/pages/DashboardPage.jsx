import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import VerificationComponent from "../components/common/VerificationComponent";
import HomeComponent from "../components/common/HomeComponent";
import { useSelector } from "react-redux";
import { useDomainListQuery } from "../app/redux/features/slices/api/usersApiSlice";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../components/common/Backdrop";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const { activeCompany } = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { data, isSuccess, isFetching } = useDomainListQuery({
    id: activeCompany?.id,
    token: userInfo?.token,
  });

  {
    isFetching && <SimpleBackdrop status={isFetching} />;
  }

  useEffect(() => {
    if (data?.data === null) {
      setIsVerified(false);
    } else {
      setIsVerified(true);
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
        {isVerified ? <HomeComponent /> : <VerificationComponent />}
      </Grid>
    </>
  );
};

export default DashboardPage;
