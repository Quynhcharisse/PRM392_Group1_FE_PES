import React, { useEffect, useState } from 'react'
import SlideBar from './SlideBar'
import IntroContentSections from './IntroContentSections'
import TeamContentSections from './TeamContentSections'
import EducationContentSections from './EducationContentSections'
import TuyenSinhContentSections from './TuyenSinhContentSections'
import ChatbotContainer from '../chatbot/ChatbotContainer'
import { Box } from '@mui/material'

export default function Home() {
  const [currentSection, setCurrentSection] = useState('intro')

  useEffect(() => {
    const handleIntroTabChange = () => setCurrentSection('intro')
    const handleTeamTabChange = () => setCurrentSection('team')
    const handleEducationTabChange = () => setCurrentSection('education')
    const handleTuyenSinhTabChange = () => setCurrentSection('tuyenSinh')

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
        return <IntroContentSections />
      case 'team':
        return <TeamContentSections />
      case 'education':
        return <EducationContentSections />
      case 'tuyenSinh':
        return <TuyenSinhContentSections />
      default:
        return <IntroContentSections />
    }
  }

  return (
    <Box>
      <SlideBar />
      {renderCurrentSection()}
      <ChatbotContainer />
    </Box>
  )
}

