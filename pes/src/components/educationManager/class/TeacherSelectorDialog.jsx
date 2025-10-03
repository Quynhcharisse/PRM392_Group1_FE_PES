import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

export default function TeacherSelectorDialog({ open, teachers, onClose, onSelect }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, color: '#1976d2', textAlign: 'center' }}>Choose Teacher</DialogTitle>
            <DialogContent>
                <List>
                    {teachers.map((t) => (
                        <ListItem key={t.id} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => { onSelect(t); onClose(); }}
                                sx={{
                                    borderRadius: 2,
                                    '&:hover': { background: '#e3f2fd' },
                                    transition: 'background 0.2s',
                                    py: 1.2
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: '#8bd17c' }}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t.name} primaryTypographyProps={{ fontWeight: 600, color: '#1976d2' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}
