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
            const userRole = String(user?.role || '').toUpperCase()
            const allowed = allowRoles.map(r => String(r).toUpperCase())
            if (allowed.length > 0 && !allowed.some(r => userRole === r || userRole.includes(r) || r.includes(userRole))) {
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: '#666'
            }}>Checking...</div>
        )
    }

    if (!authorized) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    return children
}