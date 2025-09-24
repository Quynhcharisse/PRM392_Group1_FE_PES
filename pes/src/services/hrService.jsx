import axiosClient from "@config/APIConfig.jsx";

export const hrService = {
    async getAllAccounts() {
        try {
            const response = await axiosClient.get('/Hr/getAllAccount');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Get accounts error:', error);
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to fetch accounts'
            };
        }
    },
}

