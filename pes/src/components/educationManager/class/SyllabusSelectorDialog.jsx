import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import syllabusService from '@services/EducationService.jsx';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

export default function SyllabusSelectorDialog({ open, onClose}) {
    const [syllabuses, setSyllabuses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) return;
        setLoading(true);
        setError("");
        syllabusService.getActiveSyllabuses()
            .then(data => setSyllabuses(data))
            .catch(err => setError(err?.response?.data?.message || err?.message || "Failed to load syllabuses"))
            .finally(() => setLoading(false));
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, color: '#1976d2', textAlign: 'center' }}>Choose Syllabus</DialogTitle>
            <DialogContent>
                {loading ? <Box textAlign="center" py={3}><Typography>Loading...</Typography></Box> : null}
                {error ? <Typography color="error" textAlign="center">{error}</Typography> : null}
                {!loading && !error && (
                    <Stack spacing={2} mt={2}>
                        {syllabuses.map(s => (
                            <Card key={s.id} sx={{ display: 'flex', alignItems: 'center', background: '#f0f7ff', borderRadius: 3, boxShadow: 2 }}>
                                <Avatar sx={{ bgcolor: '#8bd17c', width: 56, height: 56, m: 2 }}>
                                    <SchoolIcon fontSize="large" />
                                </Avatar>
                                <CardContent sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>{s.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{s.description}</Typography>
                                    <Stack direction="row" spacing={2}>
                                        <Typography variant="caption" color="#388e3c">Cost: <b>{s.cost.toLocaleString()}</b></Typography>
                                        <Typography variant="caption" color="#f57c00">Hours: <b>{s.hoursOfSyllabus}</b></Typography>
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" sx={{ borderRadius: 2, minWidth: 90, fontWeight: 600 }} onClick={() => { onSelect(s); onClose(); }}>Choose</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Stack>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}
