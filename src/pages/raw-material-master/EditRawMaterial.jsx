import { Box, Button, Grid, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import axiosInstance from '../../axiosInstance';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import toast, { Toaster } from 'react-hot-toast';
import SelectPersonMasterDialog from './SelectPersonMasterDialog';


const EditRawMaterial = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const UId = useParams();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [rawMaterialData, setRawMaterialData] = useState([]);
    const [catIdName, setCatIdName] = useState("");
    const [catId, setCatId] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(!dialogOpen);
    }


    // useForm setup with validation rules
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit', // Trigger validation on form submit
    });


    // Form submission handler
    const onSubmit = async (data) => {

        try {
            const response = await axiosInstance.put(`rawMaterialMaster?uuid=${UId?.id}`, {
                name: data?.name,
                person_master_id: data?.person_id?.uuid,
                price_per_unit: data?.pricePerUnit,
                root_level: data?.rootLevel
            })

            if (response.status === 200) {
                navigate("/raw_material_master");
                toast.success('Updated data successfully');

            }

        } catch (error) {
            console.log("error", error)
            toast.error('Errror');
        }
        // Perform form submission actions here
    };

    useEffect(() => {
        getRawMaterialDataById();
    }, [])



    const getRawMaterialDataById = async () => {
        try {
            const response = await axiosInstance.get(`rawMaterialMaster/detail?uuid=${UId?.id}`)
            if (response.status === 200) {
                setRawMaterialData(response?.data?.payload?.data)
            }

        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        if (rawMaterialData) {
            setValue("name", rawMaterialData?.name);
            setValue("pricePerUnit", rawMaterialData?.price_per_unit);
            setValue("rootLevel", rawMaterialData?.root_level);
            if (rawMaterialData?.personMasterDetailes?.name) {
                setValue("person_id", rawMaterialData?.personMasterDetailes?.name);
                setCatIdName(rawMaterialData?.personMasterDetailes?.name);
                setCatId({
                    id: rawMaterialData?.personMasterDetailes,
                    uuid: rawMaterialData?.personMasterDetailes?.uuid,
                    name: rawMaterialData?.personMasterDetailes?.name
                });
            } else {
                setCatIdName("Select Person Master Name");  // Default value when no category name is found
            }
        }
    }, [rawMaterialData, setValue]);
    return (
        <div className="bg-white py-4 px-[20px] sm:px-[70px]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Edit Raw Material</h1>
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Name"
                                    />
                                )}
                            />
                            {errors.name && <p className="text-red-500 mt-1">{errors.name?.message}</p>}
                        </Grid>

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
                                            onClick={handleOpenDialog}
                                        >
                                            <p>{catIdName ? catIdName : "Select Person Master"}</p>
                                            {dialogOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </div>
                                        <SelectPersonMasterDialog
                                            open={dialogOpen}
                                            setOpen={setDialogOpen}
                                            catIdName={catIdName}
                                            setCatId={(id) => {
                                                // setValue("cat_id", id,id);
                                                setCatIdName(id?.name)
                                                setValue("person_id", id, { shouldValidate: true });
                                                setCatId({ id: id?.id, uuid: id?.uuid, name: id?.name });
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Price Per Unit"
                                    />
                                )}
                            />
                            {errors.pricePerUnit && <p className="text-red-500 mt-1">{errors.pricePerUnit?.message}</p>}
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
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
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
                            Update Raw Material
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

export default EditRawMaterial