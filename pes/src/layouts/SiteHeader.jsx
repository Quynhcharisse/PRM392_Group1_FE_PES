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
    Language as LanguageIcon,
        ArrowDropDown as ArrowDropDownIcon,
    Description as DescriptionIcon
} from '@mui/icons-material'
import {enqueueSnackbar} from 'notistack'

export default function SiteHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [anchorEl, setAnchorEl] = useState(null)
    const [introMenuAnchor, setIntroMenuAnchor] = useState(null)
    const [teamMenuAnchor, setTeamMenuAnchor] = useState(null)
    const [educationMenuAnchor, setEducationMenuAnchor] = useState(null)
    const [tuyenSinhMenuAnchor, setTuyenSinhMenuAnchor] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const menuOpen = Boolean(anchorEl)
    const introMenuOpen = Boolean(introMenuAnchor)
    const teamMenuOpen = Boolean(teamMenuAnchor)
    const educationMenuOpen = Boolean(educationMenuAnchor)
    const tuyenSinhMenuOpen = Boolean(tuyenSinhMenuAnchor)

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
    
    const handleOpenIntroMenu = (event) => setIntroMenuAnchor(event.currentTarget)
    const handleCloseIntroMenu = () => setIntroMenuAnchor(null)
    
    const handleOpenTeamMenu = (event) => setTeamMenuAnchor(event.currentTarget)
    const handleCloseTeamMenu = () => setTeamMenuAnchor(null)
    
    const handleOpenEducationMenu = (event) => setEducationMenuAnchor(event.currentTarget)
    const handleCloseEducationMenu = () => setEducationMenuAnchor(null)
    
    const handleOpenTuyenSinhMenu = (event) => setTuyenSinhMenuAnchor(event.currentTarget)
    const handleCloseTuyenSinhMenu = () => setTuyenSinhMenuAnchor(null)
    
    const handleIntroMenuClick = (tabIndex) => {
        handleCloseIntroMenu()
        // Navigate to home page and scroll to specific intro tab
        navigate('/')
        setTimeout(() => {
            // Trigger intro tab change by dispatching a custom event
            window.dispatchEvent(new CustomEvent('changeIntroTab', { detail: { tabIndex } }))
        }, 100)
    }
    
    const handleTeamMenuClick = (tabIndex) => {
        handleCloseTeamMenu()
        // Navigate to home page and scroll to specific team tab
        navigate('/')
        setTimeout(() => {
            // Trigger team tab change by dispatching a custom event
            window.dispatchEvent(new CustomEvent('changeTeamTab', { detail: { tabIndex } }))
        }, 100)
    }
    
    const handleEducationMenuClick = (tabIndex) => {
        handleCloseEducationMenu()
        // Navigate to home page and scroll to specific education tab
        navigate('/')
        setTimeout(() => {
            // Trigger education tab change by dispatching a custom event
            window.dispatchEvent(new CustomEvent('changeEducationTab', { detail: { tabIndex } }))
        }, 100)
    }
    
    const handleTuyenSinhMenuClick = (tabIndex) => {
        handleCloseTuyenSinhMenu()
        // Navigate to home page and scroll to specific tuyen sinh tab
        navigate('/')
        setTimeout(() => {
            // Trigger tuyen sinh tab change by dispatching a custom event
            window.dispatchEvent(new CustomEvent('changeTuyenSinhTab', { detail: { tabIndex } }))
        }, 100)
    }

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
                        <Box
                            className="nav__item"
                            onClick={handleOpenIntroMenu}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            <span>GIỚI THIỆU</span>
                            <ArrowDropDownIcon fontSize="small" />
                        </Box>
                        
                        {/* Introduction Dropdown Menu */}
                        <Menu
                            anchorEl={introMenuAnchor}
                            open={introMenuOpen}
                            onClose={handleCloseIntroMenu}
                            slotProps={{
                                paper: {
                                    elevation: 3,
                                    sx: {
                                        mt: 1,
                                        minWidth: 280,
                                        borderRadius: 2,
                                        '& .MuiMenuItem-root': {
                                            px: 2,
                                            py: 1.5,
                                            fontSize: '14px',
                                            fontWeight: 500,
                                        }
                                    }
                                }
                            }}
                            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={() => handleIntroMenuClick(0)}>
                                <ListItemIcon>
                                    <InfoIcon fontSize="small" sx={{ color: '#FF6B35' }} />
                                </ListItemIcon>
                                Về chúng tôi
                            </MenuItem>
                            <MenuItem onClick={() => handleIntroMenuClick(1)}>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" sx={{ color: '#FF6B35' }} />
                                </ListItemIcon>
                                Thông điệp Hiệu trưởng
                            </MenuItem>
                            <MenuItem onClick={() => handleIntroMenuClick(2)}>
                                <ListItemIcon>
                                    <GroupsIcon fontSize="small" sx={{ color: '#FF6B35' }} />
                                </ListItemIcon>
                                Chân dung học sinh
                            </MenuItem>
                            <MenuItem onClick={() => handleIntroMenuClick(3)}>
                                <ListItemIcon>
                                    <SchoolIcon fontSize="small" sx={{ color: '#FF6B35' }} />
                                </ListItemIcon>
                                Cơ sở vật chất
                            </MenuItem>
                            <MenuItem onClick={() => handleIntroMenuClick(4)}>
                                <ListItemIcon>
                                    <EventIcon fontSize="small" sx={{ color: '#FF6B35' }} />
                                </ListItemIcon>
                                Tại sao nên chọn MerryStar Kindergarten?
                            </MenuItem>
                        </Menu>
                        <Box
                            className="nav__item"
                            onClick={handleOpenTeamMenu}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            <span>ĐỘI NGŨ</span>
                            <ArrowDropDownIcon fontSize="small" />
                        </Box>
                        
                        {/* Team Dropdown Menu */}
                        <Menu
                            anchorEl={teamMenuAnchor}
                            open={teamMenuOpen}
                            onClose={handleCloseTeamMenu}
                            slotProps={{
                                paper: {
                                    elevation: 3,
                                    sx: {
                                        mt: 1,
                                        minWidth: 250,
                                        borderRadius: 2,
                                        '& .MuiMenuItem-root': {
                                            px: 2,
                                            py: 1.5,
                                            fontSize: '14px',
                                            fontWeight: 500,
                                        }
                                    }
                                }
                            }}
                            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={() => handleTeamMenuClick(0)}>
                                <ListItemIcon>
                                    <GroupsIcon fontSize="small" sx={{ color: '#FF6B35' }} />
                                </ListItemIcon>
                                Hội Đồng Khoa Học
                            </MenuItem>
                            <MenuItem onClick={() => handleTeamMenuClick(1)}>
                                <ListItemIcon>
                                    <SchoolIcon fontSize="small" sx={{ color: '#FF6B35' }} />
                                </ListItemIcon>
                                Đội Ngũ Giáo Viên
                            </MenuItem>
                        </Menu>
                        <Box
                            className="nav__item"
                            onClick={handleOpenEducationMenu}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            <span>CHƯƠNG TRÌNH GIÁO DỤC</span>
                            <ArrowDropDownIcon fontSize="small" />
                        </Box>
                        
                        {/* Education Dropdown Menu */}
                        <Menu
                            anchorEl={educationMenuAnchor}
                            open={educationMenuOpen}
                            onClose={handleCloseEducationMenu}
                            slotProps={{
                                paper: {
                                    elevation: 3,
                                    sx: {
                                        mt: 1,
                                        minWidth: 280,
                                        borderRadius: 2,
                                        '& .MuiMenuItem-root': {
                                            px: 2,
                                            py: 1.5,
                                            fontSize: '14px',
                                            fontWeight: 500,
                                        }
                                    }
                                }
                            }}
                            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={() => handleEducationMenuClick(0)}>
                                <ListItemIcon>
                                    <EventIcon fontSize="small" sx={{ color: '#FF6B35' }} />
                                </ListItemIcon>
                                Chương trình học
                            </MenuItem>
                          
                        </Menu>
                        <Box
                            className="nav__item"
                            onClick={handleOpenTuyenSinhMenu}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                px: 2,
                                py: 1,
                                borderRadius: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            <span>TUYỂN SINH</span>
                            <ArrowDropDownIcon fontSize="small" />
                        </Box>
                        
                        {/* Tuyen Sinh Dropdown Menu */}
                        <Menu
                            anchorEl={tuyenSinhMenuAnchor}
                            open={tuyenSinhMenuOpen}
                            onClose={handleCloseTuyenSinhMenu}
                            slotProps={{
                                paper: {
                                    elevation: 3,
                                    sx: {
                                        mt: 1,
                                        minWidth: 280,
                                        borderRadius: 2,
                                        '& .MuiMenuItem-root': {
                                            px: 2,
                                            py: 1.5,
                                            fontSize: '14px',
                                            fontWeight: 500,
                                        }
                                    }
                                }
                            }}
                            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={() => handleTuyenSinhMenuClick(0)}>
                                <ListItemIcon>
                                    <DescriptionIcon fontSize="small" sx={{ color: '#FF6B35' }} />
                                </ListItemIcon>
                                Quy Chế Tuyển Sinh
                            </MenuItem>
                        </Menu>
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


