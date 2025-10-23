import axiosClient from "@config/APIConfig.jsx";

export const accountService = {

    async getProfile() {
        try {
            const response = await axiosClient.get('/auth-api/api/auth/profile');

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
                        identityNumber: response.data.identityNumber ?? null,
                        status: response.data.status ?? null,
                        createAt: response.data.createAt ?? null,
                    };
                    localStorage.setItem('user', JSON.stringify(updated));
                }
            } catch {/* ignore localStorage errors */
            }

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
                identityNumber: profileData.identityNumber || "",
            };

            // Ensure all fields are strings (backend expects all fields)
            Object.keys(payload).forEach(key => {
                if (payload[key] === undefined || payload[key] === null) {
                    payload[key] = "";
                }
            });

            const response = await axiosClient.put('/auth-api/api/auth/profile', payload);

            // Reload profile from server to ensure data sync
            // This ensures we have all fields including status, createAt, firstLogin, etc.
            const profileResponse = await this.getProfile();
            
            if (profileResponse.success) {
                return {
                    success: true,
                    message: 'Update Profile Successfully',
                    data: profileResponse.data,
                };
            }

            // Fallback: if reload fails but update succeeded
            return {
                success: true,
                message: 'Update Profile Successfully',
                data: response?.data ?? null,
            };
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to update profile');
        }
    },

    async changePassword(passwordData) {
        try {
            const payload = {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword
            };

            const response = await axiosClient.post('/auth-api/api/auth/change-password', payload);

            // Handle 204 No Content or 200 OK
            if (response && (response.status === 204 || response.status === 200)) {
                return {
                    success: true,
                    message: response.data?.message || 'Password changed successfully'
                };
            }

            return {
                success: true,
                message: response.data?.message || 'Password changed successfully',
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to change password'
            };
        }
    }
}

