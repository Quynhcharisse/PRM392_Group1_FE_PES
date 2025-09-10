import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Box, Collapse, Container, Dialog, DialogContent, IconButton, Typography} from '@mui/material'
import {CheckCircle, Close, ExpandLess, ExpandMore, ZoomIn, ZoomOut} from '@mui/icons-material'

// Student Profile Content Component
function StudentProfileContent() {
    const [expandedSections, setExpandedSections] = useState({
        than: true,
        tam: false,
        tue: false
    })

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    return (
        <Box sx={{py: 4}}>
            {/* Header */}
            <Box sx={{textAlign: 'center', mb: 6}}>
                <Typography variant="h3" fontWeight={700} color="#1976D2" gutterBottom>
                    STUDENT PROFILE
                </Typography>
                <Typography variant="body1"
                            sx={{fontSize: '18px', lineHeight: 1.6, maxWidth: '900px', margin: '0 auto', mb: 2}}>
                    <strong>MerryStar Bilingual Kindergarten</strong> proudly pioneers a <strong>Student
                    Profile</strong>
                    based on the image of a Happy and Successful Global Citizen, ensuring our learners develop the
                    following qualities after at least two years at MerryStar.
                </Typography>
            </Box>

            {/* Three Pillars */}
            <Box sx={{display: 'flex', justifyContent: 'center', gap: 4, mb: 8, flexWrap: 'wrap'}}>
                {/* Thân */}
                <Box sx={{
                    backgroundColor: '#E3F2FD',
                    borderRadius: '20px',
                    p: 4,
                    textAlign: 'center',
                    minWidth: '250px',
                    maxWidth: '300px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                    border: '2px solid #BBDEFB'
                }}>
                    <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{mb: 2}}>
                        Body
                    </Typography>
                    <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.5, color: '#424242'}}>
                        MerryStar students are healthy, resilient, and energetic.
                    </Typography>
                </Box>

                {/* Tâm */}
                <Box sx={{
                    backgroundColor: '#FCE4EC',
                    borderRadius: '20px',
                    p: 4,
                    textAlign: 'center',
                    minWidth: '250px',
                    maxWidth: '300px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                    border: '2px solid #F8BBD9'
                }}>
                    <Typography variant="h4" fontWeight={700} color="#C2185B" gutterBottom sx={{mb: 2}}>
                        Heart
                    </Typography>
                    <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.5, color: '#424242'}}>
                        MerryStar students are loving and spread kindness through concrete actions.
                    </Typography>
                </Box>

                {/* Tuệ */}
                <Box sx={{
                    backgroundColor: '#FFF8E1',
                    borderRadius: '20px',
                    p: 4,
                    textAlign: 'center',
                    minWidth: '250px',
                    maxWidth: '300px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                    border: '2px solid #FFE0B2'
                }}>
                    <Typography variant="h4" fontWeight={700} color="#F57C00" gutterBottom sx={{mb: 2}}>
                        Mind
                    </Typography>
                    <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.5, color: '#424242'}}>
                        MerryStar students master English and Vietnamese, think independently and creatively to succeed.
                    </Typography>
                </Box>
            </Box>

            {/* Thân Section */}
            <Box sx={{mb: 8}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 4,
                    cursor: 'pointer',
                    '&:hover': {backgroundColor: '#f5f5f5'},
                    p: 2,
                    borderRadius: '10px',
                    transition: 'background-color 0.3s ease'
                }} onClick={() => toggleSection('than')}>
                    <Box sx={{
                        background: 'linear-gradient(135deg, #1976D2, #42A5F5)',
                        color: 'white',
                        px: 3,
                        py: 1.5,
                        borderRadius: '20px',
                        mr: 3,
                        fontSize: '16px',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                    }}>
                        Body
                    </Box>
                    <Typography variant="h6" sx={{fontSize: '18px', fontWeight: 500, color: '#424242', flex: 1}}>
                        MerryStar students are healthy – resilient – full of energy.
                    </Typography>
                    <IconButton>
                        {expandedSections.than ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </Box>

                <Collapse in={expandedSections.than}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                        gap: 6,
                        alignItems: 'start'
                    }}>
                        <Box>
                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4,
                                mb: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                    Strong health and resilience
                                </Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Improved physique and stature;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Outstanding height growth; optimal brain development during the golden
                                            stage;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Strong immune system with long-term disease prevention.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>

                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                    Full of energy
                                </Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Comprehensive motor development: speed, strength, endurance, dexterity,
                                            flexibility;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Enjoy and actively participate in age-appropriate sports;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Cheerful, positive, energetic; inspire others to love sports.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-1-1.png)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '500px'
                        }}/>
                    </Box>
                </Collapse>
            </Box>

            {/* Tâm Section */}
            <Box sx={{mb: 8}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 4,
                    cursor: 'pointer',
                    '&:hover': {backgroundColor: '#f5f5f5'},
                    p: 2,
                    borderRadius: '10px',
                    transition: 'background-color 0.3s ease'
                }} onClick={() => toggleSection('tam')}>
                    <Box sx={{
                        background: 'linear-gradient(135deg, #1976D2, #42A5F5)',
                        color: 'white',
                        px: 3,
                        py: 1.5,
                        borderRadius: '20px',
                        mr: 3,
                        fontSize: '16px',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                    }}>
                        Heart
                    </Box>
                    <Typography variant="h6" sx={{fontSize: '18px', fontWeight: 500, color: '#424242', flex: 1}}>
                        MerryStar students are loving and spread kindness through concrete actions.
                    </Typography>
                    <IconButton>
                        {expandedSections.tam ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </Box>

                <Collapse in={expandedSections.tam}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                        gap: 6,
                        alignItems: 'start'
                    }}>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-2.png)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '500px'
                        }}/>

                        <Box>
                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4,
                                mb: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                    Love for self
                                </Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Maintain a healthy, diverse diet and choose beneficial foods;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Practice age-appropriate self-care in daily routines;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Self-respect (awareness of self and emotions); follow personal safety rules;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Think and act with honesty; understand the value of truthfulness.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>

                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4,
                                mb: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                    Love for family and friends
                                </Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Care for others’ feelings; respect privacy; help within capability;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Resolve conflicts, share, and maintain positive interactions.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>

                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                    Love for the environment
                                </Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Protect the environment through concrete actions;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Understand human and personal impact on the environment.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Collapse>
            </Box>

            {/* Tuệ Section */}
            <Box sx={{mb: 8}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 4,
                    cursor: 'pointer',
                    '&:hover': {backgroundColor: '#f5f5f5'},
                    p: 2,
                    borderRadius: '10px',
                    transition: 'background-color 0.3s ease'
                }} onClick={() => toggleSection('tue')}>
                    <Box sx={{
                        background: 'linear-gradient(135deg, #1976D2, #42A5F5)',
                        color: 'white',
                        px: 3,
                        py: 1.5,
                        borderRadius: '20px',
                        mr: 3,
                        fontSize: '16px',
                        fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                    }}>
                        Mind
                    </Box>
                    <Typography variant="h6" sx={{fontSize: '18px', fontWeight: 500, color: '#424242', flex: 1}}>
                        MerryStar students master both English and Vietnamese, develop independent decision-making and
                        creativity to succeed.
                    </Typography>
                    <IconButton>
                        {expandedSections.tue ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </Box>

                <Collapse in={expandedSections.tue}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                        gap: 6,
                        alignItems: 'start'
                    }}>
                        <Box>
                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4,
                                mb: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                    Mastery of English and Vietnamese
                                </Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Communicate effectively and meaningfully in both English and Vietnamese for
                                            learning purposes and to build positive, lasting relationships in the
                                            community;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Achieve ESL, Math, and Science outcomes aligned with Cambridge international
                                            standards (Stage 1) by the end of Kindergarten, ready to enter international
                                            or
                                            high-quality schools following the Cambridge program.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>

                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4,
                                mb: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                    Decision-making mindset
                                </Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Make sound, independent decisions based on logical reasoning about cause and
                                            effect;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Express personal dreams and aspirations and map short-term goals to pursue
                                            them.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>

                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                    Creative thinking
                                </Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Enjoy exploration, stay curious, and eagerly inquire into objects and
                                            phenomena;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Demonstrate critical and creative thinking when approaching new concepts and
                                            situations;
                                        </Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1"
                                                    sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                            Be independent, open-minded, and able to solve problems while contributing
                                            value to their community.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                            <Box sx={{
                                backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-3.png)',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '500px'
                            }}/>
                        </Box>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    )
}

// Why Choose MerryStar Content Component
function WhyChooseMerryStarContent() {
    return (
        <Box sx={{py: 4}}>
            {/* Header */}
            <Box sx={{textAlign: 'center', mb: 8}}>
                <Typography variant="h3" fontWeight={700} color="#1976D2" gutterBottom>
                    WHY CHOOSE MERRYSTAR KINDERGARTEN?
                </Typography>
                <Typography variant="body1"
                            sx={{fontSize: '18px', lineHeight: 1.6, maxWidth: '1000px', margin: '0 auto', mb: 4}}>
                    MerryStar embraces the Body – Heart – Mind philosophy to create the best learning environment for
                    children to grow holistically, laying the foundation for happy and successful global citizens: a
                    healthy body full of energy – a loving heart that spreads kindness – a discerning, creative mind
                    with
                    strong language mastery. This philosophy guides our entire curriculum and underpins the unique 5P
                    advantages that parents value at MerryStar.
                </Typography>
            </Box>

            {/* 5P Central Diagram */}
            <Box sx={{display: 'flex', justifyContent: 'center', mb: 8}}>
                <Box sx={{position: 'relative', width: '400px', height: '400px'}}>
                    {/* Central Star */}
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)',
                        zIndex: 2
                    }}>
                        <Typography variant="h3" fontWeight={900} color="white">
                            5P
                        </Typography>
                    </Box>

                    {/* 5P Points */}
                    {[
                        {angle: 0, title: 'PROOF', desc: 'Learning outcomes commitment', color: '#1976D2'},
                        {angle: 72, title: 'PERSONALIZATION', desc: 'Personalization', color: '#4CAF50'},
                        {angle: 144, title: 'PHYSICAL FACILITIES', desc: 'Facilities', color: '#FF9800'},
                        {angle: 216, title: 'PROFESSIONALS', desc: 'Professionals', color: '#E91E63'},
                        {angle: 288, title: 'PROGRAM', desc: 'Program', color: '#9C27B0'}
                    ].map((point, index) => {
                        const x = 200 + 150 * Math.cos((point.angle - 90) * Math.PI / 180)
                        const y = 200 + 150 * Math.sin((point.angle - 90) * Math.PI / 180)

                        return (
                            <Box key={index} sx={{
                                position: 'absolute',
                                left: `${x - 60}px`,
                                top: `${y - 60}px`,
                                width: '120px',
                                height: '120px',
                                backgroundColor: point.color,
                                borderRadius: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                                zIndex: 1
                            }}>
                                <Typography variant="h6" fontWeight={700} color="white"
                                            sx={{fontSize: '12px', mb: 0.5}}>
                                    {point.title}
                                </Typography>
                                <Typography variant="body2" color="white" sx={{fontSize: '10px', textAlign: 'center'}}>
                                    {point.desc}
                                </Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>

            {/* PROGRAM Section */}
            <Box sx={{mb: 8}}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PROGRAM - A HOLISTIC CURRICULUM NURTURING BODY - HEART - MIND
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                    gap: 6,
                    alignItems: 'start',
                    mb: 4
                }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-ve-chung-toi-1.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }}/>
                    </Box>

                    <Box>
                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, mb: 3}}>
                            MerryStar strives to be an exemplary school, leading modern educational trends domestically
                            and internationally to deliver outstanding value for children. We are proud to be among the
                            first kindergartens in Vietnam recognized as a Cambridge Early Years Centre by Cambridge
                            International Education.
                        </Typography>

                        <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Balanced development of Body – Heart – Mind for happy, successful children;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Strong continuity across nursery and preschool ages, aligned with primary education;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Student-centered approach via adaptive teaching;
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* PERSONALIZATION Section */}
            <Box sx={{mb: 8}}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PERSONALIZATION - TAILORED HEALTH, LEARNING, AND PERSONAL DEVELOPMENT
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                    gap: 6,
                    alignItems: 'start',
                    mb: 4
                }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-ve-chung-toi-2.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }}/>
                    </Box>

                    <Box>
                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, mb: 3}}>
                            MerryStar creatively applies its own daily and periodic observation toolkit to accurately
                            assess each child’s competencies and needs over time, encouraging active parent-school
                            collaboration throughout the process.
                        </Typography>

                        <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Personalized nutrition plans tailored to individual needs and preferences;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Learning pathways adapted to each child’s ability and development pace;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Holistic support for physical, emotional, and intellectual growth.
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* PROOF Section */}
            <Box sx={{mb: 8}}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PROOF - MERRYSTAR IS THE ONLY KINDERGARTEN COMMITTING TO LEARNING OUTCOMES
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                    gap: 6,
                    alignItems: 'start',
                    mb: 4
                }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-tai-sao-nen-chon-3.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }}/>
                    </Box>

                    <Box>
                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, mb: 3}}>
                            MerryStar is the only kindergarten in Vietnam that commits to concrete learning outcomes,
                            ensuring every child achieves clear developmental goals upon program completion.
                        </Typography>

                        <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Commitment to Cambridge Stage 1 standards by graduation;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Holistic Body – Heart – Mind development aligned with international standards;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Readiness for international and high-quality schools.
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* PROFESSIONALS Section */}
            <Box sx={{mb: 8}}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PROFESSIONALS - LEADING EARLY CHILDHOOD EXPERTS AND TEACHERS IN VIETNAM
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                    gap: 6,
                    alignItems: 'start',
                    mb: 4
                }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-tai-sao-nen-chon-1.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }}/>
                    </Box>

                    <Box>
                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, mb: 3}}>
                            MerryStar’s teachers are highly qualified, dedicated educators united by a love for
                            nurturing young minds. Our teacher profile is built on three core values: LOVE – INTEGRITY –
                            VALUE.
                        </Typography>

                        <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Internationally-aligned teaching standards with Cambridge certifications;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Physical education experts meeting international benchmarks;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Continuous training with up-to-date modern pedagogy.
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* PHYSICAL FACILITIES Section */}
            <Box sx={{mb: 8}}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PHYSICAL FACILITIES - OPTIMAL ENVIRONMENT FOR PRESCHOOL AGES
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                    gap: 6,
                    alignItems: 'start',
                    mb: 4
                }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-tai-sao-nen-chon-5.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }}/>
                    </Box>

                    <Box>
                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, mb: 3}}>
                            Located in Vinhomes Riverside 2, MerryStar Kindergarten spans over 1,200 m² with
                            architecture
                            optimized for space, functionality, and aesthetics—an ideal environment for learning and
                            growth.
                        </Typography>

                        <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Design aligned with Body – Heart – Mind philosophy, in harmony with nature;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Outdoor playground, indoor play area, and a unique greenhouse library;
                                </Typography>
                            </li>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircle sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>
                                    Eco-friendly educational equipment meeting international standards.
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

// Image Zoom Component
function ImageZoom() {
    const [open, setOpen] = useState(false)
    const [zoom, setZoom] = useState(1)

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setZoom(1)
    }

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3))
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))

    return (
        <>
            {/* Thumbnail Image */}
            <Box sx={{
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.02)'
                }
            }} onClick={handleOpen}>
                <Box sx={{
                    width: '100%',
                    height: {xs: 'auto', md: '600px'},
                    backgroundImage: 'url(/thong-diep-1.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}/>
            </Box>

            {/* Zoom Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        margin: 0,
                        maxHeight: '100vh'
                    }
                }}
            >
                <DialogContent sx={{p: 0, position: 'relative'}}>
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            zIndex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.7)'
                            }
                        }}
                    >
                        <Close/>
                    </IconButton>

                    {/* Zoom Controls */}
                    <Box sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        zIndex: 1,
                        display: 'flex',
                        gap: 1
                    }}>
                        <IconButton
                            onClick={handleZoomIn}
                            sx={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.7)'
                                }
                            }}
                        >
                            <ZoomIn/>
                        </IconButton>
                        <IconButton
                            onClick={handleZoomOut}
                            sx={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.7)'
                                }
                            }}
                        >
                            <ZoomOut/>
                        </IconButton>
                    </Box>

                    {/* Zoomed Image */}
                    <Box sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url(/thong-diep-1.jpeg)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            transform: `scale(${zoom})`,
                            transition: 'transform 0.3s ease',
                            cursor: zoom > 1 ? 'grab' : 'default',
                            '&:active': {
                                cursor: 'grabbing'
                            }
                        }}/>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

function SlideBar() {
    const slides = [
        {
            id: 1,
            image: '/Mam-non-song-ngu-Merrystar-2022-3-1.jpg',
            title: 'WELCOME TO',
            subtitle: 'BILINGUAL KINDERGARTEN',
            brand: 'MERRYSTAR',
            description: 'Where we nurture global citizens',
            description2: 'Happy and successful',
            cta: 'LEARN MORE'
        }
    ]
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const slideStyle = {
        position: 'absolute',
        inset: 0,
        opacity: current === 0 ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        backgroundImage: `url(${slides[0].image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }


    return (
        <Box sx={{
            position: 'relative',
            height: {xs: 400, md: 600},
            overflow: 'hidden',
            boxShadow: 4
        }}>
            <Box sx={slideStyle}>
            </Box>
        </Box>
    )
}

// Introduction Navigation Tabs Component
function IntroNavigationTabs({activeTab, setActiveTab}) {
    const tabs = [
        {id: 0, label: 'About us'},
        {id: 1, label: "Principal's message"},
        {id: 2, label: 'Student profile'},
        {id: 3, label: 'Facilities'},
        {id: 4, label: 'Why choose MerryStar Kindergarten?'}
    ]

    return (
        <Box sx={{
            backgroundColor: '#F8F9FA',
            py: 3,
            mt: 0,
            borderTop: '1px solid #E9ECEF'
        }}>
            <Container sx={{px: 0}}>
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    overflowX: 'auto',
                    justifyContent: 'center',
                    '&::-webkit-scrollbar': {display: 'none'}
                }}>
                    {tabs.map((tab) => (
                        <Box
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            sx={{
                                px: 4,
                                py: 2,
                                borderRadius: '25px',
                                cursor: 'pointer',
                                outline: 'none',
                                position: 'relative',
                                transition: 'all 300ms cubic-bezier(0, 0.49, 0.27, 0.99)',
                                backgroundColor: activeTab === tab.id
                                    ? '#FF6B35'  // Orange background for active tab
                                    : 'rgba(255, 255, 255, 0.8)',  // Semi-transparent white background for inactive tabs
                                color: activeTab === tab.id ? '#fff' : '#2C3E50',  // White for active, dark blue-gray for inactive
                                fontWeight: activeTab === tab.id ? 700 : 500,
                                fontSize: '15px',
                                whiteSpace: 'nowrap',
                                minWidth: 'fit-content',
                                boxShadow: activeTab === tab.id
                                    ? '0 4px 12px rgba(255, 107, 53, 0.3)'
                                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: activeTab === tab.id
                                        ? '#E55A2B'  // Darker orange on hover for active tab
                                        : 'rgba(255, 107, 53, 0.15)',  // Light orange background on hover for inactive tabs
                                    color: activeTab === tab.id ? '#fff' : '#FF6B35',  // White for active, orange for inactive on hover
                                    transform: 'translateY(-2px)',
                                    boxShadow: activeTab === tab.id
                                        ? '0 6px 16px rgba(255, 107, 53, 0.4)'
                                        : '0 4px 12px rgba(255, 107, 53, 0.2)'
                                }
                            }}
                        >
                            {tab.label}
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

// Introduction Content Sections Component
function IntroContentSections() {
    const [activeTab, setActiveTab] = useState(0) // Default to "Về chúng tôi"

    // Listen for custom intro tab change events from header navigation
    useEffect(() => {
        const handleIntroTabChange = (event) => {
            const {tabIndex} = event.detail
            setActiveTab(tabIndex)
        }

        window.addEventListener('changeIntroTab', handleIntroTabChange)

        return () => {
            window.removeEventListener('changeIntroTab', handleIntroTabChange)
        }
    }, [])

    const sections = {
        0: {
            title: 'Về chúng tôi',
            content: (
                <Box sx={{py: 6}}>
                    {/* Main Title Section */}
                    <Box sx={{textAlign: 'center', mb: 6}}>
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
                    </Box>

                    {/* Main Content */}
                    <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '2fr 1fr'}, gap: 6, mb: 6}}>
                        {/* Text Content */}
                        <Box>
                            <Typography variant="body1"
                                        sx={{fontSize: '18px', lineHeight: 1.8, mb: 3, color: '#2C3E50'}}>
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

                        {/* Images */}
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

                    {/* Vision & Mission Section */}
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

                    {/* Quote Section */}
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
        1: {
            title: "Principal's message",
            content: (
                <Box sx={{py: 4}}>
                    <ImageZoom/>
                </Box>
            )
        },
        2: {
            title: 'Student profile',
            content: (
                <Box sx={{py: 4}}>
                    {/* Header */}
                    <Box sx={{textAlign: 'center', mb: 6}}>
                        <Typography variant="h3" fontWeight={700} color="#1976D2" gutterBottom>
                            STUDENT PROFILE
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize: '18px',
                            lineHeight: 1.6,
                            maxWidth: '900px',
                            margin: '0 auto',
                            mb: 2
                        }}>
                            <strong>MerryStar Bilingual Kindergarten</strong> proudly pioneers a <strong>Student
                            Profile</strong>
                            based on the image of a Happy and Successful Global Citizen, ensuring learners master the
                            following qualities after at least two years at MerryStar.
                        </Typography>
                    </Box>

                    {/* Three Pillars */}
                    <Box sx={{display: 'flex', justifyContent: 'center', gap: 4, mb: 8, flexWrap: 'wrap'}}>
                        {/* Thân */}
                        <Box sx={{
                            backgroundColor: '#E3F2FD',
                            borderRadius: '20px',
                            p: 4,
                            textAlign: 'center',
                            minWidth: '250px',
                            maxWidth: '300px',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                            border: '2px solid #BBDEFB'
                        }}>
                            <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{mb: 2}}>
                                Body
                            </Typography>
                            <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.5, color: '#424242'}}>
                                MerryStar students are healthy, resilient, and energetic.
                            </Typography>
                        </Box>

                        {/* Tâm */}
                        <Box sx={{
                            backgroundColor: '#FCE4EC',
                            borderRadius: '20px',
                            p: 4,
                            textAlign: 'center',
                            minWidth: '250px',
                            maxWidth: '300px',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                            border: '2px solid #F8BBD9'
                        }}>
                            <Typography variant="h4" fontWeight={700} color="#C2185B" gutterBottom sx={{mb: 2}}>
                                Heart
                            </Typography>
                            <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.5, color: '#424242'}}>
                                MerryStar students are loving and spread kindness through concrete actions.
                            </Typography>
                        </Box>

                        {/* Tuệ */}
                        <Box sx={{
                            backgroundColor: '#FFF8E1',
                            borderRadius: '20px',
                            p: 4,
                            textAlign: 'center',
                            minWidth: '250px',
                            maxWidth: '300px',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                            border: '2px solid #FFE0B2'
                        }}>
                            <Typography variant="h4" fontWeight={700} color="#F57C00" gutterBottom sx={{mb: 2}}>
                                Mind
                            </Typography>
                            <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.5, color: '#424242'}}>
                                MerryStar students master English and Vietnamese, think independently and creatively to
                                succeed.
                            </Typography>
                        </Box>
                    </Box>

                    {/* Thân Section */}
                    <Box sx={{mb: 8}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
                            <Box sx={{
                                background: 'linear-gradient(135deg, #1976D2, #42A5F5)',
                                color: 'white',
                                px: 3,
                                py: 1.5,
                                borderRadius: '20px',
                                mr: 3,
                                fontSize: '16px',
                                fontWeight: 700,
                                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                            }}>
                                Body
                            </Box>
                            <Typography variant="h6" sx={{fontSize: '18px', fontWeight: 500, color: '#424242'}}>
                                MerryStar students are healthy – resilient – full of energy.
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                            gap: 6,
                            alignItems: 'start'
                        }}>
                            <Box>
                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4,
                                    mb: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                        Strong health and resilience
                                    </Typography>
                                    <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Improved physique and stature;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Outstanding height growth; optimal brain development during the golden
                                                stage;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Strong immune system with long-term disease prevention.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                        Full of energy
                                    </Typography>
                                    <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Comprehensive motor development: speed, strength, endurance, dexterity,
                                                flexibility;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Enjoy and actively participate in age-appropriate sports;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Cheerful, positive, energetic; inspire others to love sports.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{
                                backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-1-1.png)',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '500px'
                            }}/>
                        </Box>
                    </Box>

                    {/* Tâm Section */}
                    <Box sx={{mb: 8}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
                            <Box sx={{
                                background: 'linear-gradient(135deg, #1976D2, #42A5F5)',
                                color: 'white',
                                px: 3,
                                py: 1.5,
                                borderRadius: '20px',
                                mr: 3,
                                fontSize: '16px',
                                fontWeight: 700,
                                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                            }}>
                                Heart
                            </Box>
                            <Typography variant="h6" sx={{fontSize: '18px', fontWeight: 500, color: '#424242'}}>
                                MerryStar students demonstrate and spread love through specific actions.
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                            gap: 6,
                            alignItems: 'start'
                        }}>
                            <Box sx={{
                                backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-2.png)',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '500px'
                            }}/>

                            <Box>
                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4,
                                    mb: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                        Love for self
                                    </Typography>
                                    <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Maintain a healthy, diverse diet and choose beneficial foods;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Practice age-appropriate self-care in daily routines;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Self-respect (awareness of self and emotions); follow personal safety
                                                rules;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Think and act with honesty; understand the value of truthfulness.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4,
                                    mb: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                        Love for family and friends
                                    </Typography>
                                    <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Care for others’ feelings; respect privacy; help within capability;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Resolve conflicts, share, and maintain positive interactions.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                        Love for the environment
                                    </Typography>
                                    <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Protect the environment through concrete actions;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Understand human and personal impact on the environment.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Tuệ Section */}
                    <Box sx={{mb: 8}}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
                            <Box sx={{
                                background: 'linear-gradient(135deg, #1976D2, #42A5F5)',
                                color: 'white',
                                px: 3,
                                py: 1.5,
                                borderRadius: '20px',
                                mr: 3,
                                fontSize: '16px',
                                fontWeight: 700,
                                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                            }}>
                                Mind
                            </Box>
                            <Typography variant="h6" sx={{fontSize: '18px', fontWeight: 500, color: '#424242'}}>
                                MerryStar students master both English and Vietnamese, develop independent
                                decision-making
                                and creativity to succeed.
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
                            gap: 6,
                            alignItems: 'start'
                        }}>
                            <Box>
                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4,
                                    mb: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                        Mastery of English and Vietnamese
                                    </Typography>
                                    <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Communicate effectively and meaningfully in both English and Vietnamese
                                                for
                                                learning purposes and to build positive, lasting relationships in the
                                                community;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Achieve ESL, Math, and Science outcomes aligned with Cambridge
                                                international standards (Stage 1) by the end of Kindergarten, ready to
                                                enter international or high-quality schools following the Cambridge
                                                program.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4,
                                    mb: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                        Decision-making mindset
                                    </Typography>
                                    <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Make sound, independent decisions based on logical reasoning about cause
                                                and effect;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Express personal dreams and aspirations and map short-term goals to
                                                pursue
                                                them.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>
                                        Creative thinking
                                    </Typography>
                                    <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Enjoy exploration, stay curious, and eagerly inquire into objects and
                                                phenomena;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Demonstrate critical and creative thinking when approaching new concepts
                                                and situations;
                                            </Typography>
                                        </li>
                                        <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                            <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                            <Typography variant="body1"
                                                        sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>
                                                Be independent, open-minded, and able to solve problems while
                                                contributing value to their community.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                                <Box sx={{
                                    backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-3.png)',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    height: '500px'
                                }}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        },
        3: {
            title: 'Facilities',
            content: (
                <Box sx={{py: 4}}>
                    <Typography variant="h4" fontWeight={700} gutterBottom color="#2E7D32">
                        Modern facilities
                    </Typography>
                    <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.8, mb: 2}}>
                        MerryStar Kindergarten is equipped with modern facilities, ensuring a safe, comfortable, and
                        stimulating learning environment for children.
                    </Typography>
                    <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'}, gap: 3, mt: 3}}>
                        {[
                            {
                                title: 'Spacious classrooms',
                                desc: 'Designed to international standards with abundant natural light'
                            },
                            {title: 'Outdoor playground', desc: 'Safe play area with varied activity equipment'},
                            {title: 'Library', desc: 'Thousands of Vietnamese and English titles'},
                            {title: 'Clean dining room', desc: 'Kitchen and dining meeting food safety standards'},
                            {title: 'Medical room', desc: 'Professional nurse available 24/7'},
                            {title: 'Camera system', desc: 'Comprehensive safety monitoring'}
                        ].map((item, index) => (
                            <Box key={index} sx={{
                                p: 3,
                                border: '1px solid #E0E0E0',
                                borderRadius: 2,
                                '&:hover': {boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}
                            }}>
                                <Typography variant="h6" fontWeight={600} color="#2E7D32" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="#666">
                                    {item.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )
        },
        4: {
            title: 'Why choose MerryStar Kindergarten?',
            content: (
                <WhyChooseMerryStarContent/>
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

// Tuyen Sinh Content Component
function TuyenSinhContentSections() {
    const navigate = useNavigate()

    const handleRegistrationClick = () => {
        navigate('/login')
    }

    return (
        <Box sx={{py: 6}}>
            {/* Main Title Section */}
            <Box sx={{textAlign: 'center', mb: 6}}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
                    <Typography variant="h3" fontWeight={800} color="#2C3E50"
                                sx={{textTransform: 'uppercase', letterSpacing: '2px'}}>
                        MERRYSTAR ADMISSIONS POLICY
                    </Typography>
                </Box>
                <Box sx={{
                    width: 60,
                    height: 4,
                    backgroundColor: '#3498DB',
                    mx: 'auto',
                    borderRadius: 2
                }}/>
            </Box>

            {/* Introduction */}
            <Box sx={{mb: 6}}>
                <Typography variant="body1"
                            sx={{fontSize: '18px', lineHeight: 1.8, mb: 4, color: '#2C3E50', textAlign: 'center'}}>
                    MerryStar Bilingual Kindergarten organizes admissions for preschool-aged children as follows:
                </Typography>
            </Box>

            {/* Admission Target Table */}
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

            {/* Admission Process Timeline */}
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


            {/* Contact Info */}
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

// Team Content Sections Component
function TeamContentSections() {
    const [activeTab, setActiveTab] = useState(0) // Default to "Hội Đồng Khoa Học"

    // Listen for custom team tab change events from header navigation
    useEffect(() => {
        const handleTeamTabChange = (event) => {
            const {tabIndex} = event.detail
            setActiveTab(tabIndex)
        }

        window.addEventListener('changeTeamTab', handleTeamTabChange)

        return () => {
            window.removeEventListener('changeTeamTab', handleTeamTabChange)
        }
    }, [])

    const sections = {
        0: {
            title: 'Scientific Council',
            content: (
                <Box sx={{py: 6}}>
                    {/* Main Title Section */}
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
                    {/* Main Title Section */}
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

// Education Content Sections Component
function EducationContentSections() {
    const [activeTab, setActiveTab] = useState(0) // Default to "Chương trình học"

    // Listen for custom education tab change events from header navigation
    useEffect(() => {
        const handleEducationTabChange = (event) => {
            const {tabIndex} = event.detail
            setActiveTab(tabIndex)
        }

        window.addEventListener('changeEducationTab', handleEducationTabChange)

        return () => {
            window.removeEventListener('changeEducationTab', handleEducationTabChange)
        }
    }, [])

    const sections = {
        0: {
            title: 'Curriculum',
            content: (
                <Box sx={{py: 6}}>
                    {/* Main Title Section */}
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
        },
    }

    return (
        <Box>
            <Container sx={{mt: 5}}>
                {sections[activeTab]?.content}
            </Container>
        </Box>
    )
}

export default function Home() {
    const [currentSection, setCurrentSection] = useState('intro') // 'intro', 'team', or 'education'

    // Listen for section change events
    useEffect(() => {
        const handleIntroTabChange = () => {
            setCurrentSection('intro')
        }

        const handleTeamTabChange = () => {
            setCurrentSection('team')
        }

        const handleEducationTabChange = () => {
            setCurrentSection('education')
        }

        const handleTuyenSinhTabChange = () => {
            setCurrentSection('tuyenSinh')
        }

        window.addEventListener('changeIntroTab', handleIntroTabChange)
        window.addEventListener('changeTeamTab', handleTeamTabChange)
        window.addEventListener('changeEducationTab', handleEducationTabChange)
        window.addEventListener('changeTuyenSinhTab', handleTuyenSinhTabChange)

        return () => {
            window.removeEventListener('changeIntroTab', handleIntroTabChange)
            window.removeEventListener('changeTeamTab', handleTeamTabChange)
            window.removeEventListener('changeEducationTab', handleEducationTabChange)
            window.removeEventListener('changeTuyenSinhTab', handleTuyenSinhTabChange)
        }
    }, [])

    const renderCurrentSection = () => {
        switch (currentSection) {
            case 'intro':
                return <IntroContentSections/>
            case 'team':
                return <TeamContentSections/>
            case 'education':
                return <EducationContentSections/>
            case 'tuyenSinh':
                return <TuyenSinhContentSections/>
            default:
                return <IntroContentSections/>
        }
    }

    return (
        <>
            <SlideBar/>
            {renderCurrentSection()}
        </>
    )
}

