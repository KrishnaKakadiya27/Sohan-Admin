import { Autocomplete, Box, Button, CircularProgress, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import CustomSwitch from '../../components/common/CustomSwitch';


const EditMaterialMaster = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const UId = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [materialData, setMaterialData] = useState([]);
  const [perosnId, setPersonId] = useState("");
  const [rawMaterialIdName, setRawMaterialIdName] = useState("");
  const [rawMaterialId, setRawMaterialId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [personName, setPersonName] = useState([]); // List of people from API
  const [recordsPerPage] = useState(10); // Records per page
  const [hasMore, setHasMore] = useState(true); // To check if there are more pages
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Debounced search term
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [selectedPerson, setSelectedPerson] = useState(null); // Selected person info


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
    handleSubmit,
    clearErrors,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit', // Trigger validation on form submit
  });


  // Form submission handler
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(`materialMaster?uuid=${UId?.id}`, {
        raw_material_master_name: selectedPerson?.name,
        unit: data?.Units,
        total_stock: data?.totalStocks,
        price_per_unit: data?.pricePerUnit,
        root_level: data?.rootLevel,
        is_notification: data?.notificationStatus,
        is_active: data?.activeStatus
      })

      if (response.status === 200) {
        navigate("/item-master");
        toast.success('Updated data successfully');

      }

    } catch (error) {
      console.log("error", error)
      toast.error('Errror');
    }
    // Perform form submission actions here
  };

  useEffect(() => {
    getMaterialDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const getMaterialDataById = async () => {
    try {
      const response = await axiosInstance.get(`materialMaster/detail?uuid=${UId?.id}`)
      if (response.status === 200) {
        setMaterialData(response?.data?.payload?.data)
        // Set the raw material details
        const rawMaterial = response?.data?.payload?.data?.rawMaterialMasterDetail;
        if (rawMaterial) {
          setRawMaterialIdName(rawMaterial.name); // For display in Autocomplete
          setSearchTerm(rawMaterial.name);       // Pre-fill the searchTerm
          setRawMaterialId({
            id: rawMaterial.id,
            uuid: rawMaterial.uuid,
            name: rawMaterial.name
          });
          setValue("rawMaterialMasterName", rawMaterial, { shouldValidate: true }); // Update the form value
        }

      }
      trigger("rawMaterialMasterName");
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    if (materialData) {
      setValue("pricePerUnit", materialData?.price_per_unit);
      setValue("rootLevel", materialData?.root_level);
      setValue("totalStocks", materialData?.total_stock);
      setValue("Units", materialData?.unit);
      setValue("notificationStatus", materialData?.is_notification);
      setValue("activeStatus", materialData?.is_active);

    }
  }, [materialData, setValue]);
  return (
    <div className="bg-white py-4 px-[20px] sm:px-[70px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Edit Item Master</h1>
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

            <Grid item xs={12} md={6} >
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Raw Material Master Name<span className="text-red-500">*</span>
              </label>
              <Controller
                name='rawMaterialMasterName'
                control={control}
                rules={{
                  required: "Raw Material Master Name is required", // Validation rule
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
                      if (newValue && newValue.name && newValue.name.startsWith('Add ')) {
                        // Remove the 'Add ' prefix
                        newValue.name = newValue.name.replace('Add ', '');
                      }
                      handleSelectPerson(event, newValue);
                    }}
                    onInputChange={(event, newInputValue) => {   
                      setValue('rawMaterialMasterName', newInputValue); // Update value while typing
                      trigger("rawMaterialMasterName"); // Trigger validation while typing
                      setSearchTerm(newInputValue)}}
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
              Update Material Master
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

export default EditMaterialMaster