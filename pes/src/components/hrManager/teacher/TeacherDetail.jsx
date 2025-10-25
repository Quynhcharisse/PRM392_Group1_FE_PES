import React, {useEffect, useState} from 'react'
import {
    Alert,
    alpha,
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    Typography
} from '@mui/material'
import {
    AccountCircle as AccountIcon,
    Badge as BadgeIcon,
    CalendarToday as CalendarIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    School as SchoolIcon
} from '@mui/icons-material'
import {HRService} from '@services/HRService.jsx'

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

            const response = await HRService.getTeacherDetail(teacherId)

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
            case 'ACCOUNT_ACTIVE':
                return '#22c55e'
            case 'ACCOUNT_INACTIVE':
                return '#ef4444'
            case 'PENDING':
                return '#f59e0b'
            default:
                return '#6b7280'
        }
    }

    const getStatusLabel = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACCOUNT_ACTIVE':
                return 'Active'
            case 'ACCOUNT_INACTIVE':
                return 'Inactive'
            case 'PENDING':
                return 'Pending'
            default:
                return status || 'Unknown'
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
            maxWidth="lg"
            TransitionComponent={Slide}
            TransitionProps={{direction: 'up'}}
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
                background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}CC 100%)`,
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
                }}/>

                <Box sx={{
                    position: 'relative',
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
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
                            <SchoolIcon sx={{fontSize: 32, color: 'white'}}/>
                        </Box>
                        <Box>
                            <Typography variant="h4" sx={{
                                fontWeight: 800,
                                color: 'white',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                Teacher Profile
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

            <DialogContent sx={{p: 0}}>
                {loading && (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 300,
                        p: 4
                    }}>
                        <CircularProgress size={40} sx={{color: brandColor}}/>
                    </Box>
                )}

                {error && (
                    <Box sx={{p: 3}}>
                        <Alert severity="error" sx={{borderRadius: 2}}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {teacher && !loading && (
                    <Box sx={{p: 4}}>
                        {/* Teacher Header */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                            mb: 4,
                            p: 3,
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${alpha(brandColor, 0.05)} 0%, ${alpha(brandColor, 0.02)} 100%)`,
                            border: `1px solid ${alpha(brandColor, 0.1)}`
                        }}>
                            <Avatar
                                src={teacher.avatarUrl}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}CC 100%)`,
                                    fontSize: '2rem',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            >
                                {teacher.name ? teacher.name.charAt(0).toUpperCase() :
                                    <AccountIcon sx={{fontSize: '2rem'}}/>}
                            </Avatar>

                            <Box sx={{flex: 1}}>
                                <Typography variant="h5" sx={{
                                    fontWeight: 700,
                                    color: brandColor,
                                    mb: 1
                                }}>
                                    {teacher.name || "Unknown Teacher"}
                                </Typography>

                                <Typography variant="body1" sx={{
                                    color: 'text.secondary',
                                    mb: 2
                                }}>
                                    {teacher.email}
                                </Typography>

                                <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                                    <Chip
                                        label={getStatusLabel(teacher.status || 'ACCOUNT_ACTIVE')}
                                        size="small"
                                        sx={{
                                            backgroundColor: alpha(getStatusColor(teacher.status || 'ACCOUNT_ACTIVE'), 0.12),
                                            color: getStatusColor(teacher.status || 'ACCOUNT_ACTIVE'),
                                            fontWeight: 600
                                        }}
                                    />
                                    <Chip
                                        label={teacher.role || "TEACHER"}
                                        size="small"
                                        color="info"
                                        variant="outlined"
                                        sx={{fontWeight: 600}}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* Basic Information */}
                        <Box container spacing={3}>
                            <Box item xs={12} sm={6}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(brandColor, 0.1)}`,
                                    background: 'white'
                                }}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                                        <EmailIcon sx={{color: brandColor, fontSize: 20}}/>
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
                                    <Typography variant="body1" sx={{fontWeight: 500}}>
                                        {teacher.email || "Not provided"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box item xs={12} sm={6}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(brandColor, 0.1)}`,
                                    background: 'white'
                                }}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                                        <PhoneIcon sx={{color: brandColor, fontSize: 20}}/>
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
                                    <Typography variant="body1" sx={{fontWeight: 500}}>
                                        {teacher.phone || "Not provided"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box item xs={12}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(brandColor, 0.1)}`,
                                    background: 'white'
                                }}>
                                    <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2}}>
                                        <LocationIcon sx={{color: brandColor, fontSize: 20, mt: 0.5}}/>
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
                                    <Typography variant="body1" sx={{fontWeight: 500}}>
                                        {teacher.address || "Not provided"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box item xs={12} sm={6}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(brandColor, 0.1)}`,
                                    background: 'white'
                                }}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                                        <BadgeIcon sx={{color: brandColor, fontSize: 20}}/>
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
                                    <Typography variant="body1" sx={{fontWeight: 500}}>
                                        {teacher.role || "TEACHER"}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box item xs={12} sm={6}>
                                <Box sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(brandColor, 0.1)}`,
                                    background: 'white'
                                }}>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                                        <CalendarIcon sx={{color: brandColor, fontSize: 20}}/>
                                        <Typography variant="subtitle2" sx={{
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem',
                                            letterSpacing: 0.5
                                        }}>
                                            Created At
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{fontWeight: 500}}>
                                        {formatDate(teacher.createdAt || teacher.createAt)}
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
                borderTop: `1px solid ${alpha(brandColor, 0.1)}`,
                background: alpha(brandColor, 0.02)
            }}>
                <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 4,
                        background: brandColor,
                        '&:hover': {
                            background: `${brandColor}DD`,
                        }
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
