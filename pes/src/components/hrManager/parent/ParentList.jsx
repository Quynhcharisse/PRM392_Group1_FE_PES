import React, { useEffect, useState } from 'react';
import { Box, Chip, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import ExportParent from './ExportParent.jsx';
import ParentDetail from './ParentDetail.jsx';
import { HRService } from '@services/HRService.jsx';
import { CustomDataTable, PageHeader } from '@components/templates';

export default function ParentList() {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openExport, setOpenExport] = useState(false);
    const [viewParent, setViewParent] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
        loadParents();
    }, []);

  const loadParents = async () => {
    try {
            setLoading(true);
            setError('');
            const response = await HRService.getParentList();
      
      if (response.success) {
                setParents(response.data || []);
      } else {
                setError(response.error || 'Failed to load parents');
      }
    } catch (error) {
            setError('Failed to load parents');
    } finally {
            setLoading(false);
    }
    };

  const handleBanParent = async (parent) => {
        if (actionLoading) return;
    
    try {
            setActionLoading(true);
            const response = await HRService.banAccount(parent.id);
      
      if (response.success) {
        setSnackbar({
          open: true,
          message: `${parent.name} has been banned successfully`,
          severity: 'success'
                });
        
        setParents(prevParents => 
          prevParents.map(p => 
            p.id === parent.id ? { ...p, status: 'ACCOUNT_INACTIVE' } : p
          )
                );
      } else {
        setSnackbar({
          open: true,
          message: response.error || 'Failed to ban parent',
          severity: 'error'
                });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to ban parent. Please try again.',
        severity: 'error'
            });
    } finally {
            setActionLoading(false);
    }
    };

  const handleUnbanParent = async (parent) => {
        if (actionLoading) return;
    
    try {
            setActionLoading(true);
            const response = await HRService.unbanAccount(parent.id);
      
      if (response.success) {
        setSnackbar({
          open: true,
          message: `${parent.name} has been unbanned successfully`,
          severity: 'success'
                });
        
        setParents(prevParents => 
          prevParents.map(p => 
            p.id === parent.id ? { ...p, status: 'ACCOUNT_ACTIVE' } : p
          )
                );
      } else {
        setSnackbar({
          open: true,
          message: response.error || 'Failed to unban parent',
          severity: 'error'
                });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to unban parent. Please try again.',
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
            label: 'Parent Name',
            minWidth: 200,
            sortable: true,
            render: (value) => (
                <Box sx={{ fontWeight: 600, color: '#4caf50' }}>{value || 'N/A'}</Box>
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
                    label={value || 'PARENT'}
                    size="small"
                    color="success"
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
                        onClick={() => setViewParent(row)}
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
                            onClick={() => handleUnbanParent(row)}
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
                            onClick={() => handleBanParent(row)}
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
                title="Parent Management"
                subtitle="Manage parent accounts and information"
                icon={<FamilyRestroomIcon sx={{ fontSize: 32, color: 'white' }} />}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'HR Management' },
                    { label: 'Parents' }
                ]}
                actions={[
                    {
                        label: 'Export',
                        onClick: () => setOpenExport(true),
                        variant: 'outlined',
                        icon: <FileDownloadIcon />
                    }
                ]}
                badge={`${parents.length} Total`}
            />

            {/* Data Table */}
            <Box px={3}>
                <CustomDataTable
                    columns={columns}
                    rows={parents}
                    loading={loading}
                    emptyMessage="No parents found."
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
            <ExportParent open={openExport} onClose={() => setOpenExport(false)} />
            <ParentDetail
                open={!!viewParent}
                parent={viewParent}
                onClose={() => setViewParent(null)}
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
