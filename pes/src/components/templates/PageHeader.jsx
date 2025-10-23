import React from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    Breadcrumbs,
    Link,
    Divider,
    Chip
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

/**
 * @param {String} title - Main page title (required)
 * @param {String} subtitle - Optional subtitle/description
 * @param {ReactNode} icon - Icon to display next to title
 * @param {Array} breadcrumbs - Breadcrumb items
 * @param {Array} actions - Array of action buttons
 * @param {ReactNode} children - Additional custom content
 * @param {ReactNode} children - Additional custom content
 * @param {Object} sx - Additional styles
 * @param {String|ReactNode} badge - Badge to display (text or component)
 */
export default function PageHeader({
    title,
    subtitle,
    icon,
    breadcrumbs = [],
    actions = [],
    children,
    sx = {},
    badge
}) {
    return (
        <Box
            sx={{
                mb: 4,
                p: 3,
                background: 'linear-gradient(135deg, #1e88e5 0%, #5e35b1 100%)',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                color: 'white',
                ...sx
            }}
        >
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.7)' }} />}
                    sx={{ mb: 2 }}
                >
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        return isLast ? (
                            <Typography
                                key={index}
                                color="white"
                                sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
                            >
                                {crumb.icon}
                                {crumb.label}
                            </Typography>
                        ) : (
                            <Link
                                key={index}
                                underline="hover"
                                color="rgba(255,255,255,0.9)"
                                href={crumb.href}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    '&:hover': { color: 'white' }
                                }}
                            >
                                {crumb.icon || (index === 0 && <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />)}
                                {crumb.label}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            )}

            {/* Header Content */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
            >
                {/* Title Section */}
                <Box flex={1}>
                    <Stack direction="row" alignItems="center" spacing={1.5} mb={subtitle ? 1 : 0}>
                        {icon && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                {icon}
                            </Box>
                        )}
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    sx={{
                                        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                        letterSpacing: '-0.5px'
                                    }}
                                >
                                    {title}
                                </Typography>
                                {badge && (
                                    typeof badge === 'string' ? (
                                        <Chip
                                            label={badge}
                                            size="small"
                                            sx={{
                                                bgcolor: 'rgba(255,255,255,0.3)',
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                    ) : badge
                                )}
                            </Stack>
                            {subtitle && (
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'rgba(255,255,255,0.9)',
                                        mt: 0.5
                                    }}
                                >
                                    {subtitle}
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                </Box>

                {/* Actions Section */}
                {actions.length > 0 && (
                    <Stack direction="row" spacing={1.5}>
                        {actions.map((action, index) => (
                            <Button
                                key={index}
                                variant={action.variant || 'contained'}
                                color={action.color || 'primary'}
                                onClick={action.onClick}
                                disabled={action.disabled}
                                startIcon={action.icon}
                                sx={{
                                    bgcolor: action.variant === 'contained' ? 'white' : 'transparent',
                                    color: action.variant === 'contained' ? '#1976d2' : 'white',
                                    border: action.variant === 'outlined' ? '2px solid white' : 'none',
                                    fontWeight: 600,
                                    px: 3,
                                    py: 1,
                                    borderRadius: 2,
                                    boxShadow: action.variant === 'contained' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                                    '&:hover': {
                                        bgcolor: action.variant === 'contained' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                                    },
                                    transition: 'all 0.3s ease',
                                    ...action.sx
                                }}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </Stack>
                )}
            </Stack>

            {/* Custom Children Content */}
            {children && (
                <>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                    {children}
                </>
            )}
        </Box>
    );
}

