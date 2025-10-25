import React, { useState } from 'react';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CreateSyllabusDialog from './CreateSyllabusDialog.jsx';
import UpdateSyllabusPopUp from './UpdateSyllabusPopUp.jsx';
import { PageHeader, CustomDataTable } from '@components/templates';
import educationService from '@services/EducationService.jsx';

export default function Syllabus() {
    const [syllabuses, setSyllabuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openCreate, setOpenCreate] = useState(false);
    const [editing, setEditing] = useState(null);
    const [viewing, setViewing] = useState(null);

    React.useEffect(() => {
        loadSyllabuses();
    }, []);

    const loadSyllabuses = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await educationService.getSyllabuses();
            setSyllabuses(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err?.message || 'Failed to load syllabuses');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSuccess = () => {
        setOpenCreate(false);
        loadSyllabuses();
    };

    const handleUpdateSuccess = () => {
        setEditing(null);
        loadSyllabuses();
    };

    // Format currency
    const formatCurrency = (amount) => {
        if (!amount) return 'N/A';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // Define table columns
    const columns = [
        {
            id: 'id',
            label: 'ID',
            minWidth: 70,
            sortable: true
        },
        {
            id: 'name',
            label: 'Syllabus Name',
            minWidth: 200,
            sortable: true,
            render: (value) => (
                <Box sx={{ fontWeight: 600, color: '#1976d2' }}>{value}</Box>
            )
        },
        {
            id: 'description',
            label: 'Description',
            minWidth: 250,
            sortable: false,
            render: (value) => (
                <Box sx={{ 
                    maxWidth: 250, 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {value || 'N/A'}
                </Box>
            )
        },
        {
            id: 'cost',
            label: 'Cost',
            minWidth: 140,
            align: 'right',
            sortable: true,
            render: (value) => (
                <Box sx={{ fontWeight: 600, color: '#d32f2f' }}>
                    {formatCurrency(value)}
                </Box>
            )
        },
        {
            id: 'hoursOfSyllabus',
            label: 'Hours',
            minWidth: 100,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Chip
                    label={`${value || 0}h`}
                    size="small"
                    color="info"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            )
        },
        {
            id: 'isActive',
            label: 'Status',
            minWidth: 120,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Chip
                    label={value === 'true' ? 'Active' : 'Inactive'}
                    color={value === 'true' ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            )
        }
    ];

    // Render action buttons
    const renderActions = (row) => (
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
            <Tooltip title="Edit">
                <IconButton
                    color="info"
                    onClick={() => setEditing(row)}
                    size="small"
                    sx={{
                        '&:hover': {
                            bgcolor: 'info.light',
                            color: 'white',
                            transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s'
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="View Details">
                <IconButton
                    color="primary"
                    onClick={() => setViewing(row)}
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
                    <VisibilityIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    );

    return (
        <Box>
            {/* Page Header */}
            <PageHeader
                title="Syllabus Management"
                subtitle="Manage educational programs and curriculum"
                icon={<MenuBookIcon sx={{ fontSize: 32, color: 'white' }} />}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Education Management' },
                    { label: 'Syllabus' }
                ]}
                actions={[
                    {
                        label: 'Create Syllabus',
                        onClick: () => setOpenCreate(true),
                        variant: 'contained',
                        icon: <AddIcon />
                    }
                ]}
                badge={`${syllabuses.length} Total`}
            />

            {/* Data Table */}
            <Box px={3}>
                <CustomDataTable
                    columns={columns}
                    rows={syllabuses}
                    loading={loading}
                    emptyMessage="No syllabuses found. Create your first syllabus to get started."
                    renderActions={renderActions}
                    sortable={true}
                    defaultOrderBy="id"
                    defaultOrder="asc"
                    sx={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        borderRadius: 2
                    }}
                />
            </Box>

            {/* Dialogs */}
            <CreateSyllabusDialog
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreated={handleCreateSuccess}
            />

            <UpdateSyllabusPopUp
                open={Boolean(editing)}
                syllabus={editing}
                onClose={() => setEditing(null)}
                onUpdated={handleUpdateSuccess}
            />

            {/* View Detail Dialog */}
            {viewing && (
                <ViewSyllabusDialog
                    open={Boolean(viewing)}
                    syllabus={viewing}
                    onClose={() => setViewing(null)}
                />
            )}
        </Box>
    );
}

// View Detail Dialog Component
function ViewSyllabusDialog({ open, syllabus, onClose }) {
    const formatCurrency = (amount) => {
        if (!amount) return 'N/A';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    return (
        <Box
            component="div"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0,0,0,0.5)',
                display: open ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1300
            }}
            onClick={onClose}
        >
            <Box
                sx={{
                    bgcolor: 'white',
                    borderRadius: 3,
                    p: 4,
                    maxWidth: 600,
                    width: '90%',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Box sx={{ mb: 3, borderBottom: '2px solid #1976d2', pb: 2 }}>
                    <Box sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#1976d2' }}>
                        Syllabus Details
                    </Box>
                    <Box sx={{ fontSize: '0.875rem', color: 'text.secondary', mt: 0.5 }}>
                        View syllabus information
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Box sx={{ display: 'flex', p: 2, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                        <Box sx={{ fontWeight: 600, minWidth: 120, color: 'text.secondary' }}>Name:</Box>
                        <Box sx={{ fontWeight: 600, color: '#1976d2' }}>{syllabus?.name}</Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                        <Box sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>Description:</Box>
                        <Box sx={{ fontWeight: 500 }}>{syllabus?.description || 'N/A'}</Box>
                    </Box>

                    <Box sx={{ display: 'flex', p: 2, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                        <Box sx={{ fontWeight: 600, minWidth: 120, color: 'text.secondary' }}>Cost:</Box>
                        <Box sx={{ fontWeight: 700, color: '#d32f2f' }}>{formatCurrency(syllabus?.cost)}</Box>
                    </Box>

                    <Box sx={{ display: 'flex', p: 2, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                        <Box sx={{ fontWeight: 600, minWidth: 120, color: 'text.secondary' }}>Hours:</Box>
                        <Box sx={{ fontWeight: 500 }}>{syllabus?.hoursOfSyllabus || 'N/A'} hours</Box>
                    </Box>

                    <Box sx={{ display: 'flex', p: 2, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                        <Box sx={{ fontWeight: 600, minWidth: 120, color: 'text.secondary' }}>Status:</Box>
                        <Chip
                            label={syllabus?.isActive === 'true' ? 'Active' : 'Inactive'}
                            color={syllabus?.isActive === 'true' ? 'success' : 'default'}
                            size="small"
                            sx={{ fontWeight: 600 }}
                        />
                    </Box>
                </Box>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Box
                        component="button"
                        onClick={onClose}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            border: 'none',
                            bgcolor: '#1976d2',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            '&:hover': {
                                bgcolor: '#1565c0'
                            }
                        }}
                    >
                        Close
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
