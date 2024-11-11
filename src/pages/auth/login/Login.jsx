import React, { useState } from 'react';
import BannerImg from "../../../assets/images/BImg.png";
import Logo from "../../../assets/images/logo.svg";
import { ReactComponent as InfoLogo } from "../../../assets/icons/info.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn, setToken } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const dispatch = useDispatch();



    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("login", email, password, process.env.REACT_APP_BASE_API_URL)
        try {
            // `${import.meta.env.VITE_APP_BACKEND_BASE_API_URL}/api/customer/stock/shorty-url?url=${shareLink}`
            const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/soham-incense-cost/public/api/v1/login`, { email, password });
            console.log("response", response)
            if (response.status === 200) {
                navigate("/dashboard")
                dispatch(setLoggedIn(true));
                dispatch(setToken(response.data.payload.token));
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                localStorage.setItem("token", JSON.stringify(response.data.payload.token))
            }
        } catch (error) {

        }

    }

    return (
        <div className="min-h-screen flex sm:flex-row flex-col items-center justify-center">
            {/* Left section - Login form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="text-center flex justify-center mb-6">
                        {/* Logo */}
                        <img src={Logo} style={{ width: "200px", height: "170px" }} />
                    </div>

                    <h2 className="text-2xl font-bold text-center text-[#D3A99C] mb-4">Log in</h2>

                    <form>
                        {/* Email Input */}
                        <div className="mb-4">
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 mt-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-[#D3A99C]"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6 ">
                            <input
                                id="password"
                                type="password"
                                className="w-full px-4 py-2 mt-2 border shadow-md rounded-lg focus:outline-none focus:ring focus:ring-[#D3A99C]"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={{ background: "linear-gradient(95.02deg, #565C62 7.02%, #243040 95.7%)" }}
                            className="w-full py-3  text-white shadow-md rounded-lg hover:bg-[#D3A99C] transition-colors"
                            onClick={(e) => handleLogin(e)}
                        >
                            LOG IN
                        </button>
                    </form>
                </div>
            </div>

            {/* Right section - Images (hidden on mobile) */}

        </div>

    )
}

export default Login