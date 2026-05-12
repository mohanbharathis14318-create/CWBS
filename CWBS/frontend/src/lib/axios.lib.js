// Import Modules
import axios from "axios";

// Axios Instance
const axiosInstance = axios.create({
    baseURL: import.meta.mode === "development" ? "http://localhost:4000" : "/api",
    withCredentials: true
});

export default axiosInstance;