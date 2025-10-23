import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    CircularProgress,
    TablePagination,
    Checkbox,
    IconButton,
    Tooltip,
    TableSortLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

/**
 * CustomDataTable - Reusable data table component
 * 
 * @param {Array} columns - Array of column definitions
 *   Example: [
 *     { id: 'name', label: 'Name', minWidth: 170, sortable: true },
 *     { id: 'status', label: 'Status', minWidth: 100, align: 'center', sortable: false }
 *   ]
 * 
 * @param {Array} rows - Array of data rows
 * @param {Boolean} loading - Loading state
 * @param {String} emptyMessage - Message when no data
 * @param {Boolean} pagination - Enable pagination (default: true)
 * @param {Boolean} selectable - Enable row selection (default: false)
 * @param {Function} onRowClick - Callback when row is clicked
 * @param {Function} onSelectionChange - Callback when selection changes
 * @param {Number} rowsPerPageOptions - Rows per page options
 * @param {Boolean} sortable - Enable sorting (default: true)
 * @param {String} defaultOrderBy - Default column to sort by
 * @param {String} defaultOrder - Default sort order ('asc' or 'desc')
 * @param {Object} sx - Additional styles
 */
export default function CustomDataTable({
    columns = [],
    rows = [],
    loading = false,
    emptyMessage = 'No data available',
    pagination = true,
    selectable = false,
    onRowClick,
    onSelectionChange,
    rowsPerPageOptions = [5, 10, 25, 50],
    sortable = true,
    defaultOrderBy = '',
    defaultOrder = 'asc',
    sx = {},
    renderActions,
    stickyHeader = true,
    maxHeight = 600
}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[1] || 10);
    const [selected, setSelected] = React.useState([]);
    const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
    const [order, setOrder] = React.useState(defaultOrder);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((row) => row.id);
            setSelected(newSelected);
            onSelectionChange && onSelectionChange(newSelected);
            return;
        }
        setSelected([]);
        onSelectionChange && onSelectionChange([]);
    };

    const handleRowSelect = (event, id) => {
        event.stopPropagation();
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
        onSelectionChange && onSelectionChange(newSelected);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Sorting function
    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const descendingComparator = (a, b, orderBy) => {
        // Handle nested properties (e.g., 'student.name')
        const getNestedValue = (obj, path) => {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj);
        };

        const aValue = getNestedValue(a, orderBy);
        const bValue = getNestedValue(b, orderBy);

        if (bValue < aValue) return -1;
        if (bValue > aValue) return 1;
        return 0;
    };

    const sortedRows = React.useMemo(() => {
        if (!sortable || !orderBy) return rows;
        return [...rows].sort(getComparator(order, orderBy));
    }, [rows, order, orderBy, sortable]);

    const displayedRows = pagination
        ? sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : sortedRows;

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', ...sx }}>
            <TableContainer sx={{ maxHeight: stickyHeader ? maxHeight : 'none' }}>
                <Table stickyHeader={stickyHeader}>
                    <TableHead>
                        <TableRow>
                            {selectable && (
                                <TableCell padding="checkbox" sx={{ bgcolor: '#f5f5f5' }}>
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < rows.length}
                                        checked={rows.length > 0 && selected.length === rows.length}
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align || 'left'}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{
                                        fontWeight: 700,
                                        bgcolor: '#f5f5f5',
                                        color: '#1976d2',
                                        fontSize: '0.95rem',
                                        borderBottom: '2px solid #1976d2'
                                    }}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    {sortable && column.sortable !== false ? (
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={() => handleRequestSort(column.id)}
                                        >
                                            {column.label}
                                            {orderBy === column.id ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                            {renderActions && (
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: 700,
                                        bgcolor: '#f5f5f5',
                                        color: '#1976d2',
                                        fontSize: '0.95rem',
                                        borderBottom: '2px solid #1976d2'
                                    }}
                                >
                                    Actions
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (selectable ? 1 : 0) + (renderActions ? 1 : 0)}
                                    align="center"
                                    sx={{ py: 8 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        {emptyMessage}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            displayedRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={() => onRowClick && onRowClick(row)}
                                        role={selectable ? 'checkbox' : undefined}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{
                                            cursor: onRowClick ? 'pointer' : 'default',
                                            '&:hover': {
                                                bgcolor: onRowClick ? 'rgba(25, 118, 210, 0.08)' : 'inherit'
                                            }
                                        }}
                                    >
                                        {selectable && (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    slotProps={{
                                                        input: {
                                                            'aria-labelledby': labelId
                                                        }
                                                    }}
                                                    onClick={(event) => handleRowSelect(event, row.id)}
                                                />
                                            </TableCell>
                                        )}
                                        {columns.map((column) => {
                                            // Handle nested properties
                                            const value = column.id.split('.').reduce((acc, part) => acc && acc[part], row);
                                            
                                            return (
                                                <TableCell key={column.id} align={column.align || 'left'}>
                                                    {column.render ? column.render(value, row) : value || 'N/A'}
                                                </TableCell>
                                            );
                                        })}
                                        {renderActions && (
                                            <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                                {renderActions(row)}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && rows.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        borderTop: '1px solid #e0e0e0',
                        '.MuiTablePagination-toolbar': {
                            bgcolor: '#fafafa'
                        }
                    }}
                />
            )}
        </Paper>
    );
}

