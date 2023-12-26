import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { Globe } from "@phosphor-icons/react";
import React from "react";
import StatBox from "./StatBox";
import CustomChart from "./CustomChart";

const DomainOverview = () => {
  return (
    <>
      <Box
        p={2}
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"start"}
        gap={1}
        width={"100%"}
        bgcolor={"#164c68"}
      >
        <Globe size={22} color="#fff" />
        <Typography variant="body1" fontWeight={"500"} color={"#fff"}>
          Domains
        </Typography>
      </Box>
      <Grid container width={"100%"} height={"100%"}>
        <Grid
          item
          md={4}
          sm={12}
          xs={12}
          height={"auto"}
          py={3}
          px={4}
          border={".5px solid #164c68"}
        >
          <Stack justifyContent={"flex-start"} alignItems={"start"} spacing={1}>
            <Typography variant={"h6"} fontWeight={"400"}>
              All Verified Domains
            </Typography>
            <Typography variant={"h4"} fontWeight={"500"}>
              1
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={8} sm={12} xs={12} height={"100%"} p={0}>
          <Grid container width={"100%"} height={"100%"} p={0}>
            <StatBox
              title={"Avg. webhook success rate"}
              stat={"0.00%"}
              subtitle={true}
            />
            <StatBox
              title={"Avg. inbound routes success rate"}
              stat={"0.00%"}
              subtitle={true}
            />
            <StatBox title={"Avg. Requests success rate"} stat={"0.00%"} />
            <StatBox title={"Avg. Limits reached"} stat={"0.00%"} />
            <Grid item md={6} sm={12} xs={12} height={"100%"} p={0}>
              <CustomChart />
            </Grid>
            <Grid item md={6} sm={12} xs={12} height={"100%"} p={0}>
              <CustomChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DomainOverview;
