import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const DomainStatsCard = ({ detail, icon, desc }) => {
  const [data, setData] = useState(0);

  useEffect(() => {
    if (desc === "Sent") {
      setData(detail.sent);
    } else if (desc === "Delivered") {
      setData(detail.delivered);
    } else {
      setData(detail.rejected);
    }
  }, [data]);

  return (
    <>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          p={5}
          borderRadius={2}
          width={"80%"}
          sx={{ border: "1px solid #e4e4e7" }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={4}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: ".5px solid #ecedf0",
                p: 1,
                borderRadius: "8px",
                backgroundColor: "#e7f6f7",
              }}
            >
              {icon}
            </Box>
            <Stack
              spacing={0.5}
              alignItems={"start"}
              justifyContent={"flex-start"}
            >
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                {data}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "400" }}>
                {desc}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};

export default DomainStatsCard;
