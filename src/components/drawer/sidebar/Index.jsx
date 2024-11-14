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
import { ReactComponent as Dashboard } from "../../../assets/icons/sidebarIcon/dashboard.svg";
import { ReactComponent as SidebarArrowIcon } from "../../../assets/icons/sidebarIcon/sidebarArrowIcon.svg";

export default function SidebarList() {
  const [open, setOpen] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const isActiveOperatorMaster = () => {
    const basePaths = [
      "/operator-master",
      "/operator-master/add",
    ];

    // Check for exact base paths
    if (basePaths.includes(location.pathname)) {
      return true;
    }

    // Check for dynamic paths, including paths with or without an ID
    const dynamicPaths = [
      /^\/operator-master\/edit(\/[^/]+)?$/,
      /^\/operator-master\/view(\/[^/]+)?$/
    ];

    return dynamicPaths.some((regex) => regex.test(location.pathname));
  };

  const isActivePersonMaster = () => {
    const basePaths = [
      "/person-master",
      "/person-master/add",
    ];

    // Check for exact base paths
    if (basePaths.includes(location.pathname)) {
      return true;
    }

    // Check for dynamic paths, including paths with or without an ID
    const dynamicPaths = [
      /^\/person-master\/edit(\/[^/]+)?$/,
      /^\/person-master\/view(\/[^/]+)?$/
    ];

    return dynamicPaths.some((regex) => regex.test(location.pathname));
  };

  const isActiveRawMaterialMaster = () => {
    const basePaths = [
      "/raw_material_master",
      "/raw_material_master/add",
    ];

    // Check for exact base paths
    if (basePaths.includes(location.pathname)) {
      return true;
    }

    // Check for dynamic paths, including paths with or without an ID
    const dynamicPaths = [
      /^\/raw_material_master\/edit(\/[^/]+)?$/,
      /^\/raw_material_master\/view(\/[^/]+)?$/
    ];

    return dynamicPaths.some((regex) => regex.test(location.pathname));
  };


  const basePathsCategories = [
    "/category",
    "/sub-category",
  ];


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
          color: isActivePersonMaster() ? "#D8942E" : getTextColor("/person-master"),
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
          color: isActiveOperatorMaster() ? "#D8942E" : getTextColor("/operator-master"),
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


      {/* raw material Master */}
      {role === "superadmin" && <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#D8942E" },
          color: isActiveRawMaterialMaster() ? "#D8942E" :  getTextColor("/raw_material_master"),
        }}
        onClick={() => handleNavigation("/raw_material_master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Dashboard width={"20"} color="grey" />
        </ListItemIcon>
        <ListItemText primary="Raw Material Master" />
      </ListItemButton>}


      {/* Materials Master */}
      {role === "superadmin" && <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#D8942E" },
          color: getTextColor("/materials_master"),
        }}
        onClick={() => handleNavigation("/materials_master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Dashboard width={"20"} color="grey" />
        </ListItemIcon>
        <ListItemText primary="Materials Master" />
      </ListItemButton>}


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
          color: open === "category" || basePathsCategories.includes(location.pathname) ? "#D8942E" : "inherit", // Highlight when expanded
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
