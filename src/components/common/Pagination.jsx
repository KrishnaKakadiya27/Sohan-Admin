import React from "react";
import { Box, Button, Typography } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "16px",
        justifyContent: "end",
        mt: 4,
      }}
    >
      <Button
        variant="contained"
        sx={{
          background: "#ffffff",
          boxShadow:
            "6.22px 6.22px 15px 0px #0000001A,-6.22px -6.22px 15px 0px #F9FCFF",
          padding: "7px 20px",
          color: "#454545",
        }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <Typography variant="h6" sx={{ mx: 2 }}>
        {currentPage} of {totalPages}
      </Typography>

      <Button
        variant="contained"
        sx={{
          background:
            " linear-gradient(95.02deg, #565C62 7.02%, #243040 95.7%)",
          boxShadow:
            "8px 8px 12.8px 0px #FFFFFF1A inset, -8px -8px 12.8px 0px #0000004D inset, 0px 3.46px 3.46px 0px #00000040 inset",
          padding: "7px 20px",
        }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
