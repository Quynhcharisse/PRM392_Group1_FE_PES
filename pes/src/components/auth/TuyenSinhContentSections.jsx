import React from 'react'
import {Box, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'

export default function TuyenSinhContentSections() {
    const navigate = useNavigate()
    const handleRegistrationClick = () => navigate('/login')

    return (
        <Box sx={{py: 6}}>
            <Box sx={{textAlign: 'center', mb: 6}}>
                <Typography variant="h3" fontWeight={800} color="#2C3E50">MERRYSTAR ADMISSIONS POLICY</Typography>
                <Box sx={{width: 60, height: 4, backgroundColor: '#3498DB', mx: 'auto', borderRadius: 2}}/>
            </Box>

            <Box sx={{mb: 6}}>
                <Typography variant="body1" sx={{fontSize: '18px', lineHeight: 1.8, mb: 4, color: '#2C3E50', textAlign: 'center'}}>MerryStar Bilingual Kindergarten organizes admissions for preschool-aged children as follows:</Typography>
            </Box>

           <Box sx={{mb: 6, display: 'flex', justifyContent: 'center'}}>
                <Box sx={{maxWidth: 500, width: '100%'}}>
                    <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                        Admission Targets
                    </Typography>
                    <Box sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: '1px solid #E0E0E0',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            backgroundColor: '#3498DB',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '16px'
                        }}>
                            <Box sx={{p: 2, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.2)'}}>
                                Age
                            </Box>
                            <Box sx={{p: 2, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.2)'}}>
                                Birth year
                            </Box>
                            <Box sx={{p: 2, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.2)'}}>
                                Class group
                            </Box>
                            <Box sx={{p: 2, textAlign: 'center'}}>
                                Students per class
                            </Box>
                        </Box>

                        {[
                            {
                                age: '3 years',
                                birthYear: 'Year 2022',
                                classGroup: 'SEED',
                                studentCount: '25'
                            },
                            {
                                age: '4 years',
                                birthYear: 'Year 2021',
                                classGroup: 'BUD',
                                studentCount: '25'
                            },
                            {
                                age: '5 years',
                                birthYear: 'Year 2020',
                                classGroup: 'LEAF',
                                studentCount: '25'
                            }
                        ].map((row, index) => (
                            <Box key={index} sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                backgroundColor: index % 2 === 0 ? '#F8F9FA' : 'white',
                                '&:hover': {
                                    backgroundColor: '#E3F2FD'
                                }
                            }}>
                                <Box sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRight: '1px solid #E0E0E0',
                                    borderBottom: '1px solid #E0E0E0',
                                    fontWeight: 600,
                                    color: '#2C3E50'
                                }}>
                                    {row.age}
                                </Box>
                                <Box sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRight: '1px solid #E0E0E0',
                                    borderBottom: '1px solid #E0E0E0',
                                    color: '#666'
                                }}>
                                    {row.birthYear}
                                </Box>
                                <Box sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRight: '1px solid #E0E0E0',
                                    borderBottom: '1px solid #E0E0E0',
                                    fontWeight: 600,
                                    color: '#FF6B35'
                                }}>
                                    {row.classGroup}
                                </Box>
                                <Box sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderBottom: '1px solid #E0E0E0',
                                    fontWeight: 600,
                                    color: '#2C3E50'
                                }}>
                                    {row.studentCount}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
             <Box sx={{mb: 6}}>
                <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 6, textAlign: 'center'}}>
                    Admissions Registration Process
                </Typography>

                <Box sx={{
                    position: 'relative',
                    maxWidth: 1000,
                    mx: 'auto',
                    px: 2
                }}>
                    {/* Timeline Line */}
                    <Box sx={{
                        position: 'absolute',
                        top: 60,
                        left: 60,
                        right: 60,
                        height: '4px',
                        backgroundColor: '#E0E0E0',
                        borderRadius: '2px',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            background: 'linear-gradient(90deg, #FF6B35, #FF8A65, #FF6B35)',
                            borderRadius: '2px',
                            animation: 'timelineProgress 3s ease-in-out infinite'
                        }
                    }}/>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'},
                        gap: 4,
                        position: 'relative',
                        zIndex: 2
                    }}>
                        {[
                            {
                                step: '1',
                                title: 'Parents register student information using the MerryStar form',
                                icon: '📝',
                                link: 'Apply for admissions →',
                                color: '#FF6B35'
                            },
                            {
                                step: '2',
                                title: 'MerryStar reviews the application and sends enrollment guidance if eligible',
                                icon: '📢',
                                color: '#E91E63'
                            },
                            {
                                step: '3',
                                title: 'Parents complete the enrollment procedures',
                                icon: '✅',
                                color: '#4CAF50'
                            },
                            {
                                step: '4',
                                title: 'Student attends entry assessment with the admissions council',
                                icon: '💬',
                                color: '#9C27B0'
                            },
                            {
                                step: '5',
                                title: 'Parents finalize onboarding after the student passes assessment',
                                icon: '📋',
                                color: '#FF9800'
                            },
                            {
                                step: '6',
                                title: 'Student officially starts school per MerryStar policy',
                                icon: '🎓',
                                color: '#2196F3'
                            }
                        ].map((item, index) => (
                            <Box key={index} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                position: 'relative'
                            }}>
                                {/* Timeline Node */}
                                <Box sx={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    border: `4px solid ${item.color}`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 3,
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                    position: 'relative',
                                    zIndex: 3,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                                    }
                                }}>
                                    {/* Step Number */}
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        backgroundColor: item.color,
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                    }}>
                                        {item.step}
                                    </Box>

                                    {/* Icon */}
                                    <Box sx={{
                                        fontSize: '36px',
                                        mb: 1
                                    }}>
                                        {item.icon}
                                    </Box>
                                </Box>

                                {/* Content */}
                                <Box sx={{
                                    maxWidth: 280,
                                    p: 3,
                                    backgroundColor: 'white',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                    border: '1px solid #F0F0F0',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                        transform: 'translateY(-2px)',
                                        borderColor: item.color
                                    }
                                }}>
                                    <Typography variant="body2" sx={{
                                        color: '#2C3E50',
                                        lineHeight: 1.6,
                                        mb: item.link ? 2 : 0,
                                        fontSize: '14px',
                                        fontWeight: 500
                                    }}>
                                        {item.title}
                                    </Typography>

                                    {item.link && (
                                        <Box
                                            onClick={handleRegistrationClick}
                                            sx={{
                                                color: '#3498DB',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            {item.link}
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                p: 5,
                backgroundColor: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
                borderRadius: 4,
                textAlign: 'center',
                border: '2px solid #FF6B35',
                boxShadow: '0 8px 32px rgba(255, 107, 53, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #FF6B35, #FF8A65, #FF6B35)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite'
                }
            }}>
                <Typography variant="h4" fontWeight={800} color="#2C3E50"
                            sx={{mb: 4, textTransform: 'uppercase', letterSpacing: '1px'}}>
                    Admissions Contact Information
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: 'repeat(3, 1fr)'},
                    gap: 4,
                    maxWidth: 800,
                    mx: 'auto'
                }}>
                    {[
                        {
                            icon: '📞',
                            title: 'Hotline',
                            content: '1900 1234 567',
                            color: '#E53E3E'
                        },
                        {
                            icon: '📧',
                            title: 'Email',
                            content: 'tuyensinh@merrystar.edu.vn',
                            color: '#3182CE'
                        },
                        {
                            icon: '🕒',
                            title: 'Working hours',
                            content: '7:00 - 17:00 (Mon-Fri)',
                            color: '#38A169'
                        }
                    ].map((item, index) => (
                        <Box key={index} sx={{
                            p: 3,
                            backgroundColor: 'white',
                            borderRadius: 3,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                            border: '1px solid #E0E0E0',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                borderColor: item.color
                            }
                        }}>
                            <Box sx={{
                                fontSize: '48px',
                                mb: 2,
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                {item.icon}
                            </Box>
                            <Typography variant="h6" fontWeight={700} color={item.color} sx={{mb: 1}}>
                                {item.title}
                            </Typography>
                            <Typography variant="body1" color="#2C3E50" sx={{
                                fontWeight: 600,
                                fontSize: '16px'
                            }}>
                                {item.content}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            </Box>
            
    )
}
