import { Grid, Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const StatBox = ({ title, stat, mdSize, subtitle }) => {
  const [subtileToBeDisplayed, setSubtileToBeDisplayed] = useState("");

  useEffect(() => {
    if (title === "Avg. webhook success rate") {
      setSubtileToBeDisplayed("Set up a webhook");
    } else if (title === "Avg. inbound routes success rate") {
      setSubtileToBeDisplayed("Set up an inbound route");
    } else if (title === "Invalid Emails") {
      setSubtileToBeDisplayed("Manage list");
    } else if (title === "Credits" && stat === "0") {
      setSubtileToBeDisplayed("Buy credits");
    } else {
      setSubtileToBeDisplayed("");
    }
  }, [title]);

  return (
    <>
      <Grid
        item
        md={mdSize ? mdSize : 6}
        sm={12}
        xs={12}
        height={"100%"}
        py={3}
        px={4}
        border={".5px solid #164c68"}
      >
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          width={"100%"}
        >
          {subtitle === true ? (
            <Stack
              justifyContent={"flex-start"}
              alignItems={"start"}
              spacing={0.5}
            >
              <Typography variant={"body1"} fontWeight={"400"}>
                {title}
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
                {subtileToBeDisplayed}
              </Link>
            </Stack>
          ) : (
            <Typography variant={"body1"} fontWeight={"400"}>
              {title}
            </Typography>
          )}

          <Typography variant={"h6"} fontWeight={"500"}>
            {stat}
          </Typography>
        </Stack>
      </Grid>
    </>
  );
};

export default StatBox;
