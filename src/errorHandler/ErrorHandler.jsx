import { images } from "../assets";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Animate from "../components/common/Animate";

const ErrorHandler = () => {
  const navigate = useNavigate();
  return (
    <>
      <Animate type="fade" delay={0.5}>
        <Box
          position="relative"
          height="100vh"
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(180deg, rgba(0,146,246,1) 0%, rgba(0,254,254,1) 60%, rgba(183,255,200,1) 100%)",
          }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            flexDirection={"row"}
            gap={2}
            borderRadius={2}
            width={"50%"}
            height={"auto"}
            bgcolor={"whitesmoke"}
            p={8}
          >
            <Grid container sx={{ display: "flex", alignItems: "center" }}>
              <Grid item xs={12} sm={12} md={12}>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={4}
                >
                  <Typography variant={"h2"} fontWeight={"500"}>
                    Oops!
                  </Typography>
                  <Typography variant={"h4"} fontWeight={"500"}>
                    Sorry! Something went wrong.
                  </Typography>
                  <Button
                    onClick={() => navigate(-1)}
                    size="large"
                    sx={{
                      bgcolor: "#154b69",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#00a3b1",
                      },
                    }}
                  >
                    Go Back
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Animate>
    </>
  );
};

export default ErrorHandler;
