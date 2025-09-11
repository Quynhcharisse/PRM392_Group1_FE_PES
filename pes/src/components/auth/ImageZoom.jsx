import React, {useState} from 'react'
import {Box, Dialog, DialogContent, IconButton} from '@mui/material'
import {Close, ZoomIn, ZoomOut} from '@mui/icons-material'

export default function ImageZoom() {
    const [open, setOpen] = useState(false)
    const [zoom, setZoom] = useState(1)

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setZoom(1)
    }

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3))
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))

    return (
        <>
            <Box sx={{width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.3s ease', '&:hover': {transform: 'scale(1.02)'}}} onClick={handleOpen}>
                <Box sx={{width: '100%', height: {xs: 'auto', md: '600px'}, backgroundImage: 'url(/thong-diep-1.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}/>
            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth={false} fullWidth sx={{'& .MuiDialog-paper': {backgroundColor: 'rgba(0,0,0,0.9)', margin: 0, maxHeight: '100vh'}}}>
                <DialogContent sx={{p: 0, position: 'relative'}}>
                    <IconButton onClick={handleClose} sx={{position: 'absolute', top: 16, right: 16, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': {backgroundColor: 'rgba(0,0,0,0.7)'}}}>
                        <Close/>
                    </IconButton>

                    <Box sx={{position: 'absolute', top: 16, left: 16, zIndex: 1, display: 'flex', gap: 1}}>
                        <IconButton onClick={handleZoomIn} sx={{backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': {backgroundColor: 'rgba(0,0,0,0.7)'}}}>
                            <ZoomIn/>
                        </IconButton>
                        <IconButton onClick={handleZoomOut} sx={{backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': {backgroundColor: 'rgba(0,0,0,0.7)'}}}>
                            <ZoomOut/>
                        </IconButton>
                    </Box>

                    <Box sx={{width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                        <Box sx={{width: '100%', height: '100%', backgroundImage: 'url(/thong-diep-1.jpeg)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', transform: `scale(${zoom})`, transition: 'transform 0.3s ease', cursor: zoom > 1 ? 'grab' : 'default', '&:active': {cursor: 'grabbing'}}}/>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
