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
import { ReactComponent as SidebarArrowIcon } from "../../../assets/icons/sidebarIcon/sidebarArrowIcon.svg";
import { ReactComponent as RawMaterial } from "../../../assets/icons/sidebarIcon/processing.svg";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import OperatorMaster from '@mui/icons-material/ManageAccountsOutlined';
import MachineMaster from '@mui/icons-material/PrecisionManufacturingOutlined';
import ItemMaster from '@mui/icons-material/FactCheckOutlined';
import Dashboard from '@mui/icons-material/DashboardOutlined';
import Category from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

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

  const isActiveMachineMaster = () => {
    const basePaths = [
      "/machine-master",
      "/machine-master/add",
    ];

    // Check for exact base paths
    if (basePaths.includes(location.pathname)) {
      return true;
    }

    // Check for dynamic paths, including paths with or without an ID
    const dynamicPaths = [
      /^\/machine-master\/edit(\/[^/]+)?$/,
      /^\/machine-master\/view(\/[^/]+)?$/
    ];

    return dynamicPaths.some((regex) => regex.test(location.pathname));
  };

  const isActiveItemMaster = () => {
    const basePaths = [
      "/item-master",
      "/item-master/add",
    ];

    // Check for exact base paths
    if (basePaths.includes(location.pathname)) {
      return true;
    }

    // Check for dynamic paths, including paths with or without an ID
    const dynamicPaths = [
      /^\/item-master\/edit(\/[^/]+)?$/,
      /^\/item-master\/view(\/[^/]+)?$/
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
    return location.pathname === path ? "#E17A21" : "inherit"; // Match current pathname to highlight
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
          "&:hover": { color: "#E17A21" },
          color: getTextColor("/dashboard"),
        }}
        onClick={() => handleNavigation("/dashboard")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Dashboard style={{ color: "#E17A21", fontSize: "28px", marginLeft: "-3px" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/* Person Master */}
      {
        role === "superAdmin" &&
        <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#E17A21" },
          color: isActivePersonMaster() ? "#E17A21" : getTextColor("/person-master"),
        }}
        onClick={() => handleNavigation("/person-master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <PersonOutlineOutlinedIcon style={{ color: "#E17A21", fontSize: "30px", marginLeft: "-4px" }} />
        </ListItemIcon>
        <ListItemText primary="Person Master" />
      </ListItemButton>
      }


      {/* Operator Master */}
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#E17A21" },
          color: isActiveOperatorMaster() ? "#E17A21" : getTextColor("/operator-master"),
        }}
        onClick={() => handleNavigation("/operator-master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <OperatorMaster style={{ color: "#E17A21", fontSize: "30px", marginLeft: "-3px" }} />
        </ListItemIcon>
        <ListItemText primary="Operator Master" />
      </ListItemButton>


      {/* Item Master
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#E17A21" },
          color: getTextColor("/item-master"),
        }}
        onClick={() => handleNavigation("/item-master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Dashboard width={"20"} color="grey" />
        </ListItemIcon>
        <ListItemText primary="Item Master" />
      </ListItemButton> */}


      {/* raw material Master */}
      {role === "superAdmin" && <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#E17A21" },
          color: isActiveRawMaterialMaster() ? "#E17A21" : getTextColor("/raw_material_master"),
        }}
        onClick={() => handleNavigation("/raw_material_master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          {/* <RawMaterial width={"27"} style={{fontStyle:"bold"}} /> */}
          <AddShoppingCartOutlinedIcon style={{ color: "#E17A21", fontSize: "30px", marginLeft: "-3px" }} />
        </ListItemIcon>
        <ListItemText primary="Raw Material Master" />
      </ListItemButton>}


      {/* Item Master */}
      {role === "superAdmin" && <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#E17A21" },
          color: isActiveItemMaster() ? "#E17A21" : getTextColor("/item-master"),
        }}
        onClick={() => handleNavigation("/item-master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <ItemMaster style={{ color: "#E17A21", fontSize: "30px", marginLeft: "-3px" }} />
        </ListItemIcon>
        <ListItemText primary="Item Master" />
      </ListItemButton>}


      {/* Machine Master */}
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#E17A21" },
          color: isActiveMachineMaster() ? "#E17A21" : getTextColor("/machine-master"),
        }}
        onClick={() => handleNavigation("/machine-master")} // Navigate on click
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <MachineMaster style={{ color: "#E17A21", fontSize: "30px", marginLeft: "-3px" }} />
        </ListItemIcon>
        <ListItemText primary="Machine Master" />
      </ListItemButton>

      {/* Categories */}
      <ListItemButton
        sx={{
          py: "12px",
          "&:hover": { color: "#E17A21" },
          color: open === "category" || basePathsCategories.includes(location.pathname) ? "#E17A21" : "inherit", // Highlight when expanded
        }}
        onClick={() => handleClick("category")} // Expand/collapse only
      >
        <ListItemIcon sx={{ minWidth: "42px" }}>
          <Category style={{ color: "#E17A21", fontSize: "30px", marginLeft: "-3px" }} />
        </ListItemIcon>
        <ListItemText primary="Categories" />
        {open === "category" ? (
          <DropdownBottomIcon color="#E17A21" width="12" />
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
              "&:hover": { color: "#E17A21" },
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
              "&:hover": { color: "#E17A21" },
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
              "&:hover": { color: "#E17A21" },
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
