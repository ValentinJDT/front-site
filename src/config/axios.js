import axios from "axios";
import jwtDecode from "jwt-decode";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/"
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;
