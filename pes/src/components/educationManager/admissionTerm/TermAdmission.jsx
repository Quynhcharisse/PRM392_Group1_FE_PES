import React, { useEffect, useState } from 'react';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import educationService from '@services/EducationService.jsx';
import CreateTermDialog from './CreateTermDialog.jsx';
import TermDetail from './TermDetail.jsx';
import { CustomDataTable, PageHeader } from '@components/templates';
import dayjs from 'dayjs';

export default function TermAdmission() {
    const [terms, setTerms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedTerm, setSelectedTerm] = useState(null);

    const loadTerms = async () => {
        setLoading(true);
        try {
            const res = await educationService.getTermList();
            if (res?.statusResponseCode?.toLowerCase?.() === 'ok') {
                setTerms(res?.data || []);
            } else {
                setError(res?.message || "Failed to load terms");
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to load terms");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTerms();
    }, []);

    const handleView = (term) => {
        setSelectedTerm(term);
        setDetailDialogOpen(true);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return dayjs(dateString).format('DD/MM/YYYY');
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
            id: 'academicYear',
            label: 'Academic Year',
            minWidth: 150,
            sortable: true
        },
        {
            id: 'startDate',
            label: 'Start Date',
            minWidth: 130,
            sortable: true,
            render: (value) => formatDate(value)
        },
        {
            id: 'endDate',
            label: 'End Date',
            minWidth: 130,
            sortable: true,
            render: (value) => formatDate(value)
        },
        {
            id: 'currentRegisteredStudents',
            label: 'Registered',
            minWidth: 150,
            align: 'center',
            render: (value, row) => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <strong>{value || 0}</strong>
                    <span style={{ color: '#666' }}>/</span>
                    <span>{row.maxNumberRegistration || 0}</span>
                </Box>
            )
        },
        {
            id: 'numberOfClasses',
            label: 'Classes',
            minWidth: 100,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Chip
                    label={value || 0}
                    size="small"
                    color="info"
                    sx={{ fontWeight: 600 }}
                />
            )
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 120,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Chip
                    label={String(value || 'active').charAt(0).toUpperCase() + String(value || 'active').slice(1)}
                    color={value === 'active' ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            )
        }
    ];

    // Render action buttons for each row
    const renderActions = (row) => (
        <Tooltip title="View Details">
            <IconButton
                color="primary"
                onClick={() => handleView(row)}
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
                title="Admission Terms"
                subtitle="Manage enrollment periods and class assignments"
                icon={<EventIcon sx={{ fontSize: 32, color: 'white' }} />}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Education Management' },
                    { label: 'Admission Terms' }
                ]}
                actions={[
                    {
                        label: 'Create Term',
                        onClick: () => setCreateDialogOpen(true),
                        variant: 'contained',
                        icon: <AddIcon />
                    }
                ]}
                badge={`${terms.length} Total`}
            />

            {/* Data Table */}
            <Box px={3}>
                <CustomDataTable
                    columns={columns}
                    rows={terms}
                    loading={loading}
                    emptyMessage="No admission terms found. Create your first term to get started."
                    renderActions={renderActions}
                    onRowClick={handleView}
                    sortable={true}
                    defaultOrderBy="startDate"
                    defaultOrder="desc"
                    sx={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        borderRadius: 2
                    }}
                />
            </Box>

            {/* Dialogs */}
            <CreateTermDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSuccess={loadTerms}
            />
            <TermDetail
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                term={selectedTerm}
            />
        </Box>
    );
}
