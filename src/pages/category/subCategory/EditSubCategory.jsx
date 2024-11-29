import EditIcon from "@mui/icons-material/Edit";
import { Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../../axiosInstance';
import ActionButton from '../../../components/common/ActionButton';
import CustomSwitch from '../../../components/common/CustomSwitch';


const EditSubCategory = ({ id, getCategoryData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [catIdName, setCatIdName] = useState("");
    const [catId, setCatId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [perosnId, setPersonId] = useState("");

    const [recordsPerPage] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Debounced search term
    const [loading, setLoading] = useState(false); // Loading state for fetching
    const [selectedPerson, setSelectedPerson] = useState(null); // Selected person info
    const [selectedPersonFlag, setSelectedPersonFlag] = useState(false); // Selected person info

    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
        trigger
    } = useForm({
        mode: 'onSubmit', // Trigger validation on form submit
    });

    const handleClickOpen = () => {
        setOpen(true);
        getSubCategoryDataById();
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Debounce searchTerm to optimize API calls
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch person data from the API
    const fetchPersonData = async (currentPage) => {
        if (open) {
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
                setValue('categoryName', newValue.inputValue, { shouldValidate: true });

            } else {
                // If a valid option is selected from the list
                setSelectedPerson({ id: newValue.category_master_id, uuid: newValue.uuid, name: newValue.name });
                setPersonId({ id: newValue.category_master_id, uuid: newValue.uuid, name: newValue.name });
                setValue('categoryName', newValue.name, { shouldValidate: true });

            }
            trigger("categoryName"); // Trigger validation after selecting a value

        } else {
            // Reset personId if nothing is selected
            setSelectedPerson(searchTerm);
            setPersonId("");
            setValue('categoryName', '', { shouldValidate: true });

        }
        setSelectedPersonFlag(false);

    };



    const getSubCategoryDataById = async () => {
        try {
            const response = await axiosInstance.get(`subCategoryMaster/detail?uuid=${id}`)
            if (response.status === 200) {
                setSubCategoryData(response?.data?.payload?.data)

                const category = response?.data?.payload?.data?.categoryMasterDetail;
                if (category) {
                    setCatIdName(category.name); // For Autocomplete display
                    setSearchTerm(category.name); // Pre-fill searchTerm
                    setSelectedPerson({
                        id: category.id,
                        uuid: category.uuid,
                        name: category.name,
                    });
                    setValue("categoryName", category, { shouldValidate: true }); // Update form value
                }
            }
            trigger("categoryName");
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (subCategoryData) {
            setValue("name", subCategoryData?.name);
            setValue("activeStatus", subCategoryData?.is_active);

            if (subCategoryData?.categoryMasterDetail?.name) {
                setValue("categoryName", subCategoryData?.categoryMasterDetail?.name);
                setCatIdName(subCategoryData?.categoryMasterDetail?.name);
                setCatId({
                    id: subCategoryData?.category_master_id,
                    uuid: subCategoryData?.categoryMasterDetail?.uuid,
                    name: subCategoryData?.categoryMasterDetail?.name
                });

            } else {
                setCatIdName("Select Category");  // Default value when no category name is found
            }
        }
    }, [subCategoryData, setValue]);


    // Form submission handler
    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.put(`subCategoryMaster?uuid=${id}`, {
                name: data?.name,
                category_master_name: selectedPerson?.name,
                is_active: data?.activeStatus
            })

            if (response.status === 200) {
                toast.success('Update sub-category successfully');
                handleClose();
                getCategoryData();
            }

        } catch (error) {
            console.log("error", error)
            toast.error("Error")
        }
    };


    return (
        <React.Fragment>
            <ActionButton
                icon={<EditIcon />}
                label="Edit"
                color="#1976d2"
                onClick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <form
                    className=" py-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <DialogTitle id="alert-dialog-title">{"Edit Sub Category"}</DialogTitle>
                    <DialogContent>


                        <Box
                            // display="flex"
                            flexDirection={isMobile ? "column" : "row"}
                            justifyContent="start"
                            // gap={isMobile ? "20px" : "50px"}
                            maxWidth={"1400px"}
                            height={400}
                        >
                            <Box
                                sx={{
                                    maxWidth: isMobile ? "100%" : "75%",
                                }}
                            >
                                <Grid container >
                                    <Grid item xs={12} md={12}>
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
                                                    className="mt-1 block w-full rounded-md shadow-sm p-3"
                                                    placeholder="Name"
                                                />
                                            )}
                                        />
                                        {errors.name && <p className="text-red-500 mt-1">{errors.name?.message}</p>}
                                    </Grid>
                                    <Grid item xs={12} md={12} mt={5} >
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


                                    <Grid item xs={12} md={12} mt={3}>
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
                            </Box>
                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                margin: "16px",
                                justifyContent: "start",
                                mt: 4,
                                gap: "20px",
                            }}
                        // className="max-sm:flex-col "
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    background: "#ffffff",
                                    padding: "7px 20px",
                                    color: "#454545",
                                    textTransform: "unset",
                                }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    background:
                                        "linear-gradient(95.02deg, #565C62 7.02%, #243040 95.7%)",
                                    padding: "7px 20px",
                                    textTransform: "unset",
                                }}
                                className="text-nowrap"
                            >
                                Update Sub Category
                            </Button>
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

        </React.Fragment>
    )
}

export default EditSubCategory