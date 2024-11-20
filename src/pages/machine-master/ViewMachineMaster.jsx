import React, { useEffect, useState } from 'react'
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import axiosInstance from '../../axiosInstance';
import SelectPersonMasterDialog from '../raw-material-master/SelectPersonMasterDialog';
import SelectCategoryDialog from '../category/subCategory/SelectCategoryDialog';
import SelectSubCategoryDialog from './SelectSubCategoryDialog';
import CustomSwitch from '../../components/common/CustomSwitch';
import { Toaster } from 'react-hot-toast';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

const ViewMachineMaster = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const UId = useParams();
    const [machineData, setMachineData] = useState([])
    const [personIdName, setPersonIdName] = useState("");
    const [perosnId, setPersonId] = useState("");
    const [dialogOpenPerson, setDialogOpenPerson] = useState(false);
    const [catIdName, setCatIdName] = useState("");
    const [catId, setCatId] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [subCatIdName, setSubCatIdName] = useState("");
    const [subCatId, setSubCatId] = useState("");
    const [dialogOpenSub, setDialogOpenSub] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryId, setCategoryId] = useState(catId?.id);


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
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        mode: 'onSubmit', // Trigger validation on form submit
    });

    useEffect(() => {
        getMachineDataById();
    }, [])

    const getMachineDataById = async () => {
        try {
            const response = await axiosInstance.get(`machineMaster/detail?uuid=${UId?.id}`)
            if (response.status === 200) {
                setMachineData(response?.data?.payload?.data)
            }

        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <div className="bg-white py-4 px-[20px] sm:px-[70px]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Machine Master</h1>
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
                    // onSubmit={handleSubmit(onSubmit)}
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
                                        // onClick={handleOpenDialogPerson}
                                        >
                                            <p>{machineData?.personMasterDetailes?.name}</p>
                                            {dialogOpenPerson ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </div>

                                    </div>
                                )}
                            />

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
                                        // onClick={handleOpenDialog}
                                        >
                                            <p>{machineData?.categoryMasterDetail?.name}</p>
                                            {dialogOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </div>
                                    </div>
                                )}
                            />

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
                                        // onClick={handleOpenDialogSub}
                                        >
                                            <p>{machineData?.subCategoryMasterDetail?.name}</p>
                                            {dialogOpenSub ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </div>
                                    </div>
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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