import axios from "axios"

// Set base URL from environment configuration
axios.defaults.baseURL = "https://pesapp.orangeglacier-1e02abb7.southeastasia.azurecontainerapps.io/"

const axiosClient = axios.create({
    baseURL: axios.defaults.baseURL, 
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
