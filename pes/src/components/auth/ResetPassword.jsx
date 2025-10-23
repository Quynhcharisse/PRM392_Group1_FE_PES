import React, {useState, useEffect} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Fade,
    Stack,
    TextField,
    Typography,
    Zoom
} from "@mui/material";
import {ArrowBack, CheckCircle, Lock, LockReset, Visibility, VisibilityOff} from "@mui/icons-material";
import {useSnackbar} from 'notistack';
import { authService } from '@services/AuthService.jsx';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    useEffect(() => {
        if (!token || !email) {
            setError("Invalid reset link. Please request a new password reset.");
        }
    }, [token, email]);

    const validatePassword = (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        setError(""); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.newPassword.trim()) {
            setError("Please enter a new password");
            return;
        }

        if (!formData.confirmPassword.trim()) {
            setError("Please confirm your password");
            return;
        }

        if (!validatePassword(formData.newPassword)) {
            setError("Password must be at least 8 characters with uppercase, lowercase, and number");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!token || !email) {
            setError("Invalid reset link. Please request a new password reset.");
            return;
        }

        setLoading(true);

        try {
            const result = await authService.resetPassword(token, formData.newPassword);
            
            if (result.success) {
                setSuccess(true);
                enqueueSnackbar(result.message || "Password reset successful!", {variant: "success"});
            } else {
                setError(result.error || "Failed to reset password. Please try again.");
                enqueueSnackbar(result.error || "Failed to reset password. Please try again.", {variant: "error"});
            }
        } catch (error) {
            const errorMessage = "Something went wrong. Please try again later.";
            setError(errorMessage);
            enqueueSnackbar(errorMessage, {variant: "error"});
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    // Success state
    if (success) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #FF8C42 0%, #F5F5F5 50%, #E8E8E8 100%)',
                    padding: 2
                }}
            >
                <Container maxWidth="xs">
                    <Zoom in={success} timeout={600}>
                        <Card
                            elevation={12}
                            sx={{
                                borderRadius: 3,
                                overflow: 'hidden',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            <CardContent sx={{p: 3}}>
                                <Stack spacing={2.5} alignItems="center" textAlign="center">
                                    <Avatar
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            bgcolor: 'success.main',
                                            mb: 1
                                        }}
                                    >
                                        <CheckCircle sx={{fontSize: 28}}/>
                                    </Avatar>

                                    <Typography
                                        variant="h5"
                                        fontWeight="600"
                                        sx={{
                                            color: '#FF8C42',
                                            mb: 0.5
                                        }}
                                    >
                                        Password Reset Successful!
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                                        Your password has been successfully reset. You can now log in with your new password.
                                    </Typography>

                                    <Alert
                                        severity="success"
                                        sx={{
                                            width: '100%',
                                            borderRadius: 2,
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        Please log in with your new password.
                                    </Alert>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleBackToLogin}
                                        startIcon={<ArrowBack/>}
                                        sx={{
                                            borderRadius: 2,
                                            py: 1.2,
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            bgcolor: '#FF8C42',
                                            '&:hover': {
                                                bgcolor: '#2980B9'
                                            }
                                        }}
                                    >
                                        Back to Login
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Zoom>
                </Container>
            </Box>
        );
    }

    // Form state
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #FF8C42 0%, #F5F5F5 50%, #E8E8E8 100%)',
                padding: 2
            }}
        >
            <Container maxWidth="xs">
                <Fade in={!success} timeout={500}>
                    <Card
                        elevation={12}
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        <CardContent sx={{p: 3}}>
                            <Stack spacing={2.5}>
                                {/* Header */}
                                <Box textAlign="center">
                                    <Avatar
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            bgcolor: '#FF8C42',
                                            mx: 'auto',
                                            mb: 1.5
                                        }}
                                    >
                                        <LockReset sx={{fontSize: 24}}/>
                                    </Avatar>

                                    <Typography
                                        variant="h5"
                                        fontWeight="600"
                                        sx={{
                                            color: '#FF8C42',
                                            mb: 0.5
                                        }}
                                    >
                                        Reset Password
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Enter your new password below
                                    </Typography>

                                    {email && (
                                        <Box
                                            sx={{
                                                bgcolor: 'grey.50',
                                                borderRadius: 2,
                                                p: 1.5,
                                                border: '1px solid',
                                                borderColor: 'grey.300',
                                                mt: 1
                                            }}
                                        >
                                            <Typography variant="body2" color="text.secondary" fontWeight="600">
                                                {email}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                {/* Form */}
                                <Box component="form" onSubmit={handleSubmit}>
                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            type={showPassword ? "text" : "password"}
                                            label="New Password"
                                            value={formData.newPassword}
                                            onChange={handleInputChange('newPassword')}
                                            error={!!error}
                                            disabled={loading}
                                            size="medium"
                                            InputProps={{
                                                startAdornment: (
                                                    <Lock sx={{color: 'text.secondary', mr: 1, fontSize: 20}}/>
                                                ),
                                                endAdornment: (
                                                    <Button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        sx={{minWidth: 'auto', p: 0.5}}
                                                    >
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </Button>
                                                )
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '& fieldset': {
                                                        borderColor: 'rgba(0, 0, 0, 0.23)'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#FF8C42'
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#FF8C42'
                                                    }
                                                },
                                                '& .MuiInputLabel-root': {
                                                    '&.Mui-focused': {
                                                        color: '#FF8C42'
                                                    }
                                                }
                                            }}
                                            placeholder="Enter new password"
                                            helperText="At least 8 characters with uppercase, lowercase, and number"
                                        />

                                        <TextField
                                            fullWidth
                                            type={showConfirmPassword ? "text" : "password"}
                                            label="Confirm New Password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange('confirmPassword')}
                                            error={!!error}
                                            disabled={loading}
                                            size="medium"
                                            InputProps={{
                                                startAdornment: (
                                                    <Lock sx={{color: 'text.secondary', mr: 1, fontSize: 20}}/>
                                                ),
                                                endAdornment: (
                                                    <Button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        sx={{minWidth: 'auto', p: 0.5}}
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </Button>
                                                )
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '& fieldset': {
                                                        borderColor: 'rgba(0, 0, 0, 0.23)'
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#FF8C42'
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#FF8C42'
                                                    }
                                                },
                                                '& .MuiInputLabel-root': {
                                                    '&.Mui-focused': {
                                                        color: '#FF8C42'
                                                    }
                                                }
                                            }}
                                            placeholder="Confirm new password"
                                        />

                                        {error && (
                                            <Fade in={!!error}>
                                                <Alert
                                                    severity="error"
                                                    sx={{
                                                        borderRadius: 2,
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    {error}
                                                </Alert>
                                            </Fade>
                                        )}

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            disabled={loading || !token || !email}
                                            startIcon={loading ? <CircularProgress size={18}/> : <LockReset/>}
                                            sx={{
                                                borderRadius: 2,
                                                py: 1.2,
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                bgcolor: '#FF8C42',
                                                '&:hover': {
                                                    bgcolor: '#E67E22'
                                                },
                                                '&.Mui-disabled': {
                                                    bgcolor: 'grey.300'
                                                }
                                            }}
                                        >
                                            {loading ? 'Resetting...' : 'Reset Password'}
                                        </Button>
                                    </Stack>
                                </Box>

                                <Divider sx={{my: 1}}/>

                                {/* Footer */}
                                <Stack spacing={1.5} alignItems="center">
                                    <Button
                                        variant="text"
                                        onClick={handleBackToLogin}
                                        startIcon={<ArrowBack/>}
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: '0.875rem',
                                            '&:hover': {
                                                color: '#FF8C42',
                                                bgcolor: 'transparent'
                                            }
                                        }}
                                    >
                                        Back to Login
                                    </Button>

                                    <Typography variant="body2" color="text.secondary" textAlign="center">
                                        Don't have an account?{' '}
                                        <Link
                                            to="/auth/register"
                                            style={{
                                                color: '#FF8C42',
                                                textDecoration: 'none',
                                                fontWeight: 600
                                            }}
                                        >
                                            Register now
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>
        </Box>
    );
};

export default ResetPassword;
