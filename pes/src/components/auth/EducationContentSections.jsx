import React, {useEffect, useState} from 'react'
import {Box, Container, Typography} from '@mui/material'

export default function EducationContentSections() {
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        const handleEducationTabChange = (event) => {
            const {tabIndex} = event.detail
            setActiveTab(tabIndex)
        }

        window.addEventListener('changeEducationTab', handleEducationTabChange)
        return () => window.removeEventListener('changeEducationTab', handleEducationTabChange)
    }, [])

    const sections = {
        0: {
            title: 'Curriculum',
            content: (
                <Box sx={{py: 6}}>
                    <Box sx={{textAlign: 'center', mb: 6}}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
                            <Typography variant="h3" fontWeight={800} color="#2C3E50"
                                        sx={{textTransform: 'uppercase', letterSpacing: '2px'}}>
                                MERRYSTAR EDUCATION PROGRAM
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
                            MerryStar strives to be an exemplary school, leading modern educational trends in Vietnam
                            and
                            worldwide to deliver outstanding value for children. We are proud to be among the first in
                            Vietnam
                            recognized as a Cambridge Early Years Centre by Cambridge International Education,
                            pioneering the
                            Cambridge Early Years program for ages 3–6.
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize: '18px',
                            lineHeight: 1.8,
                            mb: 4,
                            color: '#2C3E50',
                            textAlign: 'center'
                        }}>
                            Our curriculum follows a competency-based education (CBE) approach, providing a flexible
                            structure
                            that allows each child to progress at their own pace.
                        </Typography>
                    </Box>

                    {/* Unique Features */}
                    <Box sx={{mb: 6}}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                            Unique features of the MerryStar curriculum
                        </Typography>
                        <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'}, gap: 4}}>
                            {[
                                {
                                    title: 'Balanced development of three values',
                                    desc: 'Emphasis on Body – Heart – Mind for happy, successful learners'
                                },
                                {
                                    title: 'Strong continuity',
                                    desc: 'Tight articulation across nursery and preschool, aligned to primary education'
                                },
                                {
                                    title: 'Student-centered approach',
                                    desc: 'Adaptive teaching tailored to each child'
                                },
                                {
                                    title: 'Observation toolkit',
                                    desc: 'Creative use of daily and periodic observation tools for accurate assessment'
                                },
                                {
                                    title: 'Five learning domains',
                                    desc: 'Focus on five key domains encompassing eight subjects'
                                },
                                {
                                    title: 'Personalized learning',
                                    desc: 'Individualized instruction so each child can maximize potential'
                                }
                            ].map((feature, index) => (
                                <Box key={index} sx={{
                                    p: 3,
                                    border: '1px solid #E0E0E0',
                                    borderRadius: 2,
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        transform: 'translateY(-2px)',
                                        transition: 'all 0.3s ease'
                                    }
                                }}>
                                    <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="#666">
                                        {feature.desc}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* 8 Subjects */}
                    <Box sx={{mb: 6}}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                            Eight core subjects
                        </Typography>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'},
                            gap: 3
                        }}>
                            {[
                                {name: 'Physical development', color: '#FF6B35', icon: '🏃‍♂️'},
                                {name: 'Mathematics', color: '#2196F3', icon: '🔢'},
                                {name: 'Science', color: '#4CAF50', icon: '🔬'},
                                {name: 'English language', color: '#9C27B0', icon: '🇬🇧'},
                                {name: 'Vietnamese language', color: '#F44336', icon: '🇻🇳'},
                                {name: 'Music', color: '#FF9800', icon: '🎵'},
                                {name: 'Art', color: '#795548', icon: '🎨'},
                                {name: 'Social-emotional development', color: '#607D8B', icon: '❤️'}
                            ].map((subject, index) => (
                                <Box key={index} sx={{
                                    p: 3,
                                    backgroundColor: '#F8F9FA',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    border: `2px solid ${subject.color}`,
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        transform: 'translateY(-2px)',
                                        transition: 'all 0.3s ease'
                                    }
                                }}>
                                    <Typography variant="h4" sx={{mb: 1}}>
                                        {subject.icon}
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600} color={subject.color}>
                                        {subject.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Physical Development Program */}
                    <Box sx={{mb: 6}}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                            NOVA GYM physical development program
                        </Typography>

                        {/* Quote Section */}
                        <Box sx={{textAlign: 'center', mb: 4}}>
                            <Typography variant="h6" fontStyle="italic" color="#666" sx={{mb: 2}}>
                                "He who has health has hope; and he who has hope has everything."
                            </Typography>
                            <Typography variant="body2" color="#666">– Thomas Carlyle –</Typography>
                        </Box>

                        {/* Main Content with Image */}
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {xs: '1fr', lg: '1fr 1fr'},
                            gap: 4,
                            alignItems: 'center',
                            mb: 4
                        }}>
                            {/* Text Content */}
                            <Box>
                                <Typography variant="body1"
                                            sx={{fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', mb: 3}}>
                                    MerryStar’s physical development program is designed and overseen by leading experts
                                    in
                                    fitness and nutrition to nurture healthy students with strong immunity, good
                                    physique,
                                    a love for sports, and abundant energy.
                                </Typography>
                                <Typography variant="body1"
                                            sx={{fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', mb: 3}}>
                                    At MerryStar, the NOVA GYM intensive physical program follows international
                                    standards to
                                    help Vietnamese children develop superior strength and stature from the early years.
                                </Typography>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.8, color: '#2C3E50'}}>
                                    NOVA GYM is the only competency-based physical program in Vietnam, maximizing
                                    support for
                                    each child’s personal development at their own pace and ability.
                                </Typography>
                            </Box>

                            {/* Image */}
                            <Box sx={{
                                width: '100%',
                                height: 300,
                                backgroundImage: 'url(/chuongtrinhgiaoduc_loinhannhu.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 3,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                            }}/>
                        </Box>

                        {/* Program Features */}
                        <Box sx={{mb: 4}}>
                            <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{mb: 3, textAlign: 'center'}}>
                                Main learning components of the program
                            </Typography>
                            <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: 'repeat(3, 1fr)'}, gap: 3}}>
                                {[
                                    {
                                        title: 'Motor development',
                                        desc: 'Practice and master fundamental motor skills; build overall physical fitness',
                                        icon: '🏃‍♂️'
                                    },
                                    {
                                        title: 'Nutrition education',
                                        desc: 'Develop health and nutrition knowledge; build healthy eating habits',
                                        icon: '🥗'
                                    },
                                    {
                                        title: 'Health and safety',
                                        desc: 'Learn personal safety in and out of school; follow nutrition and activity safety rules',
                                        icon: '💪'
                                    }
                                ].map((feature, index) => (
                                    <Box key={index} sx={{
                                        p: 3,
                                        backgroundColor: '#F8F9FA',
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        border: '1px solid #E0E0E0',
                                        '&:hover': {
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            transform: 'translateY(-2px)',
                                            transition: 'all 0.3s ease'
                                        }
                                    }}>
                                        <Typography variant="h4" sx={{mb: 2}}>
                                            {feature.icon}
                                        </Typography>
                                        <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="#666">
                                            {feature.desc}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* Program Benefits */}
                        <Box sx={{p: 4, backgroundColor: '#FFF3E0', borderRadius: 3, border: '2px solid #FF6B35'}}>
                            <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{mb: 3, textAlign: 'center'}}>
                                Benefits for children
                            </Typography>
                            <Typography variant="body1"
                                        sx={{fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', textAlign: 'center'}}>
                                Children gain health and nutrition knowledge, practice and master motor skills, build
                                positive attitudes and habits for an active, healthy lifestyle, and learn to keep
                                themselves safe in and out of school by following health, nutrition, and activity safety
                                rules.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )
        }
    }

    return (
        <Box>
            <Container sx={{mt: 5}}>
                {sections[activeTab]?.content}
            </Container>
        </Box>
    )
}
