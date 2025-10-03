import {
    AppBar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {
    Add,
    CalendarTodayOutlined,
    Close,
    EditOutlined,
    EventNoteOutlined,
    GroupsOutlined,
    PersonOutlined,
    SchoolOutlined
} from '@mui/icons-material';
import {useEffect, useState} from "react";
import {
    createTerm,
    getDefaultGrade
} from "@services/EducationService.jsx";
import {enqueueSnackbar, useSnackbar} from "notistack";
import {formatVND} from "@/components/none-shared/formatVND.jsx";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {ValidateTermFormData} from "@/components/none-shared/validation/ValidateTermFormData.jsx";

// Helper function to format grade display
const formatGradeDisplay = (grade) => {
    return grade.charAt(0).toUpperCase() + grade.slice(1);
};

// Helper function to calculate academic year
const calculateAcademicYear = (date) => {
    if (!date) {
        const currentYear = new Date().getFullYear();
        return currentYear;
    }
    const dateObj = date?.toDate ? date.toDate() : new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    return month >= 6 ? year : year - 1;
};

const calculateAcademicYearRange = (date) => {
    const baseYear = calculateAcademicYear(date);
    return `${baseYear}–${baseYear + 1}`;
};

export default function TermCreateForm({isOpen, onClose, onSuccess, existingTerms}) {
    const {enqueueSnackbar} = useSnackbar();
    const [formData, setFormData] = useState({
        startDate: null,
        endDate: null,
        termItemList: []
    });

    const [availableGrades] = useState(['SEED', 'BUD', 'LEAF']);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [currentTermItem, setCurrentTermItem] = useState({
        grade: '',
        expectedClasses: '',
        studentsPerClass: 20,
        maxNumberRegistration: 0,
        facilityFee: 0,
        uniformFee: 0,
        learningMaterialFee: 0,
        reservationFee: 0,
        serviceFee: 0,
    });

    // Calculate remaining available grades
    const remainingGrades = availableGrades.filter(
        grade => !formData.termItemList.some(item => item.grade === grade)
    );

    useEffect(() => {
        if (currentTermItem.expectedClasses) {
            setCurrentTermItem(prev => ({
                ...prev,
                maxNumberRegistration: parseInt(prev.expectedClasses) * prev.studentsPerClass
            }));
        }
    }, [currentTermItem.expectedClasses]);

    const handleAddTermItem = async () => {
        if (!selectedGrade) {
            enqueueSnackbar("Please select a grade", {variant: "error"});
            return;
        }
        if (!currentTermItem.expectedClasses || currentTermItem.expectedClasses <= 0) {
            enqueueSnackbar("Expected classes must be greater than 0", {variant: "error"});
            return;
        }

        try {
            // Get default fees for the selected grade
            const response = await getDefaultGrade(selectedGrade);
        
            if (response?.success && response?.data) {
                const newTermItem = {
                    ...currentTermItem,
                    grade: selectedGrade,
                    studentsPerClass: 20,
                    maxNumberRegistration: parseInt(response.data.facilityFee),
                    facilityFee: parseInt(response.data.facilityFee),
                    uniformFee: parseInt(response.data.uniformFee),
                    learningMaterialFee: parseInt(response.data.learningMaterialFee),
                    reservationFee: parseInt(response.data.reservationFee),
                    serviceFee: parseInt(response.data.serviceFee),
                };

                setFormData(prev => ({
                    ...prev,
                    termItemList: [...prev.termItemList, newTermItem]
                }));

                // Reset current term item and selected grade
                setCurrentTermItem({
                    grade: '',
                    expectedClasses: '',
                    studentsPerClass: 20,
                    maxNumberRegistration: 0
                });
                setSelectedGrade('');
            }
        } catch (error) {
            enqueueSnackbar("Error loading fees", {variant: "error"});
        }
    };

    const handleRemoveTermItem = (gradeToRemove) => {
        setFormData(prev => ({
            ...prev,
            termItemList: prev.termItemList.filter(item => item.grade !== gradeToRemove)
        }));
    };

    const validateForm = () => {
        const validationError = ValidateTermFormData(formData, existingTerms); 

        if (validationError) {
            enqueueSnackbar(validationError, {variant: "error"});
            return false;
        }

        return true;
    };

    const handleCreate = async () => {
        try {
            if (!validateForm()) {
                return;
            }

            // Format dates to ISO string
            const startDateISO = formData.startDate.toISOString();
            const endDateISO = formData.endDate.toISOString();

            // Prepare term items with only required fields for BE
            const termItems = formData.termItemList.map(item => ({
                grade: item.grade,
                expectedClasses: Number(item.expectedClasses)
            }));

            const response = await createTerm(
                startDateISO,
                endDateISO,
                termItems
            );

            if (response.success) {
                enqueueSnackbar("Term created successfully!", {variant: "success"});
                onClose();
                onSuccess();
            } else {
                enqueueSnackbar(response.message || "Failed to create term", {variant: "error"});
            }
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || "Error creating term", {variant: "error"});
        }
    };

    return (
        <Dialog
            open={isOpen}
            fullScreen
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: '#f8f9fa',
                    }
                }
            }}
        >
            <AppBar position="relative" sx={{bgcolor: '#07663a'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <Close/>
                    </IconButton>
                    <Typography variant="h6" sx={{flex: 1}}>
                        Create New Term
                    </Typography>
                </Toolbar>
            </AppBar>

            <DialogContent>
                <Box sx={{maxWidth: 800, mx: 'auto', mt: 4, p: 3}}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3.5,
                            mb: 4,
                            border: '2px solid #e0e0e0',
                            borderRadius: 3,
                            backgroundColor: '#ffffff',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                borderColor: '#07663a'
                            }
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 3,
                            pb: 2,
                            borderBottom: '2px solid #e8f5e9'
                        }}>
                            <EventNoteOutlined sx={{color: '#07663a', mr: 1.5, fontSize: 28}}/>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: '#07663a',
                                }}
                            >
                                Term Information
                            </Typography>
                        </Box>

                        <Stack spacing={3}>
                            <Box sx={{
                                backgroundColor: '#f8faf8',
                                p: 2.5,
                                borderRadius: 2,
                                border: '1px solid #e0e0e0'
                            }}>
                                <TextField
                                    label="Term Name"
                                    value={"Admission Term for " + calculateAcademicYear(formData.startDate)}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <Box sx={{mr: 1, color: '#07663a'}}>
                                                <EditOutlined/>
                                            </Box>
                                        ),
                                        readOnly: true
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#ffffff',
                                            '& fieldset': {
                                                borderColor: '#e0e0e0',
                                                borderWidth: '2px'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#07663a'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#07663a'
                                            }
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#07663a',
                                            '&.Mui-focused': {
                                                color: '#07663a'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Box sx={{
                                backgroundColor: '#f8faf8',
                                p: 2.5,
                                borderRadius: 2,
                                border: '1px solid #e0e0e0'
                            }}>
                                <TextField
                                    label="Year"
                                    value={calculateAcademicYearRange(formData.startDate)}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <Box sx={{mr: 1, color: '#07663a'}}>
                                                <CalendarTodayOutlined/>
                                            </Box>
                                        ),
                                        readOnly: true
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: '#ffffff',
                                            '& fieldset': {
                                                borderColor: '#e0e0e0',
                                                borderWidth: '2px'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#07663a'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#07663a'
                                            }
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#07663a',
                                            '&.Mui-focused': {
                                                color: '#07663a'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Box sx={{
                                backgroundColor: '#f8faf8',
                                p: 2.5,
                                borderRadius: 2,
                                border: '1px solid #e0e0e0'
                            }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: '#07663a',
                                        fontWeight: 600,
                                        mb: 2
                                    }}
                                >
                                    Term Duration
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <DateTimePicker
                                        label="Start Date"
                                        format={'HH:mm DD/MM/YYYY'}
                                        value={formData.startDate ? dayjs(formData.startDate) : dayjs().add(1, 'day')}
                                        minDate={dayjs().add(1, 'day')}
                                        onChange={(newDate) => setFormData({...formData, startDate: newDate})}
                                    />
                                    {formData.startDate &&
                                        <DateTimePicker
                                            label="End Date"
                                            format={'HH:mm DD/MM/YYYY'}
                                            value={formData.endDate ? dayjs(formData.endDate) : dayjs(formData.startDate).add(2, 'day')}
                                            minDate={dayjs(formData.startDate).add(2, 'day')}
                                            maxDate={dayjs(dayjs(formData.startDate).year() + '-12-31')}
                                            onChange={(newDate) => setFormData({...formData, endDate: newDate})}
                                        />
                                    }
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>

                    {/* Add Term Item Section */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3.5,
                            mb: 3,
                            border: '2px solid #e0e0e0',
                            borderRadius: 3,
                            backgroundColor: '#ffffff',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                borderColor: '#07663a'
                            }
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 3,
                            pb: 2,
                            borderBottom: '2px solid #e8f5e9'
                        }}>
                            <Add sx={{color: '#07663a', mr: 1.5, fontSize: 28}}/>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: '#07663a',
                                }}
                            >
                                Add Grade Configuration
                            </Typography>
                        </Box>

                        <Stack spacing={3}>
                            <FormControl fullWidth>
                                <InputLabel sx={{
                                    color: '#07663a',
                                    '&.Mui-focused': {
                                        color: '#07663a'
                                    }
                                }}>Grade</InputLabel>
                                <Select
                                    value={selectedGrade}
                                    onChange={(e) => setSelectedGrade(e.target.value)}
                                    label="Grade"
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#e0e0e0',
                                            borderWidth: '2px'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#07663a'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#07663a'
                                        }
                                    }}
                                >
                                    {remainingGrades.map(grade => (
                                        <MenuItem key={grade} value={grade}>{formatGradeDisplay(grade)}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box sx={{
                                backgroundColor: '#f8faf8',
                                p: 2.5,
                                borderRadius: 2,
                                border: '1px solid #e0e0e0'
                            }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: '#07663a',
                                        fontWeight: 600,
                                        mb: 2
                                    }}
                                >
                                    Class Capacity
                                </Typography>
                                <Stack spacing={2.5}>
                                    <TextField
                                        label="Expected Classes"
                                        type="number"
                                        value={currentTermItem.expectedClasses}
                                        onChange={(e) => setCurrentTermItem(prev => ({
                                            ...prev,
                                            expectedClasses: e.target.value
                                        }))}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <Box sx={{mr: 1, color: '#07663a'}}>
                                                    <SchoolOutlined/>
                                                </Box>
                                            )
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#e0e0e0',
                                                    borderWidth: '2px'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#07663a'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#07663a'
                                                }
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#07663a',
                                                '&.Mui-focused': {
                                                    color: '#07663a'
                                                }
                                            }
                                        }}
                                    />

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{
                                            backgroundColor: '#ffffff',
                                            p: 2,
                                            borderRadius: 2,
                                            border: '1px solid #e0e0e0'
                                        }}
                                    >
                                        <TextField
                                            label="Students Per Class"
                                            type="number"
                                            value={currentTermItem.studentsPerClass}
                                            InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <Box sx={{mr: 1, color: '#07663a'}}>
                                                        <PersonOutlined/>
                                                    </Box>
                                                )
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#f5f5f5'
                                                }
                                            }}
                                        />
                                        <TextField
                                            label="Max Registration"
                                            type="number"
                                            value={currentTermItem.maxNumberRegistration}
                                            InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <Box sx={{mr: 1, color: '#07663a'}}>
                                                        <GroupsOutlined/>
                                                    </Box>
                                                )
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#f5f5f5'
                                                }
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            </Box>

                            <Button
                                variant="contained"
                                onClick={handleAddTermItem}
                                disabled={!selectedGrade || !currentTermItem.expectedClasses}
                                startIcon={<Add/>}
                                sx={{
                                    alignSelf: 'flex-end',
                                    bgcolor: '#07663a',
                                    '&:hover': {
                                        bgcolor: '#05512e'
                                    },
                                    '&.Mui-disabled': {
                                        bgcolor: '#e0e0e0'
                                    },
                                    px: 3,
                                    py: 1,
                                    borderRadius: 2,
                                    fontWeight: 600
                                }}
                            >
                                Add Grade
                            </Button>
                        </Stack>
                    </Paper>

                    {/* Term Items List */}
                    {formData.termItemList.length > 0 && (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                border: '2px solid #e0e0e0',
                                borderRadius: 3,
                                backgroundColor: '#ffffff',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    borderColor: '#07663a'
                                }
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 3
                            }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#07663a',
                                        position: 'relative',
                                        '&:after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: -8,
                                            left: 0,
                                            width: '60px',
                                            height: '3px',
                                            backgroundColor: '#07663a',
                                            borderRadius: '2px'
                                        }
                                    }}
                                >
                                    Configured Grades
                                </Typography>
                            </Box>
                            <Stack spacing={2.5}>
                                {formData.termItemList.map((item) => (
                                    <Box
                                        key={item.grade}
                                        sx={{
                                            p: 3,
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 2,
                                            position: 'relative',
                                            backgroundColor: '#f8faf8',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                                borderColor: '#07663a',
                                                backgroundColor: '#ffffff'
                                            }
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRemoveTermItem(item.grade)}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                color: '#666',
                                                '&:hover': {
                                                    backgroundColor: '#ffebee',
                                                    color: '#d32f2f'
                                                }
                                            }}
                                        >
                                            <Close/>
                                        </IconButton>

                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 2
                                        }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#07663a',
                                                    backgroundColor: '#e8f5e9',
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: 2
                                                }}
                                            >
                                                {formatGradeDisplay(item.grade)}
                                            </Typography>
                                        </Box>

                                        <Stack
                                            direction="row"
                                            spacing={3}
                                            sx={{
                                                width: '100%',
                                                alignItems: 'stretch'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '50%',
                                                    backgroundColor: '#ffffff',
                                                    p: 2.5,
                                                    borderRadius: 2,
                                                    border: '1px solid #e0e0e0'
                                                }}
                                            >
                                                <Typography variant="subtitle2" color="primary" gutterBottom sx={{
                                                    fontWeight: 600,
                                                    mb: 2,
                                                    pb: 1,
                                                    borderBottom: '2px solid #e8f5e9'
                                                }}>
                                                    Class Information
                                                </Typography>
                                                <Stack spacing={1.5}>
                                                    <Typography sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        color: '#555',
                                                        '& span': {fontWeight: 600, color: '#07663a'}
                                                    }}>
                                                        Expected Classes: <span>{item.expectedClasses}</span>
                                                    </Typography>
                                                    <Typography sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        color: '#555',
                                                        '& span': {fontWeight: 600, color: '#07663a'}
                                                    }}>
                                                        Students Per Class: <span>{item.studentsPerClass}</span>
                                                    </Typography>
                                                    <Typography sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        color: '#555',
                                                        '& span': {fontWeight: 600, color: '#07663a'}
                                                    }}>
                                                        Max Registration: <span>{item.maxNumberRegistration}</span>
                                                    </Typography>
                                                </Stack>
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: '50%',
                                                    backgroundColor: '#ffffff',
                                                    p: 2.5,
                                                    borderRadius: 2,
                                                    border: '1px solid #e0e0e0'
                                                }}
                                            >
                                                <Typography variant="subtitle2" color="primary" gutterBottom sx={{
                                                    fontWeight: 600,
                                                    mb: 2,
                                                    pb: 1,
                                                    borderBottom: '2px solid #e8f5e9'
                                                }}>
                                                    Fee Structure
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Typography sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            color: '#555',
                                                            mb: 1.5,
                                                            '& span': {fontWeight: 600, color: '#07663a'}
                                                        }}>
                                                            Facility Fee: <span>{formatVND(item.facilityFee)}</span>
                                                        </Typography>
                                                        <Typography sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            color: '#555',
                                                            mb: 1.5,
                                                            '& span': {fontWeight: 600, color: '#07663a'}
                                                        }}>
                                                            Uniform Fee: <span>{formatVND(item.uniformFee)}</span>
                                                        </Typography>
                                                        <Typography sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            color: '#555',
                                                            '& span': {fontWeight: 600, color: '#07663a'}
                                                        }}>
                                                            Service Fee: <span>{formatVND(item.serviceFee)}</span>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            color: '#555',
                                                            mb: 1.5,
                                                            '& span': {fontWeight: 600, color: '#07663a'}
                                                        }}>
                                                            Learning Material
                                                            Fee: <span>{formatVND(item.learningMaterialFee)}</span>
                                                        </Typography>
                                                        <Typography sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            color: '#555',
                                                            '& span': {fontWeight: 600, color: '#07663a'}
                                                        }}>
                                                            Reservation
                                                            Fee: <span>{formatVND(item.reservationFee)}</span>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{p: 3}}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleCreate}
                    variant="contained"
                    disabled={formData.termItemList.length === 0}
                    sx={{bgcolor: '#07663a', '&:hover': {bgcolor: '#05512e'}}}
                >
                    Create Term
                </Button>
            </DialogActions>
        </Dialog>
    );
}
