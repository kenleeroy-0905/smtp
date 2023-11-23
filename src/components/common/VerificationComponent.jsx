import {
  Box,
  Button,
  Grid,
  Stack,
  Step,
  StepContent,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Terms from "./Terms";
import DomainInput from "./DomainInput";
import { useNavigate } from "react-router-dom";

const VerificationComponent = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [openTerms, setOpenTerms] = useState(false);
  const [domain, setDomain] = useState("");
  const [openDomainInput, setOpenDomainInput] = useState(false);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleClose = () => {
    setOpenTerms(false);
  };
  const handleCloseDomainInput = () => {
    setOpenDomainInput(false);
  };
  return (
    <>
      <Grid
        container
        item
        md={4}
        sm={12}
        sx={{
          backgroundColor: "#e5f6f7",
          p: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        height={{ lg: "600px", md: "1000px", sm: "auto" }}
      >
        <Grid item>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Hey, Test!
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Welcome to VSend!
          </Typography>
          <Typography variant="subtitle1">
            To start sending emails, you need to verify your sending domain and
            complete your account profile. Let's do this!
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">Need help?</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Check out our guide on how to set up your account.
          </Typography>
          <Typography variant="h5">Have any questions?</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Contact us! We're happy to help you.
          </Typography>
          <Button variant="outlined">Contact Us</Button>
        </Grid>
      </Grid>
      <Grid
        item
        md={8}
        sm={12}
        sx={{ backgroundColor: "#f3f4f6", p: 4 }}
        height={{ lg: "600px", md: "1000px", sm: "auto" }}
      >
        <Typography variant="h4">Complete your verification</Typography>
        <Typography variant="h6">Follow the steps below:</Typography>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 2 }}>
          <Step>
            <StepContent>
              <Typography variant="h5">Verify your email address</Typography>
              <Typography variant="subtitle1">
                You can do this by clicking the verification link that we will
                send you. Check your inbox!
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    mr: 2,
                    bgcolor: "#154b69",
                    "&:hover": {
                      backgroundColor: "#00a3b1",
                    },
                  }}
                >
                  Send
                </Button>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepContent>
              <Typography variant="h5">
                Please review and accept our policies
              </Typography>
              <Typography variant="subtitle1">
                These are super important! They protect you and others from
                unsolicited email activity.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setOpenTerms(true)}
                  sx={{
                    mr: 2,
                    bgcolor: "#154b69",
                    "&:hover": {
                      backgroundColor: "#00a3b1",
                    },
                  }}
                >
                  Next
                </Button>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepContent>
              <Typography variant="h5">Add a Sending Domain</Typography>
              <Typography variant="subtitle1">
                So that you have the ability to dispatch transactional emails
                using your own domain.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setOpenDomainInput(true)}
                  sx={{
                    mr: 2,
                    bgcolor: "#154b69",
                    "&:hover": {
                      backgroundColor: "#00a3b1",
                    },
                  }}
                >
                  Next
                </Button>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepContent>
              <Typography variant="h5">Verify your domain</Typography>
              <Typography variant="subtitle1">
                This protects your domain from unauthorized use.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate("/dashboard/verify-domain")}
                  sx={{
                    mr: 2,
                    bgcolor: "#154b69",
                    "&:hover": {
                      backgroundColor: "#00a3b1",
                    },
                  }}
                >
                  Start
                </Button>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
        <Divider sx={{ my: 5 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <AccountCircleIcon sx={{ fontSize: 50, color: "#154b69" }} />
            <Typography variant="h4">Let's Get Started</Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              bgcolor: "#154b69",
              "&:hover": {
                backgroundColor: "#00a3b1",
              },
            }}
          >
            Receive Approval
          </Button>
        </Stack>

        <Typography variant="subtitle1">
          During the approval process, you have the ability to send emails to
          recipients with your domain. Once your account is approved by our
          Customer Support team, you will be able to send emails to any domain.
          This approval process typically takes no more than 24 hours.
        </Typography>
      </Grid>
      <Terms open={openTerms} close={handleClose} next={handleNext} />
      <DomainInput
        type="domain"
        title="Add a Sending Domain:"
        open={openDomainInput}
        close={handleCloseDomainInput}
        next={handleNext}
        setDomain={setDomain}
      />
    </>
  );
};

export default VerificationComponent;
