import {Box, Typography} from "@mui/material";
import ProcessFormTable from "./ProcessFormTable.jsx";

export default function ProcessFormPage({forms, onDetailClick}) {
    return (
        <Box sx={{
            width: '100%',
            minHeight: '100vh',
            background: '#f7f7f9',
            py: 4,
            px: {xs: 1, sm: 4, md: 8},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: 1200,
                mb: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography variant="h4" sx={{
                    fontWeight: 'bold',
                    color: '#07663a',
                    mb: 1,
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    letterSpacing: 1
                }}>
                    Process Admission
                </Typography>
                <Typography variant="subtitle1" sx={{color: '#6b7280', mb: 2, textAlign: 'center'}}>
                    Manage and review admission forms submitted by parents
                </Typography>
            </Box>
            <Box sx={{width: '100%', maxWidth: 1200}}>
                <ProcessFormTable
                    forms={forms}
                    onDetailClick={onDetailClick}
                />
            </Box>
        </Box>
    )
}
