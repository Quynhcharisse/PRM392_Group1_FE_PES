import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    CircularProgress,
    Card,
    Avatar,
    Stack,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import educationService from '@services/EducationService.jsx';
import { PageHeader } from '@components/templates';

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
    const [weekList, setWeekList] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState("");
    const [weekLoading, setWeekLoading] = useState(false);
    const [activityList, setActivityList] = useState([]);
    const [activityLoading, setActivityLoading] = useState(false);

    // Function to load week list
    const loadWeekList = async (classId) => {
        if (!classId) return;
        setWeekLoading(true);
        try {
            const response = await educationService.viewWeekList(classId);
            if (response && Array.isArray(response)) {
                setWeekList(response);
                if (response.length > 0) {
                    setSelectedWeek(response[0].id.toString());
                }
            }
        } catch (err) {
            console.error('Failed to load week list:', err);
        } finally {
            setWeekLoading(false);
        }
    };

    // Function to load activity list
    const loadActivityList = async (scheduleId) => {
        if (!scheduleId) return;
        setActivityLoading(true);
        try {
            const response = await educationService.viewActivityList(scheduleId);
            if (response && Array.isArray(response)) {
                setActivityList(response);
            }
        } catch (err) {
            console.error('Failed to load activity list:', err);
        } finally {
            setActivityLoading(false);
        }
    };

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

    useEffect(() => {
        if (classData && classData.id) {
            loadWeekList(classData.id);
        }
    }, [classData]);

    useEffect(() => {
        if (selectedWeek) {
            loadActivityList(selectedWeek);
        }
    }, [selectedWeek]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatWeekDisplay = (week) => {
        const startDate = formatDate(week.startDate);
        const endDate = formatDate(week.endDate);
        return `${week.weekName} (${startDate} - ${endDate})`;
    };

    const generateTimeSlots = () => {
        return [
            "07:00-08:00",
            "08:00-09:00",
            "09:00-10:00",
            "14:00-15:00",
            "15:00-16:00"
        ];
    };

    const getDaysOfWeek = () => {
        return ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
    };

    const getActivityForSlot = (day, timeSlot) => {
        const [startTime, endTime] = timeSlot.split('-');
        const expectedStartTime = `${startTime}:00`;
        const expectedEndTime = `${endTime}:00`;
        
        const foundActivity = activityList.find(activity => {
            const dayMatch = activity.dayOfWeek.toLowerCase() === day.toLowerCase();
            const startTimeMatch = activity.startTime === expectedStartTime;
            const endTimeMatch = activity.endTime === expectedEndTime;
            
            return dayMatch && startTimeMatch && endTimeMatch;
        });
        
        return foundActivity;
    };

    const getActivityName = (day, timeSlot) => {
        const activity = getActivityForSlot(day, timeSlot);
        return activity ? activity.name : null;
    };

    const getWeekDates = () => {
        if (activityList.length === 0) return {};
        
        const firstActivity = activityList[0];
        const startDate = new Date(firstActivity.date);
        
        const dayOfWeek = startDate.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const mondayDate = new Date(startDate);
        mondayDate.setDate(startDate.getDate() + mondayOffset);
        
        const weekDates = {};
        const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
        
        dayNames.forEach((dayName, index) => {
            const date = new Date(mondayDate);
            date.setDate(mondayDate.getDate() + index);
            weekDates[dayName] = date.toISOString().split('T')[0];
        });
        
        return weekDates;
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
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
            <Box p={4} textAlign="center">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!classData) return null;

    return (
        <Box>
            {/* Page Header */}
            <PageHeader
                title={classData.name || "Class Details"}
                subtitle={
                    <Box>
                        <Typography variant="body1" sx={{ mb: 0.5 }}>
                            Academic Year: {classData.academicYear}
                        </Typography>
                        <Typography variant="body1">
                            {classData.numberStudent || 0} Students
                        </Typography>
                    </Box>
                }
                icon={<SchoolIcon sx={{ fontSize: 32, color: 'white' }} />}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Education Management' },
                    { label: 'Classes', href: '/education/classes' },
                    { label: classData.name || 'Detail' }
                ]}
                actions={[
                    {
                        label: 'Back to Classes',
                        onClick: () => navigate('/education/classes'),
                        variant: 'outlined',
                        icon: <ArrowBackIcon />
                    }
                ]}
                badge={
                    <Chip
                        label={String(classData.status).charAt(0).toUpperCase() + String(classData.status).slice(1)}
                        color={classData.status === 'active' ? 'success' : 'default'}
                        sx={{ bgcolor: 'rgba(255,255,255,0.9)', fontWeight: 600 }}
                    />
                }
            />

            {/* Content */}
            <Box px={3}>
                <Paper sx={{
                    p: 4,
                    background: '#ffffff',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e0e0e0'
                }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}>
                    {/* Class Information Cards */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 3
                    }}>
                        <Box sx={{ flex: 1 }}>
                            <Card sx={{ p: 3, height: '100%', boxShadow: 3, borderRadius: 2 }}>
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <CalendarMonthIcon color="primary" />
                                        <Typography variant="h6" fontWeight={600} color="primary">
                                            Class Information
                                        </Typography>
                                    </Stack>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                                        <Typography variant="body2" color="text.secondary">Start Date:</Typography>
                                        <Typography variant="body1" fontWeight={600}>{formatDate(classData.startDate)}</Typography>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                                        <Typography variant="body2" color="text.secondary">Number of Weeks:</Typography>
                                        <Chip label={classData.numberOfWeeks || 0} color="info" size="small" />
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                                        <Typography variant="body2" color="text.secondary">Cost:</Typography>
                                        <Typography variant="body1" fontWeight={700} color="error">
                                            {classData.cost ? new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(classData.cost) : 'N/A'}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Card>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Card sx={{ p: 3, height: '100%', boxShadow: 3, borderRadius: 2 }}>
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <PeopleIcon color="primary" />
                                        <Typography variant="h6" fontWeight={600} color="primary">
                                            Teacher Information
                                        </Typography>
                                    </Stack>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                                        <Typography variant="body2" color="text.secondary">Name:</Typography>
                                        <Typography variant="body1" fontWeight={600}>{classData.teacherName || 'N/A'}</Typography>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                                        <Typography variant="body2" color="text.secondary">Email:</Typography>
                                        <Typography variant="body1">{classData.teacherEmail || 'N/A'}</Typography>
                                    </Box>
                                </Stack>
                            </Card>
                        </Box>
                    </Box>

                    {/* Weekly Schedule with Week Selector */}
                    <Box>
                        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, width: '100%'}}>
                            <Typography variant="h6" fontWeight={600} color="primary" sx={{ mb: 3 }}>
                                Weekly Schedule
                            </Typography>
                            
                            {/* Week Selector */}
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Select Week</InputLabel>
                                <Select
                                    value={selectedWeek || ""}
                                    onChange={(e) => setSelectedWeek(e.target.value)}
                                    label="Select Week"
                                    disabled={weekLoading || weekList.length === 0}
                                >
                                    {weekLoading ? (
                                        <MenuItem disabled>
                                            <CircularProgress size={20} />
                                            <Typography variant="body2" sx={{ ml: 1 }}>Loading weeks...</Typography>
                                        </MenuItem>
                                    ) : weekList.length === 0 ? (
                                        <MenuItem disabled>No weeks available</MenuItem>
                                    ) : (
                                        weekList.map((week) => (
                                            <MenuItem key={week.id} value={week.id.toString()}>
                                                {formatWeekDisplay(week)}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>
                            
                            {/* Schedule Table */}
                            {selectedWeek && (
                                <>
                                    {activityLoading ? (
                                        <Box display="flex" justifyContent="center" p={3}>
                                            <CircularProgress />
                                            <Typography variant="body2" sx={{ ml: 2 }}>Loading schedule...</Typography>
                                        </Box>
                                    ) : (
                                    <TableContainer component={Paper} sx={{ 
                                        bgcolor: '#e8f5e8',
                                        border: '2px solid #000',
                                        borderRadius: 2
                                    }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ 
                                                        border: '1px solid #000',
                                                        bgcolor: '#e8f5e8',
                                                        fontWeight: 600,
                                                        textAlign: 'center'
                                                    }}></TableCell>
                                                    {getDaysOfWeek().map((day) => {
                                                        const weekDates = getWeekDates();
                                                        const dateForDay = weekDates[day];
                                                        const formattedDate = formatDateForDisplay(dateForDay);
                                                        
                                                        return (
                                                            <TableCell key={day} sx={{ 
                                                                border: '1px solid #000',
                                                                bgcolor: '#e8f5e8',
                                                                fontWeight: 600,
                                                                textAlign: 'center',
                                                                py: 2
                                                            }}>
                                                                <Stack direction="column" spacing={0.5}>
                                                                    <Typography variant="body2" fontWeight={600}>
                                                                        {day}
                                                                    </Typography>
                                                                    {formattedDate && (
                                                                        <Typography variant="caption" color="#666" fontWeight={500}>
                                                                            {formattedDate}
                                                                        </Typography>
                                                                    )}
                                                                </Stack>
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {generateTimeSlots().map((timeSlot) => (
                                                    <TableRow key={timeSlot}>
                                                        <TableCell sx={{ 
                                                            border: '1px solid #000',
                                                            bgcolor: '#e8f5e8',
                                                            fontWeight: 500,
                                                            textAlign: 'center'
                                                        }}>
                                                            {timeSlot}
                                                        </TableCell>
                                                        {getDaysOfWeek().map((day) => {
                                                            const activityName = getActivityName(day, timeSlot);
                                                            return (
                                                                <TableCell key={`${day}-${timeSlot}`} sx={{ 
                                                                    border: '1px solid #000',
                                                                    bgcolor: '#e8f5e8',
                                                                    textAlign: 'center',
                                                                    p: 1
                                                                }}>
                                                                    <Box sx={{
                                                                        bgcolor: '#ffffff',
                                                                        border: '1px solid #000',
                                                                        borderRadius: 1,
                                                                        p: 1,
                                                                        minHeight: 40,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'
                                                                    }}>
                                                                        {activityName ? (
                                                                            <Typography 
                                                                                variant="body2" 
                                                                                fontWeight={500} 
                                                                                sx={{ 
                                                                                    textAlign: 'center',
                                                                                    fontSize: '0.75rem',
                                                                                    lineHeight: 1.2,
                                                                                    wordBreak: 'break-word'
                                                                                }}
                                                                            >
                                                                                {activityName}
                                                                            </Typography>
                                                                        ) : (
                                                                            <Typography variant="h6" color="#666">
                                                                                +
                                                                            </Typography>
                                                                        )}
                                                                    </Box>
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    )}
                                </>
                            )}
                        </Card>
                    </Box>
                </Box>
                </Paper>
            </Box>
        </Box>
    );
}
