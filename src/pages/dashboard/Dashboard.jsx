import { Typography } from "@mui/material";
import React from "react";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


const Dashboard = () => {
  const handleExport = async () => {
    // Create a new workbook and a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add data with background color
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Age', key: 'age', width: 10 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    // Add rows with specific cell styling
    const rows = [
      { name: 'John Doe', age: 28, status: 'Active' },
      { name: 'Jane Smith', age: 34, status: 'Inactive' },
    ];

    rows.forEach((row, index) => {
      const rowIndex = index + 2; // Row 1 is for headers
      const excelRow = worksheet.addRow(row);

      // Determine the background color based on the 'status' column
      const backgroundColor = row.status === 'Active' ? 'FFB6D7A8' : 'FFFFB3B3'; // Green for Active, Red for Inactive

      // Apply the background color to all cells in the row
      excelRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: backgroundColor },
        };
      });
    });

    // Generate Excel file and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, 'StyledData.xlsx');
  };
  return (
    <div>
      <Typography sx={{ marginBottom: 2 }}> Welcome to Dashboard!</Typography>
      <button onClick={handleExport}>Export to Excel</button>
    </div>
  );
};

export default Dashboard;
