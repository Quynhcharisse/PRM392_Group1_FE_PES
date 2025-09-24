import axiosClient from "@config/APIConfig.jsx";

export const accountService = {

    async getProfile() {
        try {
            const response = await axiosClient.get('/auth/profile');

            // Sync local user (if exists) with latest profile fields
            try {
                const raw = localStorage.getItem('user');
                if (raw && response?.data) {
                    const current = JSON.parse(raw);
                    const updated = {
                        ...current,
                        id: response.data.id,
                        email: response.data.email,
                        role: response.data.role || current.role,
                        name: response.data.name,
                        phone: response.data.phone ?? null,
                        address: response.data.address ?? null,
                        avatarUrl: response.data.avatarUrl ?? null,
                        gender: response.data.gender ?? null,
                    };
                    localStorage.setItem('user', JSON.stringify(updated));
                }
            } catch {/* ignore localStorage errors */}

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to fetch profile'
            };
        }
    },

    async updateProfile(profileData) {
        try {
            const payload = {
                name: profileData.name || "",
                phone: profileData.phone || "",
                address: profileData.address || "",
                avatarUrl: profileData.avatarUrl || "",
                gender: profileData.gender || "",
            };

            // Ensure all fields are strings (backend expects all fields)
            Object.keys(payload).forEach(key => {
                if (payload[key] === undefined || payload[key] === null) {
                    payload[key] = "";
                }
            });


            const response = await axiosClient.put('/auth/profile', payload);

            // On 204 No Content: treat as success with message
            if (response && response.status === 204) {
                // Sync local user
                try {
                    const raw = localStorage.getItem('user');
                    if (raw) {
                        const current = JSON.parse(raw);
                        const updated = {
                            ...current,
                            ...payload,
                        };
                        localStorage.setItem('user', JSON.stringify(updated));
                    }
                } catch { /* ignore localStorage errors */ }

                return {
                    success: true,
                    message: 'Update Profile Successfully',
                    data: null,
                };
            }

            // Other success responses
            return {
                success: true,
                message: 'Update Profile Successfully',
                data: response?.data ?? null,
            };
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to update profile');
        }
    }
}

