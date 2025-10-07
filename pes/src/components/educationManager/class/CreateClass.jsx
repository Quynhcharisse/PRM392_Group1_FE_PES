import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import syllabusService from "@services/EducationService.jsx";
import {HRService} from "@services/HRService.jsx";
import Button from '@mui/material/Button';
import SyllabusSelectorDialog from './SyllabusSelectorDialog.jsx';
import ButtonCreate from '../../customButton/ButtonCreate.jsx';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import TeacherSelectorDialog from './TeacherSelectorDialog.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SLOTS = [
    {startTime: "07:00", endTime: "08:00"},
    {startTime: "08:00", endTime: "09:00"},
    {startTime: "09:00", endTime: "10:00"},
    {startTime: "14:00", endTime: "15:00"},
    {startTime: "15:00", endTime: "16:00"},
];

export default function CreateClass() {
    const [startDate, setStartDate] = useState("");
    const [startDateObj, setStartDateObj] = useState(null);
    const [syllabusId, setSyllabusId] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [syllabuses, setSyllabuses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [syllabusDialogOpen, setSyllabusDialogOpen] = useState(false);
    const [activeSyllabuses, setActiveSyllabuses] = useState([]);
    const [syllabusLoading, setSyllabusLoading] = useState(false);
    const [syllabusError, setSyllabusError] = useState("");
    const [teacherDialogOpen, setTeacherDialogOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedSyllabus, setSelectedSyllabus] = useState(null);
    const [selectedSyllabusName, setSelectedSyllabusName] = useState("");
    const navigate = useNavigate();
    const [ruleMessage, setRuleMessage] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const [syllRes, teacherRes] = await Promise.all([
                    syllabusService.getSyllabuses(),
                    syllabusService.getTeacherList(),
                ]);
                setSyllabuses(syllRes || []);
                setTeachers(teacherRes || []);
            } catch (_) {
                // ignore
            }
        };
        load();
    }, []);

    React.useEffect(() => {
        if (startDateObj) {
            setStartDate(dayjs(startDateObj).format('YYYY-MM-DD'));
        }
    }, [startDateObj]);

    const activitiesByDay = useMemo(() => {
        const map = Object.create(null);
        for (const day of DAYS) map[day] = [];
        for (const a of activities) {
            (map[a.dayOfWeek] ||= []).push(a);
        }
        return map;
    }, [activities]);

    const totalActivities = activities.length;

    // Helper: get weekday index (0=Sunday, 1=Monday, ...)
    const getStartDayIndex = () => {
        if (!startDate) return 0;
        const d = dayjs(startDate);
        // MUI DatePicker/JS: 0=Sunday, 1=Monday, ...
        return d.day();
    };
    const startDayIndex = getStartDayIndex();

    const canAddToDay = (day) => {
        // rules: <=4 per week, <=2 per day, and not before start day in first week
        if (totalActivities >= 4) return false;
        if ((activitiesByDay[day] || []).length >= 2) return false;
        // Only allow add from start day in first week
        const dayIndex = DAYS.indexOf(day);
        if (startDateObj && dayIndex < ((startDayIndex === 0 ? 6 : startDayIndex - 1))) return false;
        return true;
    };

    const toggleActivity = (day, slot) => {
        if (!selectedSyllabusName) {
            setMessage('Please choose a syllabus before adding activities.');
            return;
        }
        const exists = activities.some(
            (a) => a.dayOfWeek === day && a.startTime === slot.startTime && a.endTime === slot.endTime
        );
        if (exists) {
            setActivities((prev) => prev.filter(
                (a) => !(a.dayOfWeek === day && a.startTime === slot.startTime && a.endTime === slot.endTime)
            ));
            setRuleMessage("");
            return;
        }
        if (!canAddToDay(day)) {
            // Hiển thị rule message khi vi phạm
            if (totalActivities >= 4) setRuleMessage('Each week, students may participate in a maximum of 4 activities.');
            else if ((activitiesByDay[day] || []).length >= 2) setRuleMessage('No more than 2 activities are allowed per day.');
            else setRuleMessage('You cannot add activity for this day.');
            return;
        }
        setRuleMessage("");
        if (activities.length >= 4) {
            setRuleMessage('Each week, students may participate in a maximum of 4 activities.');
            return;
        }
        setActivities((prev) => prev.concat([{dayOfWeek: day, startTime: slot.startTime, endTime: slot.endTime, syllabusName: selectedSyllabusName}]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!startDate || !syllabusId || !teacherId) {
            setMessage("Please fill start date, syllabus and teacher.");
            return;
        }
        if (activities.length === 0) {
            setMessage("Please add at least one activity.");
            return;
        }
        try {
            setSubmitting(true);
            const res = await syllabusService.createClass({
                startDate,
                syllabusId,
                teacherId,
                activities,
            });
            if (res?.statusResponseCode?.toLowerCase?.() === "ok") {
                setMessage("Create class successfully");
                // Reset form
                setActivities([]);
                // Điều hướng về danh sách lớp sau khi tạo thành công
                navigate('/education/classes');
            } else {
                setMessage(res?.message || "Failed to create class");
            }
        } catch (err) {
            setMessage(err?.response?.data?.message || err?.message || "Failed to create class");
        } finally {
            setSubmitting(false);
        }
    };

    const handleOpenSyllabusDialog = async () => {
        setSyllabusDialogOpen(true);
        setSyllabusLoading(true);
        setSyllabusError("");
        try {
            const data = await syllabusService.getActiveSyllabuses();
            setActiveSyllabuses(data);
        } catch (err) {
            setSyllabusError(err?.response?.data?.message || err?.message || "Failed to load syllabuses");
        } finally {
            setSyllabusLoading(false);
        }
    };
    const handleChooseSyllabus = (syllabus) => {
        setSyllabusId(syllabus.id);
        setSelectedSyllabusName(syllabus.name);
        setSyllabusDialogOpen(false);
    };

    const handleChooseTeacher = (teacher) => {
        setTeacherId(teacher.id);
        setSelectedTeacher(teacher);
        setTeacherDialogOpen(false);
    };

    const isSelected = (day, slot) =>
        activities.some(
            (a) => a.dayOfWeek === day && a.startTime === slot.startTime && a.endTime === slot.endTime
        );

    return (
        <div style={{padding: 24}}>
            <Button onClick={() => navigate('/education/classes')} startIcon={<ArrowBackIcon />} variant="contained" sx={{ mb: 2 }}>
                Back
            </Button>
            <h2 style={{fontWeight: 700, textAlign: "center", marginBottom: 16}}>CREATE CLASS</h2>
            <form onSubmit={handleSubmit} style={{maxWidth: 1000, margin: "0 auto"}}>
                <div style={{display: "flex", gap: 24, justifyContent: "space-between", marginBottom: 16}}>
                    <div style={{display: "flex", flexDirection: "column", gap: 6}}>
                        <label>Start Date</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={startDateObj}
                                onChange={setStartDateObj}
                                format="DD/MM/YYYY"
                                slotProps={{textField: {fullWidth: true, size: 'small', variant: 'outlined'}}}
                            />
                        </LocalizationProvider>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: 6}}>
                        <label>Syllabus</label>
                        <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                            <Button variant="outlined" size="small" onClick={handleOpenSyllabusDialog}>Choose Syllabus</Button>
                            {selectedSyllabusName && <span style={{marginLeft: 8, color: '#1976d2', fontWeight: 600}}>{selectedSyllabusName}</span>}
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: 6}}>
                        <label>Teacher</label>
                        <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                            <Button variant="outlined" size="small" onClick={() => setTeacherDialogOpen(true)}>Choose Teacher</Button>
                        </div>
                        {selectedTeacher && <div style={{marginTop: 4, color: '#1976d2', fontWeight: 600}}>{selectedTeacher.name}</div>}
                    </div>
                </div>

                {ruleMessage && (
                    <div style={{ color: '#c62828', marginBottom: 12, fontWeight: 500 }}>{ruleMessage}</div>
                )}

                <div style={{overflowX: "auto", background: "#e7f5b0", padding: 12, borderRadius: 8}}>
                    <table style={{width: "100%", borderCollapse: "collapse"}}>
                        <thead>
                        <tr>
                            <th style={{border: "1px solid #333", padding: 8}}></th>
                            {DAYS.map((d) => (
                                <th key={d} style={{border: "1px solid #333", padding: 8}}>{d.toUpperCase()}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {SLOTS.map((slot) => (
                            <tr key={slot.startTime}>
                                <td style={{border: "1px solid #333", padding: 8, whiteSpace: "nowrap"}}>
                                    {slot.startTime}-{slot.endTime}
                                </td>
                                {DAYS.map((day) => {
                                    const selected = isSelected(day, slot);
                                    const disabled = !selected && !canAddToDay(day);
                                    return (
                                        <td key={day}
                                            style={{border: "1px solid #333", padding: 8, textAlign: "center"}}>
                                            <button
                                                type="button"
                                                onClick={() => toggleActivity(day, slot)}
                                                disabled={disabled}
                                                style={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: 8,
                                                    border: "1px solid #555",
                                                    cursor: disabled ? "not-allowed" : "pointer",
                                                    background: isSelected(day, slot) ? "#8bd17c" : "#fff",
                                                    fontSize: 20,
                                                    lineHeight: "20px",
                                                }}
                                                aria-label={isSelected(day, slot) ? "Remove activity" : `Add activity for ${selectedSyllabusName}`}
                                            >
                                                {isSelected(day, slot) ? "−" : "+"}
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div style={{display: "flex", justifyContent: "space-between", marginTop: 16, alignItems: "center"}}>
                    <div>
                        <span>Total activities: {totalActivities}/4</span>
                    </div>
                    <ButtonCreate type="submit" disabled={submitting}>
                        {submitting ? "Creating..." : "Create Class"}
                    </ButtonCreate>
                </div>
                {message && (
                    <div style={{
                        marginTop: 12,
                        color: message.includes("success") ? "#2e7d32" : "#c62828"
                    }}>{message}</div>
                )}
            </form>
            <SyllabusSelectorDialog
                open={syllabusDialogOpen}
                onClose={() => setSyllabusDialogOpen(false)}
                onSelect={handleChooseSyllabus}
                syllabuses={activeSyllabuses}
                loading={syllabusLoading}
                error={syllabusError}
            />
            <TeacherSelectorDialog
                open={teacherDialogOpen}
                teachers={teachers}
                onClose={() => setTeacherDialogOpen(false)}
                onSelect={handleChooseTeacher}
            />
        </div>
    );
}
