import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Autocomplete, Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import CustomSwitch from '../../components/common/CustomSwitch';


const ViewMaterialMaster = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const UId = useParams();
  const [materialData, setMaterialData] = useState([])
  const [rawMaterialIdName, setRawMaterialIdName] = useState("");
  const [rawMaterialId, setRawMaterialId] = useState("");
  const [perosnId, setPersonId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [personName, setPersonName] = useState([]); // List of people from API
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [selectedPerson, setSelectedPerson] = useState(null); // Selected person info
  const [selectedPersonFlag, setSelectedPersonFlag] = useState(false); // Selected person info
  // useForm setup with validation rules

  const {
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onSubmit', // Trigger validation on form submit
  });

  useEffect(() => {
    getMaterialDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMaterialDataById = async () => {
    try {
      const response = await axiosInstance.get(`materialMaster/detail?uuid=${UId?.id}`)
      if (response.status === 200) {
        setMaterialData(response?.data?.payload?.data)
        const rawMaterial = response?.data?.payload?.data?.rawMaterialMasterDetail;
        if (rawMaterial) {
          setRawMaterialIdName(rawMaterial.name); // For display in Autocomplete
          setSearchTerm(rawMaterial.name);       // Pre-fill the searchTerm
          setRawMaterialId({
            id: rawMaterial.id,
            uuid: rawMaterial.uuid,
            name: rawMaterial.name
          });
          setValue("raw_material_id", rawMaterial, { shouldValidate: true }); // Update the form value
        }
      }

    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="bg-white py-4 px-[20px] sm:px-[70px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Item Master </h1>
      </div>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="start"
        gap={isMobile ? "20px" : "20px"}
        maxWidth={"1800px"}
      >

        <Box
          component="form"
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
              <label className="block text-[17px] text-nowrap font-medium text-gray-700 pb-2">
                Raw Material Master Name<span className="text-red-500">*</span>
              </label>
              <Controller
                name=''
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    id="raw-autocomplete"
                    readOnly
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
                      // handleSelectPerson(event, newValue);
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
              {selectedPersonFlag && (
                <span className="text-red-500">{"Raw Material is required"}</span>
              )}
            </Grid>


            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Total Stocks<span className="text-red-500">*</span>
              </label>
              <Controller
                name="totalStocks"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                    placeholder="Total Stocks"
                    value={materialData?.total_stock}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Units<span className="text-red-500">*</span>
              </label>
              <Controller
                name="Units"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                    placeholder="Units"
                    value={materialData?.unit}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Price Per Unit<span className="text-red-500">*</span>
              </label>
              <Controller
                name="pricePerUnit"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                    placeholder="Price Per Unit"
                    value={materialData?.price_per_unit}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Root Level<span className="text-red-500">*</span>
              </label>
              <Controller
                name="rootLevel"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                    placeholder="Root Level"
                    value={materialData?.root_level}
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
                render={({ field }) => (
                  <CustomSwitch
                    // checked={field.value}
                    checked={materialData?.is_notification}
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
                render={({ field }) => (
                  <CustomSwitch
                    checked={materialData?.is_active}
                    // value={materialData?.total_stock}
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
                background: "#454545",
                color: "#ffffff",
              }}
              onClick={() => navigate("/item-master")}
            >
              Back
            </Button>
          </Box>
        </Box>
        {/* Right Section: Info Card */}
        <Card
          sx={{
            width: isMobile ? "100%" : "300px",
            marginTop: isMobile ? "20px" : "0",
            boxShadow: "0px 4px 8px 0px #00000026",
            height: "max-content",
            borderRadius: "20px",
          }}
        >
          <CardContent>
            <Typography variant="body1" gutterBottom fontWeight={"500"}>
              Created at
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {moment(materialData?.created_at).format("DD-MM-YYYY")}
            </Typography>

            <Typography variant="body1" mt={3} gutterBottom fontWeight={"500"}>
              Last modified at
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {moment(materialData?.updated_at).format("DD-MM-YYYY")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default ViewMaterialMaster