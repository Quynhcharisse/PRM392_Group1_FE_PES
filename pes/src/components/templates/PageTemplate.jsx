import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';

/**
 * PageTemplate - Simple page wrapper with title and content
 * 
 * @param {String} title - Page title
 * @param {String} subtitle - Optional subtitle
 * @param {JSX.Element} actions - Optional action buttons
 * @param {ReactNode} children - Page content
 * @param {Object} sx - Additional styles
 */
export default function PageTemplate({ 
    title, 
    subtitle, 
    actions, 
    children, 
    sx = {} 
}) {
    return (
        <Box sx={{ p: 3, ...sx }}>
            {/* Header Section */}
            {(title || subtitle || actions) && (
                <>
                    <Stack 
                        direction={{ xs: 'column', sm: 'row' }} 
                        justifyContent="space-between" 
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={2}
                        mb={3}
                    >
                        <Box>
                            {title && (
                                <Typography 
                                    variant="h4" 
                                    fontWeight={700}
                                    sx={{ 
                                        mb: subtitle ? 1 : 0,
                                        background: 'linear-gradient(135deg, #1e88e5 0%, #5e35b1 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                >
                                    {title}
                                </Typography>
                            )}
                            {subtitle && (
                                // <Typography variant="body1" color="text.secondary">
                                //
                                // </Typography>
                                <>
                                    {subtitle}
                                </>

                            )}
                        </Box>
                        {actions && (
                            <Box>
                                {actions}
                            </Box>
                        )}
                    </Stack>
                    <Divider sx={{ mb: 3 }} />
                </>
            )}

            {/* Content Section */}
            <Box>
                {children}
            </Box>
        </Box>
    );
}

