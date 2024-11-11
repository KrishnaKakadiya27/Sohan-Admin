import { styled } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import DrawerBox from "../../components/drawer/Index";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MainLayout = () => {
  //   const { screenWidth, mobileWidth } = useContext(ScreenSizeContext);

  const { pathname } = useLocation();

  //   if (screenWidth <= mobileWidth) {
  //     return <Navigate to={"/mobile-view"} state={pathname} />;
  //   }

  if (pathname === "/") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <DrawerBox>
      <DrawerHeader />
      <Outlet />
    </DrawerBox>
  );
};

export default MainLayout;
