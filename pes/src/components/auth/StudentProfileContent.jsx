import React, {useState} from 'react'
import {Box, Collapse, IconButton, Typography} from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'

export default function StudentProfileContent() {
    const [expandedSections, setExpandedSections] = useState({than: true, tam: false, tue: false})

    const toggleSection = (section) => {
        setExpandedSections(prev => ({...prev, [section]: !prev[section]}))
    }

    return (
        <Box sx={{py: 4}}>
            {/* Header */}
            <Box sx={{textAlign: 'center', mb: 6}}>
                <Typography variant="h3" fontWeight={700} color="#1976D2" gutterBottom>
                    STUDENT PROFILE
                </Typography>
                <Typography variant="body1" sx={{fontSize: '18px', lineHeight: 1.6, maxWidth: '900px', margin: '0 auto', mb: 2}}>
                    <strong>MerryStar Bilingual Kindergarten</strong> proudly pioneers a <strong>Student Profile</strong>
                    based on the image of a Happy and Successful Global Citizen, ensuring our learners develop the
                    following qualities after at least two years at MerryStar.
                </Typography>
            </Box>

            {/* Three Pillars */}
            <Box sx={{display: 'flex', justifyContent: 'center', gap: 4, mb: 8, flexWrap: 'wrap'}}>
                <Box sx={{backgroundColor: '#E3F2FD', borderRadius: '20px', p: 4, textAlign: 'center', minWidth: '250px', maxWidth: '300px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', border: '2px solid #BBDEFB'}}>
                    <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{mb: 2}}>Body</Typography>
                    <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.5, color: '#424242'}}>MerryStar students are healthy, resilient, and energetic.</Typography>
                </Box>

                <Box sx={{backgroundColor: '#FCE4EC', borderRadius: '20px', p: 4, textAlign: 'center', minWidth: '250px', maxWidth: '300px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', border: '2px solid #F8BBD9'}}>
                    <Typography variant="h4" fontWeight={700} color="#C2185B" gutterBottom sx={{mb: 2}}>Heart</Typography>
                    <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.5, color: '#424242'}}>MerryStar students are loving and spread kindness through concrete actions.</Typography>
                </Box>

                <Box sx={{backgroundColor: '#FFF8E1', borderRadius: '20px', p: 4, textAlign: 'center', minWidth: '250px', maxWidth: '300px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)', border: '2px solid #FFE0B2'}}>
                    <Typography variant="h4" fontWeight={700} color="#F57C00" gutterBottom sx={{mb: 2}}>Mind</Typography>
                    <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.5, color: '#424242'}}>MerryStar students master English and Vietnamese, think independently and creatively to succeed.</Typography>
                </Box>
            </Box>

            {/* Sections (Body/Heart/Mind) */}
            <Box sx={{mb: 8}}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 4, cursor: 'pointer', '&:hover': {backgroundColor: '#f5f5f5'}, p: 2, borderRadius: '10px', transition: 'background-color 0.3s ease'}} onClick={() => toggleSection('than')}>
                    <Box sx={{background: 'linear-gradient(135deg, #1976D2, #42A5F5)', color: 'white', px: 3, py: 1.5, borderRadius: '20px', mr: 3, fontSize: '16px', fontWeight: 700, boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'}}>Body</Box>
                    <Typography variant="h6" sx={{fontSize: '18px', fontWeight: 500, color: '#424242', flex: 1}}>MerryStar students are healthy – resilient – full of energy.</Typography>
                    <IconButton>{expandedSections.than ? <ExpandLess/> : <ExpandMore/>}</IconButton>
                </Box>

                <Collapse in={expandedSections.than}>
                    <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 6, alignItems: 'start'}}>
                        <Box>
                            <Box sx={{backgroundColor: '#FFF3E0', border: '2px dashed #FF9800', borderRadius: '15px', p: 4, mb: 4}}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>Strong health and resilience</Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Improved physique and stature;</Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Outstanding height growth; optimal brain development during the golden stage;</Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Strong immune system with long-term disease prevention.</Typography>
                                    </li>
                                </Box>
                            </Box>

                            <Box sx={{backgroundColor: '#FFF3E0', border: '2px dashed #FF9800', borderRadius: '15px', p: 4}}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>Full of energy</Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Comprehensive motor development: speed, strength, endurance, dexterity, flexibility;</Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Enjoy and actively participate in age-appropriate sports;</Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Cheerful, positive, energetic; inspire others to love sports.</Typography>
                                    </li>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-1-1.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '500px'}}/>
                    </Box>
                </Collapse>
            </Box>

            {/* Heart and Mind sections are similar - keep them concise here */}
            <Box sx={{mb: 8}}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 4, cursor: 'pointer', '&:hover': {backgroundColor: '#f5f5f5'}, p: 2, borderRadius: '10px', transition: 'background-color 0.3s ease'}} onClick={() => toggleSection('tam')}>
                    <Box sx={{background: 'linear-gradient(135deg, #1976D2, #42A5F5)', color: 'white', px: 3, py: 1.5, borderRadius: '20px', mr: 3, fontSize: '16px', fontWeight: 700}}>Heart</Box>
                    <Typography variant="h6" sx={{fontSize: '18px', fontWeight: 500, color: '#424242', flex: 1}}>MerryStar students are loving and spread kindness through concrete actions.</Typography>
                    <IconButton>{expandedSections.tam ? <ExpandLess/> : <ExpandMore/>}</IconButton>
                </Box>

                <Collapse in={expandedSections.tam}>
                    <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 6, alignItems: 'start'}}>
                        <Box sx={{backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-2.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '500px'}}/>
                        <Box>
                            <Box sx={{backgroundColor: '#FFF3E0', border: '2px dashed #FF9800', borderRadius: '15px', p: 4, mb: 4}}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>Love for self</Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Maintain a healthy, diverse diet and choose beneficial foods;</Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Practice age-appropriate self-care in daily routines;</Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Self-respect (awareness of self and emotions); follow personal safety rules;</Typography>
                                    </li>
                                </Box>
                            </Box>

                            <Box sx={{backgroundColor: '#FFF3E0', border: '2px dashed #FF9800', borderRadius: '15px', p: 4}}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>Love for family and friends</Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Care for others’ feelings; respect privacy; help within capability;</Typography>
                                    </li>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Resolve conflicts, share, and maintain positive interactions.</Typography>
                                    </li>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Collapse>
            </Box>

            <Box sx={{mb: 8}}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 4, cursor: 'pointer', '&:hover': {backgroundColor: '#f5f5f5'}, p: 2, borderRadius: '10px', transition: 'background-color 0.3s ease'}} onClick={() => toggleSection('tue')}>
                    <Box sx={{background: 'linear-gradient(135deg, #1976D2, #42A5F5)', color: 'white', px: 3, py: 1.5, borderRadius: '20px', mr: 3, fontSize: '16px', fontWeight: 700}}>Mind</Box>
                    <Typography variant="h6" sx={{fontSize: '18px', fontWeight: 500, color: '#424242', flex: 1}}>MerryStar students master both English and Vietnamese, develop independent decision-making and creativity to succeed.</Typography>
                    <IconButton>{expandedSections.tue ? <ExpandLess/> : <ExpandMore/>}</IconButton>
                </Box>

                <Collapse in={expandedSections.tue}>
                    <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 6, alignItems: 'start'}}>
                        <Box>
                            <Box sx={{backgroundColor: '#FFF3E0', border: '2px dashed #FF9800', borderRadius: '15px', p: 4, mb: 4}}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{mb: 3}}>Mastery of English and Vietnamese</Typography>
                                <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                                    <li sx={{mb: 2, display: 'flex', alignItems: 'flex-start'}}>
                                        <Box sx={{color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px'}}>•</Box>
                                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, color: '#424242'}}>Communicate effectively and meaningfully in both English and Vietnamese for learning purposes and to build positive, lasting relationships in the community;</Typography>
                                    </li>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                            <Box sx={{backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-3.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '500px'}}/>
                        </Box>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    )
}
