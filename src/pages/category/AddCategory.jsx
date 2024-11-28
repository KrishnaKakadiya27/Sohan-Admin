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
import React from "react";
import { Controller } from "react-hook-form";
import CustomSwitch from "../../components/common/CustomSwitch";


const CreateCategory = ({ openAdd, handleClose, handleSubmit, onSubmit, control, errors,reset }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      <Dialog
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <form
          className=" py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle id="alert-dialog-title">{"Add Main Category"}</DialogTitle>
          <DialogContent>
            <Box
              flexDirection={isMobile ? "column" : "row"}
              justifyContent="start"
              maxWidth={"1400px"}
            >
              <Box
                sx={{
                  maxWidth: isMobile ? "100%" : "75%",
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
                          className="mt-1 block w-full h-[55px] rounded-md shadow-sm p-3"
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
                onClick={() => {handleClose();
                  reset();
                }}
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
                Add Category
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
