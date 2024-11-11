import React, { useState } from "react";
import EntriesSelector from "../../../components/common/EntriesSelector";
import Pagination from "../../../components/common/Pagination";
import SearchBar from "../../../components/common/SearchBar";
import ActionButton from "../../../components/common/ActionButton";
import CustomSwitch from "../../../components/common/CustomSwitch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import profileImage from "../../../assets/icons/profileImage.svg";
import useWindowWidth from "../../../customHooks/useWindowWidth";
import TableLayoutBox from "../../../components/common/TableLayoutBox";

const SubCategory = () => {
  const windowWidth = useWindowWidth();
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleEntriesChange = (event) => {
    setEntries(event.target.value);
  };

  const handleChangeSwitch = () => {
    setChecked((prev) => !prev);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Sub Category</h1>
      </div>
      <div className="flex justify-between md:items-center mb-4 max-md:flex-col">
        <div className="flex items-center space-x-2 max-md:mb-4">
          <span className="text-gray-700">Show</span>
          <EntriesSelector
            entries={entries}
            handleChange={handleEntriesChange}
          />
          <span className="text-gray-700">Entries</span>
        </div>

        <div className="flex gap-5 justify-between items-center flex-wrap">
          <SearchBar onSearch={handleSearch} />
          <Button
            variant="contained"
            sx={{
              background:
                " linear-gradient(95.02deg, #565C62 7.02%, #243040 95.7%)",
              padding: "13px 25px",
              borderRadius: "25px",
              fontSize: { xs: "12px", sm: "13px" },
            }}
          >
            Add New Category
          </Button>
        </div>
      </div>

      <TableLayoutBox>
        <table className="w-full bg-white rounded-[8px] ">
          <thead className="bg-[#F6F6F6] border border-[#F6F6F6]">
            <tr>
              <th className="py-[15px] px-4 text-[#454545] font-medium">
                Profile
              </th>
              <th className="py-[15px] px-4 text-[#454545] font-medium">
                Sort
              </th>
              <th className="py-[15px] px-4 text-[#454545] font-medium">
                Name
              </th>
              <th className="py-[15px] px-4 text-[#454545] font-medium">
                Description
              </th>
              <th className="py-[15px] px-4 text-[#454545] font-medium">
                Type
              </th>
              <th className="py-2 px-4 text-[#454545] font-medium">Status</th>
              <th className="py-2 px-4 text-[#454545] font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="border">
            {Array.from({ length: 9 }).map((_, index) => (
              <tr key={index}>
                <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                  <img
                    src={profileImage}
                    alt=""
                    className="bock mx-auto w-[40px]"
                  />
                </td>
                <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                  {index + 1}
                </td>
                <td className="py-2 border-[1px] border-[#D0D0D0] min-w-[200px]  px-4 border-b">
                  You can check - FL shop
                </td>
                <td className="py-2 min-w-[300px] border-[1px] border-[#D0D0D0]  px-4 border-b">
                  Characterful 2 double bedroom house end of terrace immaculate
                  condition great location 7.5% yield
                </td>
                <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                  -
                </td>
                <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                  <CustomSwitch
                    checked={checked}
                    onChange={handleChangeSwitch}
                  />
                </td>
                <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    {/* View Button */}
                    <ActionButton
                      icon={<VisibilityIcon />}
                      label="View"
                      color="#3f3f3f"
                    />

                    {/* Edit Button */}
                    <ActionButton
                      icon={<EditIcon />}
                      label="Edit"
                      color="#1976d2"
                    />

                    {/* Delete Button */}
                    <ActionButton
                      icon={<DeleteIcon />}
                      label="Delete"
                      color="#d32f2f"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableLayoutBox>

      <Pagination
        currentPage={currentPage}
        totalPages={3} // Example total pages
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SubCategory;
