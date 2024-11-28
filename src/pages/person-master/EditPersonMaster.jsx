import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const EditPersonMaster = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const UId = useParams();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [personMasterData, setPersonMasterData] = useState([]);


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
            const response = await axiosInstance.put(`personMaster?uuid=${UId?.id}`, {
                name: data?.name,
                mobile_number: data?.mobileNumber,
                email: data?.email,
                company_name: data?.companyName,
                gst_number: data?.gstNumber,
                address: data?.address,
                city: data?.city,
                state: data?.state,
                country: data?.country,
                category: data?.category,
                role: data?.role
            })

            if (response.status === 200) {
                toast.success('Updated data successfully');
                navigate("/person-master");
            }

        } catch (error) {
            console.log("error", error)
            toast.error('Error');

        }
    };
    useEffect(() => {
        getpersonMasterDataById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const getpersonMasterDataById = async () => {
        try {
            const response = await axiosInstance.get(`personMaster/detail?uuid=${UId?.id}`)
            if (response.status === 200) {
                setPersonMasterData(response?.data?.payload?.data)
            }

        } catch (error) {
            console.log("error", error);
        }
    }


    useEffect(() => {
        if (personMasterData) {
            setValue("name", personMasterData?.name);
            setValue("mobileNumber", personMasterData?.mobile_number);
            setValue("email", personMasterData?.email);
            setValue("companyName", personMasterData?.company_name);
            setValue("gstNumber", personMasterData?.gst_number);
            setValue("address", personMasterData?.address);
            setValue("city", personMasterData?.city);
            setValue("state", personMasterData?.state);
            setValue("country", personMasterData?.country);
            setValue("category", personMasterData?.category);
            setValue("role", personMasterData?.role);
        }
    }, [personMasterData, setValue]);

    return (
        <div className="bg-white py-4 px-[20px] sm:px-[70px]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Edit Person Master</h1>
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

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Email<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Email is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Email"
                                    />
                                )}
                            />
                            {errors.email && <p className="text-red-500 mt-1">{errors.email?.message}</p>}
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
                                    />
                                )}
                            />
                            {errors.mobileNumber && <p className="text-red-500 mt-1">{errors.mobileNumber?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Company Name<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="companyName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Company Name is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="Company Name"
                                    />
                                )}
                            />
                            {errors.companyName && <p className="text-red-500 mt-1">{errors.companyName?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                gst Number<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="gstNumber"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'gst Number is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        placeholder="gst Number"
                                    />
                                )}
                            />
                            {errors.gstNumber && <p className="text-red-500 mt-1">{errors.gstNumber?.message}</p>}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <label className="block text-[17px] font-medium text-gray-700 pb-2">
                                Category<span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Category is required', validate: (value) => value !== "Select Category" || "Please select a valid category" }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        name="category"
                                        className="mt-1 block w-full rounded-md shadow-sm p-3"
                                        required
                                        defaultValue={"Select Category"}
                                        value={field.value || "Select Category"} // Set the selected value
                                        onChange={(e) => field.onChange(e.target.value)} // Update the selected value
                                    >
                                        <option value="Select Category" disabled>Select Category</option>
                                        <option value="MAIN USER">MAIN USER</option>
                                        <option value="SUB USER">SUB USER</option>
                                    </select>
                                )}
                            />
                            {errors.category && <p className="text-red-500 mt-1">{errors.category?.message}</p>}
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
                                    />
                                )}
                            />
                            {errors.address && <p className="text-red-500 mt-1">{errors.address?.message}</p>}
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
                                    />
                                )}
                            />
                            {errors.country && <p className="text-red-500 mt-1">{errors.country?.message}</p>}
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
                                    />
                                )}
                            />
                            {errors.city && <p className="text-red-500 mt-1">{errors.city?.message}</p>}
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
                            onClick={() => navigate("/person-master")}
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
                            Update Person Master
                        </Button>
                    </Box>
                </Box>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </Box>
        </div>
    )
}

export default EditPersonMaster