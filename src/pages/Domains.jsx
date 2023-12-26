import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useEffect, useState } from "react";
import DomainsTable from "../components/common/DomainsTable";
import DomainInput from "../components/common/DomainInput";
import { useSelector } from "react-redux";
import { useDomainListQuery } from "../app/redux/features/slices/api/usersApiSlice";
import { ChartLineUp } from "@phosphor-icons/react";
import SimpleBackdrop from "../components/common/Backdrop";

const Domains = () => {
  const activeCompany = useSelector((state) => state.user.activeCompany);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [openDomainInput, setOpenDomainInput] = useState(false);
  const handleCloseDomainInput = () => {
    setOpenDomainInput(false);
  };

  const { data, isSuccess, isLoading, isFetching } = useDomainListQuery(
    {
      id: activeCompany.id,
      token: userInfo.token,
    },
    { refetchOnMountOrArgChange: true }
  );

  {
    isLoading && <SimpleBackdrop status={isLoading} />;
  }
  {
    isFetching && <SimpleBackdrop status={isFetching} />;
  }

  useEffect(() => {
    if (data?.data === null) {
      setOpenDomainInput(true);
    }
  }, [activeCompany]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{ mt: 10 }}
      >
        <Grid item md={6} sm={12} xs={12}>
          <Typography variant="h4" sx={{ fontWeight: "700" }}>
            Domains
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "400" }}>
            Emails will be dispatched to your recipients from the authenticated
            domains.
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: {
              xs: "flex-start",
              sm: "flex-start",
              md: "flex-end",
            },
          }}
        >
          <Button
            sx={{
              backgroundColor: "#154b69",
              "&:hover": {
                backgroundColor: "#00a3b1",
              },
            }}
            variant="contained"
            startIcon={<AddBoxIcon />}
            onClick={() => setOpenDomainInput(true)}
          >
            Add Domain
          </Button>
        </Grid>
        {isSuccess && data?.message === "No Data Found" ? (
          <Box
            width={"100%"}
            border={".5px solid #00a3b1"}
            borderRadius={2}
            p={6}
            boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
            mt={2}
          >
            <Stack justifyContent={"center"} alignItems={"center"} spacing={4}>
              <Box
                p={1}
                backgroundColor={"#00a3b1"}
                width={"5%"}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"70px"}
              >
                <ChartLineUp size={32} color="#fff" />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: "500" }}>
                You don't have any sent emails for this Domain
              </Typography>
              <Typography variant="body1">
                Today is a great day to send your first email!!
              </Typography>
            </Stack>
          </Box>
        ) : (
          <DomainsTable domain={data?.data} />
        )}
        {isLoading && <SimpleBackdrop status={isLoading} />}
      </Grid>
      <DomainInput
        type="domain"
        title="Add a Sending Domain:"
        open={openDomainInput}
        close={handleCloseDomainInput}
      />
    </>
  );
};

export default Domains;
