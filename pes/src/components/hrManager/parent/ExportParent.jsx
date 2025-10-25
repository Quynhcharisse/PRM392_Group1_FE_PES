import React, {useState} from 'react'
import {
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Typography,
    Alert,
    CircularProgress,
    Box,
    alpha
} from '@mui/material'
import {Download as DownloadIcon} from '@mui/icons-material'
import {HRService} from '@services/HRService.jsx'

export default function ExportParent({open, onClose}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleExport = async () => {
        try {
            setLoading(true)
            setError('')
            setSuccess('')
            
            const response = await HRService.exportParent()
            
            if (response.success) {
                setSuccess(`File "${response.filename}" downloaded successfully!`)
                
                // Close dialog after short delay to show success message
                setTimeout(() => {
                    setSuccess('')
                    onClose?.()
                }, 2000)
            } else {
                setError(response.error || 'Failed to export parents')
            }
        } catch (error) {
            setError('Failed to export parents. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (loading) return // Prevent closing during export
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
                <Box>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: brandColor }}>
                        Export Parents
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Download parent list as Excel file
                    </Typography>
                </Box>
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

                <Box sx={{ textAlign: 'center', py: 2 }}>
                    <DownloadIcon sx={{ 
                        fontSize: 64, 
                        color: brandColor, 
                        mb: 2,
                        opacity: loading ? 0.5 : 1 
                    }} />
                    
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        Export Parent Data
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        This will download an Excel file containing all parent information including names, emails, phone numbers, addresses, and other details.
                    </Typography>

                    {loading && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                            <CircularProgress size={20} />
                            <Typography variant="body2" color="text.secondary">
                                Preparing export file...
                            </Typography>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, gap: 2, borderTop: `1px solid ${alpha(brandColor, 0.12)}` }}>
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
                    onClick={handleExport}
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
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <DownloadIcon />}
                >
                    {loading ? 'Exporting...' : 'Export Excel'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
