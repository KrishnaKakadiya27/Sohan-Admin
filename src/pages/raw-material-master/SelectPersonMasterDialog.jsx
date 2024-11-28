import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import axiosInstance from '../../axiosInstance';
import SearchBar from '../../components/common/SearchBar';

const SelectPersonMasterDialog = ({ open, setPersonId, setOpen }) => {
  const [personName, setPersonName] = useState([]); // List of people from API
  const [page, setPage] = useState(1); // Page number for pagination
  const [recordsPerPage] = useState(10); // Records per page
  const [hasMore, setHasMore] = useState(true); // To check if there are more pages
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Debounced search term
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [newName, setNewName] = useState(''); // For handling new name input


  const dialogRef = useRef(null);

  // Debounce searchTerm to optimize API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch person data from the API
  const fetchPersonData = async (currentPage) => {
    setLoading(true);
    try {
      const searchValue = debouncedSearchTerm ? JSON.stringify({ search: debouncedSearchTerm }) : '';
      const response = await axiosInstance.get(
        `/personMaster?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`
      );
      const newPersonData = response.data.payload.data;
      setPersonName((prev) => (currentPage === 1 ? newPersonData : [...prev, ...newPersonData]));
      setHasMore(newPersonData.length > 0);
    } catch (error) {
      console.error('Error fetching person data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load and search handling
  useEffect(() => {
    if (open) {
      setPage(1);
      fetchPersonData(1);
    }
  }, [open, debouncedSearchTerm]);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchPersonData(nextPage);
    setPage(nextPage);
  };

  // Handle new name input and selection
  const handleSelect = (event, newValue) => {
    if (newValue) {
      if (newValue.inputValue) {
        // If the user typed a new name, you can create a new person
        setNewName(newValue.inputValue);
      } else {
        // Set selected person ID from the list
        setPersonId({ id: newValue.category_master_id, uuid: newValue.uuid, name: newValue.name });
      }
    }
  };

  return (
    <div
      // ref={dialogRef}
      // className="absolute bg-white w-full left-0 top-[52px] z-40 mb-5"
      // style={{
      //   boxShadow: '0px 4px 8px 0px #00000026',
      //   display: open ? 'block' : 'none',
      // }}
    >
      {/* Search Bar */}
      {/* <div className="p-[10px] w-full">
        <SearchBar onSearch={(term) => setSearchTerm(term)} wFull />
      </div> */}

      {/* Autocomplete Box */}
      <div className="max-h-[400px] h-auto w-full overflow-auto">
        <Autocomplete
          id="person-autocomplete"
          options={personName}
          getOptionLabel={(option) => option.name}
          filterOptions={(options, state) => {
            return options.filter((option) =>
              option.name.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
          onChange={handleSelect}
          onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
          inputValue={searchTerm}
          isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
          loading={loading}
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select or Type New Person"
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          // Handle "Add New" functionality
          renderOption={(props, option) => {
            return (
              <li {...props}>
                {option.name}
              </li>
            );
          }}
          freeSolo // Allow new entries
        />
      </div>
    </div>
  );
};

export default SelectPersonMasterDialog;
