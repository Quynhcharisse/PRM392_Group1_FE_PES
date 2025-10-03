import {Button} from '@mui/material';

export default function ButtonCancel({
                                         onClick,
                                         startIcon,
                                         endIcon,
                                         disabled = false,
                                         ...props
                                     }) {
    return (
        <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={onClick}
            startIcon={startIcon}
            endIcon={endIcon}
            disabled={disabled}
            sx={{borderRadius: 2, textTransform: 'none', fontWeight: 600}}
            {...props}
        >
           Cancel
        </Button>
    );
}


