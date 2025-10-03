
import axiosClient from "@/config/APIConfig.jsx";

const syllabusService = {
    async getSyllabuses() {
        // ClassService lives under /class-api
        const res = await axiosClient.get('/class-api/api/syllabus');
        return res?.data?.data ?? [];
    },
    async createSyllabus(payload) {
        const body = {
            name: payload.name || "",
            description: payload.description || "",
            cost: typeof payload.cost === 'number' ? payload.cost : Number(payload.cost || 0),
            hoursOfSyllabus: typeof payload.hoursOfSyllabus === 'number' ? payload.hoursOfSyllabus : Number(payload.hoursOfSyllabus || 0),
        };

        const res = await axiosClient.post('/class-api/api/syllabus', body);
        return res?.data ?? null;
    },
    async updateSyllabus(payload) {
        const body = {
            id: Number(payload.id),
            name: payload.name || "",
            description: payload.description || "",
            cost: typeof payload.cost === 'number' ? payload.cost : Number(payload.cost || 0),
            hoursOfSyllabus: typeof payload.hoursOfSyllabus === 'number' ? payload.hoursOfSyllabus : Number(payload.hoursOfSyllabus || 0),
            isActive: (payload.isActive ?? "").toString()
        };

        const res = await axiosClient.put('/class-api/api/syllabus', body);
        return res?.data ?? null;
    },

    async createClass(payload) {
        const body = {
            startDate: payload.startDate,
            syllabusId: Number(payload.syllabusId),
            teacherId: Number(payload.teacherId),
            activities: (payload.activities || []).map(a => ({
                dayOfWeek: a.dayOfWeek,
                startTime: a.startTime,
                endTime: a.endTime,
            }))
        };

        const res = await axiosClient.post('/class-api/api/classes', body);
        return res?.data ?? null;
    },
    async getClassList() {
        const res = await axiosClient.get('/class-api/api/classes/list');
        return res?.data ?? null;
    },
    async getActiveSyllabuses() {
        const res = await axiosClient.get('/class-api/api/syllabus/list/active');
        return res?.data?.data ?? [];
    },
    async getTeacherList() {
        const res = await axiosClient.get('/auth-api/api/Hr/teacher');
        return res?.data ?? [];
    },
    async createTerm(payload) {
        const body = {
            startDate: payload.startDate,
            endDate: payload.endDate,
            classIds: payload.classIds || []
        };
        const res = await axiosClient.post('/class-api/api/term', body);
        return res?.data ?? null;
    },
    async getTermList() {
        const res = await axiosClient.get('/class-api/api/term/list');
        return res?.data ?? null;
    }
};

export default syllabusService;






