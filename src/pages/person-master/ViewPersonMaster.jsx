import React, { useEffect, useState } from 'react'
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import axiosInstance from '../../axiosInstance';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';


const ViewPersonMaster = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const UId = useParams();
  const [personData, setPersonData] = useState([])

  // useForm setup with validation rules
  const {
    control,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit', // Trigger validation on form submit
  });

  useEffect(() => {
    getpersonDataById();
    // eslint-disable-next-line
  }, [])

  const getpersonDataById = async () => {
    try {
      const response = await axiosInstance.get(`personMaster/detail?uuid=${UId?.id}`)
      if (response.status === 200) {
        setPersonData(response?.data?.payload?.data)
      }

    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="bg-white py-4 px-[20px] sm:px-[70px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">View Person Master Details</h1>
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
                    value={personData?.name}
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
                    value={personData?.email}

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
                    value={personData?.mobile_number}
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
                    value={personData?.company_name}
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
                    value={personData?.gst_number}
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
                    value={personData?.category}
                    disabled
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
                    value={personData?.address}
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
                    value={personData?.country}
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
                    value={personData?.state}
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
                    value={personData?.city}
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
                background: "#454545",
                color: "#ffffff",
              }}
              onClick={() => navigate("/person-master")}
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
              {moment(personData?.created_at).format("DD-MM-YYYY")}
            </Typography>

            <Typography variant="body1" mt={3} gutterBottom fontWeight={"500"}>
              Last modified at
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {moment(personData?.updated_at).format("DD-MM-YYYY")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default ViewPersonMaster