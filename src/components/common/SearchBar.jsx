import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch, placeholder = "Search here" }) => {
  return (
    <TextField
      id="input-with-icon-textfield"
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: "25px" }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .css-5h82ro-MuiInputBase-root-MuiInput-root::after ": {
          borderBottom: "2px solid #D8942E",
        },
        width: { xs: "100%", sm: "auto" },
      }}
      variant="standard"
    />
  );
};

export default SearchBar;
