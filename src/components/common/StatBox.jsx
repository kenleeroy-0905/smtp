import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";

const StatBox = ({ title }) => {
  return (
    <>
      <Stack
        direction={"row"}
        spacing={0.5}
        justifyContent={"flex-start"}
        alignItems={"center"}
        p={1.5}
        borderTop={"1px solid #e0e0e0"}
        borderBottom={"1px solid #e0e0e0"}
        bgcolor={"#f7f7f7"}
      >
        <EmailIcon sx={{ color: "#00a3b1" }} />
        <Typography variant={"body2"}>{title}</Typography>
      </Stack>
      <Grid container>
        <Grid md={4} sm={12} xs={12} p={2} borderRight={"1px solid #e0e0e0"}>
          <Stack justifyContent={"flex-start"} spacing={1.5}>
            <Typography variant={"body2"} sx={{ fontWeight: 400 }}>
              Total Sent Emails
            </Typography>
            <Typography variant={"h5"} sx={{ fontWeight: 700 }}>
              0
            </Typography>
          </Stack>
        </Grid>
        <Grid md={8} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};

export default StatBox;
