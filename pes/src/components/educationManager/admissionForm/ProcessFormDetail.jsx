import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {Close} from '@mui/icons-material';
import {useState} from "react";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {processAdmissionForm} from "@/api/services/admissionService.js";
import {parseISO} from "date-fns";
import {enqueueSnackbar} from "notistack";
import LoadingOverlay from "@/components/none-shared/LoadingOverlay.jsx";

export default function ProcessFormDetail({isOpen, onClose, selectedForm}) {
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        type: '',
        reason: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    async function HandleProcessForm(isApproved, reason) {
        setIsProcessing(true);
        try {
            const response = await processAdmissionForm(selectedForm.id, isApproved, reason);

            if (response && response.success) {
                enqueueSnackbar(
                    isApproved ? "Approved successfully" : "Rejected successfully",
                    {variant: "success"}
                );
                onClose();
            } else {
                enqueueSnackbar(
                    isApproved ? "Approval failed" : "Rejection failed",
                    {variant: "error"}
                );
            }
        } catch (error) {
            enqueueSnackbar(
                "An error occurred while processing the form",
                {variant: "error"}
            );
        } finally {
            setIsProcessing(false);
            setConfirmDialog({open: false, type: '', reason: ''});
        }
    }

    // Hàm tính grade dựa trên tuổi
    const getGradeByAge = (dateOfBirth) => {
        if (!dateOfBirth) return '';
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age === 3) return 'SEED';
        if (age === 4) return 'BUD';
        if (age === 5) return 'LEAF';
        return '';
    };

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={onClose}
        >
            <LoadingOverlay open={isProcessing}
                            message={confirmDialog.type === 'approve' ? 'Approving form...' : 'Rejecting form...'}/>

            <AppBar sx={{position: 'relative', bgcolor: '#07663a'}}>
                <Toolbar>
                    <IconButton edge="start"
                                color="inherit"
                                onClick={onClose}
                                aria-label="close">
                        <Close/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Admission Form Detail
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box p={4}>
                <Typography
                    variant='subtitle1'
                    sx={{mb: 2, fontWeight: 'bold', fontSize: "2.5rem", textAlign: "center"}}
                >
                    Form Information
                </Typography>

                <Stack spacing={3}>
                    <Stack>
                        <TextField fullWidth label='Child name' disabled value={selectedForm?.studentName || ''}/>
                    </Stack>
                    <Stack>
                        <FormControl>
                            <FormLabel sx={{color: 'black'}} disabled>Gender</FormLabel>
                            <RadioGroup row value={selectedForm?.studentGender || ''}>
                                <FormControlLabel value="female" control={<Radio/>} label="Female"
                                                  sx={{color: 'black'}} disabled/>
                                <FormControlLabel value="male" control={<Radio/>} label="Male"
                                                  sx={{color: 'black'}} disabled/>
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                    {/* Date of birth và Grade trên cùng 1 hàng */}
                    <Stack direction="row" spacing={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker label='Date of birth' disabled
                                        value={selectedForm?.studentDateOfBirth ? parseISO(selectedForm.studentDateOfBirth.toString()) : null}
                            />
                        </LocalizationProvider>
                        <TextField fullWidth label={'Grade'} disabled
                                   value={getGradeByAge(selectedForm?.studentDateOfBirth)}/>
                    </Stack>
                    <Stack>
                        <TextField fullWidth label={'Place of birth'} disabled
                                   value={selectedForm?.studentPlaceOfBirth || ''}/>
                    </Stack>

                    <Stack>
                        <TextField fullWidth label={'Household registration address'} disabled
                                   value={selectedForm?.householdRegistrationAddress || ''}/>
                    </Stack>

                    <Stack>
                        <TextField fullWidth label={'Note'} disabled value={selectedForm?.note || ''}/>
                    </Stack>
                    <Stack>
                        <TextField fullWidth label={'Cancel reason'} disabled value={selectedForm?.cancelReason || ''}/>
                    </Stack>

                    <Typography variant="subtitle1" sx={{mt: 5, mb: 2, fontWeight: 'bold'}}>Uploaded
                        Documents</Typography>
                    <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
                        {[
                            {label: "Profile Image", src: selectedForm?.profileImage},
                            {label: "Household Registration", src: selectedForm?.householdRegistrationImg},
                            {label: "Birth Certificate", src: selectedForm?.birthCertificateImg},
                            {label: "Child Characteristics Form", src: selectedForm?.childCharacteristicsFormImg},
                            {label: "Commitment", src: selectedForm?.commitmentImg}
                        ].map((item, idx) => (
                            <Paper key={idx} elevation={2} sx={{p: 2, borderRadius: 2, width: 200}}>
                                <Typography variant="body2" fontWeight="bold" sx={{mb: 1}}>{item.label}</Typography>

                                {/*thay vì click="ảnh" redirect sang link khác*/}
                                {/*vì giải quyết vấn đề hiện model thôi*/}
                                <img
                                    src={item.src}
                                    alt={item.label}
                                    style={{width: '100%', borderRadius: 8, cursor: 'pointer'}}
                                    onClick={() => {
                                        setSelectedImage(item.src);
                                        setOpenImage(true);
                                    }}
                                />

                                <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="md">
                                    <img src={selectedImage} style={{width: '100%'}} alt="Zoom"/>
                                </Dialog>
                            </Paper>
                        ))}
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <Stack sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        gap: '1rem',
                        marginTop: '2vh',
                    }}>
                        <Button sx={{width: '8%', height: '5vh'}}
                                variant="contained"
                                color="warning"
                                onClick={onClose}>
                            Close
                        </Button>

                        {selectedForm?.status === "pending approval" && (
                            <>
                                <Button
                                    sx={{width: '8%', height: '5vh'}}
                                    variant="contained"
                                    color="success"
                                    onClick={() => setConfirmDialog({open: true, type: 'approve', reason: ''})}
                                >
                                    Approve
                                </Button>
                                <Button
                                    sx={{width: '8%', height: '5vh'}}
                                    variant="contained"
                                    color="error"
                                    onClick={() => setConfirmDialog({open: true, type: 'reject', reason: ''})}
                                >
                                    Reject
                                </Button>
                            </>
                        )}

                    </Stack>
                    <Dialog open={confirmDialog.open}
                            onClose={() => setConfirmDialog({open: false, type: '', reason: ''})}>
                        <Box p={3} width={500}>
                            <Stack spacing={3}>
                                <Typography variant="h6" fontWeight="bold"
                                            color={confirmDialog.type === 'approve' ? '#07663a' : '#dc3545'}>
                                    {confirmDialog.type === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
                                </Typography>

                                <Typography variant="body2" sx={{whiteSpace: 'pre-line'}}>
                                    {confirmDialog.type === 'approve'
                                        ? 'Are you sure you want to approve this admission form?\nThis action cannot be undone.'
                                        : 'Are you sure you want to reject this form?\nPlease enter a reason below.'}
                                </Typography>

                                {confirmDialog.type === 'reject' && (
                                    <TextField
                                        multiline
                                        minRows={3}
                                        label="Reason for rejection"
                                        placeholder="Enter reason..."
                                        fullWidth
                                        value={confirmDialog.reason}
                                        onChange={(e) =>
                                            setConfirmDialog(prev => ({...prev, reason: e.target.value}))
                                        }
                                    />
                                )}

                                <Stack direction="row" spacing={2} justifyContent="flex-end">
                                    <Button
                                        onClick={() => setConfirmDialog({open: false, type: '', reason: ''})}
                                        disabled={isProcessing}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color={confirmDialog.type === 'approve' ? 'success' : 'error'}
                                        onClick={() => {
                                            const isApproved = confirmDialog.type === 'approve';
                                            const reason = isApproved ? '' : confirmDialog.reason.trim();

                                            if (!isApproved && reason === '') {
                                                enqueueSnackbar("Please enter a reason for rejection.", {variant: "warning"});
                                                return;
                                            }
                                            HandleProcessForm(isApproved, reason);
                                        }}
                                        disabled={isProcessing}
                                        startIcon={isProcessing ? <CircularProgress size={20}/> : null}
                                    >
                                        {isProcessing ? (confirmDialog.type === 'approve' ? 'Approving...' : 'Rejecting...') : 'Confirm'}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Dialog>
                </Stack>
            </Box>
        </Dialog>
    )
}