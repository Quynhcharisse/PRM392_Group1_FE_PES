import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import EventIcon from '@mui/icons-material/Event';
import ClassIcon from '@mui/icons-material/Class';
import ButtonCreate from '../../customButton/ButtonCreate.jsx';
import ButtonCancel from '../../customButton/ButtonCancel.jsx';
import educationService from '@services/EducationService.jsx';

export default function CreateTermDialog({ open, onClose, onSuccess }) {
    const [startDateObj, setStartDateObj] = useState(null);
    const [endDateObj, setEndDateObj] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedClassIds, setSelectedClassIds] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!open) return;
        const load = async () => {
            try {
                const res = await educationService.getClassList();
                if (res?.statusResponseCode?.toLowerCase?.() === 'ok') {
                    setClasses(res?.data || []);
                }
            } catch {
                // ignore
            }
        };
        load();
    }, [open]);

    useEffect(() => {
        if (startDateObj) setStartDate(dayjs(startDateObj).toISOString());
    }, [startDateObj]);

    useEffect(() => {
        if (endDateObj) setEndDate(dayjs(endDateObj).toISOString());
    }, [endDateObj]);

    const handleSubmit = async () => {
        setMessage("");
        if (!startDate || !endDate) {
            setMessage("Please select start date and end date.");
            return;
        }
        if (selectedClassIds.length === 0) {
            setMessage("Please select at least one class.");
            return;
        }
        setLoading(true);
        try {
            const res = await educationService.createTerm({
                startDate,
                endDate,
                classIds: selectedClassIds
            });
            if (res?.statusResponseCode?.toLowerCase?.() === 'ok') {
                setMessage("Create admission term successfully");
                setTimeout(() => {
                    onSuccess && onSuccess();
                    handleClose();
                }, 1000);
            } else {
                setMessage(res?.message || "Failed to create term");
            }
        } catch (err) {
            setMessage(err?.response?.data?.message || err?.message || "Failed to create term");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setStartDateObj(null);
        setEndDateObj(null);
        setStartDate("");
        setEndDate("");
        setSelectedClassIds([]);
        setMessage("");
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
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
                    <EventIcon sx={{ fontSize: 32, color: '#1976d2' }} />
                    <Typography variant="h5" fontWeight={700}>Create Admission Term</Typography>
                </Stack>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ pt: 3, pb: 2 }}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <EventIcon fontSize="small" color="primary" />
                            Time Period
                        </Typography>
                        <Stack spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDateObj}
                                    onChange={setStartDateObj}
                                    format="DD/MM/YYYY"
                                    slotProps={{ 
                                        textField: { 
                                            fullWidth: true, 
                                            size: 'medium', 
                                            variant: 'outlined',
                                            sx: {
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '&:hover fieldset': {
                                                        borderColor: '#1976d2',
                                                    }
                                                }
                                            }
                                        } 
                                    }}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="End Date"
                                    value={endDateObj}
                                    onChange={setEndDateObj}
                                    format="DD/MM/YYYY"
                                    slotProps={{ 
                                        textField: { 
                                            fullWidth: true, 
                                            size: 'medium', 
                                            variant: 'outlined',
                                            sx: {
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    '&:hover fieldset': {
                                                        borderColor: '#1976d2',
                                                    }
                                                }
                                            }
                                        } 
                                    }}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ClassIcon fontSize="small" color="primary" />
                            Select Classes
                        </Typography>
                        <FormControl 
                            fullWidth 
                            size="medium"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1976d2',
                                    }
                                }
                            }}
                        >
                            <InputLabel>Choose Classes</InputLabel>
                            <Select
                                multiple
                                value={selectedClassIds}
                                onChange={(e) => setSelectedClassIds(e.target.value)}
                                label="Choose Classes"
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((id) => {
                                            const cls = classes.find(c => c.id === id);
                                            return <Chip key={id} label={cls?.name || id} size="small" color="primary" />;
                                        })}
                                    </Box>
                                )}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 300,
                                            borderRadius: 2,
                                            mt: 1,
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                        }
                                    }
                                }}
                            >
                                {classes.map((c) => (
                                    <MenuItem 
                                        key={c.id} 
                                        value={c.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#e3f2fd',
                                            }
                                        }}
                                    >
                                        <Checkbox 
                                            checked={selectedClassIds.indexOf(c.id) > -1}
                                            sx={{
                                                color: '#1976d2',
                                                '&.Mui-checked': {
                                                    color: '#1976d2',
                                                }
                                            }}
                                        />
                                        <ListItemText 
                                            primary={c.name}
                                            secondary={`${c.numberStudent} students • ${c.academicYear}`}
                                            primaryTypographyProps={{ fontWeight: 500 }}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedClassIds.length > 0 && (
                            <Box sx={{ mt: 1.5 }}>
                                <Typography variant="caption" color="text.secondary">
                                    {selectedClassIds.length} class{selectedClassIds.length > 1 ? 'es' : ''} selected
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {message && (
                        <Alert 
                            severity={message.includes("success") ? "success" : "error"}
                            sx={{ 
                                borderRadius: 2,
                                '& .MuiAlert-icon': {
                                    fontSize: 24
                                }
                            }}
                        >
                            {message}
                        </Alert>
                    )}
                </Stack>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 3, justifyContent: 'space-between', background: '#fafafa' }}>
                <ButtonCancel onClick={handleClose} disabled={loading}>
                    Cancel
                </ButtonCancel>
                <ButtonCreate onClick={handleSubmit} disabled={loading}>
                    {loading ? "Creating..." : "Create Term"}
                </ButtonCreate>
            </DialogActions>
        </Dialog>
    );
}

