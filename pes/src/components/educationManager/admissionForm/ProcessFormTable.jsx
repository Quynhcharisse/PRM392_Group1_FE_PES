import {
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {Info} from '@mui/icons-material';
import {useState} from "react";

export default function ProcessFormTable({forms, onDetailClick}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    const handleDetailClick = (form) => {
        onDetailClick(form);
    }

    const filteredForms = forms?.filter(form => form.status !== "cancelled" && (form.status !== "refilled")) || [];

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
            <TableContainer sx={{flex: 1, maxHeight: 'calc(100vh - 300px)', overflow: 'auto'}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{
                                fontWeight: 'bold',
                                minWidth: 80,
                                backgroundColor: '#f8faf8',
                                color: '#07663a',
                                fontSize: '0.95rem',
                                borderBottom: '2px solid #e0e0e0'
                            }}>No</TableCell>
                            <TableCell align="center" sx={{
                                fontWeight: 'bold',
                                minWidth: 160,
                                backgroundColor: '#f8faf8',
                                color: '#07663a',
                                fontSize: '0.95rem',
                                borderBottom: '2px solid #e0e0e0'
                            }}>Child Name</TableCell>
                            <TableCell align="center" sx={{
                                fontWeight: 'bold',
                                minWidth: 140,
                                backgroundColor: '#f8faf8',
                                color: '#07663a',
                                fontSize: '0.95rem',
                                borderBottom: '2px solid #e0e0e0'
                            }}>Submit Date</TableCell>
                            <TableCell align="center" sx={{
                                fontWeight: 'bold',
                                minWidth: 160,
                                backgroundColor: '#f8faf8',
                                color: '#07663a',
                                fontSize: '0.95rem',
                                borderBottom: '2px solid #e0e0e0'
                            }}>Cancel Reason</TableCell>
                            <TableCell align="center" sx={{
                                fontWeight: 'bold',
                                minWidth: 120,
                                backgroundColor: '#f8faf8',
                                color: '#07663a',
                                fontSize: '0.95rem',
                                borderBottom: '2px solid #e0e0e0'
                            }}>Status</TableCell>
                            <TableCell align="center" sx={{
                                fontWeight: 'bold',
                                minWidth: 120,
                                backgroundColor: '#f8faf8',
                                color: '#07663a',
                                fontSize: '0.95rem',
                                borderBottom: '2px solid #e0e0e0'
                            }}>Note</TableCell>
                            <TableCell align="center" sx={{
                                fontWeight: 'bold',
                                minWidth: 120,
                                backgroundColor: '#f8faf8',
                                color: '#07663a',
                                fontSize: '0.95rem',
                                borderBottom: '2px solid #e0e0e0'
                            }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredForms
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((form, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f8faf8',
                                        },
                                        transition: 'background-color 0.2s'
                                    }}
                                >
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{form.studentName}</TableCell>
                                    <TableCell align="center">{form.submittedDate}</TableCell>
                                    <TableCell align="center">{form.cancelReason || "N/A"}</TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={form.status === "approved paid" ? "Approved & Paid" : form.status}
                                            sx={{
                                                backgroundColor:
                                                    form.status === "approved" ? "rgba(7, 102, 58, 0.1)" :
                                                        form.status === "approved paid" ? "rgba(46, 125, 50, 0.1)" :
                                                            form.status === "rejected" || form.status === "cancelled" ? "rgba(220, 53, 69, 0.1)" :
                                                                form.status === "pending approval" || form.status === "pending" ? "rgba(13, 110, 253, 0.1)" :
                                                                    form.status === "waiting payment" ? "rgba(0, 0, 128, 0.1)" :
                                                                        "transparent",
                                                color:
                                                    form.status === "approved" ? "#07663a" :
                                                        form.status === "approved paid" ? "#2E7D32" :
                                                            form.status === "rejected" || form.status === "cancelled" ? "#dc3545" :
                                                                form.status === "pending approval" || form.status === "pending" ? "#0d6efd" :
                                                                    form.status === "waiting payment" ? "#000080" :
                                                                        "black",
                                                fontWeight: "600",
                                                borderRadius: '20px',
                                                textTransform: "capitalize"
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{form.note || "N/A"}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            startIcon={<Info/>}
                                            onClick={() => handleDetailClick(form)}
                                            sx={{
                                                backgroundColor: '#07663a',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(7, 102, 58, 0.85)'
                                                },
                                                textTransform: 'none',
                                                borderRadius: '8px',
                                                boxShadow: 'none'
                                            }}
                                        >
                                            Info
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 15]}
                count={filteredForms?.length}
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