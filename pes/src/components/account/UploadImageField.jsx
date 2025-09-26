import {useRef, useState} from 'react';
import {Alert, Avatar, Box, Button, CircularProgress, IconButton, Typography} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
    PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import {uploadToCloudinary} from './cloudinaryUpload.js';

export default function UploadImageField({
                                             value,
                                             onChange,
                                             error,
                                             disabled = false,
                                             size = 120,
                                             name = "User"
                                         }) {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);
    const abortControllerRef = useRef(null);

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setUploadError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Image size must be less than 5MB');
            return;
        }

        try {
            setUploading(true);
            setUploadError('');
            setUploadProgress(0);

            // Create abort controller for cancellation
            abortControllerRef.current = new AbortController();

            const imageUrl = await uploadToCloudinary(file, {
                onProgress: setUploadProgress,
                signal: abortControllerRef.current.signal
            });

            onChange(imageUrl);
            setUploadProgress(100);
        } catch (error) {
            if (error.name === 'AbortError') {
                setUploadError('Upload cancelled');
            } else {
                setUploadError('Failed to upload image. Please try again.');
            }
        } finally {
            setUploading(false);
            abortControllerRef.current = null;
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemoveImage = () => {
        onChange('');
        setUploadError('');
        setUploadProgress(0);
    };

    const handleCancelUpload = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const brandColor = '#0038A5';

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
            {/* Avatar Preview */}
            <Box sx={{position: 'relative'}}>
                <Avatar
                    src={value || undefined}
                    sx={{
                        width: size,
                        height: size,
                        fontSize: size / 3,
                        fontWeight: 600,
                        background: value
                            ? 'transparent'
                            : `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}CC 100%)`,
                        border: error ? '2px solid #f44336' : `2px solid ${brandColor}20`,
                        transition: 'all 0.3s ease'
                    }}
                >
                    {!value && name.charAt(0).toUpperCase()}
                </Avatar>

                {/* Upload Progress Overlay */}
                {uploading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderRadius: '50%',
                            color: 'white'
                        }}
                    >
                        <Box sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CircularProgress
                                variant="determinate"
                                value={uploadProgress}
                                size={40}
                                sx={{color: 'white'}}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    position: 'absolute',
                                    fontSize: '0.7rem',
                                    fontWeight: 600
                                }}
                            >
                                {uploadProgress}%
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* Remove Button */}
                {value && !uploading && (
                    <IconButton
                        onClick={handleRemoveImage}
                        disabled={disabled}
                        sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            backgroundColor: '#f44336',
                            color: 'white',
                            width: 24,
                            height: 24,
                            '&:hover': {
                                backgroundColor: '#d32f2f'
                            }
                        }}
                    >
                        <DeleteIcon sx={{fontSize: '0.8rem'}}/>
                    </IconButton>
                )}
            </Box>

            {/* Upload Controls */}
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
                {uploading ? (
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
                        <Typography variant="body2" color="text.secondary">
                            Uploading... {uploadProgress}%
                        </Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleCancelUpload}
                            sx={{borderRadius: 2, textTransform: 'none'}}
                        >
                            Cancel
                        </Button>
                    </Box>
                ) : (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            disabled={disabled}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={disabled}
                            startIcon={value ? <PhotoCameraIcon/> : <CloudUploadIcon/>}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                borderColor: brandColor,
                                color: brandColor,
                                '&:hover': {
                                    borderColor: brandColor,
                                    backgroundColor: `${brandColor}08`
                                }
                            }}
                        >
                            {value ? 'Change Avatar' : 'Upload Avatar'}
                        </Button>
                        <Typography variant="caption" color="text.secondary" sx={{textAlign: 'center'}}>
                            JPG, PNG up to 5MB
                        </Typography>
                    </>
                )}
            </Box>

            {/* Error Message */}
            {uploadError && (
                <Alert severity="error" sx={{width: '100%', borderRadius: 2}}>
                    {uploadError}
                </Alert>
            )}

            {/* Field Error */}
            {error && (
                <Typography variant="caption" color="error" sx={{textAlign: 'center'}}>
                    {error}
                </Typography>
            )}
        </Box>
    );
}


