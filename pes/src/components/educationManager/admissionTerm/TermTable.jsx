import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';

export default function TermTable({ terms, onView }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return dayjs(dateString).format('DD/MM/YYYY');
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
            <Table>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Academic Year</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Start Date</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>End Date</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Registered</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {terms.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ color: '#666', py: 4 }}>
                                No admission terms found
                            </TableCell>
                        </TableRow>
                    ) : (
                        terms.map((term) => (
                            <TableRow key={term.id} hover>
                                <TableCell>{term.id}</TableCell>
                                <TableCell>{term.academicYear}</TableCell>
                                <TableCell>{formatDate(term.startDate)}</TableCell>
                                <TableCell>{formatDate(term.endDate)}</TableCell>
                                <TableCell>
                                    {term.currentRegisteredStudents || 0} / {term.maxNumberRegistration || 0}
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={String(term.status || 'active').charAt(0).toUpperCase() + String(term.status || 'active').slice(1)} 
                                        color={term.status === 'active' ? 'success' : 'default'} 
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton 
                                        aria-label="View" 
                                        size="small" 
                                        color="primary"
                                        onClick={() => onView && onView(term)}
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

