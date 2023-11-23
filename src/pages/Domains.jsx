import { Button, Grid, Stack, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React from "react";
import DomainsTable from "../components/common/DomainsTable";

const Domains = () => {
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
          >
            Add Domain
          </Button>
        </Grid>
        <Grid item md={12} sm={12} sx={{ mt: 5 }}>
          <DomainsTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Domains;
