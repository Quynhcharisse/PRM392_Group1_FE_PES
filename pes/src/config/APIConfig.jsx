import axios from "axios"

// Set base URL from environment configuration
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const axiosClient = axios.create({
    baseURL: axios.defaults.baseURL, 
    headers: {
        "Content-Type": "application/json",
    }, 
    withCredentials: true,
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
