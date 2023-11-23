import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { headerMenus } from "../../assets/utils";

const HeaderMenu = ({ open, close, anchor }) => {
  const handleClose = () => {
    close();
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
        {headerMenus.map((menu, index) => {
          return (
            <MenuItem key={index} onClick={handleClose}>
              {menu.icon} {menu.title}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default HeaderMenu;
