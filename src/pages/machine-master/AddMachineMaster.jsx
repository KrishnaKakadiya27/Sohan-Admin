import { Autocomplete, Box, Button, CircularProgress, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import CustomSwitch from '../../components/common/CustomSwitch';

const AddMachineMaster = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [perosnId, setPersonId] = useState("");
    const [dialogOpenPerson, setDialogOpenPerson] = useState(false);
    const [catId, setCatId] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpenSub, setDialogOpenSub] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermSub, setSearchTermSub] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [recordsPerPage] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Debounced search term
    const [debouncedSearchTermSubCat, setDebouncedSearchTermSubCat] = useState(''); // Debounced search term
    const [loading, setLoading] = useState(false); // Loading state for fetching
    const [selectedPerson, setSelectedPerson] = useState(null); // Selected person info
    const [selectedSubCat, setSelectedSubCat] = useState(null); // Selected person info
    const [selectedPersonFlag, setSelectedPersonFlag] = useState(false); // Selected person info
    const [selectedSubCatFlag, setSelectedSubCatFlag] = useState(false); // Selected person info

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
                `/categoryMaster?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`
            );
            const newPersonData = response.data.payload.data;
            setCategories((prev) => (currentPage === 1 ? newPersonData : [...prev, ...newPersonData]));
            setHasMore(newPersonData.length > 0);
        } catch (error) {
            console.error('Error fetching person data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTermSubCat(searchTermSub);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTermSub]);

    // Fetch person data from the API
    const fetchSubCatData = async (currentPage) => {
        setLoading(true);
        try {
            const searchValue = debouncedSearchTermSubCat ? JSON.stringify({ search: debouncedSearchTermSubCat }) : '';
            const response = await axiosInstance.get(
                `/subCategoryMaster?page=${currentPage}&records_per_page=${recordsPerPage}&search=${searchValue}`
            );
            const newPersonData = response.data.payload.data;
            setSubCategories((prev) => (currentPage === 1 ? newPersonData : [...prev, ...newPersonData]));
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


    useEffect(() => {
        fetchSubCatData(1)
    }, [debouncedSearchTermSubCat]);

    // This effect will reset the personId when searchTerm changes.
    useEffect(() => {
        if (!searchTerm) {
            setPersonId("");  // Reset personId when searchTerm is empty
        }
    }, [searchTerm]);

    useEffect(() => {
        if (!searchTermSub) {
            setCatId("");  // Reset personId when searchTerm is empty
        }
    }, [searchTermSub]);

    const handleSelectPerson = (event, newValue) => {
        if (newValue) {
            if (newValue.inputValue) {
                // New value added via freeSolo
                setSelectedPerson({ name: newValue.inputValue, isNew: true });
                setValue('categoryName', newValue.inputValue, { shouldValidate: true });
            } else {
                // Option selected from the list
                setSelectedPerson({
                    id: newValue.category_master_id,
                    uuid: newValue.uuid,
                    name: newValue.name
                });
                setValue('categoryName', newValue.name, { shouldValidate: true });
            }
            trigger("categoryName"); // Trigger validation after selecting a value
        } else {
            // Reset if no value is selected
            setSelectedPerson(null);
            setValue('categoryName', '', { shouldValidate: true });
        }
    };

    const handleSubCat = (event, newValue) => {
        if (newValue) {
            if (newValue.inputValue) {
                // New value added via freeSolo
                setSelectedSubCat({ name: newValue.inputValue, isNew: true });
                setValue('subCategoryName', newValue.inputValue, { shouldValidate: true });
            } else {
                // Option selected from the list
                setSelectedSubCat({
                    id: newValue.category_master_id,
                    uuid: newValue.uuid,
                    name: newValue.name
                });
                setValue('subCategoryName', newValue.name, { shouldValidate: true });
            }
            trigger("subCategoryName"); // Trigger validation after selecting a value
        } else {
            // Reset if no value is selected
            setSelectedSubCat(null);
            setValue('subCategoryName', '', { shouldValidate: true });
        }
    };

    // useForm setup with validation rules
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
        clearErrors,
        trigger
    } = useForm({
        mode: 'onSubmit', // Trigger validation on form submit
    });

    // Form submission handler
    const onSubmit = async (data) => {
        if (selectedPerson === null) {
            setSelectedPersonFlag(true);

        } else if (selectedSubCat === null) {
            setSelectedSubCatFlag(true)
        }
        else {
            try {
                const response = await axiosInstance.post(`machineMaster`, {
                    category_master_name: selectedPerson?.name,
                    sub_category_master_name: selectedSubCat?.name,
                    dry_production_per_hours: data?.dry_production_per_hours,
                    machine_number: data?.machine_number,
                    require_space_for_machine: data?.require_space_for_machine,
                    rent_per_sq_feet: data?.rent_per_sq_feet,
                    is_active: data?.activeStatus
                })

                if (response.status === 200) {
                    toast.success('Add machine data successfully');
                    navigate("/machine-master");
                }

            } catch (error) {
                console.log("error", error)
            }
        }


    };
    return (
        <div className="bg-white py-4 px-[20px] sm:px-[70px]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Create Machine Master</h1>
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
                                Category Name<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name='categoryName'
                                control={control}
                                rules={{
                                    required: "Category Name is required", // Validation rule
                                }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Autocomplete
                                            {...field}
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
                                                handleSelectPerson(event, newValue);
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                setValue('categoryName', newInputValue); // Update value while typing
                                                trigger("categoryName"); // Trigger validation while typing

                                                setSearchTerm(newInputValue)
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
                                                    placeholder="Category Name"
                                                    error={!!errors.categoryName} // Show error if validation fails
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
                                        {errors.categoryName && (
                                            <Typography sx={{ marginTop: 0.4, color: "#ef4444" }}>
                                                {errors.categoryName.message}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            />

                        </Grid>

                        <Grid item xs={12} md={6} >
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Sub Category Name<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name='subCategoryName'
                                control={control}
                                rules={{
                                    required: "Sub Category Name is required", // Validation rule
                                }}
                                render={({ field }) => (
                                    <>
                                        <Autocomplete
                                            {...field}
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
                                                handleSubCat(event, newValue);
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                setValue('subCategoryName', newInputValue); // Update value while typing
                                                trigger("subCategoryName"); // Trigger validation while typing

                                                setSearchTermSub(newInputValue)
                                            }}
                                            inputValue={searchTermSub}
                                            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                                            loading={loading}
                                            disableClearable
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    fullWidth
                                                    placeholder="Sub Category Name"
                                                    error={!!errors.subCategoryName} // Show error if validation fails
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
                                        {errors.subCategoryName && (
                                            <Typography sx={{ marginTop: 0.4, color: "#ef4444" }}>
                                                {errors.subCategoryName.message}
                                            </Typography>
                                        )}
                                    </>
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
                                        type="text"
                                        className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                                        placeholder="Machine Number"
                                    />
                                )}
                            />
                            {errors.machine_number && <p className="text-red-500 mt-1">{errors.machine_number?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-nowrap text-gray-700 pb-2">
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
                                        className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                                        placeholder="Dry Production"
                                    />
                                )}
                            />
                            {errors.dry_production_per_hours && <p className="text-red-500 mt-1">{errors.dry_production_per_hours?.message}</p>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
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
                                        className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                                        placeholder="Require Space for Machine"
                                    />
                                )}
                            />
                            {errors.require_space_for_machine && <p className="text-red-500 mt-1">{errors.require_space_for_machine?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Rent Per Sq.feet<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="rent_per_sq_feet"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Rent Per Sq.feet is required', pattern: {
                                        value: /^\d*$/,
                                        message: 'Rent Per Sq.feet must be a number',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
                                        placeholder="Rent Per Sq.feet"
                                    />
                                )}
                            />
                            {errors.rent_per_sq_feet && <p className="text-red-500 mt-1">{errors.rent_per_sq_feet?.message}</p>}
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
                            onClick={() => navigate("/machine-master")}
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
                            Create Machine Master
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

export default AddMachineMaster