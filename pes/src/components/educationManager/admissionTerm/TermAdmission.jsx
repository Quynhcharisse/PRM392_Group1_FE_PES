import {useEffect, useState} from "react";
import {getTermList} from "@services/EducationService.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {viVN} from '@mui/x-date-pickers/locales';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import TermPage from "./TermPage.jsx";
import TermCreateForm from "./TermCreateForm.jsx";
import TermFormDetail from "./TermFormDetail.jsx";

export default function TermAdmission() {
    const [popUp, setPopUp] = useState({
        isOpen: false,
        type: '', // 'form' or 'view'
        term: null
    });

    const handleOpenPopUp = (type) => {
        setPopUp({...popUp, isOpen: true, type: type})
    }

    const handleClosePopUp = () => {
        setPopUp({...popUp, isOpen: false, type: ''})
        GetTerm(); //gọi lại api để cập nhật data
    }

    //tạo useState data của BE để sài (dành cho form)
    const [data, setData] = useState({
        terms: [],
    })

    const [selectedTerm, setSelectedTerm] = useState(null) // tuong trung cho 1 cai selected

    function HandleSelectedTerm(term) {
        setSelectedTerm(term)
    }

    //useEffcet sẽ chạy lần đầu tiên, or sẽ chạy khi có thay đổi
    useEffect(() => {
        //lấy data lên và lưu data vào getForm
        GetTerm()
    }, []);

    //gọi API form list //save trực tiếp data
    async function GetTerm() {
        const response = await getTermList()
        if (response && response.success) {
            setData({
                ...data,
                terms: response.data
            })
        }
    }

    const handleDetailClick = (term, type) => {
        HandleSelectedTerm(term);
        handleOpenPopUp('view');
    };

    const handleCreateClick = () => {
        handleOpenPopUp('form');
    };

    const handleCreateSuccess = () => {
        GetTerm();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'vi-VN'}
                              localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}>
            <TermPage
                terms={data.terms}
                onDetailClick={handleDetailClick}
                onCreateClick={handleCreateClick}
            />

            {popUp.isOpen && popUp.type === 'form' && (
                <TermCreateForm
                    isOpen={popUp.isOpen}
                    onClose={handleClosePopUp}
                    onSuccess={handleCreateSuccess}
                    existingTerms={data.terms}
                />
            )}
            {popUp.isOpen && popUp.type === 'view' && (
                <TermFormDetail
                    isOpen={popUp.isOpen}
                    onClose={handleClosePopUp}
                    selectedTerm={selectedTerm}
                    onRefresh={GetTerm}
                />
            )}
        </LocalizationProvider>
    );
}