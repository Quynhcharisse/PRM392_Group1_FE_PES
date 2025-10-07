import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, CircularProgress, Card, Avatar, Stack, Button, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
                // Set first week as default selection if available
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

    // Load week list when classData is available
    useEffect(() => {
        if (classData && classData.id) {
            loadWeekList(classData.id);
        }
    }, [classData]);

    // Load activity list when selectedWeek changes
    useEffect(() => {
        if (selectedWeek) {
            loadActivityList(selectedWeek);
        }
    }, [selectedWeek]);


    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Helper function to format week display text
    const formatWeekDisplay = (week) => {
        const startDate = formatDate(week.startDate);
        const endDate = formatDate(week.endDate);
        return `${week.weekName} (${startDate} - ${endDate})`;
    };

    // Helper function to generate time slots
    const generateTimeSlots = () => {
        return [
            "07:00-08:00",
            "08:00-09:00", 
            "09:00-10:00",
            "14:00-15:00",
            "15:00-16:00"
        ];
    };

    // Helper function to get days of week
    const getDaysOfWeek = () => {
        return ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
    };

    // Helper function to check if activity exists for specific day and time
    const getActivityForSlot = (day, timeSlot) => {
        const [startTime, endTime] = timeSlot.split('-');
        const expectedStartTime = `${startTime}:00`;
        const expectedEndTime = `${endTime}:00`;
        
        // Find activity that matches day and time
        const foundActivity = activityList.find(activity => {
            // Convert both to lowercase for case-insensitive comparison
            const dayMatch = activity.dayOfWeek.toLowerCase() === day.toLowerCase();
            const startTimeMatch = activity.startTime === expectedStartTime;
            const endTimeMatch = activity.endTime === expectedEndTime;
            
            return dayMatch && startTimeMatch && endTimeMatch;
        });
        
        return foundActivity;
    };

    // Helper function to get activity name for display
    const getActivityName = (day, timeSlot) => {
        const activity = getActivityForSlot(day, timeSlot);
        return activity ? activity.name : null;
    };

    // Helper function to get date for a specific day
    const getDateForDay = (day) => {
        const activity = activityList.find(activity => 
            activity.dayOfWeek.toLowerCase() === day.toLowerCase()
        );
        return activity ? activity.date : null;
    };

    // Helper function to get all dates for the week
    const getWeekDates = () => {
        if (activityList.length === 0) return {};
        
        // Get the first activity date to determine the week
        const firstActivity = activityList[0];
        const startDate = new Date(firstActivity.date);
        
        // Calculate the start of the week (Monday)
        const dayOfWeek = startDate.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Sunday = 0, Monday = 1
        const mondayDate = new Date(startDate);
        mondayDate.setDate(startDate.getDate() + mondayOffset);
        
        // Generate dates for the week
        const weekDates = {};
        const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
        
        dayNames.forEach((dayName, index) => {
            const date = new Date(mondayDate);
            date.setDate(mondayDate.getDate() + index);
            weekDates[dayName] = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        });
        
        return weekDates;
    };

    // Helper function to format date for display
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };


    if (loading) return <Box p={4} textAlign="center"><CircularProgress /></Box>;
    if (error) return <Box p={4} color="#c62828">{error}</Box>;
    if (!classData) return null;
    return (
        <Box minHeight="80vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#f7fbff" p={3} position="relative">
            <Button 
                variant="contained" 
                color="primary" 
                sx={{ 
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    borderRadius: 3, 
                    px: 3,
                    py: 1,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 3,
                    zIndex: 10,
                    '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease'
                    }
                }} 
                onClick={() => navigate('/education/classes')}
            >
                Back to Class List
            </Button>
            <Card sx={{ 
                maxWidth: 1200, 
                width: '100%', 
                minHeight: 600,
                mt: 4, 
                boxShadow: 6, 
                borderRadius: 6, 
                p: 4,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }}>
                <Stack direction="column" alignItems="center" spacing={3}>
                    <Avatar sx={{ 
                        bgcolor: '#8bd17c', 
                        width: 90, 
                        height: 90,
                        boxShadow: 3,
                        border: '4px solid #ffffff'
                    }}>
                        <SchoolIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h4" fontWeight={700} color="#1976d2" gutterBottom sx={{ textAlign: 'center' }}>
                        Class Information
                    </Typography>
                    <Stack spacing={3} sx={{ width: '100%', px: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Box sx={{ 
                                    p: 2, 
                                    borderRadius: 2, 
                                    bgcolor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    flex: 2
                                }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle1" fontWeight={600} color="#424242">Name:</Typography>
                                        <Typography variant="body1" fontWeight={500} color="#424242" sx={{ maxWidth: '60%', textAlign: 'right' }}>
                                            {classData.name}
                                        </Typography>
                                    </Stack>
                                </Box>

                                <Box sx={{ 
                                    p: 2, 
                                    borderRadius: 2, 
                                    bgcolor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    flex: 1
                                }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle1" fontWeight={600} color="#424242">Academic Year:</Typography>
                                        <Typography variant="h6" fontWeight={700} color="#1976d2">{classData.academicYear}</Typography>
                                    </Stack>
                                </Box>

                                <Box sx={{ 
                                    p: 2, 
                                    borderRadius: 2, 
                                    bgcolor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    flex: 1
                                }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle1" fontWeight={600} color="#424242">Status:</Typography>
                                        <Chip 
                                            label={String(classData.status).charAt(0).toUpperCase() + String(classData.status).slice(1)} 
                                            color={classData.status === 'active' ? 'success' : 'default'}
                                            sx={{ 
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                height: 32,
                                                px: 2
                                            }} 
                                        />
                            </Stack>
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Box sx={{ 
                                    p: 2, 
                                    borderRadius: 2, 
                                    bgcolor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    flex: 1
                                }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="subtitle1" fontWeight={600} color="#424242">Students:</Typography>
                                        <Typography variant="h6" fontWeight={700} color="#2e7d32">{classData.numberStudent}</Typography>
                            </Stack>
                                </Box>

                                <Box sx={{ 
                                    p: 2, 
                                    borderRadius: 2, 
                                    bgcolor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    flex: 2
                                }}>
                                    <Stack direction="column" spacing={2}>
                                        <Typography variant="subtitle1" fontWeight={600} color="#424242">Weeks:</Typography>
                                        <FormControl fullWidth>
                                            <InputLabel>Select Week</InputLabel>
                                        <Select
                                            value={selectedWeek || ""}
                                            onChange={(e) => setSelectedWeek(e.target.value)}
                                            label="Select Week"
                                            disabled={weekLoading || weekList.length === 0}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    backgroundColor: '#ffffff'
                                                }
                                            }}
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
                            </Stack>
                                </Box>
                            </Stack>

                            {/* Schedule Table */}
                            {selectedWeek && (
                                <Box sx={{ 
                                    mt: 3,
                                    p: 2, 
                                    borderRadius: 2, 
                                    bgcolor: '#f5f5f5',
                                    border: '1px solid #e0e0e0'
                                }}>
                                    <Typography variant="h6" fontWeight={600} color="#424242" sx={{ mb: 2 }}>
                                        Weekly Schedule
                                    </Typography>
                                    
                                    {activityLoading ? (
                                        <Box display="flex" justifyContent="center" p={3}>
                                            <CircularProgress />
                                            <Typography variant="body2" sx={{ ml: 2 }}>Loading schedule...</Typography>
                                        </Box>
                                    ) : (
                                        <TableContainer component={Paper} sx={{ 
                                            bgcolor: '#e8f5e8',
                                            border: '2px solid #000',
                                            borderRadius: 1
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
                                                            const dateForDay = weekDates[day] || getDateForDay(day);
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
                                </Box>
                            )}
                            </Stack>
                </Stack>
            </Card>
        </Box>
    );
}
