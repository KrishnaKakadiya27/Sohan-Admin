import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import ActionButton from '../../components/common/ActionButton';
import EntriesSelector from '../../components/common/EntriesSelector';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import TableLayoutBox from '../../components/common/TableLayoutBox';
import useWindowWidth from '../../customHooks/useWindowWidth';
import DeleteOperator from '../operator-master/DeleteOperator';
import DeletePersonMaster from "./DeletePersonMaster";

const PersonMaster = () => {
  const windowWidth = useWindowWidth();
  const token = localStorage.getItem("token")
  const newToken = JSON.parse(token)
  const navigate = useNavigate();

  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [personMasterData, setPersonMasterData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const handleEntriesChange = (event) => {
    setEntries(event.target.value);
    setCurrentPage(1);
  };

  const handleChangeSwitch = () => {
    setChecked((prev) => !prev);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    getListData();
  }, [currentPage, entries, searchTerm])

  const getListData = async () => {

    try {
      setIsLoading(true);
      const searchValue = searchTerm ? JSON.stringify({ search: searchTerm }) : ""
      const response = await axiosInstance.get(`/personMaster?page=${currentPage}&records_per_page=${entries}&search=${searchValue}`)
      if (response.status === 200) {
        setPersonMasterData(response?.data?.payload?.data)
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
        <h1 className="text-2xl font-semibold">Person Master List</h1>
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
            onClick={() => navigate("/person-master/add")}
          >
            Add New Person Master
          </Button>


        </div>
      </div>
      <TableLayoutBox>
        {/* <div className='!max-w-[300px]'> */}
          <table className="w-full bg-white rounded-[8px] ">
            <thead className="bg-[#F6F6F6] border border-[#F6F6F6]">
              <tr>
                <th className="py-[15px] px-4 text-[#454545] font-medium">
                  Id
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  Name
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  Email
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  Comapny Name
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  Mobile Number
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  GST Number
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  Category
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  Role
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  State
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  City
                </th>
                <th className="py-[15px] px-4 text-[#454545] font-medium text-left">
                  Country
                </th>
                {/* <th className="py-2 px-4 text-[#454545] font-medium">Status</th> */}
                <th className="py-2 px-4 text-[#454545] font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="border">
              {isLoading && personMasterData?.length === 0 ?
                <tr>
                  <td colSpan={12} className="py-2 px-4  text-center">
                    <CircularProgress />
                  </td>
                </tr>
                : (personMasterData?.length > 0 ? personMasterData?.map((item, index) => (
                  <tr key={index}>

                    <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                      {item?.person_master_id}
                    </td>
                    <td className="py-2 border-[1px] border-[#D0D0D0] min-w-[200px]  px-4 border-b">
                      {item?.name}
                    </td>
                    <td className="py-2 border-[1px] border-[#D0D0D0] min-w-[200px]  px-4 border-b">
                      {item?.email}
                    </td>
                    <td className="py-2 border-[1px] border-[#D0D0D0] min-w-[200px]  px-4 border-b">
                      {item?.company_name}
                    </td>
                    <td className="py-2 min-w-[200px] border-[1px] border-[#D0D0D0]  px-4 border-b">
                      {item?.mobile_number}
                    </td>
                    <td className="py-2 min-w-[200px] border-[1px] border-[#D0D0D0]  px-4 border-b">
                      {item?.gst_number}
                    </td>
                    <td className="py-2 min-w-[200px] border-[1px] border-[#D0D0D0]  px-4 border-b">
                      {item?.category}
                    </td>
                    <td className="py-2 min-w-[200px] border-[1px] border-[#D0D0D0]  px-4 border-b">
                      {item?.role}
                    </td>
                    <td className="py-2 min-w-[200px] border-[1px] border-[#D0D0D0]  px-4 border-b">
                      {item?.state ?? "-"}
                    </td>
                    <td className="py-2 min-w-[200px] border-[1px] border-[#D0D0D0]  px-4 border-b">
                      {item?.city ?? "-"}
                    </td>
                    <td className="py-2 min-w-[200px] border-[1px] border-[#D0D0D0]  px-4 border-b">
                      {item?.country ?? "-"}
                    </td>
                    {/* <td className="py-2 border-[1px] border-[#D0D0D0]  px-4 border-b text-center">
                  <CustomSwitch
                    checked={checked}
                    onChange={handleChangeSwitch}
                  />
                </td> */}
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
                          onClick={() => navigate(`/person-master/view/${item?.uuid}`)}
                        />

                        {/* Edit Button */}
                        <ActionButton
                          icon={<EditIcon />}
                          label="Edit"
                          color="#1976d2"
                          onClick={() => navigate(`/person-master/edit/${item?.uuid}`)}
                        />

                        {/* Delete Button */}
                        <DeletePersonMaster id={item?.uuid} getListData={getListData} />
                      </div>
                    </td>
                  </tr>
                ))
                  :
                  <tr>
                    <td colSpan={12} className="py-2 px-4  text-center text-nowrap">
                      No Person Master Data Found
                    </td>
                  </tr>)
              }
            </tbody>
          </table>
        {/* </div> */}
      </TableLayoutBox>

      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        entries={entries}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default PersonMaster