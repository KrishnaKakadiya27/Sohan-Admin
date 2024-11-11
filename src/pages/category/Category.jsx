import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/common/ActionButton";
import CircularIndeterminate from "../../components/common/CircularIndeterminate";
import CustomSwitch from "../../components/common/CustomSwitch";
import EntriesSelector from "../../components/common/EntriesSelector";
import NoData from "../../components/common/NoData";
import Pagination from "../../components/common/Pagination";
import SearchBar from "../../components/common/SearchBar";
import TableLayoutBox from "../../components/common/TableLayoutBox";
import {
  fetchCategories,
  selectCategories,
  selectLoading,
  selectNoData,
} from "../../redux/slices/categorySlice";
import DeleteCategory from "./DeleteCategory";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const noData = useSelector(selectNoData);
  console.log("noData: ", noData);
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleEntriesChange = (event) => {
    setEntries(event.target.value);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Main Category</h1>
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
            onClick={() => navigate("/create-category")}
          >
            Add New Category
          </Button>
        </div>
      </div>

      <TableLayoutBox>
        <table className="w-full bg-white rounded-[8px] ">
          <thead className="bg-[#F6F6F6] border border-[#F6F6F6]">
            <tr>
              {/* <th className="py-[15px] px-4 text-[#454545] font-medium">
                Profile
              </th> */}
              <th className="py-[15px] px-4 text-[#454545] font-medium">
                Sort
              </th>
              <th className="py-[15px] px-4 text-[#454545] font-medium">
                Name
              </th>
              <th className="py-[15px] px-4 text-[#454545] font-medium">
                Description
              </th>
              <th className="py-2 px-4 text-[#454545] font-medium">Status</th>
              <th className="py-2 px-4 text-[#454545] font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="border">
            {categories.map((item, index) => (
              <tr key={index}>
                {/* <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                  <img
                    src={profileImage}
                    alt=""
                    className="bock mx-auto w-[40px]"
                  />
                </td> */}
                <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                  {item.sequence}
                </td>
                <td className="py-2 border-[1px] border-[#D0D0D0] min-w-[200px]  px-4 border-b">
                  {item?.name}
                </td>
                <td className="py-2 min-w-[200px] border-[1px] border-[#D0D0D0]  px-4 border-b">
                  {item?.description}
                </td>
                <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                  <CustomSwitch checked={item?.is_active} />
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
                      onClick={() =>
                        navigate(`/edit-category`, { state: item })
                      }
                    />
                    {/* Delete Button */}
                    <DeleteCategory id={item?.uuid} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {noData && <NoData />}

        {loading && <CircularIndeterminate />}
      </TableLayoutBox>

      {!noData && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={3} // Example total pages
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Category;
