import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Typography,
    Box,
    IconButton,
    Alert,
    alpha
} from '@mui/material';
import {
    Key as KeyIcon,
    Close as CloseIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { accountService } from '@services/AccountService.jsx';
import ButtonCancel from '../customButton/ButtonCancel.jsx';
import ButtonUpdate from '../customButton/ButtonUpdate.jsx';

export default function ChangePassword({ open, onClose, isFirstLogin = false }) {
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const brandColor = '#0038A5';

    const handleChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (error) setError("");
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const validateForm = () => {
        // Validate current password
        if (!passwordData.currentPassword) {
            setError("Current password is required!");
            return false;
        }

        // Validate new password
        if (!passwordData.newPassword) {
            setError("New password is required!");
            return false;
        }

        if (passwordData.newPassword.length < 6) {
            setError("New password must be at least 6 characters!");
            return false;
        }

        // Check if new password is different from current
        if (passwordData.newPassword === passwordData.currentPassword) {
            setError("New password must be different from current password!");
            return false;
        }

        // Validate confirm password
        if (!passwordData.confirmPassword) {
            setError("Please confirm your new password!");
            return false;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError("New password and confirm password do not match!");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const result = await accountService.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword,
            });

            if (result.success) {
                setSuccess(result.message || "Password changed successfully!");
                
                // Reset form
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                
                // Close dialog after showing success
                setTimeout(() => {
                    setSuccess("");
                    onClose?.(true); // Pass true to indicate success
                }, 2000);
            } else {
                setError(result.error || "Failed to change password");
            }
        } catch (error) {
            setError("Password change failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading || isFirstLogin) return; // Prevent closing during save or if first login
        
        // Reset form and errors
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setShowPasswords({
            current: false,
            new: false,
            confirm: false
        });
        setError("");
        setSuccess("");
        onClose?.(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        boxShadow: '0 32px 64px rgba(0,0,0,0.12)',
                    }
                },
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(15, 23, 42, 0.7)',
                        backdropFilter: 'blur(8px)',
                    }
                }
            }}
        >
            <DialogTitle sx={{
                pb: 2,
                borderBottom: `1px solid ${alpha(brandColor, 0.12)}`,
                background: `linear-gradient(135deg, ${brandColor}08 0%, ${brandColor}03 100%)`
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}CC 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <KeyIcon sx={{ fontSize: '1.5rem' }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: brandColor }}>
                                Change Password
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {isFirstLogin 
                                    ? "Please change your temporary password"
                                    : "Update your account password"
                                }
                            </Typography>
                        </Box>
                    </Box>
                    {!isFirstLogin && (
                        <IconButton
                            onClick={handleClose}
                            disabled={loading}
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: alpha(brandColor, 0.08)
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 4 }}>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    {/* Alert Messages */}
                    {isFirstLogin && (
                        <Alert severity="warning" sx={{ borderRadius: 2 }}>
                            <Typography variant="body2" fontWeight={600}>
                                First Time Login
                            </Typography>
                            <Typography variant="caption">
                                For security reasons, please change your temporary password before continuing.
                            </Typography>
                        </Alert>
                    )}

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

                    {/* Current Password */}
                    <TextField
                        fullWidth
                        label="Current Password"
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => handleChange('currentPassword', e.target.value)}
                        disabled={loading}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => togglePasswordVisibility('current')}
                                    edge="end"
                                    size="small"
                                >
                                    {showPasswords.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            )
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: 'white',
                                '&:hover fieldset': {
                                    borderColor: `${brandColor}80`,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: brandColor,
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: brandColor,
                            }
                        }}
                    />

                    {/* New Password */}
                    <TextField
                        fullWidth
                        label="New Password"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => handleChange('newPassword', e.target.value)}
                        disabled={loading}
                        variant="outlined"
                        slotProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => togglePasswordVisibility('new')}
                                    edge="end"
                                    size="small"
                                >
                                    {showPasswords.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            )
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: 'white',
                                '&:hover fieldset': {
                                    borderColor: `${brandColor}80`,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: brandColor,
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: brandColor,
                            }
                        }}
                    />

                    {/* Confirm New Password */}
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        disabled={loading}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    edge="end"
                                    size="small"
                                >
                                    {showPasswords.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            )
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: 'white',
                                '&:hover fieldset': {
                                    borderColor: `${brandColor}80`,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: brandColor,
                                }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: brandColor,
                            }
                        }}
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{
                p: 4,
                pt: 3,
                gap: 2,
                borderTop: `1px solid ${alpha(brandColor, 0.12)}`,
                background: 'rgba(248, 250, 252, 0.5)'
            }}>
                {!isFirstLogin && (
                    <ButtonCancel
                        onClick={handleClose}
                        disabled={loading}
                    />
                )}
                <ButtonUpdate 
                    onClick={handleSubmit}
                    disabled={loading}
                />
            </DialogActions>
        </Dialog>
    );
}

