import React from 'react'
import {Box, Typography} from '@mui/material'
import {CheckCircle as CheckCircleIcon} from '@mui/icons-material'

export default function WhyChooseMerryStarContent() {
    return (
        <Box sx={{py: 4}}>
            <Box sx={{textAlign: 'center', mb: 8}}>
                <Typography variant="h3" fontWeight={700} color="#1976D2" gutterBottom>
                    WHY CHOOSE MERRYSTAR KINDERGARTEN?
                </Typography>
                <Typography variant="body1" sx={{fontSize: '18px', lineHeight: 1.6, maxWidth: '1000px', margin: '0 auto', mb: 4}}>
                    MerryStar embraces the Body – Heart – Mind philosophy to create the best learning environment for
                    children to grow holistically, laying the foundation for happy and successful global citizens: a
                    healthy body full of energy – a loving heart that spreads kindness – a discerning, creative mind
                    with strong language mastery. This philosophy guides our entire curriculum and underpins the unique 5P
                    advantages that parents value at MerryStar.
                </Typography>
            </Box>

            {/* 5P Central Diagram */}
            <Box sx={{display: 'flex', justifyContent: 'center', mb: 8}}>
                <Box sx={{position: 'relative', width: '400px', height: '400px'}}>
                    <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px', background: 'linear-gradient(135deg, #FFD700, #FFA500)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)', zIndex: 2}}>
                        <Typography variant="h3" fontWeight={900} color="white">5P</Typography>
                    </Box>

                    {[{angle: 0, title: 'PROOF', desc: 'Learning outcomes commitment', color: '#1976D2'},{angle: 72, title: 'PERSONALIZATION', desc: 'Personalization', color: '#4CAF50'},{angle: 144, title: 'PHYSICAL FACILITIES', desc: 'Facilities', color: '#FF9800'},{angle: 216, title: 'PROFESSIONALS', desc: 'Professionals', color: '#E91E63'},{angle: 288, title: 'PROGRAM', desc: 'Program', color: '#9C27B0'}].map((point, index) => {
                        const x = 200 + 150 * Math.cos((point.angle - 90) * Math.PI / 180)
                        const y = 200 + 150 * Math.sin((point.angle - 90) * Math.PI / 180)

                        return (
                            <Box key={index} sx={{position: 'absolute', left: `${x - 60}px`, top: `${y - 60}px`, width: '120px', height: '120px', backgroundColor: point.color, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.2)', zIndex: 1}}>
                                <Typography variant="h6" fontWeight={700} color="white" sx={{fontSize: '12px', mb: 0.5}}>{point.title}</Typography>
                                <Typography variant="body2" color="white" sx={{fontSize: '10px', textAlign: 'center'}}>{point.desc}</Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>

            {/* Program summary and features (kept concise) */}
            <Box sx={{mb: 8}}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{borderBottom: '3px solid #FF9800', pb: 1, mb: 4}}>PROGRAM - A HOLISTIC CURRICULUM NURTURING BODY - HEART - MIND</Typography>
                <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 6, alignItems: 'start', mb: 4}}>
                    <Box>
                        <Box sx={{backgroundImage: 'url(/Mam-non-song-ngu-merrystar-ve-chung-toi-1.png)', backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', borderRadius: '15px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)'}}/>
                    </Box>

                    <Box>
                        <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6, mb: 3}}>MerryStar strives to be an exemplary school, leading modern educational trends domestically and internationally to deliver outstanding value for children. We are proud to be among the first kindergartens in Vietnam recognized as a Cambridge Early Years Centre by Cambridge International Education.</Typography>

                        <Box component="ul" sx={{pl: 0, listStyle: 'none'}}>
                            <li sx={{mb: 2, display: 'flex', alignItems: 'center'}}>
                                <CheckCircleIcon sx={{color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0}}/>
                                <Typography variant="body1" sx={{fontSize: '16px', lineHeight: 1.6}}>Balanced development of Body – Heart – Mind for happy, successful children;</Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
