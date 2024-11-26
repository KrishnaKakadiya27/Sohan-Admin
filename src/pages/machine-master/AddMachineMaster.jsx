import React, { useState } from 'react'
import { useTheme } from "@mui/material/styles";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import SelectPersonMasterDialog from '../raw-material-master/SelectPersonMasterDialog';
import CustomSwitch from '../../components/common/CustomSwitch';
import toast, { Toaster } from 'react-hot-toast';
import SelectCategoryDialog from '../category/subCategory/SelectCategoryDialog';
import SelectSubCategoryDialog from './SelectSubCategoryDialog';
import axiosInstance from '../../axiosInstance';

const AddMachineMaster = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [personIdName, setPersonIdName] = useState("");
    const [perosnId, setPersonId] = useState("");
    const [dialogOpenPerson, setDialogOpenPerson] = useState(false);
    const [catIdName, setCatIdName] = useState("");
    const [catId, setCatId] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [subCatIdName, setSubCatIdName] = useState("");
    const [subCatId, setSubCatId] = useState("");
    const [dialogOpenSub, setDialogOpenSub] = useState(false);
    const [categoryId, setCategoryId] = useState(catId?.id);
    const [selectCatFlag, setSelectCatFlag] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    const handleOpenDialogPerson = () => {
        setDialogOpenPerson(!dialogOpenPerson);
        setSearchTerm("");
    }

    const handleOpenDialog = () => {
        setDialogOpen(!dialogOpen);
    }
    const handleOpenDialogSub = () => {
        setDialogOpenSub(!dialogOpenSub);
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
        try {
            const response = await axiosInstance.post(`machineMaster`, {
                person_master_id: data?.person_id?.uuid,
                category_master_id: data?.cat_id?.uuid,
                sub_category_master_id: data?.sub_cat_id?.uuid,
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
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Category Name<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="cat_id"
                                control={control}
                                rules={{ required: "Category ID is required" }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <div
                                            className="mt-1 w-full rounded-md p-3 shadow-sm relative flex justify-between cursor-pointer"
                                            // style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
                                            onClick={handleOpenDialog}
                                        >
                                            <p>{catIdName ? catIdName : "Select Category"}</p>
                                            {dialogOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </div>
                                        <SelectCategoryDialog
                                            open={dialogOpen}
                                            setOpen={setDialogOpen}
                                            setSelectCatFlag={setSelectCatFlag}
                                            setCatId={(id) => {
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

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Sub Category Name<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="sub_cat_id"
                                control={control}
                                rules={{ required: "Sub Category is required" }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <div
                                            className="mt-1 w-full rounded-md p-3 shadow-sm relative flex justify-between cursor-pointer"
                                            // style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
                                            onClick={handleOpenDialogSub}
                                        >
                                            <p>{subCatIdName ? subCatIdName : "Select Category"}</p>
                                            {dialogOpenSub ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </div>
                                        <SelectSubCategoryDialog
                                            open={dialogOpenSub}
                                            setOpen={setDialogOpenSub}
                                            subCatIdName={subCatIdName}
                                            catIdName={catIdName}
                                            categoryId={categoryId}
                                            setSelectCatFlag={setSelectCatFlag}
                                            catId={catId}
                                            setSubCatId={(id) => {
                                                // setValue("cat_id", id,id);
                                                setSubCatIdName(id?.name)
                                                setCategoryId(catIdName?.id)
                                                setValue("sub_cat_id", id, { shouldValidate: true });
                                                setSubCatId({ id: id?.id, uuid: id?.uuid, name: id?.name });
                                            }}
                                        />
                                    </div>
                                )}
                            />
                            {errors.sub_cat_id && (
                                <span className="text-red-500">{errors.sub_cat_id.message}</span>
                            )}
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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