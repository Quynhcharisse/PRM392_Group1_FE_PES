import axios from "axios"

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/auth-api/api";

axios.defaults.baseURL = API_BASE_URL;

// Log API configuration in development
if (import.meta.env.DEV) {
    console.log("API Configuration:", {
        baseURL: API_BASE_URL,
        environment: import.meta.env.VITE_APP_ENV || "development"
    });
}

const axiosClient = axios.create({
    baseURL: API_BASE_URL, 
    headers: {
        "Content-Type": "application/json",
    }, 
    withCredentials: false,
});

// Request interceptor to add auth token
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling auth errors (no refresh token support)
axiosClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
