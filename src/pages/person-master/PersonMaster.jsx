import React, { useState } from 'react'
import useWindowWidth from '../../customHooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';
import EntriesSelector from '../../components/common/EntriesSelector';
import { Button } from '@mui/material';
import SearchBar from '../../components/common/SearchBar';

const PersonMaster = () => {
  const windowWidth = useWindowWidth();
  const token = localStorage.getItem("token")
  const newToken = JSON.parse(token)
  const navigate = useNavigate();

  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [operatorData, setOperatorData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

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
  </div>
  )
}

export default PersonMaster