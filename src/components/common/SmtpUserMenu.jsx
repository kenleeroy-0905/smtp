import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { PauseCircle, Trash } from "@phosphor-icons/react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDeleteSmtpUserMutation } from "../../app/redux/features/slices/api/usersApiSlice";
import { toast } from "react-toastify";
import SimpleBackdrop from "./Backdrop";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const SmtpUserMenu = ({ anchorEl, open, onClose, smtpID, domainID }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isLoading, setIsLoading] = useState(false);

  const menuClose = () => {
    onClose();
  };

  const [deleteSmtpUser] = useDeleteSmtpUserMutation();

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await deleteSmtpUser({
        token: userInfo.token,
        domain_id: domainID,
        smtp_id: smtpID,
      }).unwrap();

      if (res.status === "success") {
        toast.info("SMTP user deleted successfully");
        onClose();
      } else {
        toast.error("Can't delete SMTP user. Please try again");
        setIsLoading(false);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <SimpleBackdrop status={isLoading} />}
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={menuClose}
      >
        <MenuItem onClick={menuClose} disableRipple>
          <PauseCircle
            size={18}
            style={{ marginRight: ".5rem", color: "#00a3b1" }}
          />{" "}
          <Typography
            variant="body2"
            sx={{ fontWeight: "400", color: "#00a3b1" }}
          >
            Pause
          </Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} disableRipple>
          <Trash size={18} style={{ marginRight: ".5rem", color: "#00a3b1" }} />{" "}
          <Typography
            variant="body2"
            sx={{ fontWeight: "400", color: "#00a3b1" }}
          >
            Delete
          </Typography>
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default SmtpUserMenu;
