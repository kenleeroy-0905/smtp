import { TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export const spamPolicyContent = (
  <>
    <p>
      <strong>What is SPAM?</strong> SPAM, in the context of using Vsend, refers
      to any email sent without direct permission from the recipient or without
      other legal grounds for contact on the email's topic.
    </p>

    <p>
      For transactional emails essential for using the Vsend application or
      service (e.g., password reminders, invoices, receipts), a valid lawful
      basis is required. In the case of newsletters, explicit consent from the
      recipient is mandatory.
    </p>

    <p>
      Sending unsolicited emails to unfamiliar individuals is considered spam,
      especially when sent to an entire unknown list of people.
    </p>

    <p>
      <strong>Email Addresses NOT Suitable for MailerSend:</strong> Avoid
      sending emails to addresses where:
      <ol>
        <li>You lack a valid lawful basis or consent for the email's topic.</li>
        <li>
          You obtained the email address from a third party, regardless of
          claims about quality or permission.
        </li>
        <li>
          You haven't contacted the recipient via email in the last 2 years, as
          permission may no longer be valid.
        </li>
        <li>
          You scraped or copied addresses from the web; having an email
          published doesn't imply consent.
        </li>
      </ol>
    </p>

    <p>
      <strong>Required Content in Marketing Emails:</strong> All marketing
      emails sent through MailerSend must contain a single-click, clear, and
      visible unsubscribe link, using MailerSend's "track unsubscribes" feature.
      Once unsubscribed, further marketing emails must cease.
    </p>

    <p>
      <strong>Account Suspension:</strong> MailerSend retains the right to
      immediately suspend your account and investigate your activity if:
      <ul>
        <li>Your bounce rate is high.</li>
        <li>
          Your emails receive a significant percentage of spam complaints.
        </li>
        <li>
          Your marketing emails witness a notable percentage of unsubscribes.
        </li>
      </ul>
    </p>

    <p>
      <strong>Account Termination:</strong> Spamming via your MailerSend account
      results in:
      <ol>
        <li>Immediate termination of your account.</li>
        <li>No refund for the services.</li>
      </ol>
      If it's discovered that you were sending emails without a valid legal
      basis, your account will be terminated. MailerSend may request proof of a
      legal ground, and failure to provide it may lead to account closure.
      Otherwise, your account can be reactivated for further use.
    </p>
  </>
);

export const domainVerificationText = {
  domainText:
    "Visit your DNS provider and insert the specified DNS records to authenticate your domain. Keep in mind that, owing to TTL(Time To Live) regulations, it may take a while for these records to propagate throughout the internet.",
  spfText:
    "It has been integrated with any existing SPF record on your domain. If you don't have an SPF record yet, generate a new TXT record for your domain name using this value:",
  dkimText:
    "Create a TXT record for default._domainkey.thefuturevision.com with this value:",
};

export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  return new Date(date).toLocaleString("en-US", options);
};

export const CustomTextField = styled(TextField)(({ theme, iserror }) => ({
  "& value.Mui-focused": {
    color: !iserror ? "#00a3b1" : "#ff5050",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: !iserror ? "#00a3b1" : "#ff5050",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: !iserror ? "#00a3b1" : "#ff5050",
    },
    "&:hover fieldset": {
      borderColor: !iserror ? "#00a3b1" : "#ff5050",
    },
    "&.Mui-focused fieldset": {
      borderColor: !iserror ? "#00a3b1" : "#ff5050",
    },
    "& .MuiInputBase-input": {
      color: !iserror ? "#00a3b1" : "#ff5050",
      textAlign: "left",
      innerHeight: "max-content",
      padding: ".5rem",
    },
  },
}));

export const customToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton sx={{ color: "#00a3b1" }} />
      <GridToolbarFilterButton sx={{ color: "#00a3b1" }} />
      <GridToolbarDensitySelector sx={{ color: "#00a3b1" }} />
      <GridToolbarExport sx={{ color: "#00a3b1" }} />
    </GridToolbarContainer>
  );
};

export const headerMenus = [
  {
    id: 1,
    title: " Add Domain",
    icon: <AddIcon sx={{ color: "#164c68" }} />,
  },
  {
    id: 2,
    title: " My Profile",
    icon: <AccountCircleIcon sx={{ color: "#164c68" }} />,
  },
  {
    id: 3,
    title: " Settings",
    icon: <ManageAccountsIcon sx={{ color: "#164c68" }} />,
  },
  {
    id: 4,
    title: " Logout",
    icon: <ExitToAppIcon sx={{ color: "#164c68" }} />,
  },
];

export const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
};

export const viewOptions = ["Last Month", "Last Week"];

export const resendVerificationEmail = async (token) => {
  try {
    console.log(token);
    await axios
      .post("/user/resend-verification.php", { token: token })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } catch (err) {
    return err;
  }
};

export const fetchActiveCompany = (data) => {
  const activeCompany = data.filter((company) => company.active === true);
  return activeCompany[0];
};
