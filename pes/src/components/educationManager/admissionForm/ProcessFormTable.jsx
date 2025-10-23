import React, { useEffect, useState } from 'react';
import {
    Box,
    Chip,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIcon from '@mui/icons-material/Assignment';
import educationService from '@services/EducationService.jsx';
import ProcessFormDetailWrapper from './ProcessFormDetail';
import { CustomDataTable, PageHeader } from '@components/templates';

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
    }, [selectedTermId]);

    const loadTermList = async () => {
        try {
            setTermLoading(true);
            const response = await educationService.getTerm();
            setTermList(response || []);
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

    const handleViewDetail = (row) => {
        setSelectedFormId(row.id);
        setSelectedFormData(row);
        setDetailDialogOpen(true);
    };

    const handleCloseDetail = () => {
        setDetailDialogOpen(false);
        setSelectedFormId(null);
        setSelectedFormData(null);
        if (selectedTermId) {
            loadProcessFormList();
        }
    };

    // Define table columns
    const columns = [
        {
            id: 'id',
            label: 'ID',
            minWidth: 80,
            sortable: true
        },
        {
            id: 'student.name',
            label: 'Student Name',
            minWidth: 170,
            sortable: true,
            render: (value) => value || 'N/A'
        },
        {
            id: 'parentAccount.name',
            label: 'Parent Name',
            minWidth: 170,
            sortable: true,
            render: (value) => value || 'N/A'
        },
        {
            id: 'parentAccount.email',
            label: 'Parent Email',
            minWidth: 200,
            sortable: true,
            render: (value) => value || 'N/A'
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 150,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Chip
                    label={value || 'Unknown'}
                    color={getStatusColor(value)}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            )
        },
        {
            id: 'submittedDate',
            label: 'Submitted Date',
            minWidth: 150,
            sortable: true,
            render: (value) => formatDate(value)
        }
    ];

    // Render action buttons for each row
    const renderActions = (row) => (
        <Tooltip title="View Details">
            <IconButton
                color="primary"
                onClick={() => handleViewDetail(row)}
                size="small"
                sx={{
                    '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'white',
                        transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s'
                }}
            >
                <VisibilityIcon />
            </IconButton>
        </Tooltip>
    );

    return (
        <Box>
            {/* Page Header */}
            <PageHeader
                title="Process Forms"
                subtitle="Manage and review student admission forms"
                icon={<AssignmentIcon sx={{ fontSize: 32, color: 'white' }} />}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Education Management' },
                    { label: 'Process Forms' }
                ]}
            >
                {/* Term Filter in Header */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                    <FormControl sx={{ minWidth: 300 }} size="small">
                        <InputLabel sx={{ color: 'white' }}>Select Term</InputLabel>
                        <Select
                            value={selectedTermId}
                            label="Select Term"
                            onChange={(e) => setSelectedTermId(e.target.value)}
                            disabled={termLoading}
                            sx={{
                                color: 'white',
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.8)'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white'
                                },
                                '.MuiSvgIcon-root': {
                                    color: 'white'
                                }
                            }}
                        >
                            {termList.map((term) => (
                                <MenuItem key={term.id} value={term.id.toString()}>
                                    {term.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </PageHeader>

            {/* Data Table */}
            <Box px={3}>
                <CustomDataTable
                    columns={columns}
                    rows={processFormList}
                    loading={loading}
                    emptyMessage="No process forms found for the selected term"
                    renderActions={renderActions}
                    onRowClick={handleViewDetail}
                    sortable={true}
                    defaultOrderBy="submittedDate"
                    defaultOrder="desc"
                    sx={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        borderRadius: 2
                    }}
                />
            </Box>
            
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
