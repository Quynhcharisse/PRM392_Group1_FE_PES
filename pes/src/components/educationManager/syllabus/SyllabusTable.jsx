import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Stack } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

export default function SyllabusTable({ rows = [], onEdit }) {
    const getStatusChip = (isActive) => (
        <Chip size="small" label={isActive === 'true' ? 'Active' : 'Inactive'} color={isActive === 'true' ? 'success' : 'default'} />
    );

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right">Hours</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} hover>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell align="right">{row.cost}</TableCell>
                            <TableCell align="right">{row.hoursOfSyllabus}</TableCell>
                            <TableCell>{getStatusChip(row.isActive)}</TableCell>
                            <TableCell align="center">
                                <Stack direction="row" spacing={1} justifyContent="center">
                                    <IconButton size="small" onClick={() => onEdit?.(row)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


