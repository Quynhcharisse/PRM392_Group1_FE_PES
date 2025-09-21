// Route constants for dashboard navigation
export const getDashboardRoute = (role) => {
  switch (role?.toLowerCase()) {
    case 'parent':
      return '/dashboard/parent';
    case 'education':
      return '/education/dashboard';
    case 'hr':
      return '/hr/dashboard';
    case 'admin':
      return '/admin/dashboard';
    default:
      return '/dashboard';
  }
};

// API Routes - matching your Swagger documentation
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/pass/forgot',
    RESET_PASSWORD: '/auth/pass/reset',
    GET_ALL_ACCOUNTS: '/auth/getAllAccount',
    GET_ACCOUNT_BY_ID: '/auth/getAllAccount/{id}',
    UPDATE_PROFILE: '/auth/updateProfile/{id}',
    BAN_USER: '/auth/ban/{id}',
    UNBAN_USER: '/auth/unban/{id}',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update-profile',
  }
};

// Application Routes
export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  EDUCATION: {
    DASHBOARD: '/education/dashboard',
    PROFILE: '/education/profile',
  },
  HR: {
    DASHBOARD: '/hr/dashboard',
    PROFILE: '/hr/profile',
  }
};