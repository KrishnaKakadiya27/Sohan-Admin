import { Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';


const ViewRawMaterial = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const UId = useParams();
    const [rawMaterialData, setRawMaterialData] = useState([])

    // useForm setup with validation rules
    const {
        control
    } = useForm({
        mode: 'onSubmit', // Trigger validation on form submit
    });

    useEffect(() => {
        getOperatorDataById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getOperatorDataById = async () => {
        try {
            const response = await axiosInstance.get(`rawMaterialMaster/detail?uuid=${UId?.id}`)
            if (response.status === 200) {
                setRawMaterialData(response?.data?.payload?.data)
            }

        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <div className="bg-white py-4 px-[20px] sm:px-[70px]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">View Operator Details</h1>
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
                    //   onSubmit={handleSubmit(onSubmit)}
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
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Name"
                                        value={rawMaterialData?.name}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Price Per Unit<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="country"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Price Per Unit"
                                        value={rawMaterialData?.price_per_unit}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Unit<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="country"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Unit"
                                        value={rawMaterialData?.unit}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Root Level<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="state"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="State"
                                        value={rawMaterialData?.root_level}

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
                            onClick={() => navigate("/raw_material_master")}
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
                            {moment(rawMaterialData?.created_at).format("DD-MM-YYYY")}
                        </Typography>

                        <Typography variant="body1" mt={3} gutterBottom fontWeight={"500"}>
                            Last modified at
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {moment(rawMaterialData?.updated_at).format("DD-MM-YYYY")}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default ViewRawMaterial