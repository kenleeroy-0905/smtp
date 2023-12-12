import { Box, Button, Collapse, Grid, Stack, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetDnsRecordsQuery } from "../app/redux/features/slices/api/usersApiSlice";
import DomainCard from "../components/common/DomainCard";
import DomainDnsDialog from "../components/common/DomainDnsDialog";
import DomainStatsCard from "../components/common/DomainStatsCard";

import {
  EnvelopeOpen,
  PaperPlaneTilt,
  SealWarning,
  XCircle,
} from "@phosphor-icons/react";
import { setSelectedDomain } from "../app/redux/features/slices/domain/domainSlice";
import CreateSmtpUserDialog from "../components/common/CreateSmtpUserDialog";
import SimpleBackdrop from "../components/common/Backdrop";
import SmtpUserTable from "../components/common/SmtpUserTable";
import { NoAccounts } from "@mui/icons-material";

const ManageDomain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { activeCompany } = useSelector((state) => state.user);
  const { selectedDomain } = useSelector((state) => state.domain);

  const [open, setOpen] = useState(false);
  const [openDnsDialog, setOpenDnsDialog] = useState(false);
  const [openSmtpUserDialog, setOpenSmtpUserDialog] = useState(false);

  const handleCollapse = () => {
    setOpen(!open);
  };

  const handleDnsDialog = () => {
    setOpenDnsDialog(false);
  };

  const handleSmtpUserDialog = () => {
    setOpenSmtpUserDialog(false);
  };

  const { data, isSuccess, isLoading } = useGetDnsRecordsQuery({
    domain_id: selectedDomain.id,
    company_id: activeCompany.id,
    token: userInfo.token,
  });

  return (
    <>
      {isLoading && <SimpleBackdrop status={isLoading} />}
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
        onClick={() => {
          dispatch(setSelectedDomain(null));
          navigate("/domains");
        }}
      >
        Back to Domains
      </Button>

      {isSuccess && (
        <>
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "flex-start", md: "space-between" }}
            alignItems={{ xs: "start", md: "center" }}
          >
            <Typography variant="h4" sx={{ my: 3, fontWeight: "500" }}>
              {data?.data?.domain_name}
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={2}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#154b69",
                  "&:hover": {
                    backgroundColor: "#00a3b1",
                  },
                  minWidth: "132px",
                  textTransform: "none",
                }}
                onClick={() => setOpenDnsDialog(true)}
              >
                DNS Records
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#154b69",
                  "&:hover": {
                    backgroundColor: "#00a3b1",
                  },
                  textTransform: "none",
                }}
                onClick={handleCollapse}
              >
                Domain Details
              </Button>
            </Stack>
          </Grid>
          <Collapse in={open}>
            <DomainCard
              domainId={data?.data?.domain_username}
              createdAt={data?.data?.created_at}
              updatedAt={data?.data?.updated_at}
            />
          </Collapse>
          <Grid container mt={3} spacing={2}>
            <DomainStatsCard
              detail={data?.data?.report}
              icon={<PaperPlaneTilt size={32} color="#3cb4be" />}
              desc={"Sent"}
            />

            <DomainStatsCard
              detail={data?.data?.report}
              icon={<EnvelopeOpen size={32} color="#3cb4be" />}
              desc={"Delivered"}
            />

            <DomainStatsCard
              detail={data?.data?.report}
              icon={<XCircle size={32} color="#3cb4be" />}
              desc={"Rejected"}
            />
          </Grid>
          <Grid
            mt={5}
            mb={3}
            spacing={2}
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "flex-start", md: "space-between" }}
            alignItems={{ xs: "start", md: "center" }}
          >
            <Stack
              alignItems={"start"}
              justifyContent={"flex-start"}
              spacing={1}
            >
              <Typography variant="h5" sx={{ fontWeight: "500" }}>
                SMTP User
              </Typography>
              <Typography variant="body1">
                Utilize your SMTP credentials for sending emails, verifying your
                account, and monitoring data.
              </Typography>
            </Stack>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#154b69",
                "&:hover": {
                  backgroundColor: "#00a3b1",
                },
                textTransform: "none",
              }}
              onClick={() => setOpenSmtpUserDialog(true)}
            >
              Create New User
            </Button>
          </Grid>
          <DomainDnsDialog
            data={data?.data}
            close={handleDnsDialog}
            open={openDnsDialog}
          />
          <CreateSmtpUserDialog
            open={openSmtpUserDialog}
            close={handleSmtpUserDialog}
            domainID={data?.data?.id}
          />
        </>
      )}

      {data?.data?.smtp_user?.length > 0 ? (
        <SmtpUserTable
          users={data?.data?.smtp_user}
          domainId={selectedDomain.id}
        />
      ) : (
        <Box
          width={"100%"}
          border={".5px solid #00a3b1"}
          borderRadius={2}
          p={6}
          boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
        >
          <Stack justifyContent={"center"} alignItems={"center"} spacing={4}>
            <Box
              p={2}
              backgroundColor={"#00a3b1"}
              width={"5%"}
              borderRadius={2}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"70px"}
            >
              <SealWarning size={32} color="#fff" />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              No SMTP User Found
            </Typography>
            <Typography variant="body1">
              Create a new SMTP user to send emails, verify your account, and
              monitor data.
            </Typography>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ManageDomain;
