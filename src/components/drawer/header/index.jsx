import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { ReactComponent as MenuIcon } from "../../../assets/icons/menuIcon.svg";
import { ReactComponent as NotificationIcon } from "../../../assets/icons/notificationIcon.svg";
import Profile from "./profile/Index";

const Header = ({ handleDrawerOpen }) => {
  return (
    <Toolbar
      sx={{
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ width: "50px" }}
      >
        <MenuIcon width="25" color="#D8942E" />
      </IconButton>

      <div className="flex items-center gap-8 ">
        <NotificationIcon color="#D8942E" width={"22"} />

        <Profile />
      </div>
    </Toolbar>
  );
};

export default Header;
