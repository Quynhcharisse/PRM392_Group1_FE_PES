import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Box, Button, Container, Typography, IconButton, Dialog, DialogContent, Collapse} from '@mui/material'
import {ZoomIn, ZoomOut, Close, ExpandMore, ExpandLess, CheckCircle} from '@mui/icons-material'

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
        <Box sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" fontWeight={700} color="#1976D2" gutterBottom>
                    CHÂN DUNG HỌC SINH
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.6, maxWidth: '900px', margin: '0 auto', mb: 2 }}>
                    <strong>Hệ thống Mầm non Song ngữ MerryStar</strong> tự hào là nơi đầu tiên xây dựng <strong>Chân dung Học sinh</strong> dựa trên Hình ảnh Công dân Toàn cầu Hạnh phúc và Thành công trong Tương lai và đảm bảo học sinh của mình làm chủ những tố chất dưới đây sau ít nhất 02 năm theo học tại MerryStar.
                </Typography>
            </Box>

            {/* Three Pillars */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 8, flexWrap: 'wrap' }}>
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
                    <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{ mb: 2 }}>
                        Thân
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.5, color: '#424242' }}>
                        Học sinh MerryStar Khỏe mạnh - Kháng bệnh tốt - Tràn đầy năng lượng.
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
                    <Typography variant="h4" fontWeight={700} color="#C2185B" gutterBottom sx={{ mb: 2 }}>
                        Tâm
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.5, color: '#424242' }}>
                        Học sinh MerryStar biết yêu thương và lan toả tình yêu thương với những biểu hiện cụ thể.
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
                    <Typography variant="h4" fontWeight={700} color="#F57C00" gutterBottom sx={{ mb: 2 }}>
                        Tuệ
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.5, color: '#424242' }}>
                        Học sinh MerryStar làm chủ ngôn ngữ tiếng Anh và tiếng Việt, có tư duy lựa chọn độc lập và sáng tạo để thành công.
                    </Typography>
                </Box>
            </Box>

            {/* Thân Section */}
            <Box sx={{ mb: 8 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 4,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f5f5f5' },
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
                        Thân
                    </Box>
                    <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500, color: '#424242', flex: 1 }}>
                        Học sinh MerryStar Khỏe mạnh – Kháng bệnh tốt – Tràn đầy năng lượng.
                    </Typography>
                    <IconButton>
                        {expandedSections.than ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Box>

                <Collapse in={expandedSections.than}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start' }}>
                        <Box>
                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4,
                                mb: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                    Khoẻ mạnh và kháng bệnh tốt
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Nâng cao tầm vóc, thể hình đẹp;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Tăng trưởng vượt trội về chiều cao, phát triển và hoàn thiện não bộ trong giai đoạn vàng;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Có hệ miễn dịch khoẻ mạnh, đề kháng bệnh tật tốt, phòng chống bệnh không lây nhiễm khi trưởng thành.
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
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                    Tràn đầy năng lượng
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Phát triển vận động toàn diện: nhanh, mạnh, bền, khéo léo, dẻo dai;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Yêu thích và chủ động tham gia các hoạt động thể thao phù hợp lứa tuổi;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Vui vẻ, tích cực, tràn đầy năng lượng và truyền cảm hứng yêu thích thể thao tới mọi người.
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
                        }} />
                    </Box>
                </Collapse>
            </Box>

            {/* Tâm Section */}
            <Box sx={{ mb: 8 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 4,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f5f5f5' },
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
                        Tâm
                    </Box>
                    <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500, color: '#424242', flex: 1 }}>
                        Học sinh MerryStar biết yêu thương và lan toả tình yêu thương với những biểu hiện cụ thể.
                    </Typography>
                    <IconButton>
                        {expandedSections.tam ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Box>

                <Collapse in={expandedSections.tam}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start' }}>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-2.png)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '500px'
                        }} />

                        <Box>
                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4,
                                mb: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                    Yêu thương bản thân
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Biết ăn uống lành mạnh, đa dạng thực phẩm, chủ động lựa chọn thực phẩm có lợi cho sức khoẻ;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Biết tự phục vụ bản thân trong ăn uống và sinh hoạt hằng ngày phù hợp với độ tuổi;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Tôn trọng bản thân (nhận thức về bản thân và cảm xúc của bản thân), tuân thủ các nguyên tắc an toàn cho bản thân;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Trung thực trong suy nghĩ và hành động, hiểu về lợi ích, tác hại của nói thật và nói dối.
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
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                    Yêu thương gia đình, bạn bè
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Quan tâm đến cảm xúc, tâm trạng, tôn trọng sự riêng tư của người thân, biết giúp đỡ việc vừa sức;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Biết cách tự giải quyết mâu thuẫn với bạn, chia sẻ đồ chơi, duy trì tương tác tích cực với bạn.
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
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                    Yêu thương môi trường sống xung quanh
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Biết bảo vệ môi trường bằng những hành động cụ thể;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Hiểu được tác động của con người, bản thân đối với môi trường.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Collapse>
            </Box>

            {/* Tuệ Section */}
            <Box sx={{ mb: 8 }}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 4,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f5f5f5' },
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
                        Tuệ
                    </Box>
                    <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500, color: '#424242', flex: 1 }}>
                        Học sinh MerryStar làm chủ ngôn ngữ tiếng Anh và tiếng Việt, có tư duy lựa chọn độc lập và sáng tạo để thành công.
                    </Typography>
                    <IconButton>
                        {expandedSections.tue ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Box>

                <Collapse in={expandedSections.tue}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start' }}>
                        <Box>
                            <Box sx={{
                                backgroundColor: '#FFF3E0',
                                border: '2px dashed #FF9800',
                                borderRadius: '15px',
                                p: 4,
                                mb: 4
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                    Làm chủ ngôn ngữ tiếng Anh và tiếng Việt
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Giao tiếp hiệu quả và có ý nghĩa bằng cả tiếng Anh và tiếng Việt cho mục đích học tập và xây dựng các mối quan hệ tích cực, lâu bền trong cộng đồng;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Đạt các mục tiêu đầu ra các môn ESL, Toán, và Khoa học theo chuẩn quốc tế Cambridge Stage 1 vào năm cuối chương trình Mầm non, sẵn sàng bước vào các trường quốc tế, trường chất lượng cao theo học chương trình Cambridge.
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
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                    Có tư duy lựa chọn - kỹ năng ra quyết định
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Đưa ra những quyết định sáng suốt một cách độc lập dựa trên tư duy logic về nguyên nhân và kết quả;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Biết bộc lộ ước mơ, mong muốn của bản thân và xác định được lộ trình để thực hiện những mục tiêu ngắn hạn.
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
                                <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                    Có tư duy sáng tạo
                                </Typography>
                                <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Ưa khám phá, luôn tò mò và hứng thú tìm hiểu các sự vật, hiện tượng;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Có tư duy phản biện và tư duy sáng tạo khi tìm hiểu các khái niệm và tình huống mới mẻ;
                                        </Typography>
                                    </li>
                                    <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                        <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                            Có khả năng tự lập, cởi mở và có khả năng xử lý vấn đề, tăng cường đóng góp giá trị cho cộng đồng của mình.
                                        </Typography>
                                    </li>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{
                                backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-3.png)',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '500px'
                            }} />
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
        <Box sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h3" fontWeight={700} color="#1976D2" gutterBottom>
                    TẠI SAO NÊN CHỌN MERRYSTAR KINDERGARTEN?
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.6, maxWidth: '1000px', margin: '0 auto', mb: 4 }}>
                    MerryStar Kindergarten chọn Triết lý Thân – Tâm – Tuệ để tạo ra môi trường tốt nhất cho trẻ em phát triển cân bằng, đặt nền móng cho thế hệ công dân toàn cầu hạnh phúc và thành công trong tương lai: Cơ thể khỏe mạnh, tràn đầy năng lượng – Trái tim yêu thương và lan toả yêu thương – Tư duy lựa chọn, sáng tạo, làm chủ ngôn ngữ. Triết lý này là kim chỉ nam cho toàn bộ nội dung chương trình giáo dục, khởi nguồn tạo nên những điểm ưu việt riêng (5P), tạo nên 5 lợi thế khác biệt của Hệ thống Mầm non Song ngữ MerryStar Kindergarten mà các bậc cha mẹ tìm kiếm:
                </Typography>
            </Box>

            {/* 5P Central Diagram */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                <Box sx={{ position: 'relative', width: '400px', height: '400px' }}>
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
                        { angle: 0, title: 'PROOF', desc: 'Cam kết đầu ra', color: '#1976D2' },
                        { angle: 72, title: 'PERSONALIZATION', desc: 'Cá nhân hóa', color: '#4CAF50' },
                        { angle: 144, title: 'PHYSICAL FACILITIES', desc: 'Cơ sở vật chất', color: '#FF9800' },
                        { angle: 216, title: 'PROFESSIONALS', desc: 'Chuyên gia', color: '#E91E63' },
                        { angle: 288, title: 'PROGRAM', desc: 'Chương trình', color: '#9C27B0' }
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
                                <Typography variant="h6" fontWeight={700} color="white" sx={{ fontSize: '12px', mb: 0.5 }}>
                                    {point.title}
                                </Typography>
                                <Typography variant="body2" color="white" sx={{ fontSize: '10px', textAlign: 'center' }}>
                                    {point.desc}
                                </Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Box>

            {/* PROGRAM Section */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{ 
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PROGRAM - CHƯƠNG TRÌNH GIÁO DỤC CHÚ TRỌNG PHÁT TRIỂN THÂN - TÂM - TUỆ CHO CON
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start', mb: 4 }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-ve-chung-toi-1.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }} />
                    </Box>
                    
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, mb: 3 }}>
                            MerryStar hướng tới mô hình trường học "xuất sắc", tiên phong dẫn dắt các xu hướng giáo dục hiện đại và tiên tiến trong nước và quốc tế nhằm mang lại giá trị vượt trội cho trẻ em. MerryStar tự hào là một trong số những trường Mầm non đầu tiên tại Việt Nam trở thành "Cambridge Early Years Centre" được Cambridge International Education chính thức công nhận.
                        </Typography>
                        
                        <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Tập trung phát triển cân bằng 3 giá trị "Thân – Tâm – Tuệ" dành cho thế hệ trẻ em hạnh phúc và thành công;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Đảm bảo tính kết nối chặt chẽ giữa các độ tuổi nhà trẻ và mẫu giáo, liên thông với chương trình giáo dục phổ thông;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Triển khai phương pháp "lấy học sinh làm trung tâm" thông qua phương pháp giảng dạy thích ứng – Adaptive teaching;
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* PERSONALIZATION Section */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{ 
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PERSONALIZATION - CÁ NHÂN HÓA CHO SỨC KHỎE - SỨC KHỎE VÀ HỌC TẬP, PHÁT TRIỂN CÁ NHÂN CỦA TRẺ
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start', mb: 4 }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-ve-chung-toi-2.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }} />
                    </Box>
                    
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, mb: 3 }}>
                            MerryStar áp dụng sáng tạo Bộ công cụ quan sát hàng ngày và định kỳ riêng của MerryStar nhằm đánh giá chính xác năng lực, nhu cầu mỗi trẻ theo lộ trình. Điều này đặc biệt khuyến khích phụ huynh và MerryStar cùng tham gia vào quá trình đánh giá.
                        </Typography>
                        
                        <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Thực đơn dinh dưỡng được thiết kế riêng cho từng trẻ dựa trên nhu cầu và sở thích cá nhân;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Chương trình học tập được điều chỉnh phù hợp với khả năng và tốc độ phát triển của từng trẻ;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Hỗ trợ phát triển cá nhân toàn diện về thể chất, tinh thần và trí tuệ.
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* PROOF Section */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{ 
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PROOF - MERRYSTAR LÀ TRƯỜNG MẦM NON DUY NHẤT CAM KẾT ĐẦU RA CỦA HỌC SINH
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start', mb: 4 }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-tai-sao-nen-chon-3.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }} />
                    </Box>
                    
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, mb: 3 }}>
                            MerryStar là trường mầm non duy nhất tại Việt Nam cam kết đầu ra cụ thể cho học sinh, đảm bảo mỗi trẻ đạt được những mục tiêu phát triển rõ ràng sau khi hoàn thành chương trình học.
                        </Typography>
                        
                        <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Cam kết học sinh đạt chuẩn Cambridge Stage 1 khi tốt nghiệp;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Đảm bảo phát triển toàn diện Thân - Tâm - Tuệ theo tiêu chuẩn quốc tế;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Sẵn sàng bước vào các trường quốc tế và trường chất lượng cao.
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* PROFESSIONALS Section */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{ 
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PROFESSIONALS - ĐỘI NGŨ CHUYÊN GIA - GIÁO VIÊN HÀNG ĐẦU TRONG LĨNH VỰC MẦM NON TẠI VIỆT NAM
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start', mb: 4 }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-tai-sao-nen-chon-1.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }} />
                    </Box>
                    
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, mb: 3 }}>
                            Đội ngũ giáo viên của MerryStar Kindergarten là những giáo viên có trình độ chuyên môn, tận tâm và cùng chung tình yêu với sự nghiệp trồng người. Hình ảnh giáo viên của trường được xây dựng trên 3 giá trị cốt lõi YÊU THƯƠNG – CHÍNH TRỰC – GIÁ TRỊ.
                        </Typography>
                        
                        <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Đội ngũ giáo viên đạt chuẩn quốc tế với chứng chỉ Cambridge;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Chuyên gia giáo dục thể chất theo tiêu chuẩn quốc tế;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Đào tạo liên tục và cập nhật phương pháp giáo dục hiện đại.
                                </Typography>
                            </li>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* PHYSICAL FACILITIES Section */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{ 
                    borderBottom: '3px solid #FF9800',
                    pb: 1,
                    mb: 4
                }}>
                    PHYSICAL FACILITIES - CƠ SỞ VẬT CHẤT TỐI ƯU NHẤT CHO ĐỘ TUỔI MẦM NON
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start', mb: 4 }}>
                    <Box>
                        <Box sx={{
                            backgroundImage: 'url(/Mam-non-song-ngu-merrystar-tai-sao-nen-chon-5.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            borderRadius: '15px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                        }} />
                    </Box>
                    
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, mb: 3 }}>
                            Tọa lạc tại Khu đô thị Vinhomes Riverside 2, MerryStar Kindergarten, với tổng diện tích hơn 1.200m2 với kiến trúc xây dựng đảm bảo 3 tiêu chí về không gian, công năng và thẩm mỹ, là môi trường lý tưởng để bé học tập và phát triển.
                        </Typography>
                        
                        <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Thiết kế theo Triết lý Thân - Tâm - Tuệ, hòa hợp với thiên nhiên;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Sân chơi ngoài trời, khu vui chơi trong nhà, thư viện nhà kính độc đáo;
                                </Typography>
                            </li>
                            <li sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ color: '#1976D2', mr: 2, fontSize: '20px', flexShrink: 0 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6 }}>
                                    Trang thiết bị giáo dục chuẩn quốc tế, thân thiện với môi trường.
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
                    height: { xs: 'auto', md: '600px' },
                    backgroundImage: 'url(/thong-diep-1.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }} />
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
                <DialogContent sx={{ p: 0, position: 'relative' }}>
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
                        <Close />
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
                            <ZoomIn />
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
                            <ZoomOut />
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
                        }} />
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
            title: 'CHÀO MỪNG QUÝ PHỤ HUYNH ĐÃ ĐẾN VỚI',
            subtitle: 'MẦM NON SONG NGỮ',
            brand: 'MERRYSTAR',
            description: 'Nơi Kiến tạo Thế hệ Công dân Toàn cầu',
            description2: 'Hạnh phúc và Thành công',
            cta: 'TÌM HIỂU NGAY'
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

