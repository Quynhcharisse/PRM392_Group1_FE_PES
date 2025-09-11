import {Box, Typography} from '@mui/material'
import {CheckCircle as CheckCircleIcon} from '@mui/icons-material'
export default function FacilitiesContent() {
  return (
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
}
