import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import educationService from '@services/EducationService.jsx';
import CreateTermDialog from './CreateTermDialog.jsx';
import TermTable from './TermTable.jsx';
import TermDetail from './TermDetail.jsx';

export default function TermAdmission() {
    const [terms, setTerms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedTerm, setSelectedTerm] = useState(null);

    const loadTerms = async () => {
        setLoading(true);
        try {
            const res = await educationService.getTermList();
            if (res?.statusResponseCode?.toLowerCase?.() === 'ok') {
                setTerms(res?.data || []);
            } else {
                setError(res?.message || "Failed to load terms");
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to load terms");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTerms();
    }, []);

    const handleView = (term) => {
        setSelectedTerm(term);
        setDetailDialogOpen(true);
    };

    if (loading) return <div style={{ padding: 24 }}>Loading terms...</div>;
    if (error) return <div style={{ padding: 24, color: "#c62828" }}>{error}</div>;

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontWeight: 700 }}>Admission Terms</h2>
                <Button variant="contained" color="primary" onClick={() => setCreateDialogOpen(true)}>
                    Create Term
                </Button>
            </div>
            <TermTable 
                terms={terms} 
                onView={handleView}
            />
            <CreateTermDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onSuccess={loadTerms}
            />
            <TermDetail
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                term={selectedTerm}
            />
        </div>
    );
}

