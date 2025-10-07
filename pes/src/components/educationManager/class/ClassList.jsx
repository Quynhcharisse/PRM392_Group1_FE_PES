import {useEffect, useState} from "react";
import educationService from "@services/EducationService.jsx";
import ClassTable from "./ClassTable.jsx";
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export default function ClassList() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await educationService.getClassList();
                if (res?.statusResponseCode?.toLowerCase?.() === "ok") {
                    setClasses(res?.data || []);
                } else {
                    setError(res?.message || "Failed to load classes");
                }
            } catch (err) {
                setError(err?.response?.data?.message || err?.message || "Failed to load classes");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div>Loading classes...</div>;
    if (error) return <div style={{color: "#c62828"}}>{error}</div>;

    return (
        <div style={{padding: 24}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                <h2 style={{fontWeight: 700}}>Classes</h2>
                <Button variant="contained" color="primary" onClick={() => navigate('/education/classes/create')}>
                    Create Class
                </Button>
            </div>
            <ClassTable classes={classes}
                        onView={(c) => navigate(`/education/classes/${c.id}`, {state: {classData: c}})}/>
        </div>
    );
}