// Navigation Tabs Component
function NavigationTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: 0, label: 'Về chúng tôi' },
        { id: 1, label: 'Thông điệp Hiệu trưởng' },
        { id: 2, label: 'Chân dung học sinh' },
        { id: 3, label: 'Cơ sở vật chất' },
        { id: 4, label: 'Tại sao nên chọn MerryStar Kindergarten?' }
    ]

    return (
        <Box sx={{ 
            backgroundColor: '#F8F9FA', 
            py: 3,
            mt: 0,
            borderTop: '1px solid #E9ECEF'
        }}>
            <Container sx={{ px: 0 }}>
                <Box sx={{ 
                    display: 'flex', 
                    gap: 1,
                    overflowX: 'auto',
                    justifyContent: 'center',
                    '&::-webkit-scrollbar': { display: 'none' }
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

// Content Sections Component
function ContentSections() {
    const [activeTab, setActiveTab] = useState(0) // Default to "Về chúng tôi"
    
    const sections = {
        0: {
            title: 'Về chúng tôi',
            content: (
                <Box sx={{ py: 6 }}>
                    {/* Main Title Section */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <Typography variant="h3" fontWeight={800} color="#2C3E50" sx={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
                                VỀ CHÚNG TÔI
                            </Typography>
                            <Box sx={{ ml: 2, fontSize: '32px' }}>⭐</Box>
                        </Box>
                        <Box sx={{ 
                            width: 60, 
                            height: 4, 
                            backgroundColor: '#3498DB', 
                            mx: 'auto',
                            borderRadius: 2
                        }} />
                    </Box>

                    {/* Main Content */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '2fr 1fr'}, gap: 6, mb: 6 }}>
                        {/* Text Content */}
                        <Box>
                            <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 3, color: '#2C3E50' }}>
                                MerryStar Kindergarten là trường mầm non song ngữ hàng đầu, cam kết mang đến môi trường giáo dục 
                                chất lượng cao cho trẻ em từ 2-6 tuổi. Với hơn 10 năm kinh nghiệm trong lĩnh vực giáo dục mầm non, 
                                chúng tôi tự hào là ngôi trường được phụ huynh tin tưởng và yêu mến.
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 3, color: '#2C3E50' }}>
                                Triết lý giáo dục của chúng tôi tập trung vào việc phát triển toàn diện cho trẻ: Thân - Tâm - Tuệ, 
                                giúp trẻ không chỉ có kiến thức mà còn có kỹ năng sống, tình yêu thương và trí tuệ cảm xúc.
                            </Typography>
                        </Box>

                        {/* Images */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ 
                                width: '100%', 
                                height: 200, 
                                backgroundImage: 'url(/Mam-non-song-ngu-merrystar-ve-chung-toi-1.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 2,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                            }} />
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                <Box sx={{ 
                                    width: 60, 
                                    height: 60, 
                                    backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-2.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }} />
                                <Box sx={{ 
                                    width: 60, 
                                    height: 60, 
                                    backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-3.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }} />
                            </Box>
                        </Box>
                    </Box>

                    {/* Vision & Mission Section */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 6, mb: 6 }}>
                        {/* Vision */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight={800} color="#2C3E50" sx={{ 
                                textTransform: 'uppercase', 
                                letterSpacing: '1px',
                                mb: 2
                            }}>
                                TẦM NHÌN
                            </Typography>
                            <Box sx={{ 
                                width: 60, 
                                height: 4, 
                                backgroundColor: '#3498DB', 
                                mx: 'auto',
                                borderRadius: 2,
                                mb: 3
                            }} />
                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, color: '#2C3E50' }}>
                                Trở thành trường mầm non song ngữ hàng đầu Việt Nam, nơi mỗi đứa trẻ đều được phát triển toàn diện 
                                và trở thành công dân toàn cầu tương lai.
                            </Typography>
                        </Box>

                        {/* Mission */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight={800} color="#2C3E50" sx={{ 
                                textTransform: 'uppercase', 
                                letterSpacing: '1px',
                                mb: 2
                            }}>
                                SỨ MỆNH
                            </Typography>
                            <Box sx={{ 
                                width: 60, 
                                height: 4, 
                                backgroundColor: '#3498DB', 
                                mx: 'auto',
                                borderRadius: 2,
                                mb: 3
                            }} />
                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, color: '#2C3E50' }}>
                                Cung cấp môi trường giáo dục chất lượng cao, áp dụng phương pháp song ngữ hiện đại, 
                                giúp trẻ phát triển toàn diện về Thân - Tâm - Tuệ.
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
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{ mb: 3, textAlign: 'left' }}>
                                "Trẻ em nói"
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                fontSize: '18px', 
                                lineHeight: 1.8, 
                                color: '#2C3E50',
                                fontStyle: 'italic',
                                mb: 3,
                                textAlign: 'left'
                            }}>
                                Ngôn ngữ của những bông hoa<br/>
                                Và hiểu<br/>
                                Tiếng thì thầm của gió.
                            </Typography>
                            
                            <Typography variant="h6" fontWeight={600} color="#2C3E50" sx={{ mb: 3, textAlign: 'left' }}>
                                "Trẻ hòa nhịp"
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                fontSize: '18px', 
                                lineHeight: 1.8, 
                                color: '#2C3E50',
                                fontStyle: 'italic',
                                mb: 3,
                                textAlign: 'left'
                            }}>
                                Với những bài ca huyền ảo của rừng<br/>
                                Chúng có thể lắng nghe những cái cây<br/>
                                Hiểu tiếng reo vui của những dòng sông<br/>
                                Và cảm được ý nghĩa của từng tia nắng mặt trời.
                            </Typography>
                            
                            <Typography variant="body1" sx={{ 
                                fontSize: '16px', 
                                lineHeight: 1.8, 
                                color: '#2C3E50',
                                mb: 3,
                                textAlign: 'left'
                            }}>
                                Công việc của chúng ta không phải là đi sửa những điều trên<br/>
                                Mà hãy nuôi dưỡng chúng<br/>
                                Và gìn giữ<br/>
                                Và thậm chí là nhớ lại những điều đó cho chính bản thân mình.
                            </Typography>
                            
                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Typography variant="h6" fontWeight={600} color="#2C3E50" sx={{ mb: 1, textAlign: 'left' }}>
                                    Cristen Rodgers
                                </Typography>
                                <Typography variant="body2" color="#7F8C8D" sx={{ fontSize: '14px' }}>
                                    Văn sĩ người Mỹ nổi tiếng với các tác phẩm dành cho trẻ em
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        },
        1: {
            title: 'Thông điệp Hiệu trưởng',
            content: (
                <Box sx={{ py: 4 }}>
                    <ImageZoom />
                </Box>
            )
        },
        2: {
            title: 'Chân dung học sinh',
            content: (
                <Box sx={{ py: 4 }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h3" fontWeight={700} color="#1976D2" gutterBottom>
                            CHÂN DUNG HỌC SINH
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.6, maxWidth: '900px', margin: '0 auto', mb: 2 }}>
                            <strong>Hệ thống Mầm non Song ngữ MerryStar</strong> tự hào là nơi đầu tiên xây dựng <strong>Chân dung Học sinh</strong> dựa trên Hình ảnh Công dân Toàn cầu Hạnh phúc và Thành công trong Tương lai và đảm bảo học sinh của mình làm chủ những tố chất dưới đây sau ít nhất 02 năm theo học tại MerryStar.
                        </Typography>
                    </Box>

                    {/* Three Pillars */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 8, flexWrap: 'wrap' }}>
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
                            <Typography variant="h4" fontWeight={700} color="#1976D2" gutterBottom sx={{ mb: 2 }}>
                                Thân
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.5, color: '#424242' }}>
                                Học sinh MerryStar Khỏe mạnh - Kháng bệnh tốt - Tràn đầy năng lượng.
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
                            <Typography variant="h4" fontWeight={700} color="#C2185B" gutterBottom sx={{ mb: 2 }}>
                                Tâm
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.5, color: '#424242' }}>
                                Học sinh MerryStar biết yêu thương và lan toả tình yêu thương với những biểu hiện cụ thể.
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
                            <Typography variant="h4" fontWeight={700} color="#F57C00" gutterBottom sx={{ mb: 2 }}>
                                Tuệ
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.5, color: '#424242' }}>
                                Học sinh MerryStar làm chủ ngôn ngữ tiếng Anh và tiếng Việt, có tư duy lựa chọn độc lập và sáng tạo để thành công.
                            </Typography>
                        </Box>
                    </Box>

                    {/* Thân Section */}
                    <Box sx={{ mb: 8 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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
                                Thân
                            </Box>
                            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500, color: '#424242' }}>
                                Học sinh MerryStar Khỏe mạnh – Kháng bệnh tốt – Tràn đầy năng lượng.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start' }}>
                            <Box>
                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4,
                                    mb: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                        Khoẻ mạnh và kháng bệnh tốt
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Nâng cao tầm vóc, thể hình đẹp;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Tăng trưởng vượt trội về chiều cao, phát triển và hoàn thiện não bộ trong giai đoạn vàng;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Có hệ miễn dịch khoẻ mạnh, đề kháng bệnh tật tốt, phòng chống bệnh không lây nhiễm khi trưởng thành.
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
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                        Tràn đầy năng lượng
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Phát triển vận động toàn diện: nhanh, mạnh, bền, khéo léo, dẻo dai;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Yêu thích và chủ động tham gia các hoạt động thể thao phù hợp lứa tuổi;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Vui vẻ, tích cực, tràn đầy năng lượng và truyền cảm hứng yêu thích thể thao tới mọi người.
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
                            }} />
                        </Box>
                    </Box>

                    {/* Tâm Section */}
                    <Box sx={{ mb: 8 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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
                                Tâm
                            </Box>
                            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500, color: '#424242' }}>
                                Học sinh MerryStar biết yêu thương và lan toả tình yêu thương với những biểu hiện cụ thể.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start' }}>
                            <Box sx={{
                                backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-2.png)',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                height: '500px'
                            }} />

                            <Box>
                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4,
                                    mb: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                        Yêu thương bản thân
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Biết ăn uống lành mạnh, đa dạng thực phẩm, chủ động lựa chọn thực phẩm có lợi cho sức khoẻ;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Biết tự phục vụ bản thân trong ăn uống và sinh hoạt hằng ngày phù hợp với độ tuổi;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Tôn trọng bản thân (nhận thức về bản thân và cảm xúc của bản thân), tuân thủ các nguyên tắc an toàn cho bản thân;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Trung thực trong suy nghĩ và hành động, hiểu về lợi ích, tác hại của nói thật và nói dối.
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
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                        Yêu thương gia đình, bạn bè
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Quan tâm đến cảm xúc, tâm trạng, tôn trọng sự riêng tư của người thân, biết giúp đỡ việc vừa sức;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Biết cách tự giải quyết mâu thuẫn với bạn, chia sẻ đồ chơi, duy trì tương tác tích cực với bạn.
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
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                        Yêu thương môi trường sống xung quanh
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Biết bảo vệ môi trường bằng những hành động cụ thể;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Hiểu được tác động của con người, bản thân đối với môi trường.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Tuệ Section */}
                    <Box sx={{ mb: 8 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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
                                Tuệ
                            </Box>
                            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500, color: '#424242' }}>
                                Học sinh MerryStar làm chủ ngôn ngữ tiếng Anh và tiếng Việt, có tư duy lựa chọn độc lập và sáng tạo để thành công.
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'start' }}>
                            <Box>
                                <Box sx={{
                                    backgroundColor: '#FFF3E0',
                                    border: '2px dashed #FF9800',
                                    borderRadius: '15px',
                                    p: 4,
                                    mb: 4
                                }}>
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                        Làm chủ ngôn ngữ tiếng Anh và tiếng Việt
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Giao tiếp hiệu quả và có ý nghĩa bằng cả tiếng Anh và tiếng Việt cho mục đích học tập và xây dựng các mối quan hệ tích cực, lâu bền trong cộng đồng;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Đạt các mục tiêu đầu ra các môn ESL, Toán, và Khoa học theo chuẩn quốc tế Cambridge Stage 1 vào năm cuối chương trình Mầm non, sẵn sàng bước vào các trường quốc tế, trường chất lượng cao theo học chương trình Cambridge.
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
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                        Có tư duy lựa chọn - kỹ năng ra quyết định
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Đưa ra những quyết định sáng suốt một cách độc lập dựa trên tư duy logic về nguyên nhân và kết quả;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Biết bộc lộ ước mơ, mong muốn của bản thân và xác định được lộ trình để thực hiện những mục tiêu ngắn hạn.
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
                                    <Typography variant="h5" fontWeight={700} color="#E65100" gutterBottom sx={{ mb: 3 }}>
                                        Có tư duy sáng tạo
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Ưa khám phá, luôn tò mò và hứng thú tìm hiểu các sự vật, hiện tượng;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Có tư duy phản biện và tư duy sáng tạo khi tìm hiểu các khái niệm và tình huống mới mẻ;
                                            </Typography>
                                        </li>
                                        <li sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <Box sx={{ color: '#FF9800', mr: 2, mt: 0.5, fontSize: '18px' }}>•</Box>
                                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.6, color: '#424242' }}>
                                                Có khả năng tự lập, cởi mở và có khả năng xử lý vấn đề, tăng cường đóng góp giá trị cho cộng đồng của mình.
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box sx={{
                                    backgroundImage: 'url(/Mam-non-song-ngu-merrystar-chan-dung-hoc-sinh-3.png)',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    height: '500px'
                                }} />
                            
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        },
        3: {
            title: 'Cơ sở vật chất',
            content: (
                <Box sx={{ py: 4 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom color="#2E7D32">
                        Cơ sở vật chất hiện đại
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, mb: 2 }}>
                        MerryStar Kindergarten được trang bị cơ sở vật chất hiện đại, đảm bảo môi trường học tập 
                        an toàn, thoải mái và kích thích sự phát triển của trẻ.
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'}, gap: 3, mt: 3 }}>
                        {[
                            { title: 'Phòng học rộng rãi', desc: 'Phòng học được thiết kế theo tiêu chuẩn quốc tế với đầy đủ ánh sáng tự nhiên' },
                            { title: 'Sân chơi ngoài trời', desc: 'Khu vui chơi an toàn với thiết bị vận động đa dạng' },
                            { title: 'Thư viện sách', desc: 'Thư viện với hàng nghìn đầu sách tiếng Việt và tiếng Anh' },
                            { title: 'Phòng ăn sạch sẽ', desc: 'Nhà bếp và phòng ăn đảm bảo vệ sinh an toàn thực phẩm' },
                            { title: 'Phòng y tế', desc: 'Phòng y tế với y tá chuyên nghiệp 24/7' },
                            { title: 'Hệ thống camera', desc: 'Hệ thống giám sát an toàn toàn diện' }
                        ].map((item, index) => (
                            <Box key={index} sx={{ 
                                p: 3, 
                                border: '1px solid #E0E0E0', 
                                borderRadius: 2,
                                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
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
            title: 'Tại sao nên chọn MerryStar Kindergarten?',
            content: (
                <WhyChooseMerryStarContent />
            )
        }
    }

    return (
        <Box>
            <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <Container sx={{ mt: 5 }}>
                {sections[activeTab]?.content}
            </Container>
        </Box>
    )
}

export default function Home() {
    return (
        <>
            <SlideBar/>
            <ContentSections />
        </>
    )
}