import '../styles/ui/SiteHeader.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useEffect, useMemo, useState} from 'react'
import {Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography} from '@mui/material'
import {
    AccountCircle as AccountCircleIcon,
    ArrowDropDown as ArrowDropDownIcon,
    Dashboard as DashboardIcon,
    Description as DescriptionIcon,
    Event as EventIcon,
    Groups as GroupsIcon,
    Info as InfoIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    School as SchoolIcon,
    Storefront as StorefrontIcon
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
        const loadUser = () => {
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
                localStorage.removeItem('user') // Remove invalid data
            }
        }

        // Load user on mount and route change
        loadUser()

        // Listen for storage changes (when localStorage is cleared from other tabs/components)
        const handleStorageChange = (e) => {
            if (e.key === 'user' || e.key === null) { // null means localStorage.clear()
                loadUser()
            }
        }

        window.addEventListener('storage', handleStorageChange)
        
        // Also listen for custom events (for same-tab localStorage changes)
        const handleUserChange = () => loadUser()
        window.addEventListener('userLoggedOut', handleUserChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('userLoggedOut', handleUserChange)
        }
    }, [location.pathname])

    const role = useMemo(() => currentUser?.role || null, [currentUser])

    const displayName = currentUser?.name || currentUser?.fullName || currentUser?.displayName || 'Account'
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
            window.dispatchEvent(new CustomEvent('changeIntroTab', {detail: {tabIndex}}))
        }, 100)
    }

    const handleTeamMenuClick = (tabIndex) => {
        handleCloseTeamMenu()
        // Navigate to home page and scroll to specific team tab
        navigate('/')
        setTimeout(() => {
            // Trigger team tab change by dispatching a custom event
            window.dispatchEvent(new CustomEvent('changeTeamTab', {detail: {tabIndex}}))
        }, 100)
    }

    const handleEducationMenuClick = (tabIndex) => {
        handleCloseEducationMenu()
        // Navigate to home page and scroll to specific education tab
        navigate('/')
        setTimeout(() => {
            // Trigger education tab change by dispatching a custom event
            window.dispatchEvent(new CustomEvent('changeEducationTab', {detail: {tabIndex}}))
        }, 100)
    }

    const handleTuyenSinhMenuClick = (tabIndex) => {
        handleCloseTuyenSinhMenu()
        // Navigate to home page and scroll to specific tuyen sinh tab
        navigate('/')
        setTimeout(() => {
            // Trigger tuyen sinh tab change by dispatching a custom event
            window.dispatchEvent(new CustomEvent('changeTuyenSinhTab', {detail: {tabIndex}}))
        }, 100)
    }

    const handleLogout = async () => {
        try {
            localStorage.clear()
            enqueueSnackbar('Signed out', {variant: 'success'})
            handleCloseMenu()
            navigate('/', {replace: true})
            setTimeout(() => window.location.reload(), 300)
        } catch (error) {
            enqueueSnackbar('Sign out failed. Please try again', {variant: 'error'})
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
                                <img src="/logo.png" alt="MerryStar Kindergarten Logo"/>
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
                            <span>INTRODUCTION</span>
                            <ArrowDropDownIcon fontSize="small"/>
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
                            transformOrigin={{horizontal: 'left', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={() => handleIntroMenuClick(0)}>
                                <ListItemIcon>
                                    <InfoIcon fontSize="small" sx={{color: '#FF6B35'}}/>
                                </ListItemIcon>
                                About us
                            </MenuItem>
                            <MenuItem onClick={() => handleIntroMenuClick(1)}>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" sx={{color: '#FF6B35'}}/>
                                </ListItemIcon>
                                Principal's message
                            </MenuItem>
                            <MenuItem onClick={() => handleIntroMenuClick(2)}>
                                <ListItemIcon>
                                    <GroupsIcon fontSize="small" sx={{color: '#FF6B35'}}/>
                                </ListItemIcon>
                                Student profile
                            </MenuItem>
                            <MenuItem onClick={() => handleIntroMenuClick(3)}>
                                <ListItemIcon>
                                    <SchoolIcon fontSize="small" sx={{color: '#FF6B35'}}/>
                                </ListItemIcon>
                                Facilities
                            </MenuItem>
                            <MenuItem onClick={() => handleIntroMenuClick(4)}>
                                <ListItemIcon>
                                    <EventIcon fontSize="small" sx={{color: '#FF6B35'}}/>
                                </ListItemIcon>
                                Why choose MerryStar Kindergarten?
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
                            <span>TEAM</span>
                            <ArrowDropDownIcon fontSize="small"/>
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
                            transformOrigin={{horizontal: 'left', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={() => handleTeamMenuClick(0)}>
                                <ListItemIcon>
                                    <GroupsIcon fontSize="small" sx={{color: '#FF6B35'}}/>
                                </ListItemIcon>
                                Scientific Council
                            </MenuItem>
                            <MenuItem onClick={() => handleTeamMenuClick(1)}>
                                <ListItemIcon>
                                    <SchoolIcon fontSize="small" sx={{color: '#FF6B35'}}/>
                                </ListItemIcon>
                                Teaching Staff
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
                            <span>EDUCATION PROGRAM</span>
                            <ArrowDropDownIcon fontSize="small"/>
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
                            transformOrigin={{horizontal: 'left', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={() => handleEducationMenuClick(0)}>
                                <ListItemIcon>
                                    <EventIcon fontSize="small" sx={{color: '#FF6B35'}}/>
                                </ListItemIcon>
                                Curriculum
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
                            <span>ADMISSIONS</span>
                            <ArrowDropDownIcon fontSize="small"/>
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
                            transformOrigin={{horizontal: 'left', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={() => handleTuyenSinhMenuClick(0)}>
                                <ListItemIcon>
                                    <DescriptionIcon fontSize="small" sx={{color: '#FF6B35'}}/>
                                </ListItemIcon>
                                Admissions Policy
                            </MenuItem>
                        </Menu>
                    </nav>

                    {/* Right Side - Language & CTA */}
                    <div className="header__right-section">
                        {/* CTA Button */}
                        <Button
                            onClick={() => navigate('/login')}
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
                            SIGN IN
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
                                        <Typography variant="subtitle2"
                                                    sx={{fontWeight: 700}}>{displayName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {currentUser?.email || 'Đã đăng nhập'}
                                        </Typography>
                                    </Box>
                                    <Divider/>
                                    <MenuItem onClick={() => {
                                        if (role === 'EDUCATION') {
                                            navigate('/education/profile')
                                        } else if (role === 'HR') {
                                            navigate('/hr/profile')
                                        } else {
                                            navigate('/profile')
                                        }
                                    }}>
                                        <ListItemIcon><PersonIcon fontSize="small"/></ListItemIcon>
                                        My profile
                                    </MenuItem>
                                    {role === 'EDUCATION' && (
                                        <MenuItem onClick={() => navigate('/education/dashboard')}>
                                            <ListItemIcon><DashboardIcon fontSize="small"/></ListItemIcon>
                                            Education Portal
                                        </MenuItem>
                                    )}
                                    {role === 'HR' && (
                                        <MenuItem onClick={() => navigate('/hr/dashboard')}>
                                            <ListItemIcon><StorefrontIcon fontSize="small"/></ListItemIcon>
                                            HR Portal
                                        </MenuItem>
                                    )}
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon><LogoutIcon fontSize="small"/></ListItemIcon>
                                        Sign out
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


