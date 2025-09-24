import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material'

export default function ExportTeacher({open, onClose}) {
  const handleExport = () => {
    // TODO: implement export logic
    onClose?.()
  }

  return (
    <Dialog open={!!open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Export Teachers</DialogTitle>
      <DialogContent>
        <Typography variant="body2">This will export the current teacher list.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleExport}>Export</Button>
      </DialogActions>
    </Dialog>
  )
}


