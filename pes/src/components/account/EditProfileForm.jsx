import {
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Box, 
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Stack
} from "@mui/material";
import {Edit as EditIcon} from "@mui/icons-material";

export default function EditProfileForm({open, formData, formErrors = {}, onChange, onSave, onCancel, saving = false}) {
    const handleChange = (e) => {
        onChange(e);
    };

    const brandColor = '#0038A5';

    return (
        <Dialog 
            open={open} 
            onClose={onCancel} 
            maxWidth="md" 
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        boxShadow: '0 32px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.05)',
                        background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
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
                p: 4,
                pb: 2,
                borderBottom: `1px solid rgba(148, 163, 184, 0.1)`,
                background: `linear-gradient(135deg, ${brandColor}08 0%, ${brandColor}03 100%)`,
            }}>
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
                        <EditIcon sx={{ fontSize: '1.5rem' }} />
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ 
                            color: brandColor,
                            fontWeight: 700,
                            mb: 0.5
                        }}>
                            Edit Profile
                        </Typography>
                        <Typography variant="body2" sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.875rem'
                        }}>
                            Update your personal information
                        </Typography>
                    </Box>
                </Box>
            </DialogTitle>
            
            <DialogContent sx={{ p: 4}}>
                <Stack spacing={3} sx={{mt: 3}}>
                    <Stack direction={{ xs: 'column', sm: 'row'}} spacing={3}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                            variant="outlined"
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
                                '& .MuiInputLabel-root': {
                                    backgroundColor: 'white',
                                    px: 1,
                                    '&.Mui-focused': {
                                        color: brandColor,
                                    }
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            error={!!formErrors.phone}
                            helperText={formErrors.phone}
                            variant="outlined"
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
                                '& .MuiInputLabel-root': {
                                    backgroundColor: 'white',
                                    px: 1,
                                    '&.Mui-focused': {
                                        color: brandColor,
                                    }
                                }
                            }}
                        />
                    </Stack>

                    <FormControl 
                        fullWidth 
                        error={!!formErrors.gender}
                        variant="outlined"
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
                            '& .MuiInputLabel-root': {
                                backgroundColor: 'white',
                                px: 1,
                                '&.Mui-focused': {
                                    color: brandColor,
                                }
                            }
                        }}
                    >
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={formData.gender || ''}
                            onChange={handleChange}
                            label="Gender"
                        >
                            <MenuItem value="">
                                <em>Select gender</em>
                            </MenuItem>
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                            <MenuItem value="OTHER">Other</MenuItem>
                        </Select>
                        {formErrors.gender && (
                            <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5, ml: 1.5 }}>
                                {formErrors.gender}
                            </Typography>
                        )}
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        error={!!formErrors.address}
                        helperText={formErrors.address}
                        multiline
                        rows={4}
                        variant="outlined"
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
                            '& .MuiInputLabel-root': {
                                backgroundColor: 'white',
                                px: 1,
                                '&.Mui-focused': {
                                    color: brandColor,
                                }
                            }
                        }}
                    />
                </Stack>
            </DialogContent>
            
            <DialogActions sx={{ 
                p: 4, 
                pt: 3, 
                gap: 2,
                borderTop: `1px solid rgba(148, 163, 184, 0.1)`,
                background: 'rgba(248, 250, 252, 0.5)'
            }}>
                <Button 
                    variant="outlined"
                    onClick={onCancel}
                    sx={{ 
                        borderRadius: 3,
                        px: 3,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderColor: 'grey.300',
                        color: 'text.secondary',
                        '&:hover': {
                            borderColor: 'grey.400',
                            backgroundColor: 'grey.50'
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    variant="contained"
                    onClick={onSave} 
                    disabled={saving}
                    sx={{ 
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}DD 100%)`,
                        boxShadow: `0 4px 12px ${brandColor}40`,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${brandColor}EE 0%, ${brandColor} 100%)`,
                            boxShadow: `0 6px 16px ${brandColor}50`,
                        },
                        '&:disabled': {
                            background: 'grey.300',
                            color: 'grey.500'
                        }
                    }}
                >
                    {saving ? 'Updating...' : 'Update Profile'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
