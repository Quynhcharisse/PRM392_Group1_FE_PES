import {useEffect, useState} from 'react';
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import educationService from '@services/EducationService.jsx';
import ButtonCancel from "@components/customButton/ButtonCancel.jsx";
import ButtonUpdate from "@components/customButton/ButtonUpdate.jsx";

export default function UpdateSyllabusPopUp({open, syllabus, onClose, onUpdated}) {
    const brandColor = '#0038A5';

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        cost: '',
        hoursOfSyllabus: '',
        isActive: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open && syllabus) {
            setFormData({
                id: syllabus.id ?? '',
                name: syllabus.name ?? '',
                description: syllabus.description ?? '',
                cost: syllabus.cost ?? '',
                hoursOfSyllabus: syllabus.hoursOfSyllabus ?? '',
                isActive: (syllabus.isActive ?? '').toString()
            });
            setErrors({});
            setError('');
        }
    }, [open, syllabus]);

    const validate = () => {
        const next = {};
        if (!formData.id && formData.id !== 0) next.id = 'Id is required';
        if (!formData.name?.trim()) next.name = 'Name is required';
        if (!formData.description?.trim()) next.description = 'Description is required';
        const costNum = Number(formData.cost);
        if (Number.isNaN(costNum) || costNum < 0) next.cost = 'Cost must be a non-negative number';
        const hoursNum = Number(formData.hoursOfSyllabus);
        if (Number.isNaN(hoursNum) || hoursNum <= 0) next.hoursOfSyllabus = 'Hours must be a positive number';
        if (!formData.isActive) next.isActive = 'Please select status';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (errors[name]) setErrors(prev => ({...prev, [name]: undefined}));
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            setSubmitting(true);
            setError('');
            await educationService.updateSyllabus(formData);
            if (onUpdated) onUpdated(formData);
            onClose?.();
        } catch (err) {
            setError(err?.message || 'Failed to update syllabus');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{fontWeight: 700, color: brandColor}}>Update Syllabus</DialogTitle>
            <DialogContent sx={{pt: 2}}>
                <Stack spacing={2.5} sx={{marginTop: 2}}>
                    {error && <Alert severity="error" sx={{borderRadius: 2}}>{error}</Alert>}
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2.5}>
                        <TextField
                            label="Cost"
                            name="cost"
                            type="number"
                            value={formData.cost}
                            onChange={handleChange}
                            error={!!errors.cost}
                            helperText={errors.cost}
                            fullWidth
                        />

                        <TextField
                            label="Hours of Syllabus"
                            name="hoursOfSyllabus"
                            type="number"
                            value={formData.hoursOfSyllabus}
                            onChange={handleChange}
                            error={!!errors.hoursOfSyllabus}
                            helperText={errors.hoursOfSyllabus}
                            fullWidth
                        />
                    </Stack>

                    <FormControl fullWidth error={!!errors.isActive}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            label="Status"
                            name="isActive"
                            value={formData.isActive}
                            onChange={handleChange}
                        >
                            <MenuItem value="true">Active</MenuItem>
                            <MenuItem value="false">Inactive</MenuItem>
                        </Select>
                        {errors.isActive && (
                            <Typography variant="caption" sx={{color: 'error.main', mt: 0.5, ml: 1.5}}>
                                {errors.isActive}
                            </Typography>
                        )}
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions sx={{p: 3}}>
                <ButtonCancel onClick={onClose}/>
                <ButtonUpdate onClick={handleSubmit}/>
            </DialogActions>
        </Dialog>
    );
}


