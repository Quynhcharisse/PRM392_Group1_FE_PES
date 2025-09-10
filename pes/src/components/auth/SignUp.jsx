import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography
} from '@mui/material'
import {Email, Lock, Person, Phone, Visibility, VisibilityOff} from '@mui/icons-material'
import {useSnackbar} from 'notistack'

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const {search} = useLocation()
    const redirectTo = new URLSearchParams(search).get('redirectTo')

    // If already logged in -> redirect
    useEffect(() => {
        try {
            const raw = localStorage.getItem('user')
            if (raw) {
                navigate(redirectTo || '/', {replace: true})
            }
        } catch {
            /* noop */
        }
    }, [navigate, redirectTo])

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))
    }

    const handleSignUp = async (e) => {
        e.preventDefault()

        // Validation
        if (formData.password !== formData.confirmPassword) {
            enqueueSnackbar('Password confirmation does not match', {variant: 'error'})
            return
        }

        if (formData.password.length < 6) {
            enqueueSnackbar('Password must be at least 6 characters', {variant: 'error'})
            return
        }

        setIsLoading(true)
        try {
            await new Promise(res => setTimeout(res, 700))
            const mockUser = {
                id: 1,
                email: formData.email,
                name: formData.fullName,
                role: 'BUYER',
                avatar: ''
            }
            localStorage.setItem('user', JSON.stringify(mockUser))
            enqueueSnackbar('Registration successful!', {variant: 'success'})
            navigate(redirectTo || '/', {replace: true})
        } catch (err) {
            enqueueSnackbar('Registration failed', {variant: 'error'})
        } finally {
            setIsLoading(false)
        }
    }

    document.title = "Sign Up | MerryStar Kindergarten"

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg,rgb(227, 210, 203) 0%,rgb(230, 226, 225) 50%,rgb(237, 237, 237) 100%)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
                    opacity: 0.3,
                }
            }}
        >
            {/* Animated background elements */}
            <Box
                sx={{
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    width: 200,
                    height: 200,
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    animation: "float 6s ease-in-out infinite",
                    "@keyframes float": {
                        "0%, 100%": {transform: "translateY(0px) rotate(0deg)"},
                        "50%": {transform: "translateY(-20px) rotate(180deg)"}
                    }
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "20%",
                    right: "15%",
                    width: 150,
                    height: 150,
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "50%",
                    animation: "float 8s ease-in-out infinite reverse",
                }}
            />

            <Paper
                elevation={24}
                sx={{
                    p: {xs: 3, sm: 4, md: 5},
                    borderRadius: 4,
                    textAlign: "center",
                    maxWidth: 560,
                    width: "90%",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                    position: "relative",
                    zIndex: 1,
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 35px 60px rgba(0,0,0,0.3)",
                        transition: "all 0.3s ease"
                    },
                    transition: "all 0.3s ease"
                }}
            >
                {/* Logo Section */}
                <Box sx={{mb: 4, position: "relative"}}>
                    <Box
                        sx={{
                            position: "relative",
                            display: "inline-block",
                            mb: 2
                        }}
                    >
                        <Box
                            component="img"
                            src="/logo.png"
                            alt="MerryStar Kindergarten"
                            sx={{
                                height: 80,
                                width: 80,
                                borderRadius: "50%",
                                boxShadow: "0 8px 25px rgba(255, 107, 53, 0.4)",
                                border: "3px solid rgba(255, 255, 255, 0.8)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0 12px 35px rgba(255, 107, 53, 0.6)"
                                }
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: -5,
                                right: -5,
                                width: 20,
                                height: 20,
                                background: "linear-gradient(45deg, #FF6B35, #FF8A65)",
                                borderRadius: "50%",
                                animation: "pulse 2s infinite"
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            background: "linear-gradient(135deg, #FF6B35 0%, #3498DB 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "-0.5px",
                            mb: 0.5
                        }}
                    >
                        MerryStar Kindergarten
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: "#666",
                            fontWeight: 500,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            fontSize: "0.75rem"
                        }}
                    >
                        Bilingual Kindergarten
                    </Typography>
                </Box>

                {/* Welcome Text */}
                <Box sx={{mb: 4}}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 1.5,
                            fontWeight: 700,
                            color: "#2c3e50",
                            letterSpacing: "-0.5px"
                        }}
                    >
                        Create a new account
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#7f8c8d",
                            fontSize: "0.95rem",
                            lineHeight: 1.5,
                            maxWidth: 280,
                            mx: "auto"
                        }}
                    >
                        Register to manage admissions and track your child's learning progress
                    </Typography>
                </Box>

                {/* Sign Up Form */}
                <Box component="form" onSubmit={handleSignUp} sx={{mb: 2}}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'},
                        gap: 2
                    }}>
                        <TextField
                            fullWidth size="small" margin="dense"
                            type="text"
                            label="Full name"
                            value={formData.fullName}
                            onChange={handleInputChange('fullName')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{color: 'text.secondary'}}/>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            fullWidth size="small" margin="dense"
                            type="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleInputChange('email')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{color: 'text.secondary'}}/>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            fullWidth size="small" margin="dense"
                            type="tel"
                            label="Phone number"
                            value={formData.phone}
                            onChange={handleInputChange('phone')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone sx={{color: 'text.secondary'}}/>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            fullWidth size="small" margin="dense"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            value={formData.password}
                            onChange={handleInputChange('password')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{color: 'text.secondary'}}/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(v => !v)} edge="end">
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            fullWidth size="small" margin="dense"
                            type={showConfirmPassword ? 'text' : 'password'}
                            label="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange('confirmPassword')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{color: 'text.secondary'}}/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(v => !v)} edge="end">
                                            {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        fullWidth
                        sx={{
                            mt: 2,
                            background: 'linear-gradient(135deg, #FF6B35, #FF8A65)',
                            borderRadius: '25px',
                            py: 1.5,
                            fontSize: '16px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #FF8A65, #FF6B35)',
                                boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
                                transform: 'translateY(-2px)'
                            },
                            '&:disabled': {
                                background: '#ccc',
                                color: '#666'
                            }
                        }}
                        startIcon={isLoading ? <CircularProgress size={18}/> : null}
                    >
                        {isLoading ? 'Signing up...' : 'Sign up'}
                    </Button>
                </Box>

                {/* Sign In Link */}
                <Box sx={{textAlign: 'center', mb: 2}}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#666",
                            fontSize: "0.9rem"
                        }}
                    >
                        Already have an account?{" "}
                        <Link
                            component="button"
                            onClick={() => navigate('/login')}
                            sx={{
                                color: "#FF6B35",
                                textDecoration: "none",
                                fontWeight: 600,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>

                {/* Footer Links */}
                <Box sx={{borderTop: "1px solid rgba(0,0,0,0.1)", pt: 2.5}}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: "#95a5a6",
                            lineHeight: 1.5,
                            fontSize: "0.75rem"
                        }}
                    >
                        By creating an account, you agree to our{" "}
                        <Link
                            href="#"
                            sx={{
                                color: "#FF6B35",
                                textDecoration: "none",
                                fontWeight: 600,
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            Terms of Service
                        </Link>
                        {" "}and{" "}
                        <Link
                            href="#"
                            sx={{
                                color: "#FF6B35",
                                textDecoration: "none",
                                fontWeight: 600,
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            Privacy Policy
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
