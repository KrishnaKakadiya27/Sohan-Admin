import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import CustomSwitch from '../../components/common/CustomSwitch';
import SelectPersonMasterDialog from '../raw-material-master/SelectPersonMasterDialog';
import SelectRawMaterialMaster from './SelectRawMaterialMaster';


const EditMaterialMaster = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const UId = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [materialData, setMaterialData] = useState([]);

  const [personIdName, setPersonIdName] = useState("");
  const [perosnId, setPersonId] = useState("");
  const [dialogOpenPerson, setDialogOpenPerson] = useState(false);
  const [rawMaterialIdName, setRawMaterialIdName] = useState("");
  const [rawMaterialId, setRawMaterialId] = useState("");
  const [dialogOpenRaw, setDialogOpenRaw] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDialogPerson = () => {
    setDialogOpenPerson(!dialogOpenPerson);
    setSearchTerm("");
  }

  const handleOpenDialogRaw = () => {
    setDialogOpenRaw(!dialogOpenRaw);
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
      const response = await axiosInstance.put(`materialMaster?uuid=${UId?.id}`, {
        person_master_id: data?.person_id?.uuid,
        raw_material_master_id: data?.raw_material_id?.uuid,
        unit: data?.Units,
        total_stock: data?.totalStocks,
        price_per_unit: data?.pricePerUnit,
        root_level: data?.rootLevel,
        is_notification: data?.notificationStatus,
        is_active: data?.activeStatus
      })

      if (response.status === 200) {
        navigate("/item-master");
        toast.success('Updated data successfully');

      }

    } catch (error) {
      console.log("error", error)
      toast.error('Errror');
    }
    // Perform form submission actions here
  };

  useEffect(() => {
    getMaterialDataById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  useEffect(() => {
    if (materialData) {
      setValue("pricePerUnit", materialData?.price_per_unit);
      setValue("rootLevel", materialData?.root_level);
      setValue("totalStocks", materialData?.total_stock);
      setValue("Units", materialData?.unit);
      setValue("notificationStatus", materialData?.is_notification);
      setValue("activeStatus", materialData?.is_active);
      if (materialData?.personMasterDetailes?.name) {
        setValue("person_id", materialData?.personMasterDetailes?.name);
        setPersonIdName(materialData?.personMasterDetailes?.name);
        setPersonId({
          id: materialData?.personMasterDetailes,
          uuid: materialData?.personMasterDetailes?.uuid,
          name: materialData?.personMasterDetailes?.name
        });
      } else {
        setPersonIdName("Select Person Master Name");  // Default value when no category name is found
      }
      if (materialData?.rawMaterialMasterDetail?.name) {
        setValue("raw_material_id", materialData?.rawMaterialMasterDetail?.name);
        setRawMaterialIdName(materialData?.rawMaterialMasterDetail?.name);
        setRawMaterialId({
          id: materialData?.rawMaterialMasterDetail,
          uuid: materialData?.rawMaterialMasterDetail?.uuid,
          name: materialData?.rawMaterialMasterDetail?.name
        });
      } else {
        setRawMaterialIdName("Select Person Master Name");  // Default value when no category name is found
      }
    }
  }, [materialData, setValue]);
  return (
    <div className="bg-white py-4 px-[20px] sm:px-[70px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Edit Item Master</h1>
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
            <Grid item xs={12} md={6} >
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
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
                      onClick={handleOpenDialogRaw}
                    >
                      <p>{rawMaterialIdName ? rawMaterialIdName : "Select Raw Material Name"}</p>
                      {dialogOpenRaw ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                    <SelectRawMaterialMaster
                      open={dialogOpenRaw}
                      setOpen={setDialogOpenRaw}
                      rawMaterialIdName={rawMaterialIdName}
                      setRawMaterialId={(id) => {
                        // setValue("cat_id", id,id);
                        setRawMaterialIdName(id?.name)
                        setValue("raw_material_id", id, { shouldValidate: true });
                        setRawMaterialId({ id: id?.id, uuid: id?.uuid, name: id?.name });
                      }}
                    />
                  </div>
                )}
              />
              {errors.raw_material_id && (
                <span className="text-red-500">{errors.raw_material_id.message}</span>
              )}
            </Grid>


            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Total Stocks<span className="text-red-500">*</span>
              </label>
              <Controller
                name="totalStocks"
                control={control}
                defaultValue=""
                rules={{
                  required: 'TotalStocks is required', pattern: {
                    value: /^\d*$/,
                    message: 'TotalStocks must be a number',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md shadow-sm p-3"
                    placeholder="Total Stocks"
                  />
                )}
              />
              {errors.totalStocks && <p className="text-red-500 mt-1">{errors.totalStocks?.message}</p>}
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Units<span className="text-red-500">*</span>
              </label>
              <Controller
                name="Units"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Units are required', pattern: {
                    value: /^\d*$/,
                    message: 'Units must be a number',
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 block w-full rounded-md shadow-sm p-3"
                    placeholder="Units"
                  />
                )}
              />
              {errors.Units && <p className="text-red-500 mt-1">{errors.Units?.message}</p>}
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

            <Grid item xs={12} md={6} mt={3}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Notification Status
              </label>
              <Controller
                name="notificationStatus"
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

            <Grid item xs={12} md={6} mt={3}>
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
              onClick={() => navigate("/item-master")}
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
              Update Material Master
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

export default EditMaterialMaster