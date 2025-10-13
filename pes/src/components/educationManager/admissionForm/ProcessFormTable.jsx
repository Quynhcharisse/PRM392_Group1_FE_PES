import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import educationService from '@services/EducationService.jsx';
import ProcessFormDetailWrapper from './ProcessFormDetail';

export default function ProcessFormTable() {
    const [processFormList, setProcessFormList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [termList, setTermList] = useState([]);
    const [selectedTermId, setSelectedTermId] = useState('');
    const [termLoading, setTermLoading] = useState(false);
    const [selectedFormId, setSelectedFormId] = useState(null);
    const [selectedFormData, setSelectedFormData] = useState(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    useEffect(() => {
        loadTermList();
    }, []);

    useEffect(() => {
        if (selectedTermId) {
            loadProcessFormList();
        }
    }, [selectedTermId]); // eslint-disable-line react-hooks/exhaustive-deps

    const loadTermList = async () => {
        try {
            setTermLoading(true);
            const response = await educationService.getTerm();
            setTermList(response || []);
            // Auto select first term if available
            if (response && response.length > 0) {
                setSelectedTermId(response[0].id.toString());
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Failed to load term list');
        } finally {
            setTermLoading(false);
        }
    };

    const loadProcessFormList = async () => {
        if (!selectedTermId) return;
        
        try {
            setLoading(true);
            setError('');
            const response = await educationService.getProcessForm(parseInt(selectedTermId));
            setProcessFormList(response || []);
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Failed to load process forms');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'waiting_for_payment':
                return 'warning';
            case 'done':
                return 'success';
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
            year: 'numeric'
        });
    };

    const handleViewDetail = (formId) => {
        const formData = processFormList.find(form => form.id === formId);
        setSelectedFormId(formId);
        setSelectedFormData(formData);
        setDetailDialogOpen(true);
    };

    const handleCloseDetail = () => {
        setDetailDialogOpen(false);
        setSelectedFormId(null);
        setSelectedFormData(null);
        // Reload the form list to get updated data
        if (selectedTermId) {
            loadProcessFormList();
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Card>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Typography variant="h5" fontWeight={600}>
                            Process Form List
                        </Typography>
                        
                        <FormControl sx={{ minWidth: 300 }}>
                            <InputLabel>Select Term</InputLabel>
                            <Select
                                value={selectedTermId}
                                label="Select Term"
                                onChange={(e) => setSelectedTermId(e.target.value)}
                                disabled={termLoading}
                            >
                                {termList.map((term) => (
                                    <MenuItem key={term.id} value={term.id.toString()}>
                                        {term.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Student Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Parent Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Parent Email</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Submitted Date</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {processFormList.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                            <Typography variant="body1" color="text.secondary">
                                                No process forms found
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    processFormList.map((form) => (
                                        <TableRow key={form.id} hover>
                                            <TableCell>{form.id}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight={500}>
                                                    {form.student?.name || 'N/A'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {form.parentAccount?.name || 'N/A'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {form.parentAccount?.email || 'N/A'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={form.status || 'Unknown'}
                                                    color={getStatusColor(form.status)}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {formatDate(form.submittedDate)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleViewDetail(form.id)}
                                                    sx={{
                                                        '&:hover': {
                                                            bgcolor: 'primary.light',
                                                            color: 'white'
                                                        }
                                                    }}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            
            {/* Process Form Detail Dialog */}
            <ProcessFormDetailWrapper
                open={detailDialogOpen}
                onClose={handleCloseDetail}
                formId={selectedFormId}
                formData={selectedFormData}
                selectedTermId={selectedTermId}
            />
        </Box>
    );
}
