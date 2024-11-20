import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useWindowHeight from "../../customHooks/useWindowHeight";
import useWindowWidth from "../../customHooks/useWindowWidth";

const TableLayoutBox = (props) => {
  const windowHeight = useWindowHeight();
  const windowWidth = useWindowWidth();

  const drawerValueFlag = useSelector((state) => state.auth)

  return (
    <Box
      sx={{
        width: { xs: `${windowWidth - 49}px`, lg: drawerValueFlag?.isOpen ? `${windowWidth - 320}px` : `${windowWidth - 49}px` },
        // width:  drawerValueFlag.isOpen ? `${windowWidth -  320}px`:  `${windowWidth -  49}px`  ,
        maxHeight: `${windowHeight - 330}px`,
        overflow: "auto",
      }}
    >
      {props.children}
    </Box>
  );
};

export default TableLayoutBox;
