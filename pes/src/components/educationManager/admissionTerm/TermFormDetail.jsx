import {
    Alert,
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Stack,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {
    Add,
    CheckCircleOutlined,
    Close,
    EventNoteOutlined,
    EventOutlined,
    EventRepeatOutlined,
    GroupsOutlined,
    LockOutlined,
    PauseCircleOutlined,
    SchoolOutlined,
    Visibility
} from '@mui/icons-material';
import {useEffect, useMemo, useState} from "react";
import {
    createExtraTerm,
    updateTermStatus
} from "@services/educationService.jsx";
import {enqueueSnackbar, useSnackbar} from "notistack";
import {formatVND} from "@/components/none-shared/formatVND.jsx";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {ValidateExtraTermFormData} from "@/components/none-shared/validation/ValidateExtraTermFormData.jsx";

// Helper function to format grade display
const formatGradeDisplay = (grade) => {
    return grade.charAt(0).toUpperCase() + grade.slice(1);
};

export default function TermFormDetail({isOpen, onClose, selectedTerm, onRefresh}) {
    const {enqueueSnackbar} = useSnackbar();
    const [showExtraTermForm, setShowExtraTermForm] = useState(false);
    const [showExtraTermDetail, setShowExtraTermDetail] = useState(false);
    const [selectedExtraTerm, setSelectedExtraTerm] = useState(null);
    const [formData, setFormData] = useState({
        parentTermId: selectedTerm?.id,
        startDate: null,
        endDate: null,
        maxNumberRegistration: 0,
        expectedClasses: 0
    });

    const isLocked = selectedTerm?.status === 'locked';

    // Check if there's an active/inactive extra term
    const hasActiveExtraTerm = useMemo(() => {
        if (!selectedTerm?.extraTerms || selectedTerm.extraTerms.length === 0) return false;
        return selectedTerm.extraTerms.some(term =>
            term.status.toLowerCase() === 'active' ||
            term.status.toLowerCase() === 'inactive'
        );
    }, [selectedTerm?.extraTerms]);

    // Calculate missing registrations and classes per grade
    const missingInfoByGrade = useMemo(() => {
        if (!selectedTerm?.termItemList) return {};

        return selectedTerm.termItemList.reduce((acc, item) => {
            const missingCount = item.maxNumberRegistration - (item.approvedForm || 0);
            if (missingCount > 0) {
                acc[item.grade] = {
                    missingStudents: missingCount,
                    expectedClasses: Math.ceil(missingCount / 40),
                    maxRegistration: item.maxNumberRegistration,
                    approvedForms: item.approvedForm || 0
                };
            }
            return acc;
        }, {});
    }, [selectedTerm?.termItemList]);

    // Update formData when missingInfo changes
    useEffect(() => {
        // Get the first grade that has missing students
        const firstGradeWithMissing = Object.keys(missingInfoByGrade)[0];
        if (firstGradeWithMissing) {
            const gradeInfo = missingInfoByGrade[firstGradeWithMissing];
            setFormData((prev) => ({
                ...prev,
                maxNumberRegistration: gradeInfo.missingStudents || 0,
                expectedClasses: gradeInfo.expectedClasses || 0
            }));
        }
    }, [missingInfoByGrade]);

    const handleCreateExtraTerm = async (e) => {
        e.preventDefault();

        const validationError = ValidateExtraTermFormData(formData, selectedTerm);

        if (validationError) {
            enqueueSnackbar(validationError, {variant: 'error'});
            return;
        }

        const firstGradeWithMissing = Object.keys(missingInfoByGrade)[0];
        const gradeInfo = firstGradeWithMissing ? missingInfoByGrade[firstGradeWithMissing] : null;

        try {
            const response = await createExtraTerm({
                parentTermId: selectedTerm.id,
                startDate: dayjs(formData.startDate),
                endDate: dayjs(formData.endDate),
                maxNumberRegistration: gradeInfo?.missingStudents || 0,
                expectedClasses: gradeInfo?.expectedClasses || 0
            });

            if (response.success) {
                enqueueSnackbar(response.message || 'Extra term created successfully', {variant: 'success'});
                onRefresh();
                setShowExtraTermForm(false);
            } else {
                enqueueSnackbar(response.message || 'Failed to create extra term', {variant: 'error'});
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Error creating extra term';
            enqueueSnackbar(errMsg, {variant: 'error'});
            console.error('[ExtraTerm][Error]', error.response?.data || error);
        }
    };

    const handleViewExtraTermDetail = (extraTerm) => {
        setSelectedExtraTerm(extraTerm);
        setShowExtraTermDetail(true);
    };

    const handleCloseExtraTermDetail = () => {
        setShowExtraTermDetail(false);
        setSelectedExtraTerm(null);
    };

    const handleLockTerm = async () => {
        try {
            const response = await updateTermStatus(selectedTerm.id);
            if (response.success) {
                enqueueSnackbar(response.message || 'Term locked successfully', {variant: 'success'});
                onRefresh();
            } else {
                enqueueSnackbar(response.message || 'Failed to lock term', {variant: 'error'});
            }
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || 'Error locking term', {variant: 'error'});
        }
    };

    if (!selectedTerm) return null;

    return (
        <>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        backgroundColor: '#f8faf8',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }}
            >
                <AppBar sx={{
                    position: 'relative',
                    backgroundColor: '#07663a',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <Toolbar variant="dense">
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                            size="small"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            <Close fontSize="small"/>
                        </IconButton>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                        }}>
                            <Stack spacing={0.5}>
                                <Typography variant="subtitle1" sx={{fontWeight: 600}}>
                                    {selectedTerm.name}
                                </Typography>
                            </Stack>
                        </Box>

                        <Typography
                            sx={{
                                display: 'inline-block',
                                px: 3,
                                py: 1,
                                minWidth: 110,
                                textAlign: 'center',
                                fontWeight: 700,
                                borderRadius: 10,
                                fontSize: '1rem',
                                letterSpacing: 1,
                                textTransform: 'uppercase',
                                backgroundColor:
                                    selectedTerm.status === 'locked'
                                        ? '#d32f2f'
                                        : selectedTerm.status === 'active'
                                            ? '#2e7d32'
                                            : selectedTerm.status === 'inactive'
                                                ? '#fbc02d'
                                                : '#eeeeee',
                                color:
                                    selectedTerm.status === 'locked'
                                        ? 'white'
                                        : selectedTerm.status === 'active'
                                            ? 'white'
                                            : selectedTerm.status === 'inactive'
                                                ? 'white'
                                                : '#616161',
                                boxShadow: 2,
                                transition: 'all 0.2s',
                            }}
                        >
                            {selectedTerm.status.toUpperCase()}
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Box sx={{
                    p: 3,
                    maxWidth: 900,
                    mx: 'auto',
                    width: '100%',
                    flex: 1,
                    overflow: 'auto'
                }}>
                    <Stack spacing={3}>
                        {/* Term Duration */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                backgroundColor: '#ffffff'
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2,
                                pb: 1,
                                borderBottom: '1px solid #e8f5e9'
                            }}>
                                <EventNoteOutlined sx={{color: '#07663a', mr: 1}}/>
                                <Typography variant="subtitle1" sx={{fontWeight: 600, color: '#07663a'}}>
                                    Term Duration
                                </Typography>
                            </Box>
                            <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'column'}}>
                                <Grid item xs={12}>
                                    <Box sx={{
                                        p: 1.5,
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 1,
                                        backgroundColor: '#f8faf8',
                                        mb: 1
                                    }}>
                                        <Typography variant="body1" sx={{color: '#07663a', display: 'block', mb: 0.5}}>
                                            Academic Year
                                        </Typography>
                                        <Typography variant="body2" sx={{color: '#333'}}>
                                            {selectedTerm.year}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{
                                        p: 1.5,
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 1,
                                        backgroundColor: '#f8faf8'
                                    }}>
                                        <Typography variant="body1" sx={{color: '#07663a', display: 'block', mb: 0.5}}>
                                            Start Date
                                        </Typography>
                                        <Typography variant="body2" sx={{color: '#333'}}>
                                            {dayjs(selectedTerm.startDate).format(' HH:mm DD/MM/YYYY')}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{
                                        p: 1.5,
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 1,
                                        backgroundColor: '#f8faf8'
                                    }}>
                                        <Typography variant="body1" sx={{color: '#07663a', display: 'block', mb: 0.5}}>
                                            End Date
                                        </Typography>
                                        <Typography variant="body2" sx={{color: '#333'}}>
                                            {dayjs(selectedTerm.endDate).format(' HH:mm DD/MM/YYYY')}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Term Items */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                backgroundColor: '#ffffff'
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 2,
                                pb: 1,
                                borderBottom: '1px solid #e8f5e9'
                            }}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <SchoolOutlined sx={{color: '#07663a', mr: 1, fontSize: 20}}/>
                                    <Typography variant="subtitle1" sx={{fontWeight: 600, color: '#07663a'}}>
                                        Term Items
                                    </Typography>
                                </Box>
                                {Object.keys(missingInfoByGrade).length > 0 && !showExtraTermForm && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => setShowExtraTermForm(true)}
                                        startIcon={<Add sx={{fontSize: 18}}/>}
                                        size="small"
                                        sx={{
                                            borderColor: '#07663a',
                                            color: '#07663a',
                                            '&:hover': {
                                                borderColor: '#07663a',
                                                backgroundColor: 'rgba(7, 102, 58, 0.04)'
                                            }
                                        }}
                                    >
                                        Add Extra Term
                                    </Button>
                                )}
                            </Box>

                            <Stack spacing={2}>
                                {selectedTerm.termItemList?.map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            p: 3,
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 2,
                                            backgroundColor: '#ffffff',
                                            '&:hover': {
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                            }
                                        }}
                                    >
                                        {/* Grade Badge */}
                                        <Box sx={{mb: 3}}>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    display: 'inline-block',
                                                    px: 2,
                                                    py: 0.5,
                                                    bgcolor: '#e8f5e9',
                                                    color: '#07663a',
                                                    borderRadius: 2,
                                                    fontSize: '1rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Grade {formatGradeDisplay(item.grade)}
                                            </Typography>
                                        </Box>

                                        {/* Content Grid */}
                                        <Grid container spacing={2}>
                                            {/* Class Information Section */}
                                            <Grid item xs={12} md={6}>
                                                <Box sx={{
                                                    p: 2,
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: 2,
                                                    height: '100%',
                                                    backgroundColor: '#fff',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            color: '#1976d2',
                                                            mb: 2,
                                                            pb: 1,
                                                            borderBottom: '1px solid #e0e0e0',
                                                            fontSize: '1.1rem',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        Class Information
                                                    </Typography>
                                                    <Stack
                                                        spacing={2.5}
                                                        sx={{
                                                            flex: 1,
                                                            justifyContent: 'space-evenly'
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            >
                                                                Expected Classes:
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: '#07663a',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    ml: 2
                                                                }}
                                                            >
                                                                {item.expectedClasses}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            >
                                                                Students Per Class:
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: '#07663a',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    ml: 2
                                                                }}
                                                            >
                                                                {item.studentsPerClass}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            >
                                                                Max Registration:
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: '#07663a',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    ml: 2
                                                                }}
                                                            >
                                                                {item.maxNumberRegistration}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            </Grid>

                                            {/* Fee Structure Section */}
                                            <Grid item xs={12} md={6}>
                                                <Box sx={{
                                                    p: 2,
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: 2,
                                                    height: '100%',
                                                    backgroundColor: '#fff',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            color: '#1976d2',
                                                            mb: 2,
                                                            pb: 1,
                                                            borderBottom: '1px solid #e0e0e0',
                                                            fontSize: '1.1rem',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        Fee Structure
                                                    </Typography>
                                                    <Stack
                                                        spacing={2.5}
                                                        sx={{
                                                            flex: 1,
                                                            justifyContent: 'space-evenly'
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            >
                                                                Facility Fee:
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: '#07663a',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    ml: 2
                                                                }}
                                                            >
                                                                {formatVND(item.feeList.facilityFee)}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            >
                                                                Uniform Fee:
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: '#07663a',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    ml: 2
                                                                }}
                                                            >
                                                                {formatVND(item.feeList.uniformFee)}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            >
                                                                Service Fee:
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: '#07663a',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    ml: 2
                                                                }}
                                                            >
                                                                {formatVND(item.feeList.serviceFee)}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            >
                                                                Learning Material Fee:
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: '#07663a',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    ml: 2
                                                                }}
                                                            >
                                                                {formatVND(item.feeList.learningMaterialFee)}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.95rem'
                                                                }}
                                                            >
                                                                Reservation Fee:
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: '#07663a',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.95rem',
                                                                    ml: 2
                                                                }}
                                                            >
                                                                {formatVND(item.feeList.reservationFee)}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>

                        {/* Extra Terms Section */}
                        {selectedTerm.extraTerms && selectedTerm.extraTerms.length > 0 && (
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 2,
                                    backgroundColor: '#ffffff'
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 2,
                                    pb: 1,
                                    borderBottom: '1px solid #e8f5e9'
                                }}>
                                    <EventRepeatOutlined sx={{color: '#07663a', mr: 1, fontSize: 20}}/>
                                    <Typography variant="subtitle1" sx={{fontWeight: 600, color: '#07663a'}}>
                                        Extra Terms
                                    </Typography>
                                </Box>
                                <Stack spacing={2}>
                                    {selectedTerm.extraTerms.map((extraTerm) => {
                                        const statusColors = {
                                            'active': {
                                                light: '#e8f5e9',
                                                main: '#2e7d32',
                                                icon: <CheckCircleOutlined sx={{fontSize: 16}}/>
                                            },
                                            'inactive': {
                                                light: '#fff3e0',
                                                main: '#ed6c02',
                                                icon: <PauseCircleOutlined sx={{fontSize: 16}}/>
                                            },
                                            'locked': {
                                                light: '#ffebee',
                                                main: '#d32f2f',
                                                icon: <LockOutlined sx={{fontSize: 16}}/>
                                            }
                                        };
                                        const statusStyle = statusColors[extraTerm.status.toLowerCase()];

                                        return (
                                            <Box
                                                key={extraTerm.id}
                                                sx={{
                                                    p: 2,
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: 1,
                                                    backgroundColor: statusStyle.light
                                                }}
                                            >
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    mb: 1
                                                }}>
                                                    <Typography variant="subtitle2"
                                                                sx={{color: statusStyle.main, fontWeight: 600}}>
                                                        {extraTerm.name}
                                                    </Typography>
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                        <Tooltip title="View Details">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleViewExtraTermDetail(extraTerm)}
                                                                sx={{
                                                                    color: statusStyle.main,
                                                                    '&:hover': {
                                                                        backgroundColor: `${statusStyle.light}80`
                                                                    }
                                                                }}
                                                            >
                                                                <Visibility fontSize="small"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            color: statusStyle.main,
                                                            bgcolor: 'rgba(255,255,255,0.8)',
                                                            px: 1,
                                                            py: 0.5,
                                                            borderRadius: 1,
                                                            border: `1px solid ${statusStyle.main}`
                                                        }}>
                                                            {statusStyle.icon}
                                                            <Typography variant="caption"
                                                                        sx={{ml: 0.5, fontWeight: 600}}>
                                                                {extraTerm.status.toUpperCase()}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: '#555'
                                                }}>
                                                    <EventOutlined sx={{fontSize: 16, mr: 0.5}}/>
                                                    <Typography variant="caption">
                                                        {dayjs(extraTerm.startDate).format('HH:mm DD/MM/YYYY')} - {dayjs(extraTerm.endDate).format('HH:mm DD/MM/YYYY')}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Stack>
                            </Paper>
                        )}

                        {/* Extra Term Form Dialog */}
                        {showExtraTermForm && (
                            <Dialog
                                open={true}
                                onClose={() => setShowExtraTermForm(false)}
                                maxWidth="sm"
                                fullWidth
                            >
                                <DialogTitle>Create Extra Term</DialogTitle>
                                <form onSubmit={handleCreateExtraTerm}>
                                    <DialogContent>
                                        {hasActiveExtraTerm && (
                                            <Alert severity="warning" sx={{mb: 2}}>
                                                There is already an active or pending extra term. Creating a new one may
                                                affect the existing term.
                                            </Alert>
                                        )}
                                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                                            <Typography variant="body2" color="textSecondary">
                                                Parent Term: from {dayjs(selectedTerm.startDate).format('DD-MM-YYYY')} to {dayjs(selectedTerm.endDate).format('DD-MM-YYYY')}
                                            </Typography>

                                            {/* Date Selection */}
                                            <DateTimePicker
                                                label="Start Date"
                                                value={formData.startDate ? dayjs(formData.startDate) : dayjs(new Date())}
                                                onChange={(newValue) => {
                                                    setFormData(prev => ({...prev, startDate: newValue}));
                                                }}
                                                renderInput={(params) => <TextField {...params} fullWidth required/>}
                                                minDate={dayjs().startOf('day')}
                                                maxDate={dayjs(selectedTerm.endDate)}
                                            />
                                            <DateTimePicker
                                                label="End Date"
                                                value={formData.endDate ? dayjs(formData.endDate) : dayjs(new Date())}
                                                onChange={(newValue) => {
                                                    setFormData(prev => ({...prev, endDate: newValue}));
                                                }}
                                                renderInput={(params) => <TextField {...params} fullWidth required/>}
                                                minDate={dayjs(formData.startDate) || dayjs(selectedTerm.startDate)}
                                                maxDate={dayjs(selectedTerm.endDate)}
                                            />

                                            {/* Registration Info */}
                                            <Box sx={{
                                                mt: 2,
                                                p: 2,
                                                backgroundColor: 'background.paper',
                                                borderRadius: 1
                                            }}>
                                                <Typography variant="subtitle1" gutterBottom color="primary">
                                                    Missing Registrations Summary
                                                </Typography>

                                                {Object.entries(missingInfoByGrade).map(([grade, info]) => (
                                                    <Box key={grade} sx={{
                                                        mb: 2,
                                                        pl: 2,
                                                        borderLeft: '3px solid',
                                                        borderColor: 'primary.main'
                                                    }}>
                                                        <Typography variant="h6" gutterBottom>
                                                            Grade {formatGradeDisplay(grade)}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            Maximum Registration: {info.maxRegistration}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            Approved Forms: {info.approvedForms}
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            Missing Students: <strong>{info.missingStudents}</strong>
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            Expected Classes: <strong>{info.expectedClasses}</strong>
                                                        </Typography>
                                                    </Box>
                                                ))}

                                                <Typography variant="caption" color="text.secondary">
                                                    * These values are calculated automatically based on current
                                                    registrations
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setShowExtraTermForm(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={Object.keys(missingInfoByGrade).length === 0}
                                        >
                                            Create Extra Term
                                        </Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        )}
                    </Stack>
                </Box>

                {/* Fixed Footer */}
                <Box sx={{
                    position: 'sticky',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    borderTop: '1px solid rgba(7, 102, 58, 0.12)',
                    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.05)'
                }}>
                    <Box sx={{
                        maxWidth: 900,
                        mx: 'auto',
                        p: 1.5,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1.5
                    }}>
                        <Button
                            variant="contained"
                            onClick={onClose}
                            size="small"
                            color={"warning"}
                            sx={{
                                color: 'white',
                                px: 3,
                                fontSize: '0.875rem',
                                textTransform: 'none',
                            }}
                        >
                            Close
                        </Button>
                        {!isLocked &&
                            <Button
                                variant="contained"
                                onClick={handleLockTerm}
                                size="small"
                                color={"error"}
                                sx={{
                                    color: 'white',
                                    px: 3,
                                    fontSize: '0.875rem',
                                    textTransform: 'none',
                                    boxShadow: '0 2px 4px rgba(7, 102, 58, 0.25)',
                                }}
                            >
                                Locked
                            </Button>
                        }
                    </Box>
                </Box>
            </Dialog>

            {/* Extra Term Detail Dialog */}
            <Dialog
                open={showExtraTermDetail}
                onClose={handleCloseExtraTermDetail}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{
                    backgroundColor: '#f8faf8',
                    borderBottom: '1px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <EventNoteOutlined/>
                    Extra Term Details
                </DialogTitle>
                <DialogContent sx={{mt: 2}}>
                    {selectedExtraTerm && (
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Name
                                </Typography>
                                <Typography variant="body1">
                                    {selectedExtraTerm.name}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Academic Year
                                </Typography>
                                <Typography variant="body1">
                                    {selectedExtraTerm.year}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Start Date
                                </Typography>
                                <Typography variant="body1">
                                    {dayjs(selectedExtraTerm.startDate).format('HH:mm DD/MM/YYYY')}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    End Date
                                </Typography>
                                <Typography variant="body1">
                                    {dayjs(selectedExtraTerm.endDate).format('HH:mm DD/MM/YYYY')}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Status
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: selectedExtraTerm.status.toLowerCase() === 'active' ? 'success.main' :
                                            selectedExtraTerm.status.toLowerCase() === 'inactive' ? 'warning.main' :
                                                'error.main'
                                    }}
                                >
                                    {selectedExtraTerm.status}
                                </Typography>
                            </Box>

                            {selectedExtraTerm.termItemList && selectedExtraTerm.termItemList.length > 0 && (
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                        Term Items
                                    </Typography>
                                    {selectedExtraTerm.termItemList.map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                mt: 1,
                                                p: 1.5,
                                                border: '1px solid #e0e0e0',
                                                borderRadius: 1,
                                                backgroundColor: '#f8faf8'
                                            }}
                                        >
                                            <Typography variant="subtitle2" gutterBottom>
                                                Grade {formatGradeDisplay(item.grade)}
                                            </Typography>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Expected Classes: {item.expectedClasses}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Max Registration: {item.maxNumberRegistration}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions sx={{p: 2, borderTop: '1px solid #e0e0e0'}}>
                    <Button onClick={handleCloseExtraTermDetail} variant="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
