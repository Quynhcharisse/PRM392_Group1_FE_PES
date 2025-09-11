import React, {useEffect, useState} from 'react'
import {Box} from '@mui/material'

export default function SlideBar() {
    const slides = [
        {
            id: 1,
            image: '/Mam-non-song-ngu-Merrystar-2022-3-1.jpg',
            title: 'WELCOME TO',
            subtitle: 'BILINGUAL KINDERGARTEN'
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
        <Box sx={{position: 'relative', height: {xs: 400, md: 600}, overflow: 'hidden', boxShadow: 4}}>
            <Box sx={slideStyle} />
        </Box>
    )
}
