import React, {useEffect, useState} from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Avatar,
    Chip,
    Alert,
    alpha,
    Slide
} from '@mui/material'
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Badge as BadgeIcon,
    AccountCircle as AccountIcon,
    Wc as GenderIcon,
    FamilyRestroom as FamilyIcon
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
            maxWidth="lg"
            TransitionComponent={Slide}
            TransitionProps={{ direction: 'up' }}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        boxShadow: '0 32px 64px rgba(0,0,0,0.15)',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                        overflow: 'hidden'
                    }
                }
            }}
        >
            <DialogTitle sx={{ 
                p: 0,
                background: `linear-gradient(135deg, #1A4DAE 0%, #1A4DAECC 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Pattern */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    background: `radial-gradient(circle, ${alpha('#ffffff', 0.1)} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    transform: 'translate(50%, -50%)'
                }} />
                
                <Box sx={{
                    position: 'relative',
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 3,
                            background: alpha('#ffffff', 0.2),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <FamilyIcon sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                        <Box>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 800, 
                                color: 'white',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                Parent Profile
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: alpha('#ffffff', 0.9),
                                fontWeight: 500
                            }}>
                                Detailed information and credentials
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </DialogTitle>
            
            <DialogContent sx={{ p: 0 }}>
                {error && (
                    <Box sx={{ p: 4 }}>
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {parent && !error && (
                    <Box sx={{ p: 4 }}>
                        {/* Parent Header */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 3, 
                            mb: 4,
                            p: 3,
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${alpha('#1A4DAE', 0.05)} 0%, ${alpha('#1A4DAE', 0.02)} 100%)`,
                            border: `1px solid ${alpha('#1A4DAE', 0.1)}`
                        }}>
                            <Avatar
                                src={parent.avatarUrl}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    background: `linear-gradient(135deg, #1A4DAE 0%, #1A4DAECC 100%)`,
                                    fontSize: '2rem',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            >
                                {parent.name ? parent.name.charAt(0).toUpperCase() : <AccountIcon sx={{ fontSize: '2rem' }} />}
                            </Avatar>
                            
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h5" sx={{ 
                                    fontWeight: 700, 
                                    color: '#1A4DAE',
                                    mb: 1
                                }}>
                                    {parent.name || "Unknown Parent"}
                                </Typography>
                                
                                <Typography variant="body1" sx={{ 
                                    color: 'text.secondary',
                                    mb: 2
                                }}>
                                    {parent.email}
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Chip 
                                        label={getStatusLabel(parent.status || 'ACCOUNT_ACTIVE')}
                                        size="small"
                                        sx={{
                                            backgroundColor: alpha(getStatusColor(parent.status || 'ACCOUNT_ACTIVE'), 0.12),
                                            color: getStatusColor(parent.status || 'ACCOUNT_ACTIVE'),
                                            fontWeight: 600
                                        }}
                                    />
                                    <Chip 
                                        label={parent.role || "PARENT"}
                                        size="small"
                                        color="success"
                                        variant="outlined"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* Basic Information */}
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' }, 
                            flexWrap: 'wrap',
                            gap: 3 
                        }}>
                            <Box sx={{ 
                                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' },
                                minWidth: { xs: '100%', sm: '300px' }
                            }}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha('#1A4DAE', 0.1)}`,
                                    background: 'white',
                                    height: '100%'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <EmailIcon sx={{ color: '#1A4DAE', fontSize: 20 }} />
                                        <Typography variant="subtitle2" sx={{ 
                                            fontWeight: 600, 
                                            color: 'text.secondary',
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem',
                                            letterSpacing: 0.5
                                        }}>
                                            Email Address
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {parent.email || "Not provided"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ 
                                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' },
                                minWidth: { xs: '100%', sm: '300px' }
                            }}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha('#1A4DAE', 0.1)}`,
                                    background: 'white',
                                    height: '100%'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <PhoneIcon sx={{ color: '#1A4DAE', fontSize: 20 }} />
                                        <Typography variant="subtitle2" sx={{ 
                                            fontWeight: 600, 
                                            color: 'text.secondary',
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem',
                                            letterSpacing: 0.5
                                        }}>
                                            Phone Number
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {parent.phone || "Not provided"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ 
                                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' },
                                minWidth: { xs: '100%', sm: '300px' }
                            }}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha('#1A4DAE', 0.1)}`,
                                    background: 'white',
                                    height: '100%'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <GenderIcon sx={{ color: '#1A4DAE', fontSize: 20 }} />
                                        <Typography variant="subtitle2" sx={{ 
                                            fontWeight: 600, 
                                            color: 'text.secondary',
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem',
                                            letterSpacing: 0.5
                                        }}>
                                            Gender
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {parent.gender || "Not provided"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ 
                                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' },
                                minWidth: { xs: '100%', sm: '300px' }
                            }}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha('#1A4DAE', 0.1)}`,
                                    background: 'white',
                                    height: '100%'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <BadgeIcon sx={{ color: '#1A4DAE', fontSize: 20 }} />
                                        <Typography variant="subtitle2" sx={{ 
                                            fontWeight: 600, 
                                            color: 'text.secondary',
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem',
                                            letterSpacing: 0.5
                                        }}>
                                            Role
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {parent.role || "PARENT"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ 
                                flex: '1 1 100%',
                                minWidth: '100%'
                            }}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha('#1A4DAE', 0.1)}`,
                                    background: 'white'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                                        <LocationIcon sx={{ color: '#1A4DAE', fontSize: 20, mt: 0.5 }} />
                                        <Typography variant="subtitle2" sx={{ 
                                            fontWeight: 600, 
                                            color: 'text.secondary',
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem',
                                            letterSpacing: 0.5
                                        }}>
                                            Address
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {parent.address || "Not provided"}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </DialogContent>
            
            <DialogActions sx={{ 
                p: 3, 
                gap: 2, 
                borderTop: `1px solid ${alpha('#1A4DAE', 0.1)}`,
                background: alpha('#1A4DAE', 0.02)
            }}>
                <Button 
                    onClick={handleClose}
                    variant="contained"
                    sx={{ 
                        borderRadius: 2, 
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 4,
                        background: '#1A4DAE',
                        '&:hover': {
                            background: '#153a8a',
                        }
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
