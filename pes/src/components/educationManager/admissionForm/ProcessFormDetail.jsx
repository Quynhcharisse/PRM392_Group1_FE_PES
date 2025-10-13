import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Stack,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Chip,
    Divider,
    Grid,
    Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';
import educationService from '@services/EducationService.jsx';
import ButtonCancel from '@components/customButton/ButtonCancel.jsx';

function ProcessFormDetail({ open, onClose, formId, formData, selectedTermId, onCancelClick, onRejectClick }) {
    const [formDetail, setFormDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [actionCompleted, setActionCompleted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (open && formData) {
            setFormDetail(formData);
            setLoading(false);
            setActionCompleted(false); // Reset action completed state
            setSuccessMessage(''); // Reset success message
        }
    }, [open, formData]);


    const handleProcessForm = async (action) => {
        try {
            setActionLoading(true);
            const payload = {
                id: parseInt(formId),
                action: action,
                cancelReason: ''
            };

            const response = await educationService.processForm(payload);
            
            if (response?.statusResponseCode?.toLowerCase() === 'ok') {
                // Mark action as completed and disable buttons
                setActionCompleted(true);
                // Update form status locally
                setFormDetail(prev => ({
                    ...prev,
                    status: action === 'approve' ? 'done' : 'rejected'
                }));
                // Show success message
                setError('');
                setSuccessMessage(`Form ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
            } else {
                setError(response?.message || 'Failed to process form');
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Failed to process form');
        } finally {
            setActionLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'waiting_for_payment':
                return 'warning';
            case 'done':
                return 'success';
            case 'cancelled':
                return 'error';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isActionDisabled = (action) => {
        if (!formDetail) return true;
        
        // Disable if action is loading
        if (actionLoading) return true;
        
        // Disable if action has been completed in this session
        if (actionCompleted) return true;
        
        // Disable if form is already processed
        const status = formDetail.status?.toLowerCase();
        if (status === 'done' || status === 'cancelled' || status === 'rejected') {
            return true;
        }
        
        return false;
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error && !formDetail) {
        return (
            <Box p={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="lg" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    maxHeight: '90vh',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                }
            }}
        >
            <DialogTitle sx={{ 
                textAlign: 'center', 
                pb: 2,
                borderBottom: '1px solid #e0e0e0'
            }}>
                <Typography variant="h4" fontWeight={700} color="#1976d2">
                    Process Form Detail
                </Typography>
            </DialogTitle>
            
            <DialogContent sx={{ p: 3 }}>
                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                            {error}
                        </Alert>
                    )}
                    
                    {successMessage && (
                        <Alert severity="success" sx={{ width: '100%', mb: 3 }}>
                            {successMessage}
                        </Alert>
                    )}

                    {formDetail && (
                        <>
                            {/* Form Information */}
                            <Paper sx={{ p: 3, width: '100%', bgcolor: '#f8f9fa' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            Form Information
                                        </Typography>
                                        <Stack spacing={2}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Form ID
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {formDetail.id}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Student Name
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {formDetail.student?.name || 'N/A'}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Student Date of Birth
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {formatDate(formDetail.student?.dateOfBirth)}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Student Gender
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {formDetail.student?.gender || 'N/A'}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            Parent Information
                                        </Typography>
                                        <Stack spacing={2}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Parent Name
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {formDetail.parentAccount?.name || 'N/A'}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Parent Email
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {formDetail.parentAccount?.email || 'N/A'}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Parent Phone
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {formDetail.parentAccount?.phone || 'N/A'}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Parent Address
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {formDetail.parentAccount?.address || 'N/A'}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* Status & Dates */}
                            <Paper sx={{ p: 3, width: '100%', bgcolor: '#f8f9fa' }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Status & Dates
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Status
                                            </Typography>
                                            <Chip
                                                label={formDetail.status || 'Unknown'}
                                                color={getStatusColor(formDetail.status)}
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Submitted Date
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {formatDate(formDetail.submittedDate)}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Approved Date
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {formatDate(formDetail.approvedDate)}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                {formDetail.cancelReason && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Cancel Reason
                                        </Typography>
                                        <Typography variant="body1" fontWeight={500}>
                                            {formDetail.cancelReason}
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>

                            {/* Form Content */}
                            {formDetail.content && (
                                <Paper sx={{ p: 3, width: '100%' }}>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        Form Content
                                    </Typography>
                                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {formDetail.content}
                                    </Typography>
                                </Paper>
                            )}

                            {/* Action Buttons */}
                            <Paper sx={{ p: 3, width: '100%', bgcolor: '#f8f9fa' }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Actions
                                </Typography>
                                    <Stack direction="row" spacing={2} justifyContent="center">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            startIcon={<CheckCircleIcon />}
                                            onClick={() => handleProcessForm('approve')}
                                            disabled={isActionDisabled('approve')}
                                            sx={{ minWidth: 120 }}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<BlockIcon />}
                                            onClick={onRejectClick}
                                            disabled={isActionDisabled('reject')}
                                            sx={{ minWidth: 120 }}
                                        >
                                            Reject
                                        </Button>
                                        <ButtonCancel
                                            onClick={onClose}
                                            disabled={actionLoading}
                                        />
                                    </Stack>
                            </Paper>
                        </>
                    )}
            </DialogContent>
        </Dialog>
    );
}

export default function ProcessFormDetailWrapper({ open, onClose, formId, formData, selectedTermId }) {
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const handleProcessForm = async (action) => {
        try {
            setActionLoading(true);
            const payload = {
                id: parseInt(formId),
                action: action,
                cancelReason: action === 'cancel' ? cancelReason : (action === 'reject' ? rejectReason : '')
            };

            const response = await educationService.processForm(payload);
            
            if (response?.statusResponseCode?.toLowerCase() === 'ok') {
                setCancelDialogOpen(false);
                setRejectDialogOpen(false);
                setCancelReason('');
                setRejectReason('');
                onClose(); // Close the main dialog
            }
        } catch (err) {
            console.error('Failed to process form:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleCancelConfirm = () => {
        if (cancelReason.trim()) {
            handleProcessForm('cancel');
        }
    };

    const handleRejectConfirm = () => {
        if (rejectReason.trim()) {
            handleProcessForm('reject');
        }
    };

    return (
        <>
            <ProcessFormDetail 
                open={open} 
                onClose={onClose} 
                formId={formId}
                formData={formData}
                selectedTermId={selectedTermId}
                onCancelClick={() => setCancelDialogOpen(true)}
                onRejectClick={() => setRejectDialogOpen(true)}
            />
            
            {/* Cancel Reason Dialog */}
            <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Cancel Form</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Please provide a reason for cancelling this form:
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Cancel Reason"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonCancel
                        onClick={() => setCancelDialogOpen(false)}
                        disabled={actionLoading}
                    />
                    <Button
                        onClick={handleCancelConfirm}
                        variant="contained"
                        color="warning"
                        disabled={!cancelReason.trim() || actionLoading}
                    >
                        Confirm Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Reject Reason Dialog */}
            <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Reject Form</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Please provide a reason for rejecting this form:
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Reject Reason"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonCancel
                        onClick={() => setRejectDialogOpen(false)}
                        disabled={actionLoading}
                    />
                    <Button
                        onClick={handleRejectConfirm}
                        variant="contained"
                        color="error"
                        disabled={!rejectReason.trim() || actionLoading}
                    >
                        Confirm Reject
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
