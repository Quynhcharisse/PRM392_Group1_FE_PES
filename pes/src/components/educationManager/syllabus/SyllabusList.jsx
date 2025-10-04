import {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography
} from '@mui/material';
import educationService from '@services/EducationService.jsx';
import SyllabusTable from './SyllabusTable.jsx';
import UpdateSyllabusPopUp from './UpdateSyllabusPopUp.jsx';
import ButtonClose from "@components/customButton/ButtonClose.jsx";

export default function SyllabusList() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(null);
    const [viewing, setViewing] = useState(null);

    const handleClose = () => setViewing(null);


    const load = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await educationService.getSyllabuses();
            setRows(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err?.message || 'Failed to load syllabuses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <Box>
            {loading ? (
                <Stack alignItems="center" sx={{py: 6}}>
                    <CircularProgress/>
                </Stack>
            ) : error ? (
                <Alert severity="error" sx={{borderRadius: 2}}>{error}</Alert>
            ) : (
                <SyllabusTable rows={rows} onEdit={setEditing} onView={setViewing}/>
            )}

            <UpdateSyllabusPopUp
                open={Boolean(editing)}
                syllabus={editing}
                onClose={() => setEditing(null)}
                onUpdated={() => {
                    setEditing(null);
                    load();
                }}
            />

            <Dialog open={Boolean(viewing)} fullWidth onClose={handleClose}>
                <DialogTitle>Syllabus Detail</DialogTitle>
                <DialogContent dividers>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 1}}>
                            <Typography><b>ID:</b> {viewing?.id}</Typography>
                            <Typography><b>Name:</b> {viewing?.name}</Typography>
                            <Typography><b>Description:</b> {viewing?.description}</Typography>
                            <Typography><b>Cost:</b> {viewing?.cost}</Typography>
                            <Typography><b>Hours:</b> {viewing?.hoursOfSyllabus}</Typography>
                            <Typography><b>Status:</b> {viewing?.isActive === 'true' ? 'Active' : 'Inactive'}</Typography>
                        </Box>
                </DialogContent>
                <DialogActions>
                    <ButtonClose onClick={handleClose}>Close</ButtonClose>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
