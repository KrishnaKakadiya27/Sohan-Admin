import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../axiosInstance";
import ActionButton from "../../components/common/ActionButton";
import CustomSwitch from "../../components/common/CustomSwitch";


const EditCategory = ({ id, getCategoryData }) => {
   const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [mainCategoryData, setMainCategoryData] = useState([]);
  // useForm setup with validation rules
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit', // Trigger validation on form submit
  });


  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(`categoryMaster?uuid=${id}`, {
        name: data?.name,
        is_active: data?.activeStatus
      })

      if (response.status === 200) {
        toast.success('Updated category successfully');
        getCategoryData();
        handleClose();
      }

    } catch (error) {
      console.log("error", error)
      toast.error("Error")
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    getMainCategoryDataById();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMainCategoryDataById = async () => {
    try {
      const response = await axiosInstance.get(`categoryMaster/detail?uuid=${id}`)
      if (response.status === 200) {
        setMainCategoryData(response?.data?.payload?.data)
      }

    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    if (mainCategoryData) {
      setValue("name", mainCategoryData?.name);
      setValue("activeStatus", mainCategoryData?.is_active);
    }
  }, [mainCategoryData, setValue]);



  return (
    <React.Fragment>
      <ActionButton
        icon={<EditIcon />}
        label="Edit"
        color="#1976d2"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <form
          className=" py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle id="alert-dialog-title">{"Edit Category"}</DialogTitle>
          <DialogContent>


            <Box
              // display="flex"
              flexDirection={isMobile ? "column" : "row"}
              justifyContent="start"
              // gap={isMobile ? "20px" : "50px"}
              maxWidth={"1400px"}
            >
              <Box
                // display="flex"
                // flexDirection="column"
                // flex={1}
                sx={{
                  maxWidth: isMobile ? "100%" : "75%",
                  // boxShadow: "0px 4px 8px 0px #00000026",
                  // padding: { xs: "15px", sm: "30px" },
                  // borderRadius: "20px",
                }}
              >
                <Grid container >
                  <Grid item xs={12} md={12}>
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
                  <Grid item xs={12} md={12} mt={3}>
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
              </Box>
            </Box>

          </DialogContent>
          <DialogActions>

            {/* <Button
            variant="contained"
            sx={{
              background: "#ffffff",
              boxShadow:
                "6.22px 6.22px 15px 0px #0000001A,-6.22px -6.22px 15px 0px #F9FCFF",
              padding: "7px 20px",
              color: "#454545",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              background:
                " linear-gradient(95.02deg, #565C62 7.02%, #243040 95.7%)",
              boxShadow:
                "8px 8px 12.8px 0px #FFFFFF1A inset, -8px -8px 12.8px 0px #0000004D inset, 0px 3.46px 3.46px 0px #00000040 inset",
              padding: "7px 20px",
            }}
            onClick={handleDelete}
          >
            Delete
          </Button> */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "16px",
                justifyContent: "start",
                mt: 4,
                gap: "20px",
              }}
            // className="max-sm:flex-col "
            >
              <Button
                variant="contained"
                sx={{
                  background: "#ffffff",
                  padding: "7px 20px",
                  color: "#454545",
                  textTransform: "unset",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(95.02deg, #565C62 7.02%, #243040 95.7%)",
                  padding: "7px 20px",
                  textTransform: "unset",
                }}
                className="text-nowrap"
              >
                Update Category
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </React.Fragment>
  );
};

export default EditCategory;
