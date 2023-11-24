import { Button, Grid, Stack, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useState } from "react";
import DomainsTable from "../components/common/DomainsTable";
import DomainInput from "../components/common/DomainInput";

const Domains = () => {
  const [openDomainInput, setOpenDomainInput] = useState(false);
  const handleCloseDomainInput = () => {
    setOpenDomainInput(false);
  };

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
        <Grid item md={12} sm={12} sx={{ mt: 5 }}>
          <DomainsTable />
        </Grid>
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
