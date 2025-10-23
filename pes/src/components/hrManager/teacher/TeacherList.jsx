import React, { useEffect, useState } from 'react';
import { Box, Chip, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PersonIcon from '@mui/icons-material/Person';
import CreateTeacher from './CreateTeacher.jsx';
import ExportTeacher from './ExportTeacher.jsx';
import TeacherDetail from './TeacherDetail.jsx';
import { HRService } from '@services/HRService.jsx';
import { CustomDataTable, PageHeader } from '@components/templates';

export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openCreate, setOpenCreate] = useState(false);
    const [openExport, setOpenExport] = useState(false);
    const [viewTeacher, setViewTeacher] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        loadTeachers();
    }, []);

    const loadTeachers = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await HRService.getTeacherList();

            if (response.success) {
                setTeachers(response.data || []);
            } else {
                setError(response.error || 'Failed to load teachers');
            }
        } catch (error) {
            setError('Failed to load teachers');
        } finally {
            setLoading(false);
        }
    };

    const handleBanTeacher = async (teacher) => {
        if (actionLoading) return;

        try {
            setActionLoading(true);
            const response = await HRService.banAccount(teacher.id);

            if (response.success) {
                setSnackbar({
                    open: true,
                    message: `${teacher.name} has been banned successfully`,
                    severity: 'success'
                });

                setTeachers(prevTeachers =>
                    prevTeachers.map(t =>
                        t.id === teacher.id ? { ...t, status: 'ACCOUNT_INACTIVE' } : t
                    )
                );
            } else {
                setSnackbar({
                    open: true,
                    message: response.error || 'Failed to ban teacher',
                    severity: 'error'
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to ban teacher. Please try again.',
                severity: 'error'
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleUnbanTeacher = async (teacher) => {
        if (actionLoading) return;

        try {
            setActionLoading(true);
            const response = await HRService.unbanAccount(teacher.id);

            if (response.success) {
                setSnackbar({
                    open: true,
                    message: `${teacher.name} has been unbanned successfully`,
                    severity: 'success'
                });

                setTeachers(prevTeachers =>
                    prevTeachers.map(t =>
                        t.id === teacher.id ? { ...t, status: 'ACCOUNT_ACTIVE' } : t
                    )
                );
            } else {
                setSnackbar({
                    open: true,
                    message: response.error || 'Failed to unban teacher',
                    severity: 'error'
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to unban teacher. Please try again.',
                severity: 'error'
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACCOUNT_ACTIVE': return 'success';
            case 'ACCOUNT_INACTIVE': return 'error';
            case 'PENDING': return 'warning';
            default: return 'default';
        }
    };

    const getStatusLabel = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACCOUNT_ACTIVE': return 'Active';
            case 'ACCOUNT_INACTIVE': return 'Banned';
            case 'PENDING': return 'Pending';
            default: return status || 'Unknown';
        }
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
            label: 'Teacher Name',
            minWidth: 200,
            sortable: true,
            render: (value) => (
                <Box sx={{ fontWeight: 600, color: '#1976d2' }}>{value || 'N/A'}</Box>
            )
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 200,
            sortable: true,
            render: (value) => value || 'N/A'
        },
        {
            id: 'phone',
            label: 'Phone',
            minWidth: 130,
            sortable: true,
            render: (value) => value || 'N/A'
        },
        {
            id: 'gender',
            label: 'Gender',
            minWidth: 100,
            align: 'center',
            sortable: true,
            render: (value) => value || 'N/A'
        },
        {
            id: 'role',
            label: 'Role',
            minWidth: 120,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Chip
                    label={value || 'TEACHER'}
                    size="small"
                    color="info"
                    variant="outlined"
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
                    label={getStatusLabel(value)}
                    color={getStatusColor(value)}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            )
        }
    ];

    // Render action buttons
    const renderActions = (row) => {
        const isBanned = row.status === 'ACCOUNT_INACTIVE';

        return (
            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                <Tooltip title="View Details">
                    <IconButton
                        color="primary"
                        onClick={() => setViewTeacher(row)}
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

                {isBanned ? (
                    <Tooltip title="Unban Account">
                        <IconButton
                            onClick={() => handleUnbanTeacher(row)}
                            disabled={actionLoading}
                            size="small"
                            sx={{
                                color: '#22c55e',
                                '&:hover': {
                                    bgcolor: 'rgba(34, 197, 94, 0.1)',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s'
                            }}
                        >
                            <RemoveCircleIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Ban Account">
                        <IconButton
                            onClick={() => handleBanTeacher(row)}
                            disabled={actionLoading}
                            size="small"
                            sx={{
                                color: '#ef4444',
                                '&:hover': {
                                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s'
                            }}
                        >
                            <BlockIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        );
    };

    return (
        <Box>
            {/* Page Header */}
            <PageHeader
                title="Teacher Management"
                subtitle="Manage teacher accounts and information"
                icon={<PersonIcon sx={{ fontSize: 32, color: 'white' }} />}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'HR Management' },
                    { label: 'Teachers' }
                ]}
                actions={[
                    {
                        label: 'Export',
                        onClick: () => setOpenExport(true),
                        variant: 'outlined',
                        icon: <FileDownloadIcon />
                    },
                    {
                        label: 'Add Teacher',
                        onClick: () => setOpenCreate(true),
                        variant: 'contained',
                        icon: <AddIcon />
                    }
                ]}
                badge={`${teachers.length} Total`}
            />

            {/* Data Table */}
            <Box px={3}>
                <CustomDataTable
                    columns={columns}
                    rows={teachers}
                    loading={loading}
                    emptyMessage="No teachers found. Add your first teacher to get started."
                    renderActions={renderActions}
                    sortable={true}
                    defaultOrderBy="name"
                    defaultOrder="asc"
                    sx={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        borderRadius: 2
                    }}
                />
            </Box>

            {/* Dialogs */}
            <CreateTeacher
                open={openCreate}
                onClose={() => {
                    setOpenCreate(false);
                    loadTeachers();
                }}
            />
            <ExportTeacher open={openExport} onClose={() => setOpenExport(false)} />
            <TeacherDetail
                open={!!viewTeacher}
                teacherId={viewTeacher?.id}
                onClose={() => setViewTeacher(null)}
            />

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{
                        width: '100%',
                        borderRadius: 2,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
