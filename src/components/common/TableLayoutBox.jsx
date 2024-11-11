import React from "react";
import useWindowHeight from "../../customHooks/useWindowHeight";
import useWindowWidth from "../../customHooks/useWindowWidth";
import { Box } from "@mui/material";

const TableLayoutBox = (props) => {
  const windowHeight = useWindowHeight();
  const windowWidth = useWindowWidth();

  return (
    <Box
      sx={{
        width: { xs: `${windowWidth - 49}px`, lg: "auto" },
        maxHeight: `${windowHeight - 330}px`,
        overflow: "auto",
      }}
    >
      {props.children}
    </Box>
  );
};

export default TableLayoutBox;
