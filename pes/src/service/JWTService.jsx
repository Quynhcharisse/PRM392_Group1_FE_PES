import { jwtDecode } from 'jwt-decode';

export const JWTService = {
  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  },

  // Store token in localStorage
  setToken(token) {
    localStorage.setItem('token', token);
  },

  // Remove token from localStorage
  removeToken() {
    localStorage.removeItem('token');
  },

  // Decode JWT token
  decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  // Get current token data
  getCurrentTokenData() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const decoded = this.decodeToken(token);
    if (!decoded) {
      return null;
    }

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      this.removeToken();
      localStorage.removeItem('user');
      return null;
    }

    return decoded;
  },

  // Check if token is valid and not expired
  isTokenValid(token = null) {
    const tokenToCheck = token || this.getToken();
    if (!tokenToCheck) {
      return false;
    }

    const decoded = this.decodeToken(tokenToCheck);
    if (!decoded) {
      return false;
    }

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  },

  // Get user ID from token
  getUserId() {
    const decoded = this.getCurrentTokenData();
    return decoded ? decoded.sub : null;
  },

  // Get user email from token
  getUserEmail() {
    const decoded = this.getCurrentTokenData();
    return decoded ? decoded.email : null;
  },

  // Get user role from token
  getUserRole() {
    const decoded = this.getCurrentTokenData();
    if (!decoded) return null;
    
    // Handle the Microsoft schema role claim
    return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role || null;
  },

  // Get token expiry time
  getTokenExpiry() {
    const decoded = this.getCurrentTokenData();
    return decoded ? decoded.exp * 1000 : null; // Convert to milliseconds
  },

  // Check if token will expire soon (within 5 minutes)
  isTokenExpiringSoon() {
    const expiryTime = this.getTokenExpiry();
    if (!expiryTime) return true;
    
    const currentTime = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    return (expiryTime - currentTime) < fiveMinutes;
  },

  // Get authorization header for API requests
  getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

// Export as default and named export for compatibility
export default JWTService;

// Named export for the function used in UserProfile
export const getCurrentTokenData = JWTService.getCurrentTokenData;