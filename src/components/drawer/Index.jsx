import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useDispatch } from "react-redux";
import companyLogo from "../../assets/images/companyLogo.png";
import { setDrawerOpen } from "../../redux/slices/authSlice";
import Header from "./header";
import SidebarList from "./sidebar/Index";

const drawerWidth = 285;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,

    [theme.breakpoints.down("lg")]: {
      marginLeft: open ? 0 : 0,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: open ? 0 : `-${drawerWidth}px`,
    },

    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  [theme.breakpoints.up("lg")]: {
    width: open ? `calc(100% - ${drawerWidth}px)` : `100%`,
    marginLeft: open ? `${drawerWidth}px` : 0,
  },

  [theme.breakpoints.down("lg")]: {
    width: "100%",
    marginLeft: 0,
  },

  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export default function DrawerBox(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  // Use media query to determine if the screen width is less than 600px (mobile)
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleDrawerOpen = () => {
    setOpen(!open);
    dispatch(setDrawerOpen(!open))
    localStorage.setItem("isOpen", !open)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(setDrawerOpen(false))
    localStorage.setItem("isOpen", false)
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#ffffff",
          height: "80px",
          padding: { xs: "0 10px", sm: "0 30px" },
        }}
      >
        <Header handleDrawerOpen={handleDrawerOpen} />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            boxShadow: "10px 10px 25px 0px #00000026",
          },
        }}
        variant={isMobile ? "temporary" : "persistent"} // Change drawer variant based on screen size
        anchor="left"
        open={open}
        onClose={handleDrawerClose} // Add close behavior for mobile
      >
        <div>
          <div className="flex flex-col items-center justify-center w-full p-[30px]">
            <div className="flex gap-2">
              {/* <p className="font-extrabold text-5xl">Soham</p> */}
              <img src={companyLogo} width={150} height={150} alt="logo" />
            </div>
          </div>
        </div>
        <Divider />
        <List>
          <SidebarList />
        </List>
      </Drawer>
      <Main sx={{ padding: "24px 0 0" }} open={open}>
        {props.children}
      </Main>
    </Box>
  );
}
