import {useEffect, useState} from "react";
import {getFormTracking} from "@/api/services/admissionService.js";
import ProcessFormPage from "./ProcessFormPage.jsx";
import ProcessFormDetail from "./ProcessFormDetail.jsx";


export default function ProcessForm() {
    // luu nhung bien cuc bi
    const [popUp, setPopup] = useState({
        isOpen: false,
        type: ''
    });

    const [formList, setFormList] = useState([])

    const [selectedForm, setSelectedForm] = useState(null) // tuong trung cho 1 cai selected

    function HandleSelectedForm(form) {
        setSelectedForm(form)
    }

    const handleOpenPopup = (type) => {
        setPopup({...popUp, isOpen: true, type: type});
    }

    const handleClosePopup = () => {
        setPopup({...popUp, isOpen: false, type: ''});
        GetFormByAdmission()
    }

    const handleDetailClick = (form) => {
        HandleSelectedForm(form);
        handleOpenPopup('detail');
    }

    async function GetFormByAdmission() {
        try {
            const response = await getFormTracking()
//             console.log("API Response:", response);
            if (response && response.success) {
//                 console.log("Setting form list:", response.data);
                setFormList(response.data)
            } else {
//                 console.error("API call failed:", response);
            }
        } catch (error) {
//             console.error("Error fetching forms:", error);
        }
    }

    //useEffcet sẽ chạy lần đầu tiên, or sẽ chạy khi có thay đổi
    useEffect(() => {
//         console.log("Component mounted, fetching forms...");
        GetFormByAdmission()
    }, [])

    return (
        <>
            <ProcessFormPage
                forms={formList}
                onDetailClick={handleDetailClick}
            />

            <ProcessFormDetail
                isOpen={popUp.isOpen && popUp.type === 'detail'}
                onClose={handleClosePopup}
                selectedForm={selectedForm}
            />
        </>
    )
}