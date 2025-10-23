import React, { useEffect, useState } from "react";
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';
import educationService from "@services/EducationService.jsx";
import { CustomDataTable, PageHeader } from '@components/templates';
import dayjs from 'dayjs';

export default function ClassList() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        setLoading(true);
        try {
            const res = await educationService.getClassList();
            if (res?.statusResponseCode?.toLowerCase?.() === "ok") {
                setClasses(res?.data || []);
            } else {
                setError(res?.message || "Failed to load classes");
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to load classes");
        } finally {
            setLoading(false);
        }
    };

    const handleViewClass = (classData) => {
        navigate(`/education/classes/${classData.id}`, { state: { classData } });
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return dayjs(dateString).format('DD/MM/YYYY');
    };

    // Helper function to format currency
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
            label: 'Class Name',
            minWidth: 200,
            sortable: true
        },
        {
            id: 'teacherName',
            label: 'Teacher',
            minWidth: 150,
            sortable: true,
            render: (value, row) => (
                <Box>
                    <Box sx={{ fontWeight: 500, color: '#1976d2' }}>{value || 'N/A'}</Box>
                    <Box sx={{ fontSize: '0.75rem', color: '#666' }}>{row.teacherEmail || 'N/A'}</Box>
                </Box>
            )
        },
        {
            id: 'numberStudent',
            label: 'Students',
            minWidth: 100,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Chip
                    label={value || 0}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600, minWidth: 50 }}
                />
            )
        },
        {
            id: 'academicYear',
            label: 'Academic Year',
            minWidth: 130,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Box sx={{ fontWeight: 600, color: '#5e35b1' }}>{value}</Box>
            )
        },
        {
            id: 'numberOfWeeks',
            label: 'Weeks',
            minWidth: 90,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Chip
                    label={value || 0}
                    size="small"
                    color="info"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                />
            )
        },
        {
            id: 'startDate',
            label: 'Start Date',
            minWidth: 120,
            sortable: true,
            render: (value) => formatDate(value)
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
            id: 'status',
            label: 'Status',
            minWidth: 120,
            align: 'center',
            sortable: true,
            render: (value) => (
                <Chip
                    label={value ? value.charAt(0).toUpperCase() + value.slice(1) : 'N/A'}
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
                onClick={() => handleViewClass(row)}
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
                title="Classes"
                subtitle="Manage class schedules, teachers, and students"
                icon={<SchoolIcon sx={{ fontSize: 32, color: 'white' }} />}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Education Management' },
                    { label: 'Classes' }
                ]}
                actions={[
                    {
                        label: 'Create Class',
                        onClick: () => navigate('/education/classes/create'),
                        variant: 'contained',
                        icon: <AddIcon />
                    }
                ]}
                badge={`${classes.length} Total`}
            />

            {/* Data Table */}
            <Box px={3}>
                <CustomDataTable
                    columns={columns}
                    rows={classes}
                    loading={loading}
                    emptyMessage="No classes found. Create your first class to get started."
                    renderActions={renderActions}
                    onRowClick={handleViewClass}
                    sortable={true}
                    defaultOrderBy="startDate"
                    defaultOrder="desc"
                    sx={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        borderRadius: 2
                    }}
                />
            </Box>
        </Box>
    );
}
