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
    Divider,
    Alert,
    CircularProgress,
    alpha,
    Card,
    CardContent
} from '@mui/material'
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    Badge as BadgeIcon,
    AccountCircle as AccountIcon,
    Close as CloseIcon
} from '@mui/icons-material'
import {hrService} from '@services/hrService.jsx'

export default function TeacherDetail({open, onClose, teacherId}) {
    const [teacher, setTeacher] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (open && teacherId) {
            loadTeacherDetail()
        }
    }, [open, teacherId])

    const loadTeacherDetail = async () => {
        try {
            setLoading(true)
            setError('')
            
            const response = await hrService.getTeacherDetail(teacherId)
            
            if (response.success) {
                setTeacher(response.data)
            } else {
                setError(response.error || 'Failed to load teacher details')
            }
        } catch (error) {
            setError('Failed to load teacher details')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (iso) => {
        if (!iso) return 'N/A'
        try {
            const date = new Date(iso)
            const pad = (n) => String(n).padStart(2, '0')
            const day = pad(date.getDate())
            const month = pad(date.getMonth() + 1)
            const year = date.getFullYear()
            const hours = pad(date.getHours())
            const minutes = pad(date.getMinutes())
            const seconds = pad(date.getSeconds())
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
        } catch {
            return 'N/A'
        }
    }

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
        setTeacher(null)
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
                        Teacher Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        View teacher information
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
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200, p: 3 }}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Box sx={{ p: 3 }}>
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {teacher && !loading && (
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
                                            src={teacher.avatarUrl}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                mx: 'auto',
                                                mb: 2,
                                                background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}CC 100%)`,
                                                fontSize: '2.5rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {teacher.name ? teacher.name.charAt(0).toUpperCase() : <AccountIcon sx={{ fontSize: '2.5rem' }} />}
                                        </Avatar>
                                        
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: brandColor, mb: 1 }}>
                                            {teacher.name || "Unknown"}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {teacher.email}
                                        </Typography>

                                        <Chip 
                                            label={getStatusLabel(teacher.status)}
                                            size="small"
                                            sx={{
                                                backgroundColor: alpha(getStatusColor(teacher.status), 0.12),
                                                color: getStatusColor(teacher.status),
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
                                                            {teacher.name || "Not provided"}
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
                                                            {teacher.email || "Not provided"}
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
                                                            {teacher.phone || "Not provided"}
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
                                                            {teacher.address || "Not provided"}
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
                                                            {teacher.role || "TEACHER"}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, backgroundColor: 'grey.50' }}>
                                                    <CalendarIcon sx={{ color: brandColor }} />
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                            Created At
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                            {formatDate(teacher.createdAt)}
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
