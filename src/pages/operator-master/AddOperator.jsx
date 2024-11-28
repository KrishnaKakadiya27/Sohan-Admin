import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const AddOperator = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // useForm setup with validation rules
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit', // Trigger validation on form submit
  });

  // Form submission handler
  const onSubmit = async (data) => {

    try {
      const response = await axiosInstance.post(`operationMaster`, {
        name: data?.name,
        adhar_card_number: data?.aadharCardNumber,
        mobile_number: data?.mobileNumber,
        country: data?.country,
        state: data?.state,
        city: data?.city,
        address: data?.address,
        working_hours_without_lunch: data?.working_hours_without_lunch,
        salary_per_day: data?.salary_per_day
      })

      if (response.status === 200) {
        toast.success('Add operator master data successfully');
        navigate("/operator-master");
      }

    } catch (error) {
      console.log("error", error)
      console.log("error", error)
    }
    // Perform form submission actions here
  };

  return (
    <div className="bg-white py-4 px-[20px] sm:px-[70px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Create Operator</h1>
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
                  />
                )}
              />
              {errors.mobileNumber && <p className="text-red-500 mt-1">{errors.mobileNumber?.message}</p>}
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2 text-nowrap">
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
                  />
                )}
              />
              {errors.state && <p className="text-red-500 mt-1">{errors.state?.message}</p>}
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
                background: "#ffffff",
                color: "#454545",
              }}
              onClick={() => navigate("/operator-master")}
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
              Create Operator
            </Button>
          </Box>
        </Box>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </Box>
    </div>
  );
}

export default AddOperator;
