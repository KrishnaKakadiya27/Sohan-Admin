import { Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const AddOperator = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const UId = useParams();
    const [operatorData, setOperatorData] = useState([])

    // useForm setup with validation rules
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: 'onSubmit', // Trigger validation on form submit
    });

    useEffect(() => {
        getOperatorDataById();
    }, [])

    const getOperatorDataById = async () => {
        try {
            const response = await axiosInstance.get(`operationMaster/detail?uuid=${UId?.id}`)
            if (response.status === 200) {
                setOperatorData(response?.data?.payload?.data)
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
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Name"
                                        value={operatorData?.name}
                                    />
                                )}
                            />
                            {errors.name && <p className="text-red-500 mt-1">{errors.name?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Aadhar Card Number<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="aadharCardNumber"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Aadhar Card number is required',
                                    pattern: {
                                        value: /^\d{12}$/,
                                        message: 'Aadhar Card number must be 12 digits',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Aadhar Card Number"
                                        value={operatorData?.adhar_card_number}
                                    />
                                )}
                            />
                            {errors.aadharCardNumber && <p className="text-red-500 mt-1">{errors.aadharCardNumber?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Mobile Number<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="mobileNumber"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Mobile number is required',
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: 'Invalid mobile number',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="tel"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Mobile Number"
                                        value={operatorData?.mobile_number}
                                    />
                                )}
                            />
                            {errors.mobileNumber && <p className="text-red-500 mt-1">{errors.mobileNumber?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Country<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="country"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Country is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Country"
                                        value={operatorData?.country}
                                    />
                                )}
                            />
                            {errors.country && <p className="text-red-500 mt-1">{errors.country?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Address<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="address"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Address is required' }}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        type="text"
                                        className="mt-1 min-h-[200px] block w-full rounded-md shadow-sm p-3"
                                        placeholder="Address"
                                        value={operatorData?.address}

                                    />
                                )}
                            />
                            {errors.address && <p className="text-red-500 mt-1">{errors.address?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                State<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="state"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'State is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="State"
                                        value={operatorData?.state}

                                    />
                                )}
                            />
                            {errors.state && <p className="text-red-500 mt-1">{errors.state?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                City<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="city"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'City is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="City"
                                        value={operatorData?.city}

                                    />
                                )}
                            />
                            {errors.city && <p className="text-red-500 mt-1">{errors.city?.message}</p>}
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Working Hours without Lunch<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="working_hours_without_lunch"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Working hrs is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Working Hours without Lunch"
                                        value={operatorData?.working_hours_without_lunch}

                                    />
                                )}
                            />
                            {errors.state && <p className="text-red-500 mt-1">{errors.state?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Salary Per Day<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="salary_per_day"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Salary is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Salary Per Day"
                                        value={operatorData?.salary_per_day}
                                    />
                                )}
                            />
                            {errors.salary_per_day && <p className="text-red-500 mt-1">{errors.salary_per_day?.message}</p>}
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
                            onClick={() => navigate("/operator-master")}
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
                            {moment(operatorData?.created_at).format("DD-MM-YYYY")}
                        </Typography>

                        <Typography variant="body1" mt={3} gutterBottom fontWeight={"500"}>
                            Last modified at
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {moment(operatorData?.updated_at).format("DD-MM-YYYY")}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}

export default AddOperator;
