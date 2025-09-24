import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    IconButton
} from "@mui/material";
import {Visibility} from '@mui/icons-material';
import {useState} from "react";
import dayjs from "dayjs";

export default function TermTable({terms, onDetailClick}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    const handleDetailClick = (term, type) => {
        onDetailClick(term, type);
    }

    const columns = [
        {label: 'No', minWidth: 80, align: 'center', key: 'no'},
        {label: 'Academic Year', minWidth: 120, align: 'center', key: 'year'},
        {label: 'Start Date', minWidth: 200, align: 'center', key: 'startDate'},
        {label: 'End Date', minWidth: 200, align: 'center', key: 'endDate'},
        {label: 'Status', minWidth: 200, align: 'center', key: 'status'},
        {label: 'Action', minWidth: 80, align: 'center', key: 'action'},
    ];

    return (
        <Paper sx={{
            width: '100%',
            minHeight: 400,
            maxHeight: 'calc(100vh - 200px)',
            borderRadius: 3,
            overflow: 'visible',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            border: '2px solid rgb(254, 254, 253)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <TableContainer sx={{
                flex: 1,
                maxHeight: 'calc(100vh - 300px)',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    width: '8px',
                    height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '4px',
                    '&:hover': {
                        background: '#555',
                    },
                },
            }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map(col => (
                                <TableCell
                                    key={col.key}
                                    align={col.align}
                                    sx={{
                                        minWidth: col.minWidth,
                                        fontWeight: 'bold',
                                        backgroundColor: '#f8faf8',
                                        color: '#07663a',
                                        borderBottom: '2px solid #e0e0e0',
                                        fontSize: '0.95rem',
                                        padding: '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {terms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((term, idx) => (
                                <TableRow
                                    key={term.id}
                                    sx={{
                                        '&:nth-of-type(odd)': {
                                            backgroundColor: '#fafafa',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            transition: 'background-color 0.2s ease',
                                        },
                                        cursor: 'pointer'
                                    }}
                                >
                                    <TableCell align="center">{idx + 1}</TableCell>
                                    <TableCell align="center">{term.year}</TableCell>
                                    <TableCell align="center">{dayjs(term.startDate).format('HH:mm DD/MM/YYYY')}</TableCell>
                                    <TableCell align="center">{dayjs(term.endDate).format('HH:mm DD/MM/YYYY')}</TableCell>
                                    <TableCell align="center">
                                        <Typography
                                            component="span"
                                            sx={{
                                                color:
                                                    term.status === "active" ? "#07663a"
                                                        : term.status === "inactive" ? "#b27a00"
                                                            : term.status === "locked" ? "#d32f2f"
                                                                : "#333",
                                                fontWeight: 600,
                                                padding: '6px 16px',
                                                backgroundColor:
                                                    term.status === "active" ? "rgba(7, 102, 58, 0.08)"
                                                        : term.status === "inactive" ? "rgba(255, 193, 7, 0.12)"
                                                            : term.status === "locked" ? "rgba(211, 47, 47, 0.10)"
                                                                : "transparent",
                                                borderRadius: '20px',
                                                fontSize: '0.89rem',
                                                letterSpacing: 1,
                                                textTransform: "capitalize",
                                                minWidth: 90,
                                                display: "inline-block",
                                                textAlign: "center"
                                            }}
                                        >
                                            {term.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="View">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleDetailClick(term, 'view')}
                                                sx={{mr: 1}}
                                            >
                                                <Visibility/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 15]}
                count={terms?.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    borderTop: '1px solid #e0e0e0',
                    '.MuiTablePagination-select': {
                        borderRadius: '8px',
                        padding: '4px 8px',
                        marginRight: '8px'
                    },
                    backgroundColor: '#fff',
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 2
                }}
            />
        </Paper>
    )
}
