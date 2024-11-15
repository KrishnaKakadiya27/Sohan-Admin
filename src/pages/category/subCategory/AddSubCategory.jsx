import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import CustomSwitch from '../../../components/common/CustomSwitch';
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectCategoryDialog from './SelectCategoryDialog';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import axiosInstance from '../../../axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const AddSubCategory = ({ openAdd, handleClose, getCategoryData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [catIdName, setCatIdName] = useState("");
    const [catId, setCatId] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: 'onSubmit', // Trigger validation on form submit
    });

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post(`subCategoryMaster?uuid=${data?.cat_id?.uuid}`, {
                name: data?.name,
                category_master_uuid: data?.cat_id?.uuid,
                is_active: data?.activeStatus
            })

            if (response.status === 200) {
                toast.success('Add category successfully');
                handleClose();
                getCategoryData();
            }

        } catch (error) {
            console.log("error", error)
            toast.error("Error")
        }
    };

    return (
        <div>
            <Dialog
                open={openAdd}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <form
                    className="py-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <DialogTitle id="alert-dialog-title">{"Add Sub Category"}</DialogTitle>
                    <DialogContent>
                        <Box
                            flexDirection={isMobile ? "column" : "row"}
                            justifyContent="start"
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
                                    <Grid item xs={12} md={12} mt={4}>
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
                                                        setCatId={(id) => {
                                                            // setValue("cat_id", id,id);
                                                            setCatIdName(id?.name)
                                                            setValue("cat_id", id, { shouldValidate: true });
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
                    <DialogActions className='mt-4'>
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
                                onClick={() => {
                                    handleClose();
                                    reset();
                                }}
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
                                Add Category
                            </Button>
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

export default AddSubCategory