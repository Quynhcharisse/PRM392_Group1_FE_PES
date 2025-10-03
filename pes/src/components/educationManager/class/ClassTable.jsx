import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ClassTable({ classes, onView }) {
    return (
        <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>ID</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Name</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Students</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Academic Year</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Weeks</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Status</th>
                        <th style={{ borderBottom: "1px solid #ddd", textAlign: "left", padding: 8 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((c) => (
                        <tr key={c.id}>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{c.id}</td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{c.name}</td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{c.numberStudent}</td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{c.academicYear}</td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{c.numberOfWeeks}</td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8, textTransform: "capitalize" }}>{c.status}</td>
                            <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>
                                <IconButton aria-label="View details" onClick={() => onView && onView(c)} size="small">
                                    <VisibilityIcon fontSize="small" />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                    {classes.length === 0 && (
                        <tr>
                            <td colSpan={7} style={{ padding: 12, textAlign: "center", color: "#666" }}>No classes found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


