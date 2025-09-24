import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import {SnackbarProvider} from 'notistack'
import {createTheme, CssBaseline, Slide, ThemeProvider} from '@mui/material'
import HRDashboard from "./layouts/HRDashboard.jsx";
import EducationDashboard from "./layouts/EducationDashboard.jsx";
import './styles/global.css'

const WebApplicationLayout = lazy(() => import('./layouts/WebApplicationLayout.jsx'))
const ProtectedRoute = lazy(() => import('./config/ProtectedRoute.jsx'))

const Home = lazy(() => import('./components/auth/Home.jsx'))
const SignIn = lazy(() => import('./components/auth/SignIn.jsx'))
const SignUp = lazy(() => import('./components/auth/SignUp.jsx'))
const MobileInfo = lazy(() => import('./components/auth/MobileInfo.jsx'))

const UserProfile = lazy(() => import('./components/account/UserProfile.jsx'))
const TeacherList = lazy(() => import('./components/hrManager/teacher/TeacherList.jsx'))
const ParentList = lazy(() => import('./components/hrManager/parent/ParentList.jsx'))

const LoadingFallback = () => (<div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    padding: '20px',
    boxSizing: 'border-box'
}}>
    <div style={{
        width: 'clamp(40px, 8vw, 60px)',
        height: 'clamp(40px, 8vw, 60px)',
        border: 'clamp(3px, 0.8vw, 5px) solid #e3e3e3',
        borderTop: 'clamp(3px, 0.8vw, 5px) solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: 'clamp(15px, 4vw, 25px)'
    }}></div>
    <div style={{
        fontSize: 'clamp(14px, 4vw, 18px)', color: '#666', fontWeight: '500', textAlign: 'center', lineHeight: '1.5'
    }}>
        Loading...
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @media (max-width: 480px) {
        body {
          font-size: 14px;
        }
      }
      
      @media (min-width: 768px) and (max-width: 1024px) {
        body {
          font-size: 16px;
        }
      }
      
      @media (min-width: 1025px) {
        body {
          font-size: 18px;
        }
      }
    `}</style>
</div>)

// Custom theme configuration with responsive design
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536,
        },
    }, typography: {
        fontFamily: '"Mali", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        h1: {
            fontFamily: '"Mali", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: '"Mali", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            lineHeight: 1.3,
        },
        h3: {
            fontFamily: '"Mali", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
            lineHeight: 1.4,
        },
        h4: {
            fontFamily: '"Mali", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            lineHeight: 1.4,
        },
        h5: {
            fontFamily: '"Mali", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            lineHeight: 1.5,
        },
        h6: {
            fontFamily: '"Mali", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
            lineHeight: 1.5,
        },
        body1: {
            fontFamily: '"Mali", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            lineHeight: 1.6,
        },
        body2: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
            lineHeight: 1.6,
        },
        button: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            fontWeight: 600,
        },
        caption: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
            lineHeight: 1.4,
        },
        overline: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
            letterSpacing: '0.08em',
        },
    }, components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    overflowX: 'hidden',
                }, html: {
                    fontSize: 'clamp(14px, 2vw, 16px)',
                }, '*': {
                    boxSizing: 'border-box',
                }, '@media (max-width: 600px)': {
                    body: {
                        fontSize: '14px',
                    },
                }, '@media (min-width: 600px) and (max-width: 900px)': {
                    body: {
                        fontSize: '15px',
                    },
                }, '@media (min-width: 900px)': {
                    body: {
                        fontSize: '16px',
                    },
                },
            },
        }, // Add responsive container styling
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: 'clamp(16px, 4vw, 24px)',
                    paddingRight: 'clamp(16px, 4vw, 24px)',
                    '@media (max-width: 600px)': {
                        paddingLeft: '16px', paddingRight: '16px',
                    },
                },
            },
        }, // Responsive button styling
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    padding: 'clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px)',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                }, small: {
                    fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                    padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)',
                }, large: {
                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)',
                },
            },
        },
    },
})

const router = createBrowserRouter([{
        path: '/',
        element: (
            <Suspense fallback={<LoadingFallback/>}>
                <WebApplicationLayout/>
            </Suspense>
        ), children: [{
            index: true,
            element: (
                <Suspense fallback={<LoadingFallback/>}>
                    <Home/>
                </Suspense>
            )
        }, {
            path: 'login',
            element: (
                <Suspense fallback={<LoadingFallback/>}>
                    <SignIn/>
                </Suspense>
            )
        }, {
            path: 'signup',
            element: (
                <Suspense fallback={<LoadingFallback/>}>
                    <SignUp/>
                </Suspense>
            )
        }],
    }, 
    {
        path: 'mobile-info',
        element: (
            <Suspense fallback={<LoadingFallback/>}>
                <MobileInfo/>
            </Suspense>
        )
    },
     {
        path: 'hr',
        element: (
            <Suspense fallback={<LoadingFallback/>}>
                <ProtectedRoute allowRoles={["HR"]}>
                    <Suspense fallback={<LoadingFallback/>}>
                        <HRDashboard/>
                    </Suspense>
                </ProtectedRoute>
            </Suspense>
        ),
        children: [{
            index: true,
            element: <Navigate to={'/hr/dashboard'}/>
        },
            {
                path: 'dashboard',
                element: <h1>Dashboard Pannel</h1>
            },
            {
                path: 'teachers',
                element: (<Suspense fallback={<LoadingFallback/>}>
                    <TeacherList/>
                </Suspense>)
            },
            {
                path: 'parents',
                element: (<Suspense fallback={<LoadingFallback/>}>
                    <ParentList/>
                </Suspense>)
            },
            {
                path: 'profile',
                element: (<Suspense fallback={<LoadingFallback/>}>
                    <UserProfile/>
                </Suspense>)
            }]
    }, 
    {
        path: 'education',
        element: (
            <Suspense fallback={<LoadingFallback/>}>
                <ProtectedRoute allowRoles={["EDUCATION"]}>
                    <Suspense fallback={<LoadingFallback/>}>
                        <EducationDashboard/>
                    </Suspense>
                </ProtectedRoute>
            </Suspense>
        ),
        children: [{
            index: true,
            element: <Navigate to={'/education/dashboard'}/>
        },
            {
                path: 'dashboard',
                element: <h1>Dashboard Pannel</h1>
            },
            {
                path: 'profile',
                element: (
                    <Suspense fallback={<LoadingFallback/>}>
                        <UserProfile/>
                    </Suspense>
                )
            }]
    }, {
        path: 'profile',
        element: <Navigate to="/buyer/profile"/>
    },
        {
            path: '*',
            element: <Navigate to="/"/>
        },]
)

export default function App() {
    return (<SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        TransitionComponent={Slide}
        preventDuplicate={true}
    >
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </SnackbarProvider>)
}