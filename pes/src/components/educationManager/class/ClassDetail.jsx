import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, CircularProgress, Card, CardContent, Avatar, Stack, Button } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import educationService from '@services/EducationService.jsx';

export default function ClassDetail({ classData: propClassData }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    let initialClassData = propClassData;
    if (!initialClassData && location.state && location.state.classData) {
        initialClassData = location.state.classData;
    }
    const [classData, setClassData] = useState(initialClassData || null);
    const [loading, setLoading] = useState(!initialClassData);
    const [error, setError] = useState("");

    useEffect(() => {
        if (classData) return;
        if (!id) return;
        setLoading(true);
        educationService.getClassDetail(id)
            .then(res => {
                if (res?.statusResponseCode?.toLowerCase?.() === 'ok' || res?.status === 'ok') {
                    setClassData(res.data || res);
                } else {
                    setError(res?.message || 'Failed to load class detail');
                }
            })
            .catch(err => setError(err?.response?.data?.message || err?.message || 'Failed to load class detail'))
            .finally(() => setLoading(false));
    }, [id, classData]);

    if (loading) return <Box p={4} textAlign="center"><CircularProgress /></Box>;
    if (error) return <Box p={4} color="#c62828">{error}</Box>;
    if (!classData) return null;
    return (
        <Box minHeight="70vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#f7fbff">
            <Card sx={{ maxWidth: 500, width: '100%', mt: 6, boxShadow: 4, borderRadius: 4, p: 2 }}>
                <Stack direction="column" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: '#8bd17c', width: 72, height: 72 }}>
                        <SchoolIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" fontWeight={700} color="#1976d2" gutterBottom>
                        Class Information
                    </Typography>
                    <CardContent sx={{ width: '100%' }}>
                        <Stack spacing={2}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle2">ID:</Typography>
                                <Typography variant="body1">{classData.id}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle2">Name:</Typography>
                                <Typography variant="body1">{classData.name}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle2">Students:</Typography>
                                <Typography variant="body1">{classData.numberStudent}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle2">Academic Year:</Typography>
                                <Typography variant="body1">{classData.academicYear}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle2">Weeks:</Typography>
                                <Typography variant="body1">{classData.numberOfWeeks}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle2">Status:</Typography>
                                <Chip label={String(classData.status).charAt(0).toUpperCase() + String(classData.status).slice(1)} color={classData.status === 'active' ? 'success' : 'default'} />
                            </Stack>
                        </Stack>
                    </CardContent>
                    <Button variant="contained" color="primary" sx={{ mt: 2, borderRadius: 2 }} onClick={() => navigate('/education/classes')}>
                        Back to Class List
                    </Button>
                </Stack>
            </Card>
        </Box>
    );
}
