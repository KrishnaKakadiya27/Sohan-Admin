import React from "react";
import { styled, Switch } from "@mui/material";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#fff",
    "& + .MuiSwitch-track": {
      backgroundColor: "#E17A21",
      opacity: 1,
    },
  },
  "& .MuiSwitch-switchBase": {
    color: "#fff",
    "& + .MuiSwitch-track": {
      backgroundColor: "#555",
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0px 0px 5px 0px #00000040",
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
  },
}));

const CustomSwitch = ({ checked, onChange,disabled, ...props }) => {
  return <StyledSwitch checked={checked} onChange={onChange} disabled={disabled} {...props} />;
};

export default CustomSwitch;
