import React, {useEffect, useState} from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Stack,
    Avatar,
    Chip,
    Alert,
    alpha,
    Card,
    CardContent
} from '@mui/material'
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Badge as BadgeIcon,
    AccountCircle as AccountIcon,
    Close as CloseIcon,
    Wc as GenderIcon
} from '@mui/icons-material'

export default function ParentDetail({open, onClose, parent}) {
    const [error, setError] = useState('')

    useEffect(() => {
        if (open && !parent) {
            setError('Parent data not available')
        } else {
            setError('')
        }
    }, [open, parent])


    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACCOUNT_ACTIVE': return '#22c55e'
            case 'ACCOUNT_INACTIVE': return '#ef4444'
            case 'PENDING': return '#f59e0b'
            default: return '#6b7280'
        }
    }

    const getStatusLabel = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACCOUNT_ACTIVE': return 'Active'
            case 'ACCOUNT_INACTIVE': return 'Inactive'
            case 'PENDING': return 'Pending'
            default: return status || 'Unknown'
        }
    }

    const brandColor = '#0038A5'

    const handleClose = () => {
        setError('')
        onClose?.()
    }

    return (
        <Dialog 
            open={!!open} 
            onClose={handleClose} 
            fullWidth 
            maxWidth="md"
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
                background: alpha(brandColor, 0.03),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: brandColor }}>
                        Parent Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        View parent information
                    </Typography>
                </Box>
                <Button
                    onClick={handleClose}
                    sx={{ 
                        minWidth: 'auto',
                        p: 1,
                        borderRadius: 2,
                        color: 'text.secondary',
                        '&:hover': {
                            backgroundColor: alpha(brandColor, 0.08)
                        }
                    }}
                >
                    <CloseIcon />
                </Button>
            </DialogTitle>
            
            <DialogContent sx={{ p: 0 }}>
                {error && (
                    <Box sx={{ p: 3 }}>
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {parent && !error && (
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', md: 'row' }, 
                            gap: 3 
                        }}>
                            {/* Profile Section */}
                            <Box sx={{ flex: { xs: 'none', md: 1 } }}>
                                <Card elevation={2} sx={{ 
                                    borderRadius: 3,
                                    background: `linear-gradient(135deg, ${brandColor}08 0%, ${brandColor}03 100%)`,
                                    border: `1px solid ${alpha(brandColor, 0.12)}`
                                }}>
                                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                        <Avatar
                                            src={parent.avatarUrl}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                mx: 'auto',
                                                mb: 2,
                                                background: `linear-gradient(135deg, #4caf50 0%, #4caf50CC 100%)`,
                                                fontSize: '2.5rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {parent.name ? parent.name.charAt(0).toUpperCase() : <AccountIcon sx={{ fontSize: '2.5rem' }} />}
                                        </Avatar>
                                        
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: brandColor, mb: 1 }}>
                                            {parent.name || "Unknown"}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {parent.email}
                                        </Typography>

                                        <Chip 
                                            label={getStatusLabel(parent.status)}
                                            size="small"
                                            sx={{
                                                backgroundColor: alpha(getStatusColor(parent.status), 0.12),
                                                color: getStatusColor(parent.status),
                                                fontWeight: 600
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </Box>

                            {/* Information Section */}
                            <Box sx={{ flex: { xs: 'none', md: 2 } }}>
                                <Card elevation={2} sx={{ 
                                    borderRadius: 3,
                                    border: `1px solid ${alpha(brandColor, 0.12)}`
                                }}>
                                    <Box sx={{
                                        px: 3,
                                        py: 2,
                                        borderBottom: `1px solid ${alpha(brandColor, 0.12)}`,
                                        background: alpha(brandColor, 0.03)
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: brandColor }}>
                                            Personal Information
                                        </Typography>
                                    </Box>

                                    <CardContent sx={{ p: 3 }}>
                                        <Stack spacing={3}>
                                            {/* Basic Info */}
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                                    <PersonIcon sx={{ color: brandColor }} />
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                            Full Name
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                            {parent.name || "Not provided"}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                                    <EmailIcon sx={{ color: brandColor }} />
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                            Email Address
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                            {parent.email || "Not provided"}
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
                                                            {parent.phone || "Not provided"}
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
                                                            {parent.address || "Not provided"}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                                    <GenderIcon sx={{ color: brandColor }} />
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                            Gender
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                            {parent.gender || "Not provided"}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                                    <BadgeIcon sx={{ color: brandColor }} />
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                            Role
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                            {parent.role || "PARENT"}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Box>
                )}
            </DialogContent>
            
            <DialogActions sx={{ p: 3, gap: 2, borderTop: `1px solid ${alpha(brandColor, 0.12)}` }}>
                <Button 
                    onClick={handleClose}
                    variant="contained"
                    sx={{ 
                        borderRadius: 2, 
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 4,
                        background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}DD 100%)`,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${brandColor}EE 0%, ${brandColor} 100%)`,
                        }
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
