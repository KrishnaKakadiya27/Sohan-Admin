import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import CustomSwitch from "../../components/common/CustomSwitch";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../redux/slices/categorySlice";

const CreateCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState({
    name: "",
    sequence: "",
    description: "",
    isActive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, sequence, description } = formData;

    if (!name || !sequence || !description) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await dispatch(
        createCategory({
          name,
          sequence: parseInt(sequence),
          description,
          is_active: formData.isActive,
        })
      ).unwrap();

      toast.success("Category created successfully!");
      navigate("/category");
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
    }
  };

  return (
    <form
      className="bg-white py-4 px-[20px] sm:px-[70px]"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Create Category</h1>
      </div>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="start"
        gap={isMobile ? "20px" : "50px"}
        maxWidth={"1400px"}
      >
        {/* Left Section: Form */}
        <Box
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
            {/* Name and Slug Inputs */}
            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full rounded-md p-3"
                placeholder="xtz"
                style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Sequence<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sequence"
                className="mt-1 block w-full rounded-md p-3"
                placeholder="xyz"
                style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
                required
                value={formData.sequence}
                onChange={handleChange}
              />
            </Grid>

            {/* Switch for Visibility */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <CustomSwitch
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                }
                label="Visible to customers"
                sx={{ color: "#17263A", fontWeight: "500" }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <label className="block text-[17px] font-medium text-gray-700 pb-2">
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                style={{ boxShadow: "0px 4px 8px 0px #00000026" }}
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full min-h-[200px] border-none focus:ring-0 p-3"
              ></textarea>
            </Grid>
          </Grid>

          {/* Action Buttons */}
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
              -
            </Typography>

            <Typography variant="body1" mt={3} gutterBottom fontWeight={"500"}>
              Last modified at
            </Typography>
            <Typography variant="body2" color="textSecondary">
              -
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "16px",
          justifyContent: "start",
          mt: 4,
          gap: "20px",
        }}
        className="max-sm:flex-col "
      >
        <Button
          variant="contained"
          sx={{
            background: "#ffffff",
            boxShadow:
              "6.22px 6.22px 15px 0px #0000001A,-6.22px -6.22px 15px 0px #F9FCFF",
            padding: "7px 20px",
            color: "#454545",
            textTransform: "unset",
          }}
          className="max-sm:w-full"
          onClick={() => navigate("/category")}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            background:
              " linear-gradient(95.02deg, #565C62 7.02%, #243040 95.7%)",
            boxShadow:
              "8px 8px 12.8px 0px #FFFFFF1A inset, -8px -8px 12.8px 0px #0000004D inset, 0px 3.46px 3.46px 0px #00000040 inset",
            padding: "7px 20px",
            textTransform: "unset",
          }}
          className="max-sm:w-full"
        >
          Create Category
        </Button>
      </Box>
    </form>
  );
};

export default CreateCategory;
