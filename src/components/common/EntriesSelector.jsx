import React from "react";
import { FormControl, Select, MenuItem, styled } from "@mui/material";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 50,
  "& .MuiInputBase-root": {
    borderRadius: "12px",
    backgroundColor: "#D8942E",
    color: "white",
    padding: "3px 12px",
    "& .MuiSvgIcon-root": {
      color: "white",
    },
    "&:hover": {
      backgroundColor: "#c27a24",
    },
  },
  "& .MuiInputBase-input": {
    padding: "5px 0",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:focus-visible": {
      outline: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "&.Mui-focused": {
      boxShadow: "none",
    },
  },
}));

const EntriesSelector = ({ entries, handleChange }) => {
  return (
    <StyledFormControl variant="outlined" size="small">
      <Select
        value={entries}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </StyledFormControl>
  );
};

export default EntriesSelector;
