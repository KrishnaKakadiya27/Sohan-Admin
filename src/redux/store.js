// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer
  },
});

export default store;
