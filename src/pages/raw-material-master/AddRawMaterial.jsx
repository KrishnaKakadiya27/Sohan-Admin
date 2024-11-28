import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Autocomplete, Box, Button, CircularProgress, createFilterOptions, Grid, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import SelectPersonMasterDialog from './SelectPersonMasterDialog';


const filter = createFilterOptions();


const AddRawMaterial = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [personIdName, setPersonIdName] = useState("");
    const [perosnId, setPersonId] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [noDataFound, setNoDataFound] = useState(false);


    const [personName, setPersonName] = useState([]); // List of people from API
    const [page, setPage] = useState(1); // Page number for pagination
    const [recordsPerPage] = useState(10); // Records per page
    const [hasMore, setHasMore] = useState(true); // To check if there are more pages
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Debounced search term
    const [loading, setLoading] = useState(false); // Loading state for fetching
    const [selectedPerson, setSelectedPerson] = useState(null); // Selected person info
    const [selectedPersonFlag, setSelectedPersonFlag] = useState(false); // Selected person info

    const [valuePerson, setValuePerson] = React.useState(null);

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
        fetchPersonData(1);
    }, [debouncedSearchTerm]);
    // This effect will reset the personId when searchTerm changes.
    useEffect(() => {
        if (!searchTerm) {
            setPersonId("");  // Reset personId when searchTerm is empty
        }
    }, [searchTerm]);


    // The handleSelectPerson will update personId only when a person is selected
    const handleSelectPerson = (event, newValue) => {
        if (newValue) {
            if (newValue.inputValue) {
                // If no matching option and user is typing a new value
                setSelectedPerson({ name: newValue.inputValue, isNew: true }); // Mark as new person
                setPersonId({ name: newValue.inputValue }); // You can customize this as needed
            } else {
                // If a valid option is selected from the list
                setSelectedPerson({ id: newValue.category_master_id, uuid: newValue.uuid, name: newValue.name });
                setPersonId({ id: newValue.category_master_id, uuid: newValue.uuid, name: newValue.name });
            }
        } else {
            // Reset personId if nothing is selected
            setSelectedPerson(searchTerm);
            setPersonId("");
        }
        setSelectedPersonFlag(false);

    };


    const handleOpenDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    // useForm setup with validation rules
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit', // Trigger validation on form submit
    });

    // Form submission handler
    const onSubmit = async (data) => {
        if (selectedPerson === null) {
            setSelectedPersonFlag(true);
        } else {
            setSelectedPersonFlag(false);
            try {
                const response = await axiosInstance.post(`rawMaterialMaster`, {
                    name: data?.name,
                    // person_master_name: data?.selectedPerson?.name,
                    price_per_unit: data?.pricePerUnit,
                    root_level: data?.rootLevel,
                    unit: data?.unit
                })

                if (response.status === 200) {
                    toast.success('Add operator master data successfully');
                    navigate("/raw_material_master");
                }

            } catch (error) {
                console.log("error", error)
            }
        }


    };
    return (
        <div className="bg-white py-4 px-[20px] sm:px-[70px]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Create Raw Material</h1>
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
                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Name<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Name"

                                    />
                                )}
                            />
                            {errors.name && <p className="text-red-500 mt-1">{errors.name?.message}</p>}
                        </Grid>

                        {/* <Grid item xs={12} md={6} >
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Person Master Name<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name=''
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        id="person-autocomplete"
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
                                <span className="text-red-500">{"Person Master ID is required"}</span>
                            )}
                        </Grid> */}


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
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Price Per Unit"
                                    />
                                )}
                            />
                            {errors.pricePerUnit && <p className="text-red-500 mt-1">{errors.pricePerUnit?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Unit<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="unit"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Unit is required', pattern: {
                                        value: /^\d*$/,
                                        message: 'Unit must be a number',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Unit"
                                    />
                                )}
                            />
                            {errors.unit && <p className="text-red-500 mt-1">{errors.unit?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
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
                                        className="mt-1 block w-full h-[53px] rounded-md shadow-sm p-3"
                                        placeholder="Root Level"
                                    />
                                )}
                            />
                            {errors.rootLevel && <p className="text-red-500 mt-1">{errors.rootLevel?.message}</p>}
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
                            onClick={() => navigate("/raw_material_master")}
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
                            Create Raw Material
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

export default AddRawMaterial