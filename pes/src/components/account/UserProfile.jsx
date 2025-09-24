import {getDashboardRoute} from "@/constants/routes";
import {Button, Spinner} from "@atoms";
import {authService} from "@services/authService";
import {accountService} from "@services/accountService.jsx";
import {getCurrentTokenData} from "@services/JWTService";
import {PageTemplate} from "@templates";
import {
    alpha, 
    Box, 
    Paper, 
    Typography, 
    IconButton, 
    Tooltip,
    Card,
    CardContent,
    Divider,
    Chip,
    Avatar,
    Grid,
    Alert,
    AlertTitle,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    Security as SecurityIcon,
    Edit as EditIcon,
    Key as KeyIcon,
    Close as CloseIcon,
    Warning as WarningIcon,
    Badge as BadgeIcon,
    AccountCircle as AccountIcon
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import EditProfileForm from "./EditProfileForm.jsx";

// Validation rules
const VALIDATION_RULES = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
        message: {
            required: "Full name is required",
            minLength: "Full name must be at least 2 characters",
            maxLength: "Full name cannot exceed 50 characters",
            pattern: "Full name can only contain letters and spaces",
        },
    },
    phone: {
        required: false,
        pattern: /^[0-9]{10,11}$/,
        message: {
            required: "Phone number is required",
            pattern: "Phone number must be 10-11 digits",
        },
    },
    address: {
        required: true,
        minLength: 10,
        maxLength: 200,
        message: {
            required: "Address is required",
            minLength: "Address must be at least 10 characters",
            maxLength: "Address cannot exceed 200 characters",
        },
    },
    gender: {
        required: true,
        message: {
            required: "Please select a gender",
        },
    },
};

const UserProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // Form data for editing
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        gender: "",
    });

    // Password reset form
    const [passwordData, setPasswordData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await accountService.getProfile();

            const profileData = response.data || response;
            setProfile(profileData);

            const needsPasswordReset =
                profileData.firstLogin || profileData.tempPassword;
            setIsFirstLogin(needsPasswordReset);
            setShowPasswordReset(needsPasswordReset);

            setFormData({
                name: profileData.name || "",
                phone: profileData.phone || "",
                address: profileData.address || "",
                gender: profileData.gender || "",
            });

            setPasswordData((prev) => ({
                ...prev,
                email: profileData.email || "",
            }));

        } catch (error) {
            setError("Failed to load profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Validation function
    const validateField = (name, value) => {
        const rules = VALIDATION_RULES[name];
        if (!rules) return "";

        if (rules.required && (!value || value.trim() === '')) {
            return rules.message.required;
        }

        // Skip other validations if field is optional and empty
        if (!rules.required && (!value || value.trim() === '')) {
            return "";
        }

        if (rules.minLength && value.length < rules.minLength) {
            return rules.message.minLength;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return rules.message.maxLength;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            return rules.message.pattern;
        }
        return "";
    };

    // Handle form change with validation
    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));

        const error = validateField(name, value);
        setFormErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    // Validate all fields before saving
    const validateForm = () => {
        const errors = {};
        
        Object.keys(VALIDATION_RULES).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) {
                errors[field] = error;
            }
        });
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveProfile = async () => {
        if (!validateForm()) {
            setError("Please check your information");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");
            const result = await accountService.updateProfile(formData);
            setSuccess(result?.message || "Update Profile Successfully");
            setEditing(false);
            await loadProfile();
        } catch (error) {
            setError(error.message || "Update failed. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordReset = async () => {
        try {
            // Validate passwords
            if (passwordData.password !== passwordData.confirmPassword) {
                setError("Passwords do not match!");
                return;
            }

            if (passwordData.password.length < 6) {
                setError("Password must be at least 6 characters!");
                return;
            }

            setSaving(true);
            setError("");

            await authService.resetPassword({
                email: passwordData.email,
                password: passwordData.password,
                confirmPassword: passwordData.confirmPassword,
            });

            setSuccess("Password changed successfully!");
            setShowPasswordReset(false);
            setIsFirstLogin(false);
        } catch (error) {
            setError("Password reset failed. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleContinueToDashboard = () => {
        const tokenData = getCurrentTokenData();
        const dashboardRoute = getDashboardRoute(tokenData?.role);
        navigate(dashboardRoute);
    };

    const formatCreatedAt = (iso) => {
        if (!iso) return 'N/A';
        try {
            const d = new Date(iso);
            const pad = (n) => String(n).padStart(2, '0');
            const day = pad(d.getDate());
            const month = pad(d.getMonth() + 1);
            const year = d.getFullYear();
            const hours = pad(d.getHours());
            const minutes = pad(d.getMinutes());
            const seconds = pad(d.getSeconds());
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        } catch {
            return 'N/A';
        }
    };

    const getRoleColor = (role) => {
        switch (role?.toUpperCase()) {
            case 'HR': return '#e91e63';
            case 'EDUCATION': return '#2196f3';
            case 'PARENT': return '#4caf50';
            case 'TEACHER': return '#ff9800';
            default: return '#757575';
        }
    };

    const getGenderDisplay = (gender) => {
        const g = (gender || "").toLowerCase();
        if (g === "male") return "Male";
        if (g === "female") return "Female";
        if (g === "other") return "Other";
        return "Not updated";
    };

    if (loading) {
        return (
            <PageTemplate title="Personal Information">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                    <Stack alignItems="center" spacing={2}>
                        <Spinner size="lg" />
                        <Typography color="text.secondary">Loading information...</Typography>
                    </Stack>
                </Box>
            </PageTemplate>
        );
    }

    const brandColor = '#0038A5';

    return (
        <PageTemplate
            title="Personal Information"
            subtitle={
                isFirstLogin
                    ? "Please update your information and change your password"
                    : "Manage your account information"
            }
            actions={
                        <Button
                            variant="outline"
                            onClick={() => setShowPasswordReset(true)}
                    sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                    startIcon={<KeyIcon />}
                >
                            Change Password
                        </Button>
            }
        >
            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 3 
            }}>
                {/* Profile Card */}
                <Box sx={{ flex: { xs: 'none', md: 1 } }}>
                    <Card elevation={4} sx={{ 
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${brandColor}08 0%, ${brandColor}03 100%)`,
                        border: `1px solid ${alpha(brandColor, 0.12)}`
                    }}>
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 2,
                                    background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}CC 100%)`,
                                    fontSize: '3rem',
                                    fontWeight: 600
                                }}
                            >
                                {profile?.name ? profile.name.charAt(0).toUpperCase() : <AccountIcon sx={{ fontSize: '3rem' }} />}
                            </Avatar>
                            
                            <Typography variant="h5" sx={{ fontWeight: 700, color: brandColor, mb: 1 }}>
                                {profile?.name || "User"}
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {profile?.email}
                            </Typography>
                            
                            <Typography variant="caption" color="text.secondary">
                                Member since {formatCreatedAt(profile?.createAt)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Information Card */}
                <Box sx={{ flex: { xs: 'none', md: 2 } }}>
                    <Card elevation={4} sx={{ 
                        borderRadius: 3,
                        border: `1px solid ${alpha(brandColor, 0.12)}`
                    }}>
                        <Box sx={{
                            px: 3,
                            py: 2,
                            borderBottom: `1px solid ${alpha(brandColor, 0.12)}`,
                            background: alpha(brandColor, 0.03),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColor }}>
                                Personal Information
                            </Typography>
                            <Tooltip title="Edit profile">
                                <IconButton 
                                    onClick={() => setEditing(true)} 
                                    sx={{ 
                                        color: brandColor, 
                                        '&:hover': { backgroundColor: alpha(brandColor, 0.08) } 
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <CardContent sx={{ p: 3 }}>
                            <Stack spacing={3}>
                {/* First Login Alert */}
                {isFirstLogin && (
                                    <Alert severity="warning" sx={{ borderRadius: 2 }}>
                                        <AlertTitle>First Time Login</AlertTitle>
                                        Please update your personal information and change your password to complete account setup.
                                    </Alert>
                )}

                {/* Success/Error Messages */}
                {success && (
                                    <Alert severity="success" sx={{ borderRadius: 2 }}>
                        {success}
                                    </Alert>
                )}

                {error && (
                                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                        {error}
                                    </Alert>
                                )}

                                {/* Information Fields */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                        <PersonIcon sx={{ color: brandColor }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                Full Name
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {formData.name || profile?.name || "Not updated"}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                        <EmailIcon sx={{ color: brandColor }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                Email
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {profile?.email}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                        <PhoneIcon sx={{ color: brandColor }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                Phone Number
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {formData.phone || profile?.phone || "Not updated"}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                        <PersonIcon sx={{ color: brandColor }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                Gender
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {getGenderDisplay(formData.gender || profile?.gender)}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                        <LocationIcon sx={{ color: brandColor, mt: 0.5 }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                Address
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {formData.address || profile?.address || "Not updated"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Continue Button for First Login */}
                                {isFirstLogin && !showPasswordReset && (
                                    <Box sx={{ textAlign: 'center', pt: 2 }}>
                                        <Button
                                            variant="primary"
                                            size="large"
                                            onClick={handleContinueToDashboard}
                                            sx={{
                                                borderRadius: 2,
                                                px: 4,
                                                py: 1.5,
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                minWidth: 200
                                            }}
                                        >
                                            Continue to Dashboard
                                        </Button>
                                    </Box>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* Password Reset Dialog */}
            <Dialog 
                open={showPasswordReset} 
                onClose={() => !isFirstLogin && setShowPasswordReset(false)}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                            boxShadow: '0 24px 48px rgba(0,0,0,0.12)'
                        }
                    }
                }}
            >
                <DialogTitle sx={{ 
                    pb: 2,
                    borderBottom: `1px solid ${alpha(brandColor, 0.12)}`,
                    background: alpha(brandColor, 0.03)
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <KeyIcon sx={{ color: brandColor }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: brandColor }}>
                                Change Password
                        </Typography>
                            {!isFirstLogin && (
                            <IconButton 
                                    onClick={() => setShowPasswordReset(false)}
                                sx={{ ml: 'auto' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>
                </DialogTitle>
                
                <DialogContent sx={{ p: 3 }}>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            label="Email"
                                    type="email"
                                    value={passwordData.email}
                                    disabled
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    backgroundColor: 'grey.50'
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            label="New Password"
                                    type="password"
                                    value={passwordData.password}
                                    onChange={(e) =>
                                        setPasswordData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Confirm Password"
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) =>
                                        setPasswordData((prev) => ({
                                            ...prev,
                                            confirmPassword: e.target.value,
                                        }))
                                    }
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />
                    </Stack>
                </DialogContent>
                
                <DialogActions sx={{ p: 3, gap: 2 }}>
                    {!isFirstLogin && (
                        <Button
                            variant="outline"
                            onClick={() => setShowPasswordReset(false)}
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                        >
                            Cancel
                        </Button>
                    )}
                            <Button
                                variant="primary"
                                onClick={handlePasswordReset}
                                loading={saving}
                        sx={{ 
                            borderRadius: 2, 
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4
                        }}
                            >
                                Change Password
                            </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Profile Form */}
            <EditProfileForm
                open={editing}
                formData={formData}
                formErrors={formErrors}
                saving={saving}
                                            onChange={handleFormChange}
                onSave={handleSaveProfile}
                onCancel={() => {
                    setEditing(false);
                    setFormData({
                        name: profile?.name || "",
                        phone: profile?.phone || "",
                        address: profile?.address || "",
                        gender: profile?.gender || "",
                    });
                    setFormErrors({});
                }}
            />
        </PageTemplate>
    );
};

export default UserProfile;
