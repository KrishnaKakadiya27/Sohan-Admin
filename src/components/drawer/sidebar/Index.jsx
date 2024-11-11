import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import necessary hooks
import { ReactComponent as DropdownBottomIcon } from "../../../assets/icons/dropdownBottomIcon.svg";
import { ReactComponent as DropdownRightIcon } from "../../../assets/icons/dropdownRightIcon.svg";
import { ReactComponent as Category } from "../../../assets/icons/sidebarIcon/category.svg";
import { ReactComponent as Chat } from "../../../assets/icons/sidebarIcon/chat.svg";
import { ReactComponent as Content } from "../../../assets/icons/sidebarIcon/content.svg";
import { ReactComponent as Dashboard } from "../../../assets/icons/sidebarIcon/dashboard.svg";
import { ReactComponent as Sales } from "../../../assets/icons/sidebarIcon/sales.svg";
import { ReactComponent as Setting } from "../../../assets/icons/sidebarIcon/setting.svg";
import { ReactComponent as UserSetting } from "../../../assets/icons/sidebarIcon/userSetting.svg";
import { ReactComponent as SidebarArrowIcon } from "../../../assets/icons/sidebarIcon/sidebarArrowIcon.svg";

export default function SidebarList() {
  const [open, setOpen] = React.useState(null);
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const location = useLocation(); // Use location to get current pathname

  const handleClick = (item) => {
    setOpen(open === item ? null : item); // Only expand/collapse, no navigation
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate when sub-items are clicked
  };

  const getTextColor = (path) => {
    return location.pathname === path ? "#D8942E" : "inherit"; // Match current pathname to highlight
  };

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", padding: "0 10px" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* Dashboard */}
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#D8942E" },
          color: getTextColor("/dashboard"),
        }}
        onClick={() => handleNavigation("/dashboard")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Dashboard width={"20"} color="grey" />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/* Person Master */}
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#D8942E" },
          color: getTextColor("/person-master"),
        }}
        onClick={() => handleNavigation("/person-master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Dashboard width={"20"} color="grey" />
        </ListItemIcon>
        <ListItemText primary="Person Master" />
      </ListItemButton>


      {/* Operator Master */}
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#D8942E" },
          color: getTextColor("/operator-master"),
        }}
        onClick={() => handleNavigation("/operator-master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Dashboard width={"20"} color="grey" />
        </ListItemIcon>
        <ListItemText primary="Operator Master" />
      </ListItemButton>


      {/* Item Master */}
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#D8942E" },
          color: getTextColor("/item-master"),
        }}
        onClick={() => handleNavigation("/item-master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Dashboard width={"20"} color="grey" />
        </ListItemIcon>
        <ListItemText primary="Item Master" />
      </ListItemButton>


      {/* Machine Master */}
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#D8942E" },
          color: getTextColor("/machine-master"),
        }}
        onClick={() => handleNavigation("/machine-master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Dashboard width={"20"} color="grey" />
        </ListItemIcon>
        <ListItemText primary="Machine Master" />
      </ListItemButton>

      {/* Categories */}
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#D8942E" },
          color: open === "category" ? "#D8942E" : "inherit", // Highlight when expanded
        }}
        onClick={() => handleClick("category")} // Expand/collapse only
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Category width={"20"} color="grey" />
        </ListItemIcon>
        <ListItemText primary="Categories" />
        {open === "category" ? (
          <DropdownBottomIcon color="#D8942E" width="12" />
        ) : (
          <DropdownRightIcon color="grey" width="7" />
        )}
      </ListItemButton>
      <Collapse in={open === "category"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              py: "5px",
              pl: 5,
              "&:hover": { color: "#D8942E" },
              color: getTextColor("/category"),
            }}
            onClick={() => handleNavigation("/category")} // Navigate on sub-item click
          >
            <ListItemIcon sx={{ minWidth: "25px" }}>
              <SidebarArrowIcon width={"12"} />
            </ListItemIcon>
            <ListItemText
              primary="Main Category"
              sx={{ "& .MuiTypography-body1": { fontSize: "15px" } }}
            />
          </ListItemButton>
        </List>

        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              py: "5px",
              pl: 5,
              "&:hover": { color: "#D8942E" },
              color: getTextColor("/sub-category"),
            }}
            onClick={() => handleNavigation("/sub-category")} // Navigate on sub-item click
          >
            <ListItemIcon sx={{ minWidth: "25px" }}>
              <SidebarArrowIcon width={"12"} />
            </ListItemIcon>
            <ListItemText
              primary="Sub Category"
              sx={{ "& .MuiTypography-body1": { fontSize: "15px" } }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      <Collapse in={open === "content"} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              py: "12px",
              pl: 4,
              "&:hover": { color: "#D8942E" },
              color: getTextColor("/content/list"),
            }}
            onClick={() => handleNavigation("/content/list")} // Navigate on sub-item click
          >
            <ListItemIcon sx={{ minWidth: "42px" }}>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Content List" />
          </ListItemButton>
        </List>
      </Collapse>

    </List>
  );
}