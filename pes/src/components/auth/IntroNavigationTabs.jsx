import React from 'react'
import {Box, Container} from '@mui/material'

export default function IntroNavigationTabs({activeTab, setActiveTab}) {
    const tabs = [
        {id: 0, label: 'About us'},
        {id: 1, label: "Principal's message"},
        {id: 2, label: 'Student profile'},
        {id: 3, label: 'Facilities'},
        {id: 4, label: 'Why choose MerryStar Kindergarten?'},
        {id: 5, label: 'Our Teachers'}
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
                                backgroundColor: activeTab === tab.id ? '#FF6B35' : 'rgba(255, 255, 255, 0.8)',
                                color: activeTab === tab.id ? '#fff' : '#2C3E50',
                                fontWeight: activeTab === tab.id ? 700 : 500,
                                fontSize: '15px',
                                whiteSpace: 'nowrap',
                                minWidth: 'fit-content',
                                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(255, 107, 53, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor: activeTab === tab.id ? '#E55A2B' : 'rgba(255, 107, 53, 0.15)',
                                    color: activeTab === tab.id ? '#fff' : '#FF6B35',
                                    transform: 'translateY(-2px)',
                                    boxShadow: activeTab === tab.id ? '0 6px 16px rgba(255, 107, 53, 0.4)' : '0 4px 12px rgba(255, 107, 53, 0.2)'
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
