import React, {useEffect, useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from '@mui/material'

export default function UpdateTeacher({open, onClose, teacher}) {
  const [form, setForm] = useState({name: '', email: '', phone: ''})

  useEffect(() => {
    if (teacher) setForm({name: teacher.name || '', email: teacher.email || '', phone: teacher.phone || ''})
  }, [teacher])

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: call update API
    onClose?.()
  }

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Teacher</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{mt: 1}}>
          <TextField label="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} fullWidth/>
          <TextField label="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} fullWidth/>
          <TextField label="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} fullWidth/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" type="submit" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}


