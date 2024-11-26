import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../../axiosInstance';
import ActionButton from '../../../components/common/ActionButton';
import CustomSwitch from '../../../components/common/CustomSwitch';
import SelectCategoryDialog from './SelectCategoryDialog';


const EditSubCategory = ({ id, getCategoryData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [catIdName, setCatIdName] = useState("");
    const [catId, setCatId] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectCatFlag, setSelectCatFlag] = useState(false)
    
    const handleOpenDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
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

    const getSubCategoryDataById = async () => {
        try {
            const response = await axiosInstance.get(`subCategoryMaster/detail?uuid=${id}`)
            if (response.status === 200) {
                setSubCategoryData(response?.data?.payload?.data)
            }

        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (subCategoryData) {
            setValue("name", subCategoryData?.name);
            setValue("activeStatus", subCategoryData?.is_active);

            if (subCategoryData?.categoryMasterDetail?.name) {
                setValue("cat_id", subCategoryData?.categoryMasterDetail?.name);
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
                category_master_uuid: data?.cat_id?.uuid,
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
                                    <Grid item xs={12} md={6} mt={4}>
                                        <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                            Category ID<span className="text-red-500">*</span>
                                        </label>
                                        <Controller
                                            name="cat_id"
                                            control={control}
                                            rules={{ required: "Category ID is required" }}
                                            render={({ field }) => (
                                                <div className="relative">
                                                    <div
                                                        className="mt-1 w-full rounded-md p-3 relative flex justify-between cursor-pointer"
                                                        style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
                                                        onClick={handleOpenDialog}
                                                    >
                                                        <p>{catIdName ? catIdName : "Select Category"}</p>
                                                        {dialogOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </div>
                                                    <SelectCategoryDialog
                                                        open={dialogOpen}
                                                        setOpen={setDialogOpen}
                                                        catIdName={catIdName}
                                                        setSelectCatFlag={setSelectCatFlag}
                                                        setCatId={(id) => {
                                                            setValue("cat_id", id, id);
                                                            setCatIdName(id?.name)
                                                            setCatId({ id: id?.id, uuid: id?.uuid, name: id?.name });
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        />
                                        {errors.cat_id && (
                                            <span className="text-red-500">{errors.cat_id.message}</span>
                                        )}
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