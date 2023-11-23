import { Stack, Typography } from "@mui/material";
import React from "react";

const VerifyDomainInfo = ({ question, answer, answer2 }) => {
  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ fontWeight: "700" }}>
          {question}
        </Typography>
        <Stack spacing={1.5}>
          <Typography variant="subtitle1" sx={{ color: "#00a3b1" }}>
            {answer}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#00a3b1" }}>
            {answer2}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default VerifyDomainInfo;
