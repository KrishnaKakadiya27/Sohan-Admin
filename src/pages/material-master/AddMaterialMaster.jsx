import { Autocomplete, Box, Button, CircularProgress, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import CustomSwitch from '../../components/common/CustomSwitch';

const AddMaterialMaster = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [perosnId, setPersonId] = useState("");
  const [dialogOpenPerson, setDialogOpenPerson] = useState(false);
  const [dialogOpenRaw, setDialogOpenRaw] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [personName, setPersonName] = useState([]); // List of people from API
  const [recordsPerPage] = useState(10); // Records per page
  const [hasMore, setHasMore] = useState(true); // To check if there are more pages
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Debounced search term
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [selectedPerson, setSelectedPerson] = useState(null); // Selected person info
  const [selectedPersonFlag, setSelectedPersonFlag] = useState(false); // Selected person info


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
        `/rawMaterialMaster?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`
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
    fetchPersonData(1);
  }, [debouncedSearchTerm]);
  // This effect will reset the personId when searchTerm changes.
  useEffect(() => {
    if (!searchTerm) {
      setPersonId("");  // Reset personId when searchTerm is empty
    }
  }, [searchTerm]);



  const handleSelectPerson = (event, newValue) => {
    if (newValue) {
      if (newValue.inputValue) {
        // New value added via freeSolo
        setSelectedPerson({ name: newValue.inputValue, isNew: true });
        setValue('rawMaterialMasterName', newValue.inputValue, { shouldValidate: true });
      } else {
        // Option selected from the list
        setSelectedPerson({
          id: newValue.category_master_id,
          uuid: newValue.uuid,
          name: newValue.name
        });
        setValue('rawMaterialMasterName', newValue.name, { shouldValidate: true });
      }
      trigger("rawMaterialMasterName"); // Trigger validation after selecting a value
    } else {
      // Reset if no value is selected
      setSelectedPerson(null);
      setValue('rawMaterialMasterName', '', { shouldValidate: true });
    }
  };


  // useForm setup with validation rules
  const {
    control,
    setValue,
    clearErrors,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit', // Trigger validation on form submit
  });

  // Form submission handler
  const onSubmit = async (data) => {
    if (!selectedPerson) {
      setSelectedPersonFlag(true);
    } else {
      setSelectedPersonFlag(false);
      try {
        const response = await axiosInstance.post(`materialMaster`, {
          // person_master_id: data?.person_id?.uuid,
          raw_material_master_name: selectedPerson?.name,
          unit: data?.Units,
          total_stock: data?.totalStocks,
          price_per_unit: data?.pricePerUnit,
          root_level: data?.rootLevel,
          is_notification: data?.notificationStatus,
          is_active: data?.activeStatus
        })

        if (response.status === 200) {
          toast.success('Add item data successfully');
          navigate("/item-master");
        }

      } catch (error) {
        console.log("error", error)
      }
    }
  };
  return (
    <div className="bg-white py-4 px-[20px] sm:px-[70px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Create Item Master</h1>
      </div>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="start"
        gap={isMobile ? "20px" : "50px"}
        maxWidth={"1800px"}
      >

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          flex={1}
          sx={{
            maxWidth: isMobile ? "100%" : "75%",
            boxShadow: "0px 4px 8px 0px #00000026",
            padding: { xs: "15px", sm: "30px" },
            borderRadius: "20px",
          }}
        >
          <Grid container spacing={2}>

            {/* <Grid item xs={12} md={6} >
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Person Master Name<span className="text-red-500">*</span>
              </label>
              <Controller
                name="person_id"
                control={control}
                rules={{ required: "Person Master ID is required" }}
                render={({ field }) => (
                  <div className="relative">
                    <div
                      className="mt-1 w-full rounded-md p-3 relative flex shadow-sm justify-between cursor-pointer"
                      // style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
                      onClick={handleOpenDialogPerson}
                    >
                      <p>{personIdName ? personIdName : "Select Person Master"}</p>
                      {dialogOpenPerson ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                    <SelectPersonMasterDialog
                      open={dialogOpenPerson}
                      setOpen={setDialogOpenPerson}
                      personIdName={personIdName}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      setPersonId={(id) => {
                        // setValue("cat_id", id,id);
                        setPersonIdName(id?.name)
                        setValue("person_id", id, { shouldValidate: true });
                        setPersonId({ id: id?.id, uuid: id?.uuid, name: id?.name });
                      }}
                    />
                  </div>
                )}
              />
              {errors.person_id && (
                <span className="text-red-500">{errors.person_id.message}</span>
              )}
            </Grid> */}
            {/* <Grid item xs={12} md={6} >
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Raw Material Master Name<span className="text-red-500">*</span>
              </label>
              <Controller
                name="raw_material_id"
                control={control}
                rules={{ required: "Raw Material ID is required" }}
                render={({ field }) => (
                  <div className="relative">
                    <div
                      className="mt-1 w-full rounded-md p-3 relative flex shadow-sm justify-between cursor-pointer"
                      // style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
                      onClick={handleOpenDialogRaw}
                    >
                      <p>{rawMaterialIdName ? rawMaterialIdName : "Select Raw Material Name"}</p>
                      {dialogOpenRaw ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                    <SelectRawMaterialMaster
                      open={dialogOpenRaw}
                      setOpen={setDialogOpenRaw}
                      rawMaterialIdName={rawMaterialIdName}
                      setRawMaterialId={(id) => {
                        // setValue("cat_id", id,id);
                        setRawMaterialIdName(id?.name)
                        setValue("raw_material_id", id, { shouldValidate: true });
                        setRawMaterialId({ id: id?.id, uuid: id?.uuid, name: id?.name });
                      }}
                    />
                  </div>
                )}
              />
              {errors.raw_material_id && (
                <span className="text-red-500">{errors.raw_material_id.message}</span>
              )}
            </Grid> */}
            {/* <Grid item xs={12} md={6} >
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Raw Material Master Name<span className="text-red-500">*</span>
              </label>
              <Controller
                name='rawMaterialMasterName'
                control={control}
                rules={{
                  required: "Raw Material Master Name is required", // Validation rule
                }}
                render={({ field ,fieldState }) => (
                  <Autocomplete
                    {...field}
                    id="raw-autocomplete"
                    options={personName}
                    getOptionLabel={(option) => option.name || option.inputValue || ""}
                    filterOptions={(options, state) => {
                      const filtered = options.filter((option) =>
                        option.name.toLowerCase().includes(state.inputValue.toLowerCase())
                      );

                      const { inputValue } = state;
                      const isExisting = options.some((option) => inputValue === option.name);
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          inputValue,
                          name: `Add ${inputValue}`,
                        });
                      }

                      return filtered;
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        border: "none", // Removes the default border
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", // Ensures the border outline is hidden
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none", // Prevents border from reappearing on focus
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none", // Prevents border from appearing on hover
                      },
                      "& .MuiAutocomplete-inputRoot": {
                        padding: 0, // Removes padding for a clean look
                      },
                    }}

                    onChange={(event, newValue) => {
                      if (newValue && newValue.name && newValue.name.startsWith('Add ')) {
                        // Remove the 'Add ' prefix
                        newValue.name = newValue.name.replace('Add ', '');
                      }
                      handleSelectPerson(event, newValue);
                    }}
                    onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
                    inputValue={searchTerm}
                    isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                    loading={loading}
                    disableClearable
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        placeholder="Name"
                        error={!!fieldState?.error} // Display error if validation fails
                        // error={!!errors.rawMaterialMasterName} // Show error if validation fails
                        InputProps={{
                          ...params.InputProps,
                          className: "mt-1 block w-full rounded-md shadow-sm p-3 border-none bg-white", // Tailwind CSS classes for styling
                          style: {
                            borderColor: "transparent", // Set border color to transparent
                          },
                          endAdornment: (
                            <>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                        InputLabelProps={{
                          ...params.InputLabelProps,
                          shrink: Boolean(searchTerm) || params.inputProps?.value.length > 0, // Conditionally shrink label
                        }}
                      />
                    )}
                    renderOption={(props, option) => <li {...props}>{option.name}</li>}
                    freeSolo
                  />
                )}
              />
                {errors.rawMaterialMasterName && (
                <Typography  sx={{ marginTop: 0.4,color:"#ef4444" }}>
                  {errors.rawMaterialMasterName.message}
                </Typography>
              )}
            </Grid> */}

            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Raw Material Master Name<span className="text-red-500">*</span>
              </label>
              <Controller
                name="rawMaterialMasterName"
                control={control}
                rules={{
                  required: "Raw Material Master Name is required",
                }}
                render={({ field }) => (
                  <>
                    <Autocomplete
                      {...field}
                      id="raw-autocomplete"
                      options={personName}
                      getOptionLabel={(option) => option.name || option.inputValue || ""}
                      filterOptions={(options, state) => {
                        const filtered = options.filter((option) =>
                          option.name.toLowerCase().includes(state.inputValue.toLowerCase())
                        );
                        const { inputValue } = state;
                        const isExisting = options.some((option) => inputValue === option.name);
                        if (inputValue !== '' && !isExisting) {
                          filtered.push({
                            inputValue,
                            name: `Add ${inputValue}`,
                          });
                        }
                        return filtered;
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          border: "none", // Removes the default border
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none", // Ensures the border outline is hidden
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "none", // Prevents border from reappearing on focus
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "none", // Prevents border from appearing on hover
                        },
                        "& .MuiAutocomplete-inputRoot": {
                          padding: 0, // Removes padding for a clean look
                        },
                      }}
                      onChange={(event, newValue) => {
                        if (newValue && newValue.name && newValue.name.startsWith("Add ")) {
                          newValue.name = newValue.name.replace("Add ", "");
                        }
                        handleSelectPerson(event, newValue);
                      }}
                      onInputChange={(event, newInputValue) => {
                        setSearchTerm(newInputValue);
                        setValue('rawMaterialMasterName', newInputValue); // Update value while typing
                        trigger("rawMaterialMasterName"); // Trigger validation while typing
                      }}
                      inputValue={searchTerm}
                      isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                      loading={loading}
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                          placeholder="Name"
                          error={!!errors.rawMaterialMasterName} // Show error if validation fails
                          InputProps={{
                            ...params.InputProps,
                            className: "mt-1 block w-full rounded-md shadow-sm p-3 border-none bg-white", // Tailwind CSS classes for styling
                            style: { borderColor: "transparent" },
                            endAdornment: (
                              <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                          InputLabelProps={{
                            ...params.InputLabelProps,
                            shrink: Boolean(searchTerm) || params.inputProps?.value.length > 0, // Conditionally shrink label
                          }}
                        />
                      )}
                      renderOption={(props, option) => <li {...props}>{option.name}</li>}
                      freeSolo
                    />
                    {errors.rawMaterialMasterName && (
                      <Typography sx={{ marginTop: 0.4, color: "#ef4444" }}>
                        {errors.rawMaterialMasterName.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Total Stocks<span className="text-red-500">*</span>
              </label>
              <Controller
                name="totalStocks"
                control={control}
                defaultValue=""
                rules={{
                  required: 'TotalStocks is required', pattern: {
                    value: /^\d*$/,
                    message: 'TotalStocks must be a number',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                    placeholder="Total Stocks"
                  />
                )}
              />
              {errors.totalStocks && <p className="text-red-500 mt-1">{errors.totalStocks?.message}</p>}
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Units<span className="text-red-500">*</span>
              </label>
              <Controller
                name="Units"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Units are required', pattern: {
                    value: /^\d*$/,
                    message: 'Units must be a number',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                    placeholder="Units"
                  />
                )}
              />
              {errors.Units && <p className="text-red-500 mt-1">{errors.Units?.message}</p>}
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Price Per Unit<span className="text-red-500">*</span>
              </label>
              <Controller
                name="pricePerUnit"
                control={control}
                defaultValue=""
                rules={{
                  required: 'PricePerUnit is required', pattern: {
                    value: /^\d*$/,
                    message: 'Price Per Unit must be a number',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                    placeholder="Price Per Unit"
                  />
                )}
              />
              {errors.pricePerUnit && <p className="text-red-500 mt-1">{errors.pricePerUnit?.message}</p>}
            </Grid>

            <Grid item xs={12} md={12}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Root Level<span className="text-red-500">*</span>
              </label>
              <Controller
                name="rootLevel"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Root Level is required',
                  pattern: {
                    value: /^\d*$/,
                    message: 'Root Level must be a number',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                    placeholder="Root Level"
                  />
                )}
              />
              {errors.rootLevel && <p className="text-red-500 mt-1">{errors.rootLevel?.message}</p>}
            </Grid>

            <Grid item xs={12} md={6} mt={3}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Notification Status
              </label>
              <Controller
                name="notificationStatus"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <CustomSwitch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} mt={3}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Active Status
              </label>
              <Controller
                name="activeStatus"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <CustomSwitch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "16px",
              justifyContent: "start",
              mt: 4,
              gap: "20px",
            }}
          >
            <Button
              type="button"
              variant="contained"
              sx={{
                background: "#ffffff",
                color: "#454545",
              }}
              onClick={() => navigate("/item-master")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "linear-gradient(95.02deg, #565C62 7.02%, #243040 95.7%)",
                color: "#fff",
              }}
            >
              Create Material Master
            </Button>
          </Box>
        </Box>
      </Box>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default AddMaterialMaster