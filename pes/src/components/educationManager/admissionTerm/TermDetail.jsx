import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';
import ButtonClose from "@components/customButton/ButtonClose.jsx";

export default function TermDetail({open, onClose, term}) {
    if (!term) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return dayjs(dateString).format('DD/MM/YYYY');
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    borderRadius: 4,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 700,
                    color: '#1976d2',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    pt: 3,
                    pb: 2,
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f7ff 100%)',
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                    <EventIcon sx={{fontSize: 32, color: '#1976d2'}}/>
                    <Typography variant="h5" fontWeight={700}>Admission Term Details</Typography>
                </Stack>
            </DialogTitle>
            <Divider/>
            <DialogContent sx={{pt: 3, pb: 2}}>
                <Stack spacing={3}>
                    {/* Basic Information */}
                    <Box>
                        <Typography variant="h6"
                                    color="primary"
                                    sx={{mb: 2, display: 'flex', alignItems: 'center', gap: 1}}
                        >
                            <CalendarTodayIcon fontSize="small"/>
                            Basic Information
                        </Typography>
                        <Box container spacing={2}>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
                                <Typography variant="body2" color="text.secondary">Academic Year</Typography>
                                <Typography variant="body1" fontWeight={600}>{term.academicYear}</Typography>
                            </Box>

                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
                                <Typography variant="body2" color="text.secondary">Start Date</Typography>
                                <Typography variant="body1" fontWeight={600}>{formatDate(term.startDate)}</Typography>
                            </Box>

                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
                                <Typography variant="body2" color="text.secondary">End Date</Typography>
                                <Typography variant="body1" fontWeight={600}>{formatDate(term.endDate)}</Typography>
                            </Box>

                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
                                <Typography variant="body2" color="text.secondary">Status</Typography>
                                <Chip
                                    label={String(term.status || 'active').charAt(0).toUpperCase() + String(term.status || 'active').slice(1)}
                                    color={term.status === 'active' ? 'success' : 'default'}
                                    size="small"
                                    sx={{width: 'fit-content'}}
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Divider/>

                    {/* Registration Information */}
                    <Box>
                        <Typography variant="h6" color="primary"
                                    sx={{mb: 2, display: 'flex', alignItems: 'center', gap: 1}}>
                            <PeopleIcon fontSize="small"/>
                            Registration Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Card sx={{bgcolor: '#e3f2fd', borderRadius: 2, boxShadow: 1}}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Current Registered
                                        </Typography>
                                        <Typography variant="h4" color="primary" fontWeight={700}>
                                            {term.currentRegisteredStudents || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{bgcolor: '#f3e5f5', borderRadius: 2, boxShadow: 1}}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Maximum Capacity
                                        </Typography>
                                        <Typography variant="h4" color="secondary" fontWeight={700}>
                                            {term.maxNumberRegistration || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{bgcolor: '#e8f5e9', borderRadius: 2, boxShadow: 1}}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Available Slots
                                        </Typography>
                                        <Typography variant="h4" color="success.main" fontWeight={700}>
                                            {(term.maxNumberRegistration || 0) - (term.currentRegisteredStudents || 0)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider/>

                    {/* Classes Information */}
                    <Box>
                        <Typography variant="h6" color="primary"
                                    sx={{mb: 2, display: 'flex', alignItems: 'center', gap: 1}}>
                            <SchoolIcon fontSize="small"/>
                            Classes ({term.numberOfClasses || 0})
                        </Typography>
                        {term.classDtos && term.classDtos.length > 0 ? (
                            <Stack spacing={2}>
                                {term.classDtos.map((cls) => (
                                    <Card
                                        key={cls.id}
                                        sx={{
                                            borderRadius: 2,
                                            boxShadow: 1,
                                            border: '1px solid #e0e0e0',
                                            '&:hover': {
                                                boxShadow: 3,
                                                borderColor: '#1976d2'
                                            }
                                        }}
                                    >
                                        <CardContent>
                                            <Box direction="row" justifyContent="space-between" alignItems="center">
                                                <Box flex={1}>
                                                    <Typography variant="subtitle1" fontWeight={600} color="primary"
                                                                gutterBottom>
                                                        {cls.name}
                                                    </Typography>
                                                    <Box direction="row" spacing={2} flexWrap="wrap">
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Students:</strong> {cls.numberStudent}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Year:</strong> {cls.academicYear}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Weeks:</strong> {cls.numberOfWeeks}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Chip
                                                    label={String(cls.status).charAt(0).toUpperCase() + String(cls.status).slice(1)}
                                                    color={cls.status === 'enrolling' ? 'success' : 'default'}
                                                    size="small"
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center', py: 2}}>
                                No classes assigned to this term
                            </Typography>
                        )}
                    </Box>
                </Stack>
            </DialogContent>
            <Divider/>
            <DialogActions sx={{p: 3, justifyContent: 'center', background: '#fafafa'}}>
                <ButtonClose
                    onClick={onClose}
                    sx={{borderRadius: 2, px: 4, fontWeight: 600}}
                >
                    Close
                </ButtonClose>
            </DialogActions>
        </Dialog>
    );
}

