import { Box, Button, Grid, Slider, Stack, Typography } from "@mui/material";
import { At, CheckCircle, XCircle } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { images } from "../../assets";

const PackageItem = ({ data }) => {
  const [isFree, setIsFree] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [startingTxt, setStartingTxt] = useState("Starting at");
  const [emailCount, setEmailCount] = useState(0);
  const [proEmailCount, setProEmailCount] = useState(0);
  const [standardPricing, setStandardPricing] = useState(0);
  const [proPricing, setProPricing] = useState(0);

  useEffect(() => {
    if (data.name === "Free") {
      setIsFree(true);
      setSubtitle(
        "Give it a try! Incorporate quickly and delve into exploration!"
      );
      setBgColor("#d2ffd9");
    } else if (data.name === "Standard") {
      setSubtitle(
        "Give the Standard Package a shot! Implement swiftly and delve into its features!"
      );
      setBgColor("#f5d69e");
      setStandardPricing(data.price);
    } else {
      setSubtitle(
        "Experience the Pro Package! Integrate seamlessly and unlock advanced features!"
      );
      setBgColor("#95d5ff");
      setProPricing(data.price);
    }
  }, [data]);

  const formatStandardPrice = (event, value) => {
    setStartingTxt("");
    setEmailCount(value);
    if (value > 20000) {
      setStandardPricing(48);
    } else if (value === 0) {
      setStartingTxt("Starting at");
      setStandardPricing(24);
    } else {
      setStandardPricing(24);
    }
  };
  const formatProPrice = (event, value) => {
    setStartingTxt("");
    setProEmailCount(value);
    if (value > 20000) {
      setProPricing(96);
    } else if (value === 0) {
      setStartingTxt("Starting at");
      setStandardPricing(24);
    } else {
      setProPricing(48);
    }
  };

  return (
    <Grid
      item
      md={3}
      sm={12}
      xs={12}
      borderRadius={0.8}
      boxShadow={"0 7px 11px -4px rgba(0, 23, 62, 0.2), 0 0 1px 0 #a8b9d5"}
      width={"100%"}
      height={"auto"}
      minHeight={"686px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box
        width={"100%"}
        height={"20%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={2}
        px={1.5}
        py={2.5}
        bgcolor={bgColor}
        borderRadius={0.8}
        position={"relative"}
      >
        <Typography variant={"h3"} sx={{ fontWeight: "500" }}>
          {data.name}
        </Typography>
        <Typography
          variant={"body1"}
          sx={{ fontWeight: "400", textAlign: "center", fontStyle: "italic" }}
        >
          {subtitle}
        </Typography>
        {data.name === "Pro" && (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            p={0.8}
            position={"absolute"}
            bgcolor="#3eb4be"
            borderRadius={1}
            top={"-18px"}
            right={"15px"}
          >
            <Typography
              variant={"body1"}
              sx={{ fontWeight: "500", fontStyle: "italic" }}
            >
              Recommended
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        px={1.5}
        py={2.5}
      >
        {isFree && (
          <>
            <Typography variant={"h5"} fontWeight={"500"} fontStyle={"italic"}>
              AED {data.price}.00/mo{" "}
            </Typography>
            <img src={images.emailIcon} alt="email icon" width={"25%"} />
            <Typography variant={"body1"} fontWeight={"500"} sx={{ mt: 1 }}>
              1,000 emails/mo
            </Typography>
          </>
        )}
        {data.name === "Standard" && (
          <>
            <Typography variant={"h5"} fontWeight={"500"} fontStyle={"italic"}>
              {startingTxt} AED {standardPricing}.00/mo{" "}
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              justifyContent={"center"}
              width={"100%"}
            >
              <Typography
                variant={"body1"}
                fontWeight={"500"}
                fontStyle={"italic"}
              >
                0
              </Typography>
              <Slider
                valueLabelDisplay="auto"
                value={emailCount}
                onChange={formatStandardPrice}
                step={1000}
                min={0}
                max={50000}
              />
              <Typography
                variant={"body1"}
                fontWeight={"500"}
                fontStyle={"italic"}
              >
                50,000
              </Typography>
            </Stack>
            <Typography variant={"body1"} fontWeight={"500"} sx={{ mt: 1 }}>
              {emailCount.toLocaleString()} emails/mo
            </Typography>
            <Button
              sx={{
                backgroundColor: "#154b69",
                "&:hover": {
                  backgroundColor: "#00a3b1",
                },
                width: "100%",
              }}
              variant="contained"
            >
              <Typography variant={"body1"} fontWeight={"500"}>
                Upgrade
              </Typography>
            </Button>
            <Typography variant={"caption"} fontWeight={"500"} sx={{ mt: 1 }}>
              *5% VAT will be added to the total amount
            </Typography>
          </>
        )}
        {data.name === "Pro" && (
          <>
            <Typography variant={"h5"} fontWeight={"500"} fontStyle={"italic"}>
              {startingTxt} AED {proPricing}.00/mo{" "}
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              justifyContent={"center"}
              width={"100%"}
            >
              <Typography
                variant={"body1"}
                fontWeight={"500"}
                fontStyle={"italic"}
              >
                0
              </Typography>
              <Slider
                valueLabelDisplay="auto"
                value={proEmailCount}
                onChange={formatProPrice}
                step={5000}
                min={0}
                max={100000}
              />
              <Typography
                variant={"body1"}
                fontWeight={"500"}
                fontStyle={"italic"}
              >
                100,000
              </Typography>
            </Stack>
            <Typography variant={"body1"} fontWeight={"500"} sx={{ mt: 1 }}>
              {proEmailCount.toLocaleString()} emails/mo
            </Typography>
            <Button
              sx={{
                backgroundColor: "#154b69",
                "&:hover": {
                  backgroundColor: "#00a3b1",
                },
                width: "100%",
              }}
              variant="contained"
            >
              <Typography variant={"body1"} fontWeight={"500"}>
                Upgrade
              </Typography>
            </Button>
            <Typography variant={"caption"} fontWeight={"500"} sx={{ mt: 1 }}>
              *5% VAT will be added to the total amount
            </Typography>
          </>
        )}

        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={1}
        >
          <At size={24} color="green" />
          <Typography variant={"h6"} color={"#154b69"}>
            {data.domain} DOMAIN/S
          </Typography>
        </Stack>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          width={"100%"}
          flexDirection={"column"}
        >
          <Typography variant={"h6"} sx={{ mb: 1 }} color={"#154b69"}>
            Key Features:
          </Typography>
          <Stack
            width={"100%"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            spacing={1}
          >
            {isFree && (
              <>
                <Stack
                  width={"100%"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  spacing={1}
                  direction={"row"}
                >
                  <CheckCircle size={24} color="green" />
                  <Typography variant={"h6"} sx={{ mt: 1 }} color={"#154b69"}>
                    LIMITED EMAIL SUPPORT
                  </Typography>
                </Stack>
              </>
            )}
            {Object.entries(data.features).map(([key, value]) => {
              const formattedKey = key.split("_").join(" ");
              return (
                <Stack
                  width={"100%"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  spacing={1}
                  direction={"row"}
                >
                  {value === 1 ? (
                    <CheckCircle size={24} color="green" />
                  ) : (
                    <XCircle size={24} color="red" />
                  )}
                  <Typography variant={"h6"} sx={{ mt: 1 }} color={"#154b69"}>
                    {formattedKey.toUpperCase()}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
};

export default PackageItem;
