import { Grid, Button, Typography, Stack, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import VerifyDomainTxt from "../components/common/VerifyDomainTxt";
import { domainVerificationText } from "../assets/utils";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import SendIcon from "@mui/icons-material/Send";
import DeleteDialog from "../components/common/DeleteDialog";
import VerifyDomainInfo from "../components/common/VerifyDomainInfo";
import { LoadingButton } from "@mui/lab";
import CustomizedSnackbar from "../components/common/Snackbar";
import {
  useGetDnsRecordsQuery,
  useVerifyDomainMutation,
} from "../app/redux/features/slices/api/usersApiSlice";
import { setSelectedDomain } from "../app/redux/features/slices/domain/domainSlice";

const VerifyDomain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { activeCompany } = useSelector((state) => state.user);
  const { selectedDomain } = useSelector((state) => state.domain);

  const [domain, setDomain] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [spfRecord, setSpfRecord] = useState("");
  const [dkimRecord, setDkimRecord] = useState("");
  const [domainId, setDomainId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseSnackbar = () => {
    setIsOpenSnackbar(false);
  };

  const { data } = useGetDnsRecordsQuery({
    domain_id: selectedDomain.id,
    company_id: activeCompany.id,
    token: userInfo.token,
  });

  const [verifyDomain] = useVerifyDomainMutation();
  const handleVerifyDomain = async () => {
    setIsLoading(true);
    try {
      const res = await verifyDomain({
        domain_id: selectedDomain.id,
        company_id: activeCompany.id,
        token: userInfo.token,
      }).unwrap();
      if (res.message === "Domain Verified") {
        dispatch(setSelectedDomain(null));
        setMessage(res.message);
        setSeverity("success");
        setIsOpenSnackbar(true);
        setIsLoading(false);
        navigate("/domains");
      } else {
        setMessage("Can't verify domain. Please check your DNS records");
        setSeverity("error");
        setIsOpenSnackbar(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: FIX MOBILE VIEW
  return (
    <>
      <Button
        sx={{
          backgroundColor: "#154b69",
          "&:hover": {
            backgroundColor: "#00a3b1",
          },
          mt: 5,
        }}
        variant="contained"
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate("/domains")}
      >
        Back to Domains
      </Button>
      <Typography variant="h4" sx={{ my: 3, fontWeight: "700" }}>
        Domain Verification
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{ mt: 8 }}
      >
        <Grid
          container
          item
          md={8}
          sm={12}
          sx={{ backgroundColor: "#f3f4f6", p: 4 }}
          justifyContent="space-between"
          height="800px"
        >
          <Stack spacing={4}>
            <Stack spacing={2} direction="row" alignItems="center">
              <LooksOneIcon sx={{ fontSize: 60, color: "#00a3b1" }} />
              <VerifyDomainTxt
                mainTxt={data?.data?.domain_name}
                secondaryTxt={domainVerificationText.domainText}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <LooksTwoIcon sx={{ fontSize: 60, color: "#00a3b1" }} />
              <VerifyDomainTxt
                mainTxt={"SPF Record"}
                secondaryTxt={domainVerificationText.spfText}
                textField={data?.data?.spf}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <Looks3Icon sx={{ fontSize: 60, color: "#00a3b1" }} />
              <VerifyDomainTxt
                mainTxt={"DKIM Record"}
                secondaryTxt={`Create a TXT record for default._domainkey.${data?.data?.domain_name} with the value below:`}
                textField={"v=DKIM1;t=s;p=" + data?.data?.dkim}
              />
            </Stack>
            <Divider variant="middle" />
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SendIcon />}
                variant="outlined"
                sx={{
                  bgcolor: "#154b69",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#00a3b1",
                  },
                }}
                onClick={() => handleVerifyDomain()}
              >
                Verify Domain
              </LoadingButton>
              <Button
                sx={{
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                }}
                variant="contained"
                onClick={() => setOpenDelete(true)}
              >
                Delete Domain
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          md={4}
          sm={12}
          sx={{ backgroundColor: "#e5f6f7", p: 4 }}
          height="800px"
        >
          <Stack spacing={10}>
            <VerifyDomainInfo
              question={"How long does it take to verify the domain?"}
              answer={"Your part: 5 minutes"}
              answer2={
                "Time until the domain is fully verified: up to 48 hours."
              }
            />
            <VerifyDomainInfo
              question={"Does it always take 48 hours?"}
              answer={
                "Once you update your domain settings, verifying the domain can take up to 48 hours. It’s an automated process that we can’t speed up but sometimes finishes faster."
              }
              answer2={
                "If your domain is still not verified after 48 hours, ensure the records are correct by checking the SPF and DKIM records on Mailertest.com or ask your domain administrator to take a look before contacting Customer Support."
              }
            />
            <Stack spacing={3}>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Frequently Asked Questions
              </Typography>
              <Stack spacing={1.5}>
                <Link
                  sx={{
                    color: "#00a3b1",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  underline="hover"
                >
                  How to add and verify a domain?
                </Link>
                <Link
                  sx={{
                    color: "#00a3b1",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  underline="hover"
                >
                  What is a sending domain?
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <DeleteDialog
        open={openDelete}
        close={handleCloseDelete}
        title={domain}
      />
      <CustomizedSnackbar
        open={isOpenSnackbar}
        message={message}
        severity={severity}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};

export default VerifyDomain;
