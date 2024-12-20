import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { ReactComponent as MenuIcon } from "../../../assets/icons/menuIcon.svg";
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
        <MenuIcon width="25" color="#E17A21" />
      </IconButton>

      <div className="flex items-center gap-8 ">
        {/* <NotificationIcon color="#E17A21" width={"22"} /> */}

        <Profile />
      </div>
    </Toolbar>
  );
};

export default Header;
