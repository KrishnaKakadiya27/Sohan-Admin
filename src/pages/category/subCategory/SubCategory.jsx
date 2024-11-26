import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../axiosInstance";
import CustomSwitch from "../../../components/common/CustomSwitch";
import EntriesSelector from "../../../components/common/EntriesSelector";
import Pagination from "../../../components/common/Pagination";
import SearchBar from "../../../components/common/SearchBar";
import TableLayoutBox from "../../../components/common/TableLayoutBox";
import AddSubCategory from "./AddSubCategory";
import DeleteSubCategory from "./DeleteSubCategory";
import EditSubCategory from "./EditSubCategory";


const SubCategory = () => {
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // useForm setup with validation rules
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onSubmit', // Trigger validation on form submit
  });

  const handleClickOpen = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
  };


  const handleEntriesChange = (event) => {
    setEntries(event.target.value);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`subCategoryMaster`, {
        name: data?.name,
        is_active: data?.activeStatus,
        // category_master_uuid:
      })

      if (response.status === 200) {
        toast.success('Add category successfully');
        handleClose();
        getCategoryData();
      }

    } catch (error) {
      console.log("error", error)
      toast.error("Error")
    }
  };

  useEffect(() => {
    getCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, entries, searchTerm])

  const getCategoryData = async () => {

    try {
      setIsLoading(true);
      const searchValue = searchTerm ? JSON.stringify({ search: searchTerm }) : ""
      const response = await axiosInstance.get(`/subCategoryMaster?page=${currentPage}&records_per_page=${entries}&search=${searchValue}`)
      if (response.status === 200) {
        setSubCategoryData(response?.data?.payload?.data)
        setTotalRecords(response?.data?.pager?.total_records)
        setIsLoading(false)
      }
    } catch (error) {
      console.log("error", error)
      setIsLoading(false)
    }
  }


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
            onClick={() => {
              handleClickOpen();
              reset();
            }}
          >
            Add New Category
          </Button>
        </div>
      </div>

      <TableLayoutBox>
        {/* className ="!max-w-[300px]" */}
        <div className="">
          <table className="w-full bg-white rounded-[8px] ">
            <thead className="bg-[#F6F6F6] border border-[#F6F6F6]">
              <tr>
                <th className="py-[15px] px-4 text-[#454545] font-medium">
                  Id
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium">
                  Main Category Name
                </th>
                <th className="py-[15px] px-4 text-[#454545] text-left font-medium">
                  Sub Category Name
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium">
                  Status
                </th>
                <th className="py-2 px-4 text-[#454545] font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="border">
              {isLoading && subCategoryData?.length === 0 ?
                <tr>
                  <td colSpan={12} className="py-2 px-4  text-center">
                    <CircularProgress />
                  </td>
                </tr>
                : (subCategoryData?.length > 0 ? subCategoryData?.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                      {item?.sub_category_master_id}
                    </td>
                    <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                      {item?.categoryMasterDetail?.name}
                    </td>
                    <td className="py-2 border-[1px] border-[#D0D0D0] min-w-[200px]  px-4 border-b">
                      {item?.name}
                    </td>

                    <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                      <CustomSwitch checked={item?.is_active ?? false} disabled={true} />
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
                        <EditSubCategory id={item?.uuid} getCategoryData={getCategoryData} />
                        {/* Delete Button */}
                        <DeleteSubCategory id={item?.uuid} getCategoryData={getCategoryData} />
                      </div>
                    </td>
                  </tr>
                ))
                  :
                  <tr>
                    <td colSpan={12} className="py-2 px-4  text-center text-nowrap">
                      No Category Found
                    </td>
                  </tr>)
              }

            </tbody>
          </table>
        </div>
      </TableLayoutBox>

      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        entries={entries}
        onPageChange={handlePageChange}
      />
      {openAdd && <AddSubCategory getCategoryData={getCategoryData} openAdd={openAdd} handleClose={handleClose} handleSubmit={handleSubmit} onSubmit={onSubmit} control={control} reset={reset} errors={errors} />}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default SubCategory;
