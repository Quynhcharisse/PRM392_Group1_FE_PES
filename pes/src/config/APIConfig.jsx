import axios from "axios"

axios.defaults.baseURL = "http://localhost:5000/auth-api/api"

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

// Response interceptor for handling auth errors and token refresh
axiosClient.interceptors.response.use(
    response => response, 
    async error => {
        const originalRequest = error.config;

        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            if (originalRequest.url === "/auth/refresh") {
                console.error("Refresh token request failed, redirecting to login.");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = "/login";
                return Promise.reject(error);
            }

            // Only attempt refresh once
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                
                try {
                    const refreshRes = await refreshToken();
                    if (refreshRes.status === 200) {
                        return axiosClient(originalRequest);
                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.href = "/login";
                    }
                } catch (refreshError) {
                    console.log("Token refresh failed:", refreshError);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error);
    }
);

// Token refresh function
const refreshToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token available');
    }
    
    return axiosClient.post('/auth/refresh', {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export default axiosClient;
