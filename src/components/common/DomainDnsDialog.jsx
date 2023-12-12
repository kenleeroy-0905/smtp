import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import React, { useState } from "react";
import VerifyDomainTxt from "./VerifyDomainTxt";
import { domainVerificationText } from "../../assets/utils";

const DomainDnsDialog = ({ open, close, data }) => {
  const handleClose = () => {
    close();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="scroll-dialog-title">Domain DNS Records</DialogTitle>
        <DialogContent>
          <Stack spacing={4}>
            <Stack spacing={2} direction="row" alignItems="center">
              <LooksOneIcon sx={{ fontSize: 60, color: "#00a3b1" }} />
              <VerifyDomainTxt
                mainTxt={data.domain_name}
                secondaryTxt={domainVerificationText.domainText}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <LooksTwoIcon sx={{ fontSize: 60, color: "#00a3b1" }} />
              <VerifyDomainTxt
                mainTxt={"SPF Record"}
                secondaryTxt={domainVerificationText.spfText}
                textField={data.spf}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <Looks3Icon sx={{ fontSize: 60, color: "#00a3b1" }} />
              <VerifyDomainTxt
                mainTxt={"DKIM Record"}
                secondaryTxt={`Create a TXT record for default._domainkey.${data.domain_name} with the value below:`}
                textField={"v=DKIM1;t=s;p=" + data.dkim}
              />
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DomainDnsDialog;
