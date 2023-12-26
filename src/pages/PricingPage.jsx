import React from "react";
import Animate from "../components/common/Animate";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetPackageListQuery } from "../app/redux/features/slices/api/usersApiSlice";
import PackageItem from "../components/common/PackageItem";

const PricingPage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { data, isSuccess, isLoading } = useGetPackageListQuery(
    {
      token: userInfo?.token,
      status: "1",
    },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      <Animate type="fade" delay={0.5}>
        <Typography variant="h4" sx={{ fontWeight: "500", mt: 2 }}>
          Compare Email API Plans
        </Typography>
        <Grid
          container
          mt={4}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          px={2}
          gap={5}
        >
          {isLoading && <CircularProgress />}
          {isSuccess &&
            data?.data?.map((item) => {
              return <PackageItem data={item} key={item.id} />;
            })}
        </Grid>
      </Animate>
    </>
  );
};

export default PricingPage;
