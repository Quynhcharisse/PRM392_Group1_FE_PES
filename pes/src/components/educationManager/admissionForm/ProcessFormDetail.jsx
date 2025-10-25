import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import educationService from '@services/EducationService.jsx';
import ButtonCancel from '@components/customButton/ButtonCancel.jsx';

function ProcessFormDetail({open, onClose, formId, formData, onRejectClick}) {
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
                <CircularProgress/>
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
                    borderRadius: 2,
                    maxHeight: '90vh',
                    background: '#ffffff',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    border: '1px solid #e0e0e0'
                }
            }}
        >
            <DialogTitle sx={{
                textAlign: 'center',
                pb: 2,
                pt: 3,
                background: '#1976d2',
                color: 'white'
            }}>
                <Typography variant="h5" fontWeight={600}>
                    Process Form Detail
                </Typography>
                <Typography variant="body2" sx={{
                    mt: 1,
                    opacity: 0.9
                }}>
                    Review and manage enrollment application
                </Typography>
            </DialogTitle>

            <DialogContent sx={{
                p: 3,
                background: '#ffffff'
            }}>
                {error && (
                    <Alert severity="error" sx={{width: '100%', mb: 3}}>
                        {error}
                    </Alert>
                )}

                {successMessage && (
                    <Alert severity="success" sx={{width: '100%', mb: 3}}>
                        {successMessage}
                    </Alert>
                )}

                {formDetail && (
                    <>
                        {/* Form Information */}
                        <Paper sx={{
                            p: 3,
                            width: '100%',
                            background: '#ffffff',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e0e0e0',
                            mb: 3
                        }}>
                            <Typography variant="h6" fontWeight={600} sx={{
                                color: '#1976d2',
                                mb: 3,
                                borderBottom: '2px solid #e3f2fd',
                                pb: 1
                            }}>
                                Form Information
                            </Typography>
                            <Stack spacing={2}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'column' },
                                    gap: { xs: 2, sm: 4 }
                                }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 0.5}}>
                                            Student Name
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{color: '#333'}}>
                                            {formDetail.student?.name || 'N/A'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 0.5}}>
                                            Date of Birth
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{color: '#333'}}>
                                            {formatDate(formDetail.student?.dateOfBirth)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 0.5}}>
                                            Gender
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{color: '#333'}}>
                                            {formDetail.student?.gender || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Paper>

                        {/* Parent Information */}
                        <Paper sx={{
                            p: 3,
                            width: '100%',
                            background: '#ffffff',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e0e0e0',
                            mb: 3
                        }}>
                            <Typography variant="h6" fontWeight={600} sx={{
                                color: '#1976d2',
                                mb: 3,
                                borderBottom: '2px solid #e3f2fd',
                                pb: 1
                            }}>
                                Parent Information
                            </Typography>
                            <Stack spacing={2}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'column' },
                                    gap: { xs: 2, sm: 4 }
                                }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 0.5}}>
                                            Parent Name
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{color: '#333'}}>
                                            {formDetail.parentAccount?.name || 'N/A'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 0.5}}>
                                            Email
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{color: '#333'}}>
                                            {formDetail.parentAccount?.email || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'column' },
                                    gap: { xs: 2, sm: 4 }
                                }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 0.5}}>
                                            Phone
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{color: '#333'}}>
                                            {formDetail.parentAccount?.phone || 'N/A'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 0.5}}>
                                            Address
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} sx={{color: '#333'}}>
                                            {formDetail.parentAccount?.address || 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Paper>

                        {/* Status & Dates */}
                        <Paper sx={{
                            p: 3,
                            width: '100%',
                            background: '#ffffff',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e0e0e0',
                            mb: 3
                        }}>
                            <Typography variant="h6" fontWeight={600} sx={{
                                color: '#1976d2',
                                mb: 3,
                                borderBottom: '2px solid #e3f2fd',
                                pb: 1
                            }}>
                                Status & Dates
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'row'},
                                gap: 3
                            }}>

<Box sx={{
                                    flex: 1,
                                    p: 2,
                                    borderRadius: 1,
                                    background: '#f8f9fa',
                                    border: '1px solid #e0e0e0',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 1}}>
                                        Approved Date
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500} sx={{color: '#333'}}>
                                        {formatDate(formDetail.approvedDate)}
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    flex: 1,
                                    p: 2,
                                    borderRadius: 1,
                                    background: '#f8f9fa',
                                    border: '1px solid #e0e0e0',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 1}}>
                                        Submitted Date
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500} sx={{color: '#333'}}>
                                        {formatDate(formDetail.submittedDate)}
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    flex: 1,
                                    p: 2,
                                    borderRadius: 1,
                                    background: '#f8f9fa',
                                    border: '1px solid #e0e0e0',
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 1}}>
                                        Status
                                    </Typography>
                                    <Chip
                                        label={formDetail.status || 'Unknown'}
                                        color={getStatusColor(formDetail.status)}
                                        variant="filled"
                                        size="small"
                                    />
                                </Box>
                            </Box>

                            {formDetail.cancelReason && (
                                <Box sx={{
                                    mt: 2,
                                    p: 2,
                                    borderRadius: 1,
                                    background: '#ffebee',
                                    border: '1px solid #ffcdd2'
                                }}>
                                    <Typography variant="body2" color="text.secondary" sx={{fontWeight: 500, mb: 1}}>
                                        Cancel Reason
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500} sx={{color: '#d32f2f'}}>
                                        {formDetail.cancelReason}
                                    </Typography>
                                </Box>
                            )}
                        </Paper>

                        {/* Form Content */}
                        {formDetail.content && (
                            <Paper sx={{
                                p: 3,
                                width: '100%',
                                background: '#ffffff',
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e0e0e0',
                                mb: 3
                            }}>
                                <Typography variant="h6" fontWeight={600} sx={{
                                    color: '#1976d2',
                                    mb: 3,
                                    borderBottom: '2px solid #e3f2fd',
                                    pb: 1
                                }}>
                                    Form Content
                                </Typography>
                                <Box sx={{
                                    p: 2,
                                    borderRadius: 1,
                                    background: '#f8f9fa',
                                    border: '1px solid #e0e0e0',
                                    minHeight: '100px'
                                }}>
                                    <Typography variant="body1" sx={{
                                        whiteSpace: 'pre-wrap',
                                        lineHeight: 1.5,
                                        color: '#333'
                                    }}>
                                        {formDetail.content}
                                    </Typography>
                                </Box>
                            </Paper>
                        )}

                        {/* Action Buttons */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            mt: 3,
                            flexWrap: 'wrap'
                        }}>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleIcon/>}
                                onClick={() => handleProcessForm('approve')}
                                disabled={isActionDisabled('approve')}
                                sx={{
                                    minWidth: 120,
                                    height: 40,
                                    textTransform: 'none',
                                    fontWeight: 500
                                }}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<BlockIcon/>}
                                onClick={onRejectClick}
                                disabled={isActionDisabled('reject')}
                                sx={{
                                    minWidth: 120,
                                    height: 40,
                                    textTransform: 'none',
                                    fontWeight: 500
                                }}
                            >
                                Reject
                            </Button>
                            <ButtonCancel
                                onClick={onClose}
                                disabled={actionLoading}
                                sx={{
                                    minWidth: 120,
                                    height: 40,
                                    textTransform: 'none',
                                    fontWeight: 500
                                }}
                            />
                        </Box>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default function ProcessFormDetailWrapper({open, onClose, formId, formData, selectedTermId}) {
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
                        sx={{mt: 2}}
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
                        sx={{mt: 2}}
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
