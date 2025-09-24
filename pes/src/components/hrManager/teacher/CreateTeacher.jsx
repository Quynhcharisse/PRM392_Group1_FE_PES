import React, {useState} from 'react'
import {
    Box, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Stack, 
    TextField,
    Alert,
    CircularProgress,
    Typography,
    alpha
} from '@mui/material'
import {hrService} from '@services/hrService.jsx'

export default function CreateTeacher({open, onClose}) {
    const [form, setForm] = useState({
        name: '', 
        email: '', 
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [formErrors, setFormErrors] = useState({})

    // Validation rules
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required'
                if (value.length < 2) return 'Name must be at least 2 characters'
                if (value.length > 50) return 'Name cannot exceed 50 characters'
                return ''
            case 'email':
                if (!value.trim()) return 'Email is required'
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(value)) return 'Please enter a valid email address'
                return ''
            case 'password':
                if (!value.trim()) return 'Password is required'
                if (value.length < 6) return 'Password must be at least 6 characters'
                return ''
            default:
                return ''
        }
    }

    const handleChange = (field, value) => {
        setForm(prev => ({...prev, [field]: value}))
        
        // Clear field error on change
        const fieldError = validateField(field, value)
        setFormErrors(prev => ({
            ...prev,
            [field]: fieldError
        }))
    }

    const validateForm = () => {
        const errors = {}
        Object.keys(form).forEach(field => {
            const error = validateField(field, form[field])
            if (error) {
                errors[field] = error
            }
        })
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            setError('Please fix the errors above')
            return
        }

        try {
            setLoading(true)
            setError('')
            setSuccess('')
            
            const response = await hrService.createTeacher(form)
            
            if (response.success) {
                setSuccess(response.message || 'Teacher created successfully!')
                setForm({name: '', email: '', password: ''})
                setFormErrors({})
                
                // Close dialog after short delay to show success message
                setTimeout(() => {
                    setSuccess('')
                    onClose?.()
                }, 1500)
            } else {
                setError(response.error || 'Failed to create teacher')
            }
        } catch (error) {
            setError('Failed to create teacher. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (loading) return // Prevent closing during API call
        setForm({name: '', email: '', password: ''})
        setFormErrors({})
        setError('')
        setSuccess('')
        onClose?.()
    }

    const brandColor = '#0038A5'

    return (
        <Dialog 
            open={!!open} 
            onClose={handleClose} 
            fullWidth 
            maxWidth="sm"
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
                <Typography variant="h6" sx={{ fontWeight: 700, color: brandColor }}>
                    Add New Teacher
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Create a new teacher account
                </Typography>
            </DialogTitle>
            
            <DialogContent sx={{ p: 3 }}>
                {/* Success/Error Messages */}
                {success && (
                    <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                        {success}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
                    <Stack spacing={3}>
                        <TextField 
                            label="Full Name" 
                            value={form.name}
                            onChange={e => handleChange('name', e.target.value)}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                            fullWidth
                            disabled={loading}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
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
                        
                        <TextField 
                            label="Email Address" 
                            type="email"
                            value={form.email}
                            onChange={e => handleChange('email', e.target.value)}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            fullWidth
                            disabled={loading}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
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
                        
                        <TextField 
                            label="Password" 
                            type="password"
                            value={form.password}
                            onChange={e => handleChange('password', e.target.value)}
                            error={!!formErrors.password}
                            helperText={formErrors.password || 'Minimum 6 characters'}
                            fullWidth
                            disabled={loading}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
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
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, gap: 2 }}>
                <Button 
                    onClick={handleClose}
                    disabled={loading}
                    sx={{ 
                        borderRadius: 2, 
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                    disabled={loading}
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
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
                >
                    {loading ? 'Creating...' : 'Create Teacher'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}


