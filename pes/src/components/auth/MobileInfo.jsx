import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "@services/AuthService.jsx";

export default function MobileInfo() {
    const navigate = useNavigate();
    
    const handleBackToHome = () => {
        // Clear all sessionStorage data (primary)
        sessionStorage.clear();
        // Clear all localStorage data (backup)
        localStorage.clear();
        // Clear cookies
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        // Dispatch event to notify SiteHeader
        window.dispatchEvent(new CustomEvent('userLoggedOut'));
        window.location.href = '/';
    };
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg,rgb(227, 210, 203) 0%,rgb(230, 226, 225) 50%,rgb(237, 237, 237) 100%)",
                p: 2
            }}
        >
            <Paper elevation={8} sx={{ p: 4, maxWidth: 560, textAlign: "center", borderRadius: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                    Please use the Mobile App
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                    Parents and Teachers should perform actions in the mobile application. If you
                    need web access, please contact the administrator.
                </Typography>
                <Button variant="contained" onClick={handleBackToHome}>
                    Back to Home
                </Button>
            </Paper>
        </Box>
    );
}


