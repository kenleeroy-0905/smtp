import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import EmailActivityTable from "../components/common/EmailActivityTable";
import { useGetEmailActivityQuery } from "../app/redux/features/slices/api/usersApiSlice";
import SimpleBackdrop from "../components/common/Backdrop";
import { NoAccounts } from "@mui/icons-material";
import { ChartLineUp } from "@phosphor-icons/react";

const EmailActivity = () => {
  const activeCompany = useSelector((state) => state.user.activeCompany);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [domain, setDomain] = React.useState(null);
  const [domainActivity, setDomainActivity] = React.useState(null);

  const { data, isSuccess, isLoading } = useGetEmailActivityQuery({
    id: domain,
    token: userInfo.token,
  });

  return (
    <>
      <Grid container mt={4}>
        <Grid
          item
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "500" }}>
            Email Activity
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "400" }}>
            Locate all emails originating from your domains along with their
            respective status.
          </Typography>
        </Grid>
        <Grid item sm={12} xs={12} mt={2}>
          <Box sx={{ width: "40%" }}>
            <FormControl fullWidth>
              <InputLabel id="domain-select">Domains</InputLabel>
              <Select
                labelId="domain-select"
                id="domain-select"
                value={domain}
                label="Domains"
                onChange={(e) => setDomain(e.target.value)}
              >
                {activeCompany?.domain
                  ?.filter((domain) => domain.status === "active")
                  .map((domain) => (
                    <MenuItem key={domain.id} value={domain.id}>
                      {domain.domain_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
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
          <EmailActivityTable domain={data?.data} />
        )}
        {isLoading && <SimpleBackdrop status={isLoading} />}
      </Grid>
    </>
  );
};

export default EmailActivity;
