import {refreshToken} from "../services/AuthService.jsx";
import {useEffect, useState} from "react";
import {signOut} from "../services/AccountService.jsx";

// async function GetAccessData() {
//     const response = await getAccess()
//     if (response && response.status === 200) {
//         return response.data.body
//     } else {
//         return null
//     }
// }

async function Logout() {
    signOut().then(res => {
        if (res && res.status === 200) {
            if (localStorage.length > 0) {
                localStorage.clear();
            }
            if (sessionStorage.length > 0) {
                sessionStorage.clear()
            }
            setTimeout(() => {
                window.location.href = "/login"
            }, 1000)
        }
    })
}

// async function CheckIfRoleValid(allowRoles, role) {
//     return !!allowRoles.includes(role);
// }

export default function ProtectedRoute({children, allowRoles = []}) {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasValidRole, setHasValidRole] = useState(false);


    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                setIsLoading(true);
                // const data = await GetAccessData();
                //
                // if (data != null) {
                //     const isValidRole = await CheckIfRoleValid(allowRoles, data.role);
                //     if (isValidRole) {
                //         setIsAuthenticated(true);
                //         setHasValidRole(true);
                //         setIsLoading(false);
                //         return;
                //     } else {
                //         // Role không hợp lệ
                //         await Logout();
                //         return;
                //     }
                // }

                // Nếu không có data, thử refresh token
                const refreshResponse = await refreshToken();
                if (refreshResponse.status === 401 || refreshResponse.status === 403) {
                    await Logout()
                    return;
                }

                // Thử lấy data lại sau khi refresh
                // const retryData = await GetAccessData();
                // if (retryData != null) {
                //     const isValidRole = await CheckIfRoleValid(allowRoles, retryData.role);
                //     if (isValidRole) {
                //         setIsAuthenticated(true);
                //         setHasValidRole(true);
                //         setIsLoading(false);
                //         return;
                //     } else {
                //         await Logout();
                //         return;
                //     }
                // }

                // Nếu vẫn không có data hợp lệ
                // await Logout();

                setHasValidRole(true);
            } catch (error) {
                console.error("Authentication error:", error);
                //await Logout();
                try { localStorage.clear(); } catch { console.error("Authentication error:", error)}
                try { sessionStorage.clear(); } catch {console.error("Authentication error:", error)}
                window.location.replace("/login")
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication()
    }, [allowRoles])

    // Loading state
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px',
                color: '#666'
            }}>
                Authentication...
            </div>
        )
    }

    // // Nếu đã xác thực và có role hợp lệ, render children
    // if (isAuthenticated && hasValidRole) {
    //     return children;
    // }

    // Nếu không xác thực, không render gì (sẽ redirect)
    return hasValidRole ? (children ?? null) : null
    // return null;
}