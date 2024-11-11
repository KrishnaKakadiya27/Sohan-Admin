 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

 
// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('http://192.168.29.230:4008/My-Concierge/api/v1/category/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsImVtYWlsIjoiYWRtaW4wMUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoxLCJpYXQiOjE3MzAwOTE3OTB9.wSjgRT8TtaEvGhbn6rs-cYtp8mdcGa-nXzBWky41gCk`, 
    },
  });
  return response.data.payload.data;
});

// Async thunk for creating a category
export const createCategory = createAsyncThunk('categories/createCategory', async (categoryData) => {
  const response = await axios.post('http://192.168.29.230:4008/My-Concierge/api/v1/category/', categoryData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsImVtYWlsIjoiYWRtaW4wMUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoxLCJpYXQiOjE3MzAwOTE3OTB9.wSjgRT8TtaEvGhbn6rs-cYtp8mdcGa-nXzBWky41gCk`, 
    },
  });
  return response.data.payload;  
});


// Async thunk for updating a category
export const updateCategory = createAsyncThunk('categories/updateCategory', async (categoryData) => {
  const response = await axios.put(`http://192.168.29.230:4008/My-Concierge/api/v1/category/?uuid=${categoryData?.uuid}`, categoryData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsImVtYWlsIjoiYWRtaW4wMUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoxLCJpYXQiOjE3MzAwOTE3OTB9.wSjgRT8TtaEvGhbn6rs-cYtp8mdcGa-nXzBWky41gCk`,
    },
  });
  return response.data.payload;
});

// Async thunk for deleting a category
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  await axios.delete(`http://192.168.29.230:4008/My-Concierge/api/v1/category/?uuid=${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJhZG1pbiIsImVtYWlsIjoiYWRtaW4wMUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoxLCJpYXQiOjE3MzAwOTE3OTB9.wSjgRT8TtaEvGhbn6rs-cYtp8mdcGa-nXzBWky41gCk`
    },
  });
  return id; 
});

const categorySlice = createSlice({ 
  name: 'categories',
  initialState: {
    data: [],
    loading: false,
    error: null,
    noData: false,  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.noData = false; // Reset noData when fetching starts
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
       
        // Set noData to true if there is no data
        state.noData = action.payload.length === 0;

        if (action.payload.length === 0) {
          state.loading = true;
        } else  state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.noData = true; // Set noData to true on error
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter((category) => category.uuid !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message;
      });
      
  },
});

// Selectors
export const selectCategories = (state) => state.categories.data;
export const selectLoading = (state) => state.categories.loading;
export const selectError = (state) => state.categories.error;
export const selectNoData = (state) => state.categories.noData;  

export default categorySlice.reducer;
