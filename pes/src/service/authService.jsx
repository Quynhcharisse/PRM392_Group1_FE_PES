import axiosClient from '@config/APIConfig.jsx';
import { jwtDecode } from 'jwt-decode';

export const authService = {
  // Login with email and password
  async login(email, password) {
    try {
      const response = await axiosClient.post('/auth/login', {
        email,
        password
      });

      if (response.data && response.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Decode token to get user info
        const decodedToken = jwtDecode(response.data.token);
        
        // Store user data
        const userData = {
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || response.data.role,
          token: response.data.token,
          tokenExpiry: decodedToken.exp * 1000, // Convert to milliseconds
        };

        localStorage.setItem('user', JSON.stringify(userData));
        
        return {
          success: true,
          data: userData,
          token: response.data.token
        };
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed'
      };
    }
  },

  // Register new user
  async register(userData) {
    try {
      // Format the data to match your backend API structure
      const registrationData = {
        email: userData.email,
        password: userData.password,
        name: userData.fullName || userData.name,
        role: "parent" // Fixed role as parent for all registrations
      };

      const response = await axiosClient.post('/auth/register', registrationData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Registration failed'
      };
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Clear all cookies
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  },

  // Get current user from localStorage
  getCurrentUser() {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        
        // Check if token is expired
        if (user.tokenExpiry && Date.now() > user.tokenExpiry) {
          this.logout();
          return null;
        }
        
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      this.logout();
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!user && !!user.token;
  },

  // Get authorization token
  getAuthToken() {
    const token = localStorage.getItem('token');
    return token;
  },

  // Refresh token (if your backend supports it)
  async refreshToken() {
    try {
      const response = await axiosClient.post('/auth/refresh');
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Update user data with new token
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const decodedToken = jwtDecode(response.data.token);
          const updatedUser = {
            ...currentUser,
            token: response.data.token,
            tokenExpiry: decodedToken.exp * 1000
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        return response.data.token;
      }
      throw new Error('Invalid refresh response');
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      throw error;
    }
  },

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await axiosClient.post('/auth/pass/forgot', { email });
      return {
        success: true,
        message: response.data?.message || 'Password reset link sent to your email'
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to send reset link'
      };
    }
  },

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await axiosClient.post('/auth/pass/reset', {
        token,
        newPassword
      });
      return {
        success: true,
        message: response.data?.message || 'Password reset successful'
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to reset password'
      };
    }
  },

  // Get all accounts (admin only)
  async getAllAccounts() {
    try {
      const response = await axiosClient.get('/auth/getAllAccount');
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

  // Update user profile
  async updateProfile(userId, profileData) {
    try {
      const response = await axiosClient.put(`/auth/updateProfile/${userId}`, profileData);
      
      // Update local user data if successful
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...currentUser, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to update profile'
      };
    }
  }
};