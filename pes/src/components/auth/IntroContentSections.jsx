import React, {useEffect, useState} from 'react'
import {Box, Container, Typography} from '@mui/material'
import IntroNavigationTabs from './IntroNavigationTabs'
import ImageZoom from './ImageZoom'
import WhyChooseMerryStarContent from './WhyChooseMerryStarContent'
import StudentProfileContent from './StudentProfileContent'
import FacilitiesContent from './FacilitiesContent'

export default function IntroContentSections() {
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        const handleIntroTabChange = (event) => {
            const {tabIndex} = event.detail
            setActiveTab(tabIndex)
        }

        window.addEventListener('changeIntroTab', handleIntroTabChange)
        return () => window.removeEventListener('changeIntroTab', handleIntroTabChange)
    }, [])

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
        4: { title: 'Why choose MerryStar Kindergarten?', content: (<WhyChooseMerryStarContent/>) }
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
