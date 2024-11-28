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

const ViewMachineMaster = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const UId = useParams();
    const [machineData, setMachineData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [catIdName, setCatIdName] = useState("");
    const [subCatIdName, setSubCatIdName] = useState("");
    const [searchTermSub, setSearchTermSub] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for fetching
    const [selectedPerson, setSelectedPerson] = useState(null); // Selected person info
    const [selectedSubCat, setSelectedSubCat] = useState(null); // Selected person info


    // useForm setup with validation rules
    const {
        control,
        setValue
    } = useForm({
        mode: 'onSubmit', // Trigger validation on form submit
    });

    useEffect(() => {
        getMachineDataById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getMachineDataById = async () => {
        try {
            const response = await axiosInstance.get(`machineMaster/detail?uuid=${UId?.id}`)
            if (response.status === 200) {
                setMachineData(response?.data?.payload?.data)
                const category = response?.data?.payload?.data?.categoryMasterDetail;
                const subCategory = response?.data?.payload?.data?.subCategoryMasterDetail;
                if (category) {
                    setCatIdName(category.name); // For Autocomplete display
                    setSearchTerm(category.name); // Pre-fill searchTerm
                    setSelectedPerson({
                        id: category.id,
                        uuid: category.uuid,
                        name: category.name,
                    });
                    setValue("cat_id", category, { shouldValidate: true }); // Update form value
                }

                if (subCategory) {
                    setSubCatIdName(subCategory.name); // For Autocomplete display
                    setSearchTermSub(subCategory.name); // Pre-fill searchTermSub
                    setSelectedSubCat({
                        id: subCategory.id,
                        uuid: subCategory.uuid,
                        name: subCategory.name,
                    });
                    setValue("sub_cat_id", subCategory, { shouldValidate: true }); // Update form value
                }
            }

        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <div className="bg-white py-4 px-[20px] sm:px-[70px]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">View Machine Master Details</h1>
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
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Categories<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name='cat_id'
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        readOnly
                                        id="raw-autocomplete"
                                        options={categories}
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
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Sub Category Name<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name='sub_cat_id'
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        readOnly
                                        id="raw-autocomplete"
                                        options={subCategories}
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
                                            // handleSubCat(event, newValue);
                                        }}
                                        onInputChange={(event, newInputValue) => setSearchTermSub(newInputValue)}
                                        inputValue={searchTermSub}
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
                                                    shrink: Boolean(searchTermSub) || params.inputProps?.value.length > 0, // Conditionally shrink label
                                                }}
                                            />
                                        )}
                                        renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                        freeSolo
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Machine Number<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="machine_number"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Machine Number is required', pattern: {
                                        value: /^\d*$/,
                                        message: 'Machine Number must be a number',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        value={machineData?.machine_number}
                                        type="text"
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Machine Number"
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Dry Production Per Hours<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="dry_production_per_hours"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Dry Production is required', pattern: {
                                        value: /^\d*$/,
                                        message: 'Dry Production must be a number',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Dry Production"
                                        value={machineData?.dry_production_per_hours}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] text-nowrap font-medium text-gray-700 pb-2">
                                Require Space for Machine<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="require_space_for_machine"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Require Space for Machine are required'
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Require Space for Machine"
                                        value={machineData?.require_space_for_machine}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Rent Per Sq.feet<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="rent_per_sq_feet"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Rent Per Sq.feet"
                                        value={machineData?.rent_per_sq_feet}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Rent Per Hour<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="rent_per_sq_feet"
                                control={control}
                                defaultValue=""

                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Rent Per Hr"
                                        value={machineData?.rent_per_hour}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Rent Per 8 hr<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="rent_per_sq_feet"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Rent Per 8 hrs"
                                        value={machineData?.rent_per_8_hours}
                                    />
                                )}
                            />
                        </Grid>



                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Active Status
                            </label>
                            <Controller
                                name="activeStatus"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <CustomSwitch
                                        // checked={field.value}
                                        checked={machineData?.is_active}
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
                            onClick={() => navigate("/machine-master")}
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
                            {moment(machineData?.created_at).format("DD-MM-YYYY")}
                        </Typography>

                        <Typography variant="body1" mt={3} gutterBottom fontWeight={"500"}>
                            Last modified at
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {moment(machineData?.updated_at).format("DD-MM-YYYY")}
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

export default ViewMachineMaster