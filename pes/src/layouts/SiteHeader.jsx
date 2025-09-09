import '../styles/ui/SiteHeader.css'
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom'
import {useEffect, useMemo, useState} from 'react'
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography} from '@mui/material'
import {
    Dashboard as DashboardIcon,
    Home as HomeIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    Storefront as StorefrontIcon,
    AccountCircle as AccountCircleIcon,
    FavoriteBorder as FavoriteBorderIcon,
    LocalGroceryStore as LocalGroceryStoreIcon,
    NotificationsActive as NotificationsActiveIcon,
    Phone as PhoneIcon,
    ArrowForward as ArrowForwardIcon,
    PersonAdd as PersonAddIcon,
    School as SchoolIcon,
    Event as EventIcon,
    Groups as GroupsIcon,
    Info as InfoIcon
} from '@mui/icons-material'
import {enqueueSnackbar} from 'notistack'
import {getCookie} from '../utils/CookieUtil.jsx'
import {jwtDecode} from 'jwt-decode'
import {signOut} from '../services/AccountService.jsx'
import { NotificationDisplay } from '../services/NotificationService.jsx';

export default function SiteHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [anchorEl, setAnchorEl] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const menuOpen = Boolean(anchorEl)

    useEffect(() => {
        const raw = localStorage.getItem('user')

        if (!raw || raw === 'undefined') {
            setCurrentUser(null)
            return
        }

        try {
            const parsed = JSON.parse(raw)
            setCurrentUser(parsed || null)
        } catch (error) {
            setCurrentUser(null)
            localStorage.removeItem('user') // Xóa dữ liệu không hợp lệ
        }
    }, [location.pathname])

    const role = useMemo(() => {
        try {
            const access = getCookie('access')
            if (!access) return null
            const decoded = jwtDecode(access)
            return decoded?.role || null
        } catch (error) {
            return null
        }
    }, [currentUser])

    const displayName = currentUser?.name || currentUser?.fullName || currentUser?.displayName || 'Tài khoản'
    const avatarUrl = currentUser?.avatar || currentUser?.avatarUrl || currentUser?.photoURL || currentUser?.picture || ''
    
    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget)
    const handleCloseMenu = () => setAnchorEl(null)

    const handleLogout = async () => {
        try {
            await signOut()
            localStorage.clear()
            enqueueSnackbar('Đã đăng xuất', {variant: 'success'})
            handleCloseMenu()
            navigate('/', {replace: true})
            // Reload to refresh header state derived from storage/cookies
            setTimeout(() => window.location.reload(), 300)
        } catch (error) {
            enqueueSnackbar('Không thể đăng xuất. Vui lòng thử lại', {variant: 'error'})
        }
    }

    return (
        <div className="site-header" id="siteHeader">
            {/* Top Tier - Utility Bar */}
            <div className="header__top-tier">
                <div className="container header__top-content">
                    {/* Left Side - Logo and Name */}
                    <div className="header__brand-section">
                        <Link className="brand" to="/">
                            <span className="brand__logo" aria-hidden>
                                <img src="/SUNSHINE.png" alt="SUNSHINE"/>
                            </span>
                            <div className="brand__text">
                                <div className="brand__name">SUNSHINE</div>
                                <div className="brand__subtitle">SUNSHINE PRESCHOOL</div>
                            </div>
                        </Link>
                    </div>

                    {/* Right Side - Utility and Auth */}
                    <div className="header__right-section">
                        <div className="header__utilities">
                            <div className="hotline">
                                <PhoneIcon />
                                <span>Hotline: 1900-1234</span>
                            </div>
                        </div>

                        {/* User Authentication */}
                        <div className="header__auth">
                        {!currentUser ? (
                            <>
                                <Link to="/login" className="auth__link">
                                    <span>Sign In</span>
                                    <ArrowForwardIcon />
                                </Link>
                                <Link to="/register" className="auth__link auth__link--signup">
                                    <PersonAddIcon />
                                    <span>Sign Up</span>
                                </Link>
                            </>
                        ) : (
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <IconButton
                                    className="header__icon"
                                    onClick={handleOpenMenu}
                                    title={displayName}
                                    sx={{p: 0}}
                                >
                                    {avatarUrl ? (
                                        <Avatar 
                                            src={avatarUrl} 
                                            sx={{
                                                width: 44, 
                                                height: 44, 
                                                borderRadius: '50%',
                                                border: '1px solid #e0e0e0',
                                                backgroundColor: '#fff'
                                            }}
                                        />
                                    ) : (
                                        <AccountCircleIcon 
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                color: '#666',
                                                backgroundColor: '#f5f5f5',
                                                borderRadius: '50%',
                                                border: '1px solid rgba(0, 0, 0, 0.12)'
                                            }}
                                        />
                                    )}
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={menuOpen}
                                    onClose={handleCloseMenu}
                                    onClick={handleCloseMenu}
                                    slotProps={{paper: {elevation: 3, sx: {mt: 1.5, minWidth: 220}}}}
                                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <Box sx={{px: 2, pt: 1, pb: 1}}>
                                        <Typography variant="subtitle2"
                                                    sx={{fontWeight: 700}}>{displayName}</Typography>
                                        <Typography variant="caption" className="muted">
                                            {currentUser?.email || 'Đã đăng nhập'}
                                        </Typography>
                                    </Box>
                                    <Divider/>
                                    <MenuItem onClick={() => {
                                        if (role === 'BUYER') {
                                            navigate('/buyer/profile')
                                        } else if (role === 'SELLER') {
                                            navigate('/seller/profile')
                                        } else if (role === 'ADMIN') {
                                            navigate('/admin/profile')
                                        } else {
                                            navigate('/profile')
                                        }
                                    }}>
                                        <ListItemIcon><PersonIcon fontSize="small"/></ListItemIcon>
                                        Hồ sơ của tôi
                                    </MenuItem>
                                    {role === 'BUYER' && (
                                        <MenuItem onClick={() => navigate('/')}>
                                            <ListItemIcon><HomeIcon fontSize="small"/></ListItemIcon>
                                            Trang sản phẩm
                                        </MenuItem>
                                    )}
                                    {role === 'ADMIN' && (
                                        <MenuItem onClick={() => navigate('/admin/dashboard')}>
                                            <ListItemIcon><DashboardIcon fontSize="small"/></ListItemIcon>
                                            Admin Dashboard
                                        </MenuItem>
                                    )}
                                    {role === 'SELLER' && (
                                        <MenuItem onClick={() => navigate('/seller/dashboard')}>
                                            <ListItemIcon><StorefrontIcon fontSize="small"/></ListItemIcon>
                                            Kênh người bán
                                        </MenuItem>
                                    )}

                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small"/>
                                        </ListItemIcon>
                                        Đăng xuất
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Tier - Main Navigation Bar */}
            <div className="header__bottom-tier">
                <div className="container">
                    <nav className="main-nav" aria-label="Điều hướng chính">
                        <NavLink to="/" end className="nav__item">
                            <HomeIcon />
                            <span>HOME</span>
                        </NavLink>
                        <NavLink to="/admission" className="nav__item">
                            <SchoolIcon />
                            <span>ADMISSION</span>
                        </NavLink>
                        <NavLink to="/events" className="nav__item">
                            <EventIcon />
                            <span>EVENTS</span>
                        </NavLink>
                        <NavLink to="/classes" className="nav__item">
                            <GroupsIcon />
                            <span>CLASSES</span>
                        </NavLink>
                        <NavLink to="/about" className="nav__item">
                            <InfoIcon />
                            <span>ABOUT US</span>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </div>
    )
}


