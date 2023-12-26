import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { Envelope } from "@phosphor-icons/react";
import React from "react";
import StatBox from "./StatBox";
import CustomChart from "./CustomChart";

const EmailOverview = () => {
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
        <Envelope size={22} color="#fff" />
        <Typography variant="body1" fontWeight={"500"} color={"#fff"}>
          Emails
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
              Total sent emails
            </Typography>
            <Typography variant={"h4"} fontWeight={"500"}>
              3
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "start", md: "center" }}
              spacing={1}
            >
              <Typography variant={"body1"} fontWeight={"400"}>
                Not tracking the clicks yet?
              </Typography>
              <Link
                href={"#"}
                underline={"none"}
                color={"blue"}
                sx={{
                  "&:hover": {
                    color: "#11a4b0",
                  },
                }}
              >
                Enable it now
              </Link>
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={8} sm={12} xs={12} height={"100%"} p={0}>
          <Grid container width={"100%"} height={"100%"} p={0}>
            <StatBox title={"Open rate"} stat={"100%"} />
            <StatBox title={"Bounced"} stat={"0.00%"} />
            <StatBox title={"Click-rate"} stat={"100%"} />
            <StatBox title={"Reputation"} stat={"Healthy"} />
            <CustomChart />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailOverview;
