import axiosClient from '@config/APIConfig.jsx';
import { jwtDecode } from 'jwt-decode';

export const authService = {
  // Login with email and password
  async login(email, password) {
    try {
      const response = await axiosClient.post('/auth-api/api/auth/login', {
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
        error: error.response?.data?.message || error.message || 'Login failed',
        status: error.response?.status
      };
    }
  },
  async register(userData) {
    try {
      // API expects: { email, password, name }
      const payload = {
        email: userData.email,
        password: userData.password,
        name: userData.name || userData.fullName,
        phone: userData.phone,
        role: 'PARENT'
      };

      const response = await axiosClient.post('/auth-api/api/auth/register', payload);
      const result = response?.data ?? {};

      return {
        success: true,
        data: {
          id: result.id,
          email: result.email,
          name: result.name,
          role: result.role,
          status: result.status,
          phone: result.phone ?? null,
          address: result.address ?? null
        }
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

};