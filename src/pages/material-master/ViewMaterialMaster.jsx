import React, { useEffect, useState } from 'react'
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import axiosInstance from '../../axiosInstance';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import CustomSwitch from '../../components/common/CustomSwitch';


const ViewMaterialMaster = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const UId = useParams();
  const [materialData, setMaterialData] = useState([])
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
  const [rawMaterialIdName, setRawMaterialIdName] = useState("");
  const [rawMaterialId, setRawMaterialId] = useState("");
  const [dialogOpenRaw, setDialogOpenRaw] = useState(false);

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
    getMaterialDataById();
  }, [])

  const getMaterialDataById = async () => {
    try {
      const response = await axiosInstance.get(`materialMaster/detail?uuid=${UId?.id}`)
      if (response.status === 200) {
        setMaterialData(response?.data?.payload?.data)
      }

    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="bg-white py-4 px-[20px] sm:px-[70px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Item Master </h1>
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
              <label className="block text-[17px] text-nowrap font-medium text-gray-700 pb-2">
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
                      <p>{materialData?.personMasterDetailes?.name}</p>
                      {dialogOpenPerson ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                   
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} >
              <label className="block text-[17px] text-nowrap font-medium text-gray-700 pb-2">
                Raw Material Master Name<span className="text-red-500">*</span>
              </label>
              <Controller
                name="raw_material_id"
                control={control}
                rules={{ required: "Raw Material ID is required" }}
                render={({ field }) => (
                  <div className="relative">
                    <div
                      className="mt-1 w-full rounded-md p-3 relative flex shadow-sm justify-between cursor-pointer"
                      // style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
                      // onClick={handleOpenDialogRaw}
                    >
                      <p>{materialData?.rawMaterialMasterDetail?.name}</p>
                      {dialogOpenRaw ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                  </div>
                )}
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Total Stocks<span className="text-red-500">*</span>
              </label>
              <Controller
                name="totalStocks"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md shadow-sm p-3"
                    placeholder="Total Stocks"
                    value={materialData?.total_stock}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Units<span className="text-red-500">*</span>
              </label>
              <Controller
                name="Units"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md shadow-sm p-3"
                    placeholder="Units"
                    value={materialData?.unit}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Price Per Unit<span className="text-red-500">*</span>
              </label>
              <Controller
                name="pricePerUnit"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md shadow-sm p-3"
                    placeholder="Price Per Unit"
                    value={materialData?.price_per_unit}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Root Level<span className="text-red-500">*</span>
              </label>
              <Controller
                name="rootLevel"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md shadow-sm p-3"
                    placeholder="Root Level"
                    value={materialData?.root_level}
                  />
                )}
              />
              {errors.rootLevel && <p className="text-red-500 mt-1">{errors.rootLevel?.message}</p>}
            </Grid>

            <Grid item xs={12} md={6} mt={3}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Notification Status
              </label>
              <Controller
                name="notificationStatus"
                control={control}
                render={({ field }) => (
                  <CustomSwitch
                    // checked={field.value}
                    checked={materialData?.is_notification}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6} mt={3}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Active Status
              </label>
              <Controller
                name="activeStatus"
                control={control}
                render={({ field }) => (
                  <CustomSwitch
                    checked={materialData?.is_active}
                    // value={materialData?.total_stock}
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
              onClick={() => navigate("/item-master")}
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
              {moment(materialData?.created_at).format("DD-MM-YYYY")}
            </Typography>

            <Typography variant="body1" mt={3} gutterBottom fontWeight={"500"}>
              Last modified at
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {moment(materialData?.updated_at).format("DD-MM-YYYY")}
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

export default ViewMaterialMaster