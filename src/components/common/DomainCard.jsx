import { Card, CardContent, Stack, Typography } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import React from "react";
import { formatDate } from "../../assets/utils";

const DomainCard = ({ domainId, createdAt, updatedAt }) => {
  return (
    <>
      <Card sx={{ width: "100%", mt: 1, p: 1.5 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "flex-start", md: "space-between" }}
            alignItems={{ xs: "start", md: "center" }}
            spacing={1.5}
          >
            <Stack
              spacing={0.5}
              alignItems={"start"}
              justifyContent={"flex-start"}
            >
              <Typography variant="body1">Domain ID:</Typography>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                {domainId}
              </Typography>
            </Stack>
            <Stack
              spacing={0.5}
              alignItems={"start"}
              justifyContent={"flex-start"}
            >
              <Typography variant="body1">Domain Created:</Typography>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                {formatDate(createdAt)}
              </Typography>
            </Stack>
            <Stack
              spacing={0.5}
              alignItems={"start"}
              justifyContent={"flex-start"}
            >
              <Typography variant="body1">Domain Last Updated:</Typography>
              <Typography variant="body1" sx={{ fontWeight: "500" }}>
                {formatDate(updatedAt)}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default DomainCard;
