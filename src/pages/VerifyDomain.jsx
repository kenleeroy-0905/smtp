import { Grid, Button, Typography, Stack, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import {
  getDnsRecords,
  verifyDomain,
} from "../app/redux/features/actions/actions";
import { LoadingButton } from "@mui/lab";
import CustomizedSnackbar from "../components/common/Snackbar";

const VerifyDomain = () => {
  const navigate = useNavigate();
  const [domain, setDomain] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { activeCompany } = useSelector((state) => state.user);
  const { selectedDomain } = useSelector((state) => state.domain);
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

  useEffect(() => {
    const fetchDnsRecords = async () => {
      const data = await getDnsRecords(
        selectedDomain,
        activeCompany.id,
        userInfo.token
      );
      setDomain(data.data.data.domain_name);
      setSpfRecord(data.data.data.spf);
      setDkimRecord(data.data.data.dkim);
      setDomainId(data.data.data.id);
    };
    fetchDnsRecords();
  }, []);

  const handleVerifyDomain = async () => {
    setIsLoading(true);
    try {
      const response = await verifyDomain(
        domainId,
        activeCompany.id,
        userInfo.token
      );
      console.log(response);
      if (response.data.message === "Domain Verified") {
        setMessage(response.data.message);
        setSeverity("success");
        setIsOpenSnackbar(true);
        setIsLoading(false);
        navigate("/domains");
      } else {
        setMessage("Can't verify domain. Please check your DNS records");
        setSeverity("error");
        setIsOpenSnackbar(true);
        setIsLoading(false);
        navigate("/domains");
      }
    } catch (err) {
      console.log(err);
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
                mainTxt={selectedDomain}
                secondaryTxt={domainVerificationText.domainText}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <LooksTwoIcon sx={{ fontSize: 60, color: "#00a3b1" }} />
              <VerifyDomainTxt
                mainTxt={"SPF Record"}
                secondaryTxt={domainVerificationText.spfText}
                textField={spfRecord}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <Looks3Icon sx={{ fontSize: 60, color: "#00a3b1" }} />
              <VerifyDomainTxt
                mainTxt={"DKIM Record"}
                secondaryTxt={`Create a TXT record for default._domainkey.${selectedDomain} with the value below:`}
                textField={"v=DKIM1;t=s;p=" + dkimRecord}
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
