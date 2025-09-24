import React, {useState} from 'react'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from '@mui/material'

export default function CreateTeacher({open, onClose}) {
    const [form, setForm] = useState({name: '', email: '', phone: ''})

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: call create API
        onClose?.()
    }

    return (
        <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Teacher</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                    <Stack spacing={2}>
                        <TextField label="Name" value={form.name}
                                   onChange={e => setForm({...form, name: e.target.value})} fullWidth/>
                        <TextField label="Email" value={form.email}
                                   onChange={e => setForm({...form, email: e.target.value})} fullWidth/>
                        <TextField label="Phone" value={form.phone}
                                   onChange={e => setForm({...form, phone: e.target.value})} fullWidth/>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" type="submit" onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}


