import React, {useEffect, useState} from 'react'
import {Box, Container, Typography} from '@mui/material'

export default function TeamContentSections() {
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        const handleTeamTabChange = (event) => {
            const {tabIndex} = event.detail
            setActiveTab(tabIndex)
        }

        window.addEventListener('changeTeamTab', handleTeamTabChange)
        return () => window.removeEventListener('changeTeamTab', handleTeamTabChange)
    }, [])

    const sections = {
        0: {
            title: 'Scientific Council',
            content: (
                <Box sx={{py: 6}}>
                   <Box sx={{textAlign: 'center', mb: 6}}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
                            <Typography variant="h3" fontWeight={800} color="#2C3E50"
                                        sx={{textTransform: 'uppercase', letterSpacing: '2px'}}>
                                SCIENTIFIC COUNCIL
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
                            Every child is a “wonder of life,” deserving to grow in a loving and happy educational
                            environment. This inspires our passionate educators to found MerryStar Bilingual
                            Kindergarten
                            with the goal of building an international-standard learning environment where children are
                            developed in Body, Heart, and Mind from the earliest years.
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize: '18px',
                            lineHeight: 1.8,
                            mb: 4,
                            color: '#2C3E50',
                            textAlign: 'center'
                        }}>
                            MerryStar’s Scientific Council brings together leading domestic and international experts in
                            Education, Nutrition, and Physical Development for early childhood:
                        </Typography>
                    </Box>

                    {/* Executive Board */}
                    <Box sx={{mb: 6}}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                            EXECUTIVE BOARD
                        </Typography>
                        <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 4}}>
                            <Box sx={{p: 3, border: '1px solid #E0E0E0', borderRadius: 2, textAlign: 'center'}}>
                                <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                    Ms. Bui Thanh Anh
                                </Typography>
                                <Typography variant="body2" color="#666">
                                    Director of Quality Control
                                </Typography>
                            </Box>
                            <Box sx={{p: 3, border: '1px solid #E0E0E0', borderRadius: 2, textAlign: 'center'}}>
                                <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                    Ms. Nguyen Thi Thu
                                </Typography>
                                <Typography variant="body2" color="#666">
                                    Program Manager
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Professional Board */}
                    <Box sx={{mb: 6}}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                            PROFESSIONAL BOARD
                        </Typography>
                        <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 4}}>
                            <Box sx={{p: 3, border: '1px solid #E0E0E0', borderRadius: 2, textAlign: 'center'}}>
                                <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                    Ms. Nguyen Thi Ha
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{mb: 1}}>
                                    Founder - Chairwoman
                                </Typography>
                                <Typography variant="body2" color="#666">
                                    Early Childhood Education Expert
                                </Typography>
                            </Box>
                            <Box sx={{p: 3, border: '1px solid #E0E0E0', borderRadius: 2, textAlign: 'center'}}>
                                <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                    Mr. Ngo Minh Tuan
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{mb: 1}}>
                                    Co-founder - Vice Chairman
                                </Typography>
                                <Typography variant="body2" color="#666">
                                    Educational Program Advisor
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Experience Description */}
                    <Box sx={{mb: 6, p: 4, backgroundColor: '#F8F9FA', borderRadius: 3}}>
                        <Typography variant="body1"
                                    sx={{fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', textAlign: 'center'}}>
                            With decades of leadership experience in leading early childhood education systems and
                            esteemed organizations in Vietnam and worldwide, MerryStar’s strategic team continually
                            researches and distills pioneering educational philosophies and optimal methods in care and
                            nurturing. This is the solid foundation that ensures MerryStar’s operations and quality
                            management achieve the highest effectiveness, creating an optimal learning environment for
                            children.
                        </Typography>
                    </Box>

                    {/* Team Members Grid */}
                    <Box sx={{mb: 4}}>
                        <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                            Meet the experts of the MerryStar Scientific Council
                        </Typography>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                lg: 'repeat(3, 1fr)'
                            },
                            gap: 4,
                            '& > *:nth-child(4)': {
                                gridColumn: {lg: '2'}
                            },
                            '& > *:nth-child(5)': {
                                gridColumn: {lg: '3'}
                            }
                        }}>
                            {/* Nguyễn Thị Hà */}
                            <Box sx={{
                                p: 3,
                                border: '1px solid #E0E0E0',
                                borderRadius: 2,
                                textAlign: 'center',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}>
                                <Box sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 2,
                                    borderRadius: '50%',
                                    backgroundImage: 'url(/nguyenthiha.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '3px solid #FF6B35'
                                }}/>
                                <Typography variant="h6" fontWeight={700} color="#2C3E50"
                                            sx={{mb: 1, fontSize: '14px'}}>
                                    MSc. Candidate Nguyen Thi Ha
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{mb: 1}}>
                                    Founder | Chairwoman
                                </Typography>
                                <Typography variant="body2" color="#666"
                                            sx={{fontSize: '12px', lineHeight: 1.4, mb: 1}}>
                                    Early Childhood Education Expert
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{fontSize: '11px', lineHeight: 1.3}}>
                                    Former Director of Northern Preschool Division, Vinschool Education System
                                    (Vingroup)
                                </Typography>
                            </Box>

                            {/* Ngô Minh Tuấn */}
                            <Box sx={{
                                p: 3,
                                border: '1px solid #E0E0E0',
                                borderRadius: 2,
                                textAlign: 'center',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}>
                                <Box sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 2,
                                    borderRadius: '50%',
                                    backgroundImage: 'url(/ngominhtuan.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '3px solid #FF6B35'
                                }}/>
                                <Typography variant="h6" fontWeight={700} color="#2C3E50"
                                            sx={{mb: 1, fontSize: '14px'}}>
                                    Mr. Ngo Minh Tuan
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{mb: 1}}>
                                    Co-founder | Vice Chairman
                                </Typography>
                                <Typography variant="body2" color="#666"
                                            sx={{fontSize: '12px', lineHeight: 1.4, mb: 1}}>
                                    Educational Program Advisor
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{fontSize: '11px', lineHeight: 1.3}}>
                                    Chairman, CEO Vietnam Holding Group
                                </Typography>
                            </Box>

                            {/* Bùi Thanh Anh */}
                            <Box sx={{
                                p: 3,
                                border: '1px solid #E0E0E0',
                                borderRadius: 2,
                                textAlign: 'center',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}>
                                <Box sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 2,
                                    borderRadius: '50%',
                                    backgroundImage: 'url(/buithanhanh.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '3px solid #FF6B35'
                                }}/>
                                <Typography variant="h6" fontWeight={700} color="#2C3E50"
                                            sx={{mb: 1, fontSize: '14px'}}>
                                    MSc. Candidate Bui Thanh Anh
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{mb: 1}}>
                                    Co-founder | Director of Quality Control
                                </Typography>
                                <Typography variant="body2" color="#666"
                                            sx={{fontSize: '12px', lineHeight: 1.4, mb: 1}}>
                                    Early Childhood Education Expert
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{fontSize: '11px', lineHeight: 1.3}}>
                                    Former Kindergarten Principal, Vinschool Education System (Vingroup)
                                </Typography>
                            </Box>

                            {/* Nguyễn Thị Thu */}
                            <Box sx={{
                                p: 3,
                                border: '1px solid #E0E0E0',
                                borderRadius: 2,
                                textAlign: 'center',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}>
                                <Box sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 2,
                                    borderRadius: '50%',
                                    backgroundImage: 'url(/nguyenthithu.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '3px solid #FF6B35'
                                }}/>
                                <Typography variant="h6" fontWeight={700} color="#2C3E50"
                                            sx={{mb: 1, fontSize: '14px'}}>
                                    Ms. Nguyen Thi Thu
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{mb: 1}}>
                                    Program Manager
                                </Typography>
                                <Typography variant="body2" color="#666"
                                            sx={{fontSize: '12px', lineHeight: 1.4, mb: 1}}>
                                    Former Head of English Division, Vinschool Education System (Vingroup)
                                </Typography>
                            </Box>

                            {/* Nguyễn Phùng Châu */}
                            <Box sx={{
                                p: 3,
                                border: '1px solid #E0E0E0',
                                borderRadius: 2,
                                textAlign: 'center',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}>
                                <Box sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 2,
                                    borderRadius: '50%',
                                    backgroundImage: 'url(/nguyenphungchau.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    border: '3px solid #FF6B35'
                                }}/>
                                <Typography variant="h6" fontWeight={700} color="#2C3E50"
                                            sx={{mb: 1, fontSize: '14px'}}>
                                    MSc. Candidate Nguyen Phung Chau
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{mb: 1}}>
                                    Founder | Executive Advisor
                                </Typography>
                                <Typography variant="body2" color="#666"
                                            sx={{fontSize: '12px', lineHeight: 1.4, mb: 1}}>
                                    Former Head of Admissions & Customer Care (North), Vinschool Education System
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        },
        1: {
            title: 'Đội Ngũ Giáo Viên',
            content: (
                <Box sx={{py: 6}}>
                    <Box sx={{textAlign: 'center', mb: 6}}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
                            <Typography variant="h3" fontWeight={800} color="#2C3E50"
                                        sx={{textTransform: 'uppercase', letterSpacing: '2px'}}>
                                MERRYSTAR TEACHING STAFF
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
                            With the goal of nurturing a happy and successful generation of global citizens, MerryStar
                            applies rigorous recruitment criteria and a comprehensive Teacher Training Program to
                            attract
                            highly qualified, passionate educators who love children. Our teachers are experienced and
                            professionally trained.
                        </Typography>
                    </Box>

                    {/* Recruitment Process */}
                    <Box sx={{mb: 6, p: 4, backgroundColor: '#F8F9FA', borderRadius: 3}}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                            Rigorous recruitment process
                        </Typography>
                        <Typography variant="body1"
                                    sx={{fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', textAlign: 'center'}}>
                            Candidates undergo screening, interviews, entry subject tests, and a teaching demo before
                            the
                            Scientific Council. After passing, they complete the MerryStar Teacher Training Program with
                            ongoing evaluation before becoming official teachers.
                        </Typography>
                    </Box>

                    {/* Work Environment & Values */}
                    <Box sx={{mb: 6}}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                            Work environment and core values
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize: '16px',
                            lineHeight: 1.8,
                            mb: 4,
                            color: '#2C3E50',
                            textAlign: 'center'
                        }}>
                            MerryStar prioritizes a balanced, loving work environment. We foster a culture of love
                            shared
                            between Family and School through close collaboration among Teachers, Students, and Parents—
                            nurturing children to love themselves, their families, and their communities.
                        </Typography>

                        {/* Core Values */}
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {xs: '1fr', md: 'repeat(3, 1fr)'},
                            gap: 4,
                            mt: 4
                        }}>
                            <Box sx={{
                                p: 4,
                                backgroundColor: '#FFF3E0',
                                borderRadius: 3,
                                textAlign: 'center',
                                border: '2px solid #FF6B35'
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#FF6B35" sx={{mb: 2}}>
                                    LOVE
                                </Typography>
                                <Typography variant="body2" color="#2C3E50" sx={{fontSize: '14px', lineHeight: 1.6}}>
                                    Nurture a loving heart
                                </Typography>
                            </Box>
                            <Box sx={{
                                p: 4,
                                backgroundColor: '#E3F2FD',
                                borderRadius: 3,
                                textAlign: 'center',
                                border: '2px solid #2196F3'
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#2196F3" sx={{mb: 2}}>
                                    INTEGRITY
                                </Typography>
                                <Typography variant="body2" color="#2C3E50" sx={{fontSize: '14px', lineHeight: 1.6}}>
                                    Think and work with honesty
                                </Typography>
                            </Box>
                            <Box sx={{
                                p: 4,
                                backgroundColor: '#E8F5E8',
                                borderRadius: 3,
                                textAlign: 'center',
                                border: '2px solid #4CAF50'
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#4CAF50" sx={{mb: 2}}>
                                    VALUE
                                </Typography>
                                <Typography variant="body2" color="#2C3E50" sx={{fontSize: '14px', lineHeight: 1.6}}>
                                    Create value for students, parents, and the community
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Teacher Features */}
                    <Box sx={{mb: 6}}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{mb: 4, textAlign: 'center'}}>
                            Key characteristics of our teachers
                        </Typography>
                        <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'}, gap: 4}}>
                            {[
                                {
                                    title: 'High professional qualifications',
                                    desc: '100% with bachelor’s degree or higher; formally trained'
                                },
                                {
                                    title: 'Deep experience',
                                    desc: 'Average 5+ years in early childhood education'
                                },
                                {
                                    title: 'Love for the profession',
                                    desc: 'Loving and dedicated to every child; caring as their own'
                                },
                                {
                                    title: 'Communication skills',
                                    desc: 'Effective interaction with children and parents'
                                },
                                {title: 'Creativity', desc: 'Continuously exploring engaging teaching methods'},
                                {
                                    title: 'Continuous training',
                                    desc: 'Regular upskilling and knowledge updates'
                                }
                            ].map((feature, index) => (
                                <Box key={index} sx={{
                                    p: 3,
                                    border: '1px solid #E0E0E0',
                                    borderRadius: 2,
                                    textAlign: 'center',
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

                    {/* Call to Action */}
                    <Box sx={{
                        p: 4,
                        backgroundColor: '#FFF3E0',
                        borderRadius: 3,
                        textAlign: 'center',
                        border: '2px solid #FF6B35'
                    }}>
                        <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{mb: 2}}>
                            Come meet our teachers!
                        </Typography>
                        <Typography variant="body1" sx={{fontSize: '16px', color: '#2C3E50'}}>
                            Our dedicated, professional teachers are ready to welcome your child to a nurturing
                            environment where Body – Heart – Mind are developed holistically.
                        </Typography>
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
