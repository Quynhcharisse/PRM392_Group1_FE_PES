import {getDashboardRoute} from "@/constants/routes";
import {Spinner} from "@atoms";
import {accountService} from "@services/AccountService.jsx";
import {getCurrentTokenData} from "@services/JWTService";
import {PageTemplate} from "@templates";
import {
    Alert,
    AlertTitle,
    alpha,
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    Button
} from "@mui/material";
import {
    AccountCircle as AccountIcon,
    CreditCard as IdCardIcon,
    Edit as EditIcon,
    Email as EmailIcon,
    Key as KeyIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon,
    Phone as PhoneIcon,
    Security as SecurityIcon
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import EditProfileForm from "./EditProfileForm.jsx";
import ChangePassword from "./ChangePassword.jsx";

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
    identityNumber: {
        required: true,
        pattern: /^\d{12}$/,
        message: {
            required: "Identity number is required",
            pattern: "Identity number must be exactly 12 digits",
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
        identityNumber: "",
        avatarUrl: "",
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
                identityNumber: profileData.identityNumber || "",
                avatarUrl: profileData.avatarUrl || "",
            });

            // eslint-disable-next-line no-unused-vars
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

    // Handle avatar change
    const handleAvatarChange = (avatarUrl) => {
        setFormData((prev) => ({...prev, avatarUrl}));
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

    const handlePasswordChangeSuccess = (success) => {
        if (success) {
            setIsFirstLogin(false);
            setSuccess("Password changed successfully!");
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(""), 3000);
        }
        setShowPasswordReset(false);
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
            const month = d.getMonth() + 1; // No padding for month as requested
            const year = d.getFullYear();
            const hours = pad(d.getHours());
            const minutes = pad(d.getMinutes());
            const seconds = pad(d.getSeconds());
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        } catch {
            return 'N/A';
        }
    };

    const getGenderDisplay = (gender) => {
        const g = (gender || "").toLowerCase();
        if (g === "male") return "Male";
        if (g === "female") return "Female";
        if (g === "other") return "Other";
        return "Not updated";
    };

    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACCOUNT_ACTIVE':
                return '#4caf50';
            case 'ACCOUNT_INACTIVE':
                return '#f44336';
            case 'PENDING':
                return '#ff9800';
            default:
                return '#757575';
        }
    };

    const getStatusDisplay = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACCOUNT_ACTIVE':
                return 'Active';
            case 'ACCOUNT_INACTIVE':
                return 'Inactive';
            case 'PENDING':
                return 'Pending';
            default:
                return 'Unknown';
        }
    };

    const formatIdentityNumber = (identityNumber) => {
        if (!identityNumber) return "Not updated";
        if (identityNumber.length >= 3) {
            const firstThree = identityNumber.substring(0, 3);
            const masked = '*'.repeat(Math.max(0, identityNumber.length - 3));
            return firstThree + masked;
        }
        return identityNumber;
    };

    if (loading) {
        return (
            <PageTemplate title="Personal Information">
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400}}>
                    <Stack alignItems="center" spacing={2}>
                        <Spinner size="lg"/>
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
                    onClick={() => setShowPasswordReset(true)}
                    variant="primary"
                    startIcon={<KeyIcon sx={{ fontSize: '1rem' }} />}
                    sx={{
                        borderRadius: '80px',
                        px: 3,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        borderColor: '#0038A5',
                        color: 'white',
                        backgroundColor: 'blue',
                        '&:hover': {
                            borderColor: '#0038A5',
                            backgroundColor: '#f0f4ff',
                            color: '#0038A5'
                        }
                    }}
                >
                    Change Password
                </Button>
            }
        >
            <Box sx={{
                display: 'flex',
                flexDirection: {xs: 'column', md: 'row'},
                gap: 3
            }}>
                {/* Profile Card */}
                <Box sx={{flex: {xs: 'none', md: 1}}}>
                    <Card elevation={4} sx={{
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${brandColor}08 0%, ${brandColor}03 100%)`,
                        border: `1px solid ${alpha(brandColor, 0.12)}`
                    }}>
                        <CardContent sx={{p: 4, textAlign: 'center'}}>
                            <Avatar
                                src={formData.avatarUrl || profile?.avatarUrl || undefined}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 2,
                                    background: (formData.avatarUrl || profile?.avatarUrl)
                                        ? 'transparent'
                                        : `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}CC 100%)`,
                                    fontSize: '3rem',
                                    fontWeight: 600
                                }}
                            >
                                {!(formData.avatarUrl || profile?.avatarUrl) && (
                                    profile?.name ? profile.name.charAt(0).toUpperCase() :
                                        <AccountIcon sx={{fontSize: '3rem'}}/>
                                )}
                            </Avatar>

                            <Typography variant="h5" sx={{fontWeight: 700, color: brandColor, mb: 1}}>
                                {profile?.name || "User"}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                                {profile?.email}
                            </Typography>

                            <Typography variant="caption" color="text.secondary">
                                Member since {formatCreatedAt(profile?.createAt)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Information Card */}
                <Box sx={{flex: {xs: 'none', md: 2}}}>
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
                            <Typography variant="h6" sx={{fontWeight: 700, color: brandColor}}>
                                Personal Information
                            </Typography>
                            <Tooltip title="Edit profile">
                                <IconButton
                                    onClick={() => {
                                        // Refresh formData with current profile data before editing
                                        const newFormData = {
                                            name: profile?.name || "",
                                            phone: profile?.phone || "",
                                            address: profile?.address || "",
                                            gender: profile?.gender || "",
                                            identityNumber: profile?.identityNumber || "",
                                            avatarUrl: profile?.avatarUrl || "",
                                        };
                                        setFormData(newFormData);
                                        setFormErrors({}); // Clear any previous errors
                                        setEditing(true);
                                    }}
                                    sx={{
                                        color: brandColor,
                                        '&:hover': {backgroundColor: alpha(brandColor, 0.08)}
                                    }}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <CardContent sx={{p: 3}}>
                            <Stack spacing={3}>
                                {isFirstLogin && (
                                    <Alert severity="warning" sx={{borderRadius: 2}}>
                                        <AlertTitle>First Time Login</AlertTitle>
                                        Please update your personal information and change your password to complete
                                        account setup.
                                    </Alert>
                                )}

                                {/* Success/Error Messages */}
                                {success && (
                                    <Alert severity="success" sx={{borderRadius: 2}}>
                                        {success}
                                    </Alert>
                                )}

                                {error && (
                                    <Alert severity="error" sx={{borderRadius: 2}}>
                                        {error}
                                    </Alert>
                                )}

                                {/* Information Fields */}
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'grey.50'
                                    }}>
                                        <PersonIcon sx={{color: brandColor}}/>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600}}>
                                                Full Name
                                            </Typography>
                                             <Typography variant="body1" sx={{fontWeight: 500}}>
                                                 {profile?.name || "Not updated"}
                                             </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'grey.50'
                                    }}>
                                        <EmailIcon sx={{color: brandColor}}/>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600}}>
                                                Email
                                            </Typography>
                                            <Typography variant="body1" sx={{fontWeight: 500}}>
                                                {profile?.email}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'grey.50'
                                    }}>
                                        <PhoneIcon sx={{color: brandColor}}/>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600}}>
                                                Phone Number
                                            </Typography>
                                             <Typography variant="body1" sx={{fontWeight: 500}}>
                                                 {profile?.phone || "Not updated"}
                                             </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'grey.50'
                                    }}>
                                        <PersonIcon sx={{color: brandColor}}/>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600}}>
                                                Gender
                                            </Typography>
                                             <Typography variant="body1" sx={{fontWeight: 500}}>
                                                 {getGenderDisplay(profile?.gender)}
                                             </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'grey.50'
                                    }}>
                                        <LocationIcon sx={{color: brandColor, mt: 0.5}}/>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600}}>
                                                Address
                                            </Typography>
                                             <Typography variant="body1" sx={{fontWeight: 500}}>
                                                 {profile?.address || "Not updated"}
                                             </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'grey.50'
                                    }}>
                                        <IdCardIcon sx={{color: brandColor}}/>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600}}>
                                                Identity Number
                                            </Typography>
                                             <Typography variant="body1" sx={{fontWeight: 500}}>
                                                 {formatIdentityNumber(profile?.identityNumber)}
                                             </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        backgroundColor: 'grey.50'
                                    }}>
                                        <SecurityIcon sx={{color: brandColor}}/>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{fontWeight: 600}}>
                                                Account Status
                                            </Typography>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <Chip
                                                    size="small"
                                                    label={getStatusDisplay(profile?.status)}
                                                    sx={{
                                                        backgroundColor: alpha(getStatusColor(profile?.status), 0.12),
                                                        color: getStatusColor(profile?.status),
                                                        fontWeight: 600,
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Continue Button for First Login */}
                                {isFirstLogin && !showPasswordReset && (
                                    <Box sx={{textAlign: 'center', pt: 2}}>
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
            {/* Change Password Dialog */}
            <ChangePassword
                open={showPasswordReset}
                onClose={handlePasswordChangeSuccess}
                isFirstLogin={isFirstLogin}
            />

            {/* Edit Profile Form */}
            <EditProfileForm
                open={editing}
                formData={formData}
                formErrors={formErrors}
                saving={saving}
                onChange={handleFormChange}
                onAvatarChange={handleAvatarChange}
                onSave={handleSaveProfile}
                onCancel={() => {
                    setEditing(false);
                    setFormData({
                        name: profile?.name || "",
                        phone: profile?.phone || "",
                        address: profile?.address || "",
                        gender: profile?.gender || "",
                        identityNumber: profile?.identityNumber || "",
                        avatarUrl: profile?.avatarUrl || "",
                    });
                    setFormErrors({});
                }}
            />
        </PageTemplate>
    );
};

export default UserProfile;
