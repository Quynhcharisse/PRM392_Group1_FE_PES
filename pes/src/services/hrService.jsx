import axiosClient from "@config/APIConfig.jsx";

export const hrService = {
    async getTeacherList() {
        try {
            const response = await axiosClient.get('/Hr/teacher');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to fetch teachers'
            };
        }
    },

    async createTeacher(teacherData) {
        try {
            const payload = {
                email: teacherData.email,
                name: teacherData.name,
                password: teacherData.password
            };

            const response = await axiosClient.post('/Hr/teacher', payload);
            return {
                success: true,
                data: response.data,
                message: 'Teacher created successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to create teacher'
            };
        }
    },


    async getTeacherDetail(teacherId) {
        try {
            const response = await axiosClient.get(`/Hr/teacher/${teacherId}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to fetch teacher details'
            };
        }
    },

    async exportTeacher() {
        try {
            const response = await axiosClient.get('/Hr/teacher/export', {
                responseType: 'blob', // Important for file downloads
                headers: {
                    'Accept': 'application/octet-stream'
                }
            });

            // Create blob from response
            const blob = new Blob([response.data], {
                type: response.headers['content-type'] || 'application/octet-stream'
            });

            // Get filename from Content-Disposition header or use default
            let filename = 'teachers_export.xlsx';
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1].replace(/['"]/g, '');
                }
            }

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;

            // Trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return {
                success: true,
                message: 'Teachers exported successfully',
                filename: filename
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to export teachers'
            };
        }
    },

    async banAccount(accountId) {
        try {
            const response = await axiosClient.delete(`/Hr/ban/${accountId}`);

            // Handle 204 No Content response
            if (response && response.status === 204) {
                return {
                    success: true,
                    message: 'Ban Successfully',
                    data: null
                };
            }

            return {
                success: true,
                message: 'Ban Successfully',
                data: response?.data ?? null
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to ban account'
            };
        }
    },

    async unbanAccount(accountId) {
        try {
            const response = await axiosClient.delete(`/Hr/unban/${accountId}`);

            // Handle 204 No Content response
            if (response && response.status === 204) {
                return {
                    success: true,
                    message: 'Unban Successfully',
                    data: null
                };
            }

            return {
                success: true,
                message: 'Unban Successfully',
                data: response?.data ?? null
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to unban account'
            };
        }
    },

    async getParentList() {
        try {
            const response = await axiosClient.get('/Hr/parent');
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to fetch parents'
            };
        }
    },

    async exportParent() {
        try {
            const response = await axiosClient.get('/Hr/parent/export', {
                responseType: 'blob', // Important for file downloads
                headers: {
                    'Accept': 'application/octet-stream'
                }
            });

            // Create blob from response
            const blob = new Blob([response.data], {
                type: response.headers['content-type'] || 'application/octet-stream'
            });

            // Get filename from Content-Disposition header or use default
            let filename = 'parents_export.xlsx';
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1].replace(/['"]/g, '');
                }
            }

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;

            // Trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return {
                success: true,
                message: 'Parents exported successfully',
                filename: filename
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to export parents'
            };
        }
    },
}



