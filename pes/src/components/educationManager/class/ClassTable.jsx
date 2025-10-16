import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Chip from '@mui/material/Chip';

export default function ClassTable({ classes, onView }) {
    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Helper function to format currency
    const formatCurrency = (amount) => {
        if (!amount) return 'N/A';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    return (
        <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>ID</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Name</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Teacher</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Students</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Academic Year</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Weeks</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Start Date</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Cost</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Status</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((c) => (
                        <tr key={c.id}>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{c.id}</td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8, maxWidth: 200, wordWrap: "break-word" }}>
                                {c.name}
                            </td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>
                                <div>
                                    <div style={{ fontWeight: 500 }}>{c.teacherName || 'N/A'}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{c.teacherEmail || 'N/A'}</div>
                                </div>
                            </td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8, textAlign: "center" }}>
                                {c.numberStudent || 0}
                            </td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8, textAlign: "center" }}>
                                {c.academicYear}
                            </td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8, textAlign: "center" }}>
                                {c.numberOfWeeks}
                            </td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>
                                {formatDate(c.startDate)}
                            </td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>
                                {formatCurrency(c.cost)}
                            </td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>
                                <Chip 
                                    label={c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : 'N/A'}
                                    color={c.status === 'active' ? 'success' : 'default'}
                                    size="small"
                                    sx={{ 
                                        fontWeight: 500,
                                        fontSize: '0.75rem'
                                    }}
                                />
                            </td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>
                                <IconButton aria-label="View details" onClick={() => onView && onView(c)} size="small">
                                    <VisibilityIcon fontSize="small" />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                    {classes.length === 0 && (
                        <tr>
                            <td colSpan={10} style={{ padding: 12, textAlign: "center", color: "#666" }}>No classes found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


