import axios from 'axios';

const token  = JSON.parse(localStorage.getItem("token"));

const axiosInstance = axios.create({
 baseURL: process.env.REACT_APP_BASE_API_URL,  
 headers: {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${token}`,
 },
});

export default axiosInstance;
