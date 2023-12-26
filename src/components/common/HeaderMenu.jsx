import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { headerMenus } from "../../assets/utils";
import DomainInput from "./DomainInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/redux/features/slices/auth/authSlice";
import { setActiveCompany } from "../../app/redux/features/slices/user/userSlice";
import { IconButton, Typography } from "@mui/material";
import { setActivePath } from "../../app/redux/features/slices/global/globalSlice";

const HeaderMenu = ({ open, close, anchor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDomainInput, setOpenDomainInput] = useState(false);
  const handleCloseDomainInput = () => {
    setOpenDomainInput(false);
  };
  const handleClose = () => {
    close();
  };

  const logOut = () => {
    dispatch(logout());
    dispatch(setActiveCompany(null));
    navigate("/");
  };

  const handleMenu = (id) => {
    switch (id) {
      case 1:
        setOpenDomainInput(true);
        handleClose();
        break;
      case 2:
        dispatch(setActivePath("dashboard"));
        navigate("/dashboard/profile");
        handleClose();
        break;
      case 3:
        handleClose();
        break;
      case 4:
        logOut();
        break;
      default:
        handleClose();
        break;
    }
  };
  return (
    <>
      <Menu
        id="HeaderMenu"
        aria-labelledby="HeaderMenu"
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {headerMenus.map((menu) => {
          return (
            <MenuItem key={menu.id} onClick={() => handleMenu(menu.id)}>
              <IconButton>{menu.icon}</IconButton>
              <Typography
                variant="body1"
                fontWeight={"500"}
                color={"#164c68"}
                sx={{ ml: 1 }}
              >
                {menu.title}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
      <DomainInput
        type="domain"
        title="Add a Sending Domain:"
        open={openDomainInput}
        close={handleCloseDomainInput}
      />
    </>
  );
};

export default HeaderMenu;
