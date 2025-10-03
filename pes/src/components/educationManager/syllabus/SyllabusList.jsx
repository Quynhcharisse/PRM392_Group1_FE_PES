import { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button, CircularProgress, Alert } from '@mui/material';
import educationService from '@services/EducationService.jsx';
import SyllabusTable from './SyllabusTable.jsx';
import UpdateSyllabusPopUp from './UpdateSyllabusPopUp.jsx';

export default function SyllabusList() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(null);

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
                <Stack alignItems="center" sx={{ py: 6 }}>
                    <CircularProgress />
                </Stack>
            ) : error ? (
                <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
            ) : (
                <SyllabusTable rows={rows} onEdit={setEditing} />
            )}

            <UpdateSyllabusPopUp
                open={Boolean(editing)}
                syllabus={editing}
                onClose={() => setEditing(null)}
                onUpdated={() => { setEditing(null); load(); }}
            />
        </Box>
    );
}


