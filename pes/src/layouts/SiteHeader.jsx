import '../styles/ui/SiteHeader.css'
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom'
import {useEffect, useMemo, useState} from 'react'
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography, Button, Chip} from '@mui/material'
import {
    Dashboard as DashboardIcon,
    Home as HomeIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    Storefront as StorefrontIcon,
    AccountCircle as AccountCircleIcon,
    Phone as PhoneIcon,
    ArrowForward as ArrowForwardIcon,
    PersonAdd as PersonAddIcon,
    School as SchoolIcon,
    Event as EventIcon,
    Groups as GroupsIcon,
    Info as InfoIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    Language as LanguageIcon
} from '@mui/icons-material'
import {enqueueSnackbar} from 'notistack'

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

    const role = useMemo(() => currentUser?.role || null, [currentUser])

    const displayName = currentUser?.name || currentUser?.fullName || currentUser?.displayName || 'Tài khoản'
    const avatarUrl = currentUser?.avatar || currentUser?.avatarUrl || currentUser?.photoURL || currentUser?.picture || ''
    
    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget)
    const handleCloseMenu = () => setAnchorEl(null)

    const handleLogout = async () => {
        try {
            localStorage.clear()
            enqueueSnackbar('Đã đăng xuất', {variant: 'success'})
            handleCloseMenu()
            navigate('/', {replace: true})
            setTimeout(() => window.location.reload(), 300)
        } catch (error) {
            enqueueSnackbar('Không thể đăng xuất. Vui lòng thử lại', {variant: 'error'})
        }
    }

    return (
        <div className="site-header" id="siteHeader">
            {/* Single Tier Header - MerryStar Style */}
            <div className="header__main-tier">
                <div className="container header__content">
                    {/* Left Side - Logo */}
                    <div className="header__brand-section">
                        <Link className="brand" to="/">
                            <div className="brand__logo">
                                <img src="/logo.png" alt="MerryStar Kindergarten Logo" />
                            </div>
                            <div className="brand__text">
                                <div className="brand__name">MerryStar</div>
                                <div className="brand__subtitle">KINDERGARTEN</div>
                            </div>
                        </Link>
                    </div>

                    {/* Center - Navigation Menu */}
                    <nav className="header__navigation">
                        <NavLink to="/gioi-thieu" className="nav__item">
                            <span>GIỚI THIỆU</span>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </NavLink>
                        <NavLink to="/doi-ngu" className="nav__item">
                            <span>ĐỘI NGŨ</span>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </NavLink>
                        <NavLink to="/chuong-trinh-giao-duc" className="nav__item">
                            <span>CHƯƠNG TRÌNH GIÁO DỤC</span>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </NavLink>
                        <NavLink to="/tuyen-sinh" className="nav__item">
                            <span>TUYỂN SINH</span>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </NavLink>
                        <NavLink to="/cham-soc-ket-noi" className="nav__item">
                            <span>CHĂM SÓC - KẾT NỐI</span>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </NavLink>
                        <NavLink to="/tin-tuc-su-kien" className="nav__item">
                            <span>TIN TỨC & SỰ KIỆN</span>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </NavLink>
                        <NavLink to="/lien-he" className="nav__item">
                            <span>LIÊN HỆ</span>
                        </NavLink>
                    </nav>

                    {/* Right Side - Language & CTA */}
                    <div className="header__right-section">
                        {/* CTA Button */}
                        <Button 
                            component={Link} 
                            to="/admission" 
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                                borderRadius: '25px',
                                px: 3,
                                py: 1,
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '14px',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #E55A2B, #E0841A)',
                                }
                            }}
                        >
                            ĐĂNG KÝ
                        </Button>

                        {/* User Authentication */}
                        {currentUser && (
                            <Box sx={{display: 'flex', alignItems: 'center', ml: 2}}>
                                <IconButton
                                    onClick={handleOpenMenu}
                                    title={displayName}
                                    sx={{p: 0}}
                                >
                                    {avatarUrl ? (
                                        <Avatar 
                                            src={avatarUrl} 
                                            sx={{
                                                width: 36, 
                                                height: 36, 
                                                borderRadius: '50%',
                                                border: '2px solid #fff',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                            }}
                                        />
                                    ) : (
                                        <AccountCircleIcon 
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                color: '#666',
                                                backgroundColor: '#f5f5f5',
                                                borderRadius: '50%',
                                                border: '2px solid #fff',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
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
                                        <Typography variant="subtitle2" sx={{fontWeight: 700}}>{displayName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
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
                                        <ListItemIcon><LogoutIcon fontSize="small"/></ListItemIcon>
                                        Đăng xuất
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


