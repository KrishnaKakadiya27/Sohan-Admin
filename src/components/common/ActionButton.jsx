import React from "react";
import { Button, Typography, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: 0,
  minWidth: "unset",
  textTransform: "none",
  marginRight: theme.spacing(2),
  "&:hover": {
    backgroundColor: "transparent",
  },
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(0.5),
  },
}));

const ActionButton = ({ icon, label, color, onClick, ...props }) => {
  return (
    <StyledButton
      startIcon={icon}
      sx={{ color: color || "#3f3f3f" }}
      onClick={onClick}
      {...props}
    >
      <Typography>{label}</Typography>
    </StyledButton>
  );
};

export default ActionButton;
