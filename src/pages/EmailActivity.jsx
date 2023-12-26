import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import EmailActivityTable from "../components/common/EmailActivityTable";
import { useDomainListQuery } from "../app/redux/features/slices/api/usersApiSlice";
import SimpleBackdrop from "../components/common/Backdrop";
import { useNavigate } from "react-router-dom";
import { setActivePath } from "../app/redux/features/slices/global/globalSlice";
import { Globe } from "@phosphor-icons/react";
import Animate from "../components/common/Animate";

const EmailActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeCompany = useSelector((state) => state.user.activeCompany);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [domain, setDomain] = React.useState(null);
  const [verifiedDomains, setVerifiedDomains] = React.useState([]);

  const { data, isSuccess, isLoading } = useDomainListQuery(
    {
      id: activeCompany?.id,
      token: userInfo?.token,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (data) {
      const list = data?.data?.filter((domain) => {
        return domain.status === "active";
      });
      setVerifiedDomains(list);
    }
  }, [domain]);

  return (
    <>
      <Animate type="fade" delay={1}>
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
              {verifiedDomains?.length < 1 ? (
                <>
                  <Stack
                    justifyContent={"start"}
                    alignItems={"start"}
                    spacing={2}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "500" }}>
                      You don't have any verified domains. Please verify a
                      domain first.
                    </Typography>
                    <Button
                      sx={{
                        backgroundColor: "#154b69",
                        "&:hover": {
                          backgroundColor: "#00a3b1",
                        },
                        mt: 5,
                      }}
                      variant="contained"
                      onClick={() => {
                        dispatch(setActivePath("domains"));
                        navigate("/domains");
                      }}
                    >
                      Back to Domains
                    </Button>
                  </Stack>
                </>
              ) : (
                <FormControl fullWidth>
                  <InputLabel id="domain-select">Domains</InputLabel>
                  <Select
                    labelId="domain-select"
                    id="domain-select"
                    value={domain}
                    label="Domains"
                    onChange={(e) => setDomain(e.target.value)}
                  >
                    {verifiedDomains?.map((domain) => (
                      <MenuItem key={domain.id} value={domain.id}>
                        {domain.domain_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
          </Grid>
          {domain === null ? (
            <Box
              width={"100%"}
              border={".5px solid #00a3b1"}
              borderRadius={2}
              p={6}
              boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
              mt={2}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={4}
              >
                <Box
                  p={1}
                  backgroundColor={"#00a3b1"}
                  width={{ md: "5%", xs: "50%" }}
                  borderRadius={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"70px"}
                >
                  <Globe size={32} color="#fff" />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: "500" }}>
                  Please select a domain to view email activity.
                </Typography>
              </Stack>
            </Box>
          ) : (
            <EmailActivityTable domain={domain} />
          )}

          {isLoading && <SimpleBackdrop status={isLoading} />}
        </Grid>
      </Animate>
    </>
  );
};

export default EmailActivity;
