import {useState} from 'react';
import {Alert, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from '@mui/material';
import educationService from '@services/EducationService.jsx';
import ButtonCancel from "@components/customButton/ButtonCancel.jsx";
import ButtonCreate from "@components/customButton/ButtonCreate.jsx";

export default function CreateSyllabusDialog({open, onClose, onCreated}) {
    const brandColor = '#0038A5';

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        cost: '',
        hoursOfSyllabus: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const reset = () => {
        setFormData({name: '', description: '', cost: '', hoursOfSyllabus: ''});
        setErrors({});
        setError('');
    };

    const validate = () => {
        const next = {};
        if (!formData.name?.trim()) next.name = 'Name is required';
        if (!formData.description?.trim()) next.description = 'Description is required';
        const costNum = Number(formData.cost);
        if (Number.isNaN(costNum) || costNum < 0) next.cost = 'Cost must be a non-negative number';
        const hoursNum = Number(formData.hoursOfSyllabus);
        if (Number.isNaN(hoursNum) || hoursNum <= 0) next.hoursOfSyllabus = 'Hours must be a positive number';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (errors[name]) setErrors(prev => ({...prev, [name]: undefined}));
    };

    const handleCreate = async () => {
        if (!validate()) return;
        try {
            setSubmitting(true);
            setError('');
            await educationService.createSyllabus(formData);
            onCreated?.();
            reset();
            onClose?.();
        } catch (err) {
            setError(err?.message || 'Failed to create syllabus');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{fontWeight: 700, color: brandColor}}>Create Syllabus</DialogTitle>
            <DialogContent sx={{pt: 2}}>
                <Stack spacing={2.5}>
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
                </Stack>
            </DialogContent>
            <DialogActions sx={{p: 3}}>
                <ButtonCancel onClick={onClose}/>
                <ButtonCreate onClick={handleCreate}/>
            </DialogActions>
        </Dialog>
    );
}


