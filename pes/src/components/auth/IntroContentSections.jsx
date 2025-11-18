import React, {useEffect, useState} from 'react'
import {Box, Container, Typography, Avatar, CircularProgress, Chip, alpha} from '@mui/material'
import IntroNavigationTabs from './IntroNavigationTabs'
import ImageZoom from './ImageZoom'
import WhyChooseMerryStarContent from './WhyChooseMerryStarContent'
import StudentProfileContent from './StudentProfileContent'
import FacilitiesContent from './FacilitiesContent'
import { HRService } from '@services/HRService.jsx'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function IntroContentSections() {
    const [activeTab, setActiveTab] = useState(0)
    const [teachers, setTeachers] = useState([])
    const [loadingTeachers, setLoadingTeachers] = useState(false)

    useEffect(() => {
        const handleIntroTabChange = (event) => {
            const {tabIndex} = event.detail
            setActiveTab(tabIndex)
        }

        window.addEventListener('changeIntroTab', handleIntroTabChange)
        return () => window.removeEventListener('changeIntroTab', handleIntroTabChange)
    }, [])

    useEffect(() => {
        loadTeachers()
    }, [])

    const loadTeachers = async () => {
        try {
            setLoadingTeachers(true)
            const response = await HRService.getTeacherList()
            if (response.success) {
                // Chỉ lấy teachers có status ACTIVE
                const activeTeachers = (response.data || []).filter(
                    teacher => !teacher.status || teacher.status === 'ACCOUNT_ACTIVE'
                )
                setTeachers(activeTeachers)
            }
        } catch (error) {
            console.error('Failed to load teachers:', error)
        } finally {
            setLoadingTeachers(false)
        }
    }

    const sections = {
        0: {
            title: 'Về chúng tôi',
            content: (
                <Box sx={{py: 6}}>
                    {/* Main Title Section */}
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
                            <Typography variant="h3" fontWeight={800} color="#2C3E50"
                                        sx={{textTransform: 'uppercase', letterSpacing: '2px'}}>
                                ABOUT US
                            </Typography>
                            <Box sx={{ml: 2, fontSize: '32px'}}>⭐</Box>                           
                        </Box>
                        <Box sx={{
                            width: 60,
                            height: 4,
                            backgroundColor: '#3498DB',
                            mx: 'auto',
                            borderRadius: 2
                        }}/>
                    

                    {/* Main Content */}
                    <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '2fr 1fr'}, gap: 6, mb: 6}}>
                        <Box>
                            <Typography variant="body1" sx={{fontSize: '18px', lineHeight: 1.8, mb: 3, color: '#2C3E50'}}>
                                MerryStar Kindergarten is a leading bilingual preschool committed to providing a high-
                                quality educational environment for children aged 2–6. With over 10 years of experience
                                in early childhood education, we are proud to be a trusted and beloved school for
                                families.
                                </Typography>
                            <Typography variant="body1"
                                        sx={{fontSize: '18px', lineHeight: 1.8, mb: 3, color: '#2C3E50'}}>
                                Our educational philosophy emphasizes holistic development of Body – Heart – Mind, so
                                children gain knowledge alongside life skills, compassion, and emotional intelligence.
                            </Typography>    
                        </Box>

                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            <Box sx={{
                                width: '100%',
                                height: 200,
                                backgroundImage: 'url(/Mam-non-song-ngu-merrystar-ve-chung-toi-1.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 2,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                            }}/>
                            <Box sx={{display: 'flex', gap: 2, justifyContent: 'center'}}>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-2.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}/>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-3.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}/>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 6, mb: 6}}>
                        {/* Vision */}
                        <Box sx={{textAlign: 'center'}}>
                            <Typography variant="h4" fontWeight={800} color="#2C3E50" sx={{
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 2
                            }}>
                                VISION
                            </Typography>
                            <Box sx={{
                                width: 60,
                                height: 4,
                                backgroundColor: '#3498DB',
                                mx: 'auto',
                                borderRadius: 2,
                                mb: 3
                            }}/>
                            <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.8, color: '#2C3E50'}}>
                                To become Vietnam’s leading bilingual kindergarten where every child is holistically
                                developed and prepared to be a future global citizen.
                            </Typography>
                        </Box>

                        {/* Mission */}
                        <Box sx={{textAlign: 'center'}}>
                            <Typography variant="h4" fontWeight={800} color="#2C3E50" sx={{
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 2
                            }}>
                                MISSION
                            </Typography>
                            <Box sx={{
                                width: 60,
                                height: 4,
                                backgroundColor: '#3498DB',
                                mx: 'auto',
                                borderRadius: 2,
                                mb: 3
                            }}/>
                            <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.8, color: '#2C3E50'}}>
                                Provide a high-quality educational environment using modern bilingual methods to develop
                                Body – Heart – Mind in harmony.
                            </Typography>
                        </Box>
                    </Box>

                    {/* Quote Section simplified */}
                    <Box sx={{
                        backgroundImage: 'url(/tre_em_noi-2983.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        p: 4,
                        borderRadius: 3,
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            zIndex: 0
                        }
                    }}>
                        <Box sx={{position: 'relative', zIndex: 1}}>
                            <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{mb: 3, textAlign: 'left'}}>
                                "Children Speak"
                            </Typography>
                            <Typography variant="body1" sx={{
                                fontSize: '18px',
                                lineHeight: 1.8,
                                color: '#2C3E50',
                                fontStyle: 'italic',
                                mb: 3,
                                textAlign: 'left'
                            }}>
                                The language of flowers<br/>
                                And understanding<br/>
                                The whisper of the wind.
                            </Typography>

                            <Typography variant="h6" fontWeight={600} color="#2C3E50" sx={{mb: 3, textAlign: 'left'}}>
                                "Children in Harmony"
                            </Typography>
                            <Typography variant="body1" sx={{
                                fontSize: '18px',
                                lineHeight: 1.8,
                                color: '#2C3E50',
                                fontStyle: 'italic',
                                mb: 3,
                                textAlign: 'left'
                            }}>
                                With the enchanting songs of the forest<br/>
                                They can listen to the trees<br/>
                                Hear the rivers’ joyful chorus<br/>
                                And feel the meaning in every sunbeam.
                            </Typography>

                            <Typography variant="body1" sx={{
                                fontSize: '16px',
                                lineHeight: 1.8,
                                color: '#2C3E50',
                                mb: 3,
                                textAlign: 'left'
                            }}>
                                Our task is not to fix these things<br/>
                                But to nurture them<br/>
                                To preserve them<br/>
                                And even to remember them for ourselves.
                            </Typography>

                            <Box sx={{textAlign: 'center', mt: 4}}>
                                <Typography variant="h6" fontWeight={600} color="#2C3E50"
                                            sx={{mb: 1, textAlign: 'left'}}>
                                    Cristen Rodgers
                                </Typography>
                                <Typography variant="body2" color="#7F8C8D" sx={{fontSize: '14px'}}>
                                    American writer known for works for children
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        },
        1: { title: "Principal's message", content: (<Box sx={{py:4}}><ImageZoom/></Box>) },
        2: { title: 'Student profile', content: (<Box sx={{py:4}}><StudentProfileContent/></Box>) },
        3: { title: 'Facilities', content: (<Box sx={{py:4}}><FacilitiesContent/></Box>) },
        4: { title: 'Why choose MerryStar Kindergarten?', content: (<WhyChooseMerryStarContent/>) },
        5: {
            title: 'Our Teachers',
            content: (
                <Box sx={{py: 6}}>
                    {/* Title Section */}
                    <Box sx={{textAlign: 'center', mb: 6}}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
                            <Typography variant="h3" fontWeight={800} color="#2C3E50"
                                        sx={{textTransform: 'uppercase', letterSpacing: '2px'}}>
                                OUR TEACHERS
                            </Typography>
                            <Box sx={{ml: 2, fontSize: '32px'}}>👩‍🏫</Box>
                        </Box>
                        <Box sx={{
                            width: 60,
                            height: 4,
                            backgroundColor: '#3498DB',
                            mx: 'auto',
                            borderRadius: 2
                        }}/>
                    </Box>

                    {/* Introduction Text */}
                    <Box sx={{mb: 6}}>
                        <Typography variant="body1" sx={{
                            fontSize: '18px',
                            lineHeight: 1.8,
                            mb: 4,
                            color: '#2C3E50',
                            textAlign: 'center'
                        }}>
                            Meet our dedicated team of professional educators who are passionate about nurturing young minds
                            and creating a loving learning environment for every child.
                        </Typography>
                    </Box>

                    {/* Teachers Grid */}
                    {loadingTeachers ? (
                        <Box sx={{display: 'flex', justifyContent: 'center', py: 8}}>
                            <CircularProgress size={60} sx={{color: '#FF6B35'}}/>
                        </Box>
                    ) : teachers.length === 0 ? (
                        <Box sx={{textAlign: 'center', py: 8}}>
                            <Typography variant="h6" color="#666">
                                No teachers available at the moment.
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                lg: 'repeat(4, 1fr)'
                            },
                            gap: 4
                        }}>
                            {teachers.map((teacher) => (
                                <Box
                                    key={teacher.id}
                                    sx={{
                                        p: 3,
                                        border: '1px solid #E0E0E0',
                                        borderRadius: 3,
                                        textAlign: 'center',
                                        backgroundColor: '#fff',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        '&:hover': {
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                            transform: 'translateY(-4px)',
                                            borderColor: '#FF6B35'
                                        }
                                    }}
                                >
                                    <Avatar
                                        src={teacher.avatarUrl}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            mx: 'auto',
                                            mb: 2,
                                            background: 'linear-gradient(135deg, #FF6B35 0%, #FF6B35CC 100%)',
                                            fontSize: '2.5rem',
                                            fontWeight: 600,
                                            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
                                            border: '3px solid #fff'
                                        }}
                                    >
                                        {teacher.name ? teacher.name.charAt(0).toUpperCase() : 
                                            <AccountCircleIcon sx={{fontSize: '3rem'}}/>}
                                    </Avatar>
                                    
                                    <Typography 
                                        variant="h6" 
                                        fontWeight={700} 
                                        color="#2C3E50" 
                                        sx={{
                                            mb: 1,
                                            fontSize: '1.1rem',
                                            lineHeight: 1.3
                                        }}
                                    >
                                        {teacher.name || 'N/A'}
                                    </Typography>
                                    
                                    <Chip
                                        label={teacher.role || 'TEACHER'}
                                        size="small"
                                        color="info"
                                        variant="outlined"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 600,
                                            borderColor: '#2196F3',
                                            color: '#2196F3'
                                        }}
                                    />
                                    
                                    {teacher.email && (
                                        <Typography 
                                            variant="body2" 
                                            sx={{
                                                color: '#666',
                                                fontSize: '0.875rem',
                                                wordBreak: 'break-word',
                                                maxWidth: '100%'
                                            }}
                                        >
                                            {teacher.email}
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            )
        }
    }

    return (
        <Box>
            <IntroNavigationTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <Container sx={{mt: 5}}>
                {sections[activeTab]?.content}
            </Container>
        </Box>
    )
}
