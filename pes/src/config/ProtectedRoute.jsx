
import {useEffect, useState} from "react";
import {Navigate, useLocation} from 'react-router-dom'

export default function ProtectedRoute({children, allowRoles = []}) {
    const location = useLocation()
    const [checking, setChecking] = useState(true)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        try {
            setChecking(true)
            const raw = localStorage.getItem('user')
            if (!raw) {
                setAuthorized(false)
                return
            }
            const user = JSON.parse(raw)
            if (allowRoles.length > 0 && !allowRoles.includes(user?.role)) {
                setAuthorized(false)
                return
            }
            setAuthorized(true)
        } catch (e) {
            setAuthorized(false)
        } finally {
            setChecking(false)
        }
    }, [allowRoles, location.pathname])

    if (checking) {
        return (
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',color:'#666'}}>Đang kiểm tra...</div>
        )
    }

    if (!authorized) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}