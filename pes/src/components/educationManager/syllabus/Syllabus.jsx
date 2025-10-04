import {useState} from 'react';
import {Box, Button, Divider, Stack, Typography} from '@mui/material';
import CreateSyllabusDialog from './CreateSyllabusDialog.jsx';
import SyllabusList from './SyllabusList.jsx';

export default function Syllabus() {
    const brandColor = '#0038A5';

    const [openCreate, setOpenCreate] = useState(false);

    return (
        <Box sx={{maxWidth: 960, mx: 'auto'}}>
            <Typography variant="h5" sx={{fontWeight: 700, color: brandColor, mb: 3}}>
                Syllabus
            </Typography>
            <Stack direction="row" justifyContent="flex-end" sx={{mb: 2}}>
                <Button variant="contained" onClick={() => setOpenCreate(true)} sx={{borderRadius: 3}}>Create
                    Syllabus</Button>
            </Stack>

            <Divider sx={{my: 4}}/>

            <CreateSyllabusDialog
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreated={() => setOpenCreate(false)}
            />
            <SyllabusList/>
        </Box>
    );
}


