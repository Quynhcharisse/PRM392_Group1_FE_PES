import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
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

// Introduction Navigation Tabs Component
function IntroNavigationTabs({ activeTab, setActiveTab }) {
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

// Introduction Content Sections Component
function IntroContentSections() {
    const [activeTab, setActiveTab] = useState(0) // Default to "Về chúng tôi"
    
    // Listen for custom intro tab change events from header navigation
    useEffect(() => {
        const handleIntroTabChange = (event) => {
            const { tabIndex } = event.detail
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
            <IntroNavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <Container sx={{ mt: 5 }}>
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
        <Box sx={{ py: 6 }}>
            {/* Main Title Section */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Typography variant="h3" fontWeight={800} color="#2C3E50" sx={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
                        QUY CHẾ TUYỂN SINH MERRYSTAR
                    </Typography>  
                </Box>
                <Box sx={{ 
                    width: 60, 
                    height: 4, 
                    backgroundColor: '#3498DB', 
                    mx: 'auto',
                    borderRadius: 2
                }} />
            </Box>

            {/* Introduction */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 4, color: '#2C3E50', textAlign: 'center' }}>
                    Hệ thống Mầm non Song ngữ MerryStar ("MerryStar Kindergarten") tổ chức tuyển sinh trẻ độ tuổi mầm non, 
                    cụ thể như sau:
                </Typography>
            </Box>

            {/* Admission Target Table */}
            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ maxWidth: 500, width: '100%' }}>
                    <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                        Đối Tượng Tuyển Sinh
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
                            <Box sx={{ p: 2, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
                                Độ tuổi
                            </Box>
                            <Box sx={{ p: 2, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
                                Năm sinh
                            </Box>
                            <Box sx={{ p: 2, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
                                Khối lớp
                            </Box>
                            <Box sx={{ p: 2, textAlign: 'center' }}>
                                Sĩ số trẻ/lớp
                            </Box>
                        </Box>
                        
                        {[
                            {
                                age: '3 tuổi',
                                birthYear: 'Năm 2022',
                                classGroup: 'SEED',
                                studentCount: '25'
                            },
                            {
                                age: '4 tuổi',
                                birthYear: 'Năm 2021',
                                classGroup: 'BUD',
                                studentCount: '25'
                            },
                            {
                                age: '5 tuổi',
                                birthYear: 'Năm 2020',
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
            <Box sx={{ mb: 6 }}>
                <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 6, textAlign: 'center' }}>
                    Quy trình đăng ký tuyển sinh
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
                    }} />
                    
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
                                title: 'Phụ huynh đăng ký thông tin cho trẻ theo mẫu quy định của MerryStar Kindergarten',
                                icon: '📝',
                                link: 'Đăng ký tuyển sinh →',
                                color: '#FF6B35'
                            },
                            {
                                step: '2',
                                title: 'MerryStar Kindergarten kiểm tra hồ sơ đăng ký và gửi thông báo hướng dẫn ghi danh khi đạt điều kiện tuyển sinh',
                                icon: '📢',
                                color: '#E91E63'
                            },
                            {
                                step: '3',
                                title: 'Phụ huynh hoàn thành thủ tục ghi danh cho trẻ',
                                icon: '✅',
                                color: '#4CAF50'
                            },
                            {
                                step: '4',
                                title: 'Trẻ tham gia đánh giá đầu vào với Hội đồng tuyển sinh MerryStar Kindergarten',
                                icon: '💬',
                                color: '#9C27B0'
                            },
                            {
                                step: '5',
                                title: 'Phụ huynh hoàn thành thủ tục nhập học cho trẻ sau khi trẻ có kết quả đạt đánh giá',
                                icon: '📋',
                                color: '#FF9800'
                            },
                            {
                                step: '6',
                                title: 'Trẻ nhập học chính thức theo quy định của MerryStar Kindergarten',
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
                <Typography variant="h4" fontWeight={800} color="#2C3E50" sx={{ mb: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Thông tin liên hệ tuyển sinh
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
                            title: 'Giờ làm việc',
                            content: '7:00 - 17:00 (T2-T6)',
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
                            <Typography variant="h6" fontWeight={700} color={item.color} sx={{ mb: 1 }}>
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
            const { tabIndex } = event.detail
            setActiveTab(tabIndex)
        }
        
        window.addEventListener('changeTeamTab', handleTeamTabChange)
        
        return () => {
            window.removeEventListener('changeTeamTab', handleTeamTabChange)
        }
    }, [])
    
    const sections = {
        0: {
            title: 'Hội Đồng Khoa Học',
            content: (
                <Box sx={{ py: 6 }}>
                    {/* Main Title Section */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <Typography variant="h3" fontWeight={800} color="#2C3E50" sx={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
                                HỘI ĐỒNG KHOA HỌC
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

                    {/* Introduction Text */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 4, color: '#2C3E50', textAlign: 'center' }}>
                            Mỗi em bé sinh ra đã là một "kỳ quan của cuộc sống", xứng đáng được lớn lên trong môi trường giáo dục 
                            tràn đầy tình yêu thương và hạnh phúc. Đó là động lực để đội ngũ những nhà giáo dục tâm huyết sáng lập 
                            nên Hệ thống Mầm non Song ngữ MerryStar với mục tiêu xây dựng và phát triển một môi trường học tập 
                            theo tiêu chuẩn quốc tế, nơi con trẻ được phát triển cân bằng về Thể chất, Tâm hồn và Trí tuệ từ những năm đầu đời.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 4, color: '#2C3E50', textAlign: 'center' }}>
                            Hội đồng Khoa học của MerryStar tự hào quy tụ Đội ngũ Nhân sự chiến lược là các Chuyên gia hàng đầu 
                            của Quốc tế và Việt Nam trong lĩnh vực Giáo dục, Dinh dưỡng và Phát triển thể chất cho trẻ Mầm non:
                        </Typography>
                    </Box>

                    {/* Executive Board */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                            BAN ĐIỀU HÀNH
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 4 }}>
                            <Box sx={{ p: 3, border: '1px solid #E0E0E0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                    Cô Bùi Thanh Anh
                                </Typography>
                                <Typography variant="body2" color="#666">
                                    Giám đốc Kiểm soát chất lượng
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3, border: '1px solid #E0E0E0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                    Cô Nguyễn Thị Thu
                                </Typography>
                                <Typography variant="body2" color="#666">
                                    Quản lý Chương trình
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Professional Board */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                            BAN CHUYÊN MÔN
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}, gap: 4 }}>
                            <Box sx={{ p: 3, border: '1px solid #E0E0E0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                    Cô Nguyễn Thị Hà
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ mb: 1 }}>
                                    Nhà sáng lập - Chủ tịch HĐQT
                                </Typography>
                                <Typography variant="body2" color="#666">
                                    Chuyên gia về giáo dục Mầm non
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3, border: '1px solid #E0E0E0', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h6" fontWeight={600} color="#FF6B35" gutterBottom>
                                    Ông Ngô Minh Tuấn
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ mb: 1 }}>
                                    Nhà sáng lập - Phó Chủ tịch HĐQT
                                </Typography>
                                <Typography variant="body2" color="#666">
                                    Chuyên gia Cố vấn Chương trình Giáo dục
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Experience Description */}
                    <Box sx={{ mb: 6, p: 4, backgroundColor: '#F8F9FA', borderRadius: 3 }}>
                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', textAlign: 'center' }}>
                            Với kinh nghiệm hàng chục năm trong công tác lãnh đạo tại những Hệ thống Giáo dục Mầm non và các Cơ quan – 
                            Tổ chức uy tín nhất tại Việt Nam và thế giới, Đội ngũ Nhân sự chiến lược tại MerryStar đã không ngừng nghiên cứu 
                            và đúc kết những tư tưởng giáo dục tiên phong, cũng như các phương pháp tối ưu trong chăm sóc và nuôi dưỡng trẻ em 
                            tại các quốc gia tiên tiến trên toàn cầu. Đó là nền tảng vững chắc để quá trình vận hành và quản lý chất lượng 
                            giáo dục tại MerryStar đạt hiệu quả cao nhất, tạo nên môi trường học tập tối ưu cho các bé.
                        </Typography>
                    </Box>

                    {/* Team Members Grid */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                            Cùng gặp gỡ các Chuyên gia trong Hội đồng Khoa học của MerryStar
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
                                gridColumn: { lg: '2' }
                            },
                            '& > *:nth-child(5)': {
                                gridColumn: { lg: '3' }
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
                                }} />
                                <Typography variant="h6" fontWeight={700} color="#2C3E50" sx={{ mb: 1, fontSize: '14px' }}>
                                    NCS THS. NGUYỄN THỊ HÀ
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{ mb: 1 }}>
                                    Nhà sáng lập | Chủ tịch HĐQT
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ fontSize: '12px', lineHeight: 1.4, mb: 1 }}>
                                    Chuyên gia về giáo dục Mầm non
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ fontSize: '11px', lineHeight: 1.3 }}>
                                    Nguyên Giám đốc Khối Mầm non miền Bắc, Hệ thống Giáo dục Vinschool (Vingroup)
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
                                }} />
                                <Typography variant="h6" fontWeight={700} color="#2C3E50" sx={{ mb: 1, fontSize: '14px' }}>
                                    ÔNG NGÔ MINH TUẤN
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{ mb: 1 }}>
                                    Nhà sáng lập | Phó Chủ tịch HĐQT
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ fontSize: '12px', lineHeight: 1.4, mb: 1 }}>
                                    Chuyên gia Cố vấn Chương trình Giáo dục
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ fontSize: '11px', lineHeight: 1.3 }}>
                                    Chủ tịch HĐQT Tập đoàn CEO Việt Nam Holding
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
                                }} />
                                <Typography variant="h6" fontWeight={700} color="#2C3E50" sx={{ mb: 1, fontSize: '14px' }}>
                                    NCS THS. BÙI THANH ANH
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{ mb: 1 }}>
                                    Nhà đồng sáng lập | Giám đốc Kiểm soát chất lượng
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ fontSize: '12px', lineHeight: 1.4, mb: 1 }}>
                                    Chuyên gia về giáo dục Mầm non
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ fontSize: '11px', lineHeight: 1.3 }}>
                                    Nguyên Hiệu trưởng Trường Mầm non, Hệ thống Giáo dục Vinschool (Vingroup)
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
                                }} />
                                <Typography variant="h6" fontWeight={700} color="#2C3E50" sx={{ mb: 1, fontSize: '14px' }}>
                                    CÔ NGUYỄN THỊ THU
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{ mb: 1 }}>
                                    Quản lý Chương trình
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ fontSize: '12px', lineHeight: 1.4, mb: 1 }}>
                                    Nguyên Khối trưởng Tiếng Anh, Hệ thống Giáo dục Vinschool (Vingroup)
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
                                }} />
                                <Typography variant="h6" fontWeight={700} color="#2C3E50" sx={{ mb: 1, fontSize: '14px' }}>
                                    NCS THS. NGUYỄN PHÙNG CHÂU
                                </Typography>
                                <Typography variant="body2" fontWeight={600} color="#FF6B35" sx={{ mb: 1 }}>
                                    Nhà sáng lập | Cố vấn ban điều hành
                                </Typography>
                                <Typography variant="body2" color="#666" sx={{ fontSize: '12px', lineHeight: 1.4, mb: 1 }}>
                                    Nguyên Quản lý Tuyển sinh & CSKH miền Bắc, Hệ thống Giáo dục Vinschool
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
                <Box sx={{ py: 6 }}>
                    {/* Main Title Section */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <Typography variant="h3" fontWeight={800} color="#2C3E50" sx={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
                                ĐỘI NGŨ GIÁO VIÊN MERRYSTAR
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

                    {/* Introduction Text */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 4, color: '#2C3E50', textAlign: 'center' }}>
                            Với mục tiêu Kiến tạo Thế hệ Công dân Toàn cầu Hạnh phúc và Thành công, MerryStar có Hệ thống tiêu chí tuyển dụng 
                            khắt khe và Chương trình Đào tạo Giáo viên toàn diện để chiêu mộ các giáo viên có chuyên môn cao, nhiều tâm huyết 
                            và tràn đầy tình yêu thương với trẻ. Đội ngũ giáo viên MerryStar là những nhà giáo dục dày dặn kinh nghiệm và được đào tạo bài bản.
                        </Typography>
                    </Box>

                    {/* Recruitment Process */}
                    <Box sx={{ mb: 6, p: 4, backgroundColor: '#F8F9FA', borderRadius: 3 }}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                            Quy trình tuyển dụng nghiêm ngặt
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', textAlign: 'center' }}>
                            Để trở thành giáo viên của MerryStar Kindergarten, các ứng viên đều phải trải qua quy trình tuyển dụng nghiêm ngặt 
                            bao gồm lọc hồ sơ, phỏng vấn, làm bài kiểm tra chuyên môn đầu vào và dạy thử trước Hội đồng Khoa học. Sau khi vượt qua 
                            các vòng này, giáo viên trải qua Chương trình Đào tạo Giáo viên MerryStar và tiếp tục được kiểm tra, đánh giá trong 
                            quá trình này trước khi chính thức trở thành giáo viên tại MerryStar.
                        </Typography>
                    </Box>

                    {/* Work Environment & Values */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                            Môi trường làm việc và Giá trị cốt lõi
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, mb: 4, color: '#2C3E50', textAlign: 'center' }}>
                            Ngoài ra, tại MerryStar, việc xây dựng môi trường làm việc cân bằng, lan tỏa tình yêu thương luôn là ưu tiên hàng đầu. 
                            Đây là nền tảng để bồi đắp văn hóa lan tỏa tình yêu thương giữa Gia đình – Nhà trường, thông qua sự gắn kết chặt chẽ 
                            giữa Giáo viên, Học sinh và Phụ huynh. Qua đó, MerryStar nuôi dưỡng Tâm yêu thương cho trẻ: yêu thương bản thân, gia đình và cộng đồng.
                        </Typography>
                        
                        {/* Core Values */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', md: 'repeat(3, 1fr)'}, gap: 4, mt: 4 }}>
                            <Box sx={{ 
                                p: 4, 
                                backgroundColor: '#FFF3E0', 
                                borderRadius: 3, 
                                textAlign: 'center',
                                border: '2px solid #FF6B35'
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#FF6B35" sx={{ mb: 2 }}>
                                    YÊU THƯƠNG
                                </Typography>
                                <Typography variant="body2" color="#2C3E50" sx={{ fontSize: '14px', lineHeight: 1.6 }}>
                                    Nuôi dưỡng Tâm yêu thương
                                </Typography>
                            </Box>
                            <Box sx={{ 
                                p: 4, 
                                backgroundColor: '#E3F2FD', 
                                borderRadius: 3, 
                                textAlign: 'center',
                                border: '2px solid #2196F3'
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#2196F3" sx={{ mb: 2 }}>
                                    TRUNG THỰC
                                </Typography>
                                <Typography variant="body2" color="#2C3E50" sx={{ fontSize: '14px', lineHeight: 1.6 }}>
                                    Suy nghĩ và làm việc trung thực
                                </Typography>
                            </Box>
                            <Box sx={{ 
                                p: 4, 
                                backgroundColor: '#E8F5E8', 
                                borderRadius: 3, 
                                textAlign: 'center',
                                border: '2px solid #4CAF50'
                            }}>
                                <Typography variant="h5" fontWeight={700} color="#4CAF50" sx={{ mb: 2 }}>
                                    GIÁ TRỊ
                                </Typography>
                                <Typography variant="body2" color="#2C3E50" sx={{ fontSize: '14px', lineHeight: 1.6 }}>
                                    Tạo ra giá trị cho học sinh, cha mẹ và cộng đồng
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Teacher Features */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                            Đặc điểm nổi bật của đội ngũ giáo viên
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'}, gap: 4 }}>
                            {[
                                { title: 'Trình độ chuyên môn cao', desc: '100% giáo viên có bằng đại học trở lên, được đào tạo bài bản' },
                                { title: 'Kinh nghiệm dày dặn', desc: 'Trung bình 5+ năm kinh nghiệm trong lĩnh vực mầm non' },
                                { title: 'Tình yêu nghề', desc: 'Yêu thương và tận tâm với từng trẻ em, coi trẻ như con của mình' },
                                { title: 'Kỹ năng giao tiếp', desc: 'Biết cách tương tác hiệu quả với trẻ và phụ huynh' },
                                { title: 'Sáng tạo', desc: 'Luôn tìm tòi phương pháp giảng dạy mới mẻ, hấp dẫn' },
                                { title: 'Đào tạo liên tục', desc: 'Tham gia các khóa đào tạo nâng cao định kỳ và cập nhật kiến thức' }
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
                        <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{ mb: 2 }}>
                            Hãy đến và gặp gỡ đội ngũ giáo viên của chúng tôi!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '16px', color: '#2C3E50' }}>
                            Đội ngũ giáo viên tận tâm và chuyên nghiệp của MerryStar sẵn sàng chào đón con bạn 
                            đến với môi trường giáo dục tốt nhất, nơi trẻ được phát triển toàn diện về Thân - Tâm - Tuệ.
                        </Typography>
                    </Box>
                </Box>
            )
        }
    }

    return (
        <Box>
            <Container sx={{ mt: 5 }}>
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
            const { tabIndex } = event.detail
            setActiveTab(tabIndex)
        }
        
        window.addEventListener('changeEducationTab', handleEducationTabChange)
        
        return () => {
            window.removeEventListener('changeEducationTab', handleEducationTabChange)
        }
    }, [])
    
    const sections = {
        0: {
            title: 'Chương trình học',
            content: (
                <Box sx={{ py: 6 }}>
                    {/* Main Title Section */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <Typography variant="h3" fontWeight={800} color="#2C3E50" sx={{ textTransform: 'uppercase', letterSpacing: '2px' }}>
                                CHƯƠNG TRÌNH GIÁO DỤC MERRYSTAR
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

                    {/* Introduction Text */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 4, color: '#2C3E50', textAlign: 'center' }}>
                            MerryStar hướng tới mô hình trường học "xuất sắc", tiên phong dẫn dắt các xu hướng giáo dục hiện đại và tiên tiến 
                            trong nước và quốc tế nhằm mang lại giá trị vượt trội cho trẻ em. MerryStar tự hào là một trong số những cơ sở Mầm non 
                            đầu tiên tại Việt Nam trở thành "Cambridge Early Years Centre" được Cambridge International Education chính thức công nhận, 
                            tiên phong triển khai chương trình Mầm non Quốc tế Cambridge cho độ tuổi 3-6 tại Việt Nam.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.8, mb: 4, color: '#2C3E50', textAlign: 'center' }}>
                            Chương trình giáo dục tại MerryStar được thiết kế theo hướng tiếp cận chú trọng năng lực của Học sinh. 
                            Giáo dục dựa trên năng lực (Competency based education – CBE) là cách tiếp cận giáo dục tạo ra cấu trúc linh hoạt 
                            cho phép trẻ em tiến bộ theo tốc độ riêng của mỗi trẻ.
                        </Typography>
                    </Box>

                    {/* Unique Features */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                            Những điểm độc đáo trong chương trình giáo dục MerryStar
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'}, gap: 4 }}>
                            {[
                                {
                                    title: 'Phát triển cân bằng 3 giá trị',
                                    desc: 'Tập trung phát triển cân bằng 3 giá trị "Thân – Tâm – Tuệ" dành cho thế hệ trẻ em hạnh phúc và thành công'
                                },
                                {
                                    title: 'Tính kết nối chặt chẽ',
                                    desc: 'Đảm bảo tính kết nối chặt chẽ giữa các độ tuổi nhà trẻ và mẫu giáo, liên thông với chương trình giáo dục phổ thông'
                                },
                                {
                                    title: 'Lấy học sinh làm trung tâm',
                                    desc: 'Triển khai phương pháp "lấy học sinh làm trung tâm" thông qua giảng dạy thích ứng – Adaptive teaching'
                                },
                                {
                                    title: 'Bộ công cụ quan sát',
                                    desc: 'Áp dụng sáng tạo Bộ công cụ quan sát hằng ngày và định kỳ riêng của MerryStar nhằm đánh giá chính xác năng lực'
                                },
                                {
                                    title: '5 lĩnh vực học tập',
                                    desc: 'Chương trình chú trọng phát triển với 5 lĩnh vực học tập quan trọng với 8 môn học'
                                },
                                {
                                    title: 'Cá nhân hóa học tập',
                                    desc: 'Nội dung giảng dạy được cá nhân hóa với từng trẻ, đảm bảo trẻ có cơ hội phát huy tối đa tiềm năng bản thân'
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
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                            8 Môn học chính trong chương trình
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'}, gap: 3 }}>
                            {[
                                { name: 'Thể chất', color: '#FF6B35', icon: '🏃‍♂️' },
                                { name: 'Toán học', color: '#2196F3', icon: '🔢' },
                                { name: 'Khoa học', color: '#4CAF50', icon: '🔬' },
                                { name: 'Ngôn ngữ tiếng Anh', color: '#9C27B0', icon: '🇬🇧' },
                                { name: 'Ngôn ngữ tiếng Việt', color: '#F44336', icon: '🇻🇳' },
                                { name: 'Âm nhạc', color: '#FF9800', icon: '🎵' },
                                { name: 'Tạo hình', color: '#795548', icon: '🎨' },
                                { name: 'Tình cảm và kỹ năng xã hội', color: '#607D8B', icon: '❤️' }
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
                                    <Typography variant="h4" sx={{ mb: 1 }}>
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
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} color="#2C3E50" sx={{ mb: 4, textAlign: 'center' }}>
                            Chương trình phát triển thể chất NOVA GYM
                        </Typography>
                        
                        {/* Quote Section */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h6" fontStyle="italic" color="#666" sx={{ mb: 2 }}>
                                "Người có sức khỏe, có hy vọng; và người có hy vọng, có tất cả mọi thứ"
                            </Typography>
                            <Typography variant="body2" color="#666">
                                – Thomas Carlyle –
                            </Typography>
                        </Box>

                        {/* Main Content with Image */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', lg: '1fr 1fr'}, gap: 4, alignItems: 'center', mb: 4 }}>
                            {/* Text Content */}
                            <Box>
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', mb: 3 }}>
                                    Chương trình giáo dục phát triển thể chất MerryStar được thiết kế và giám sát thực hiện bởi các chuyên gia hàng đầu 
                                    về thể chất và dinh dưỡng với mục tiêu giúp nuôi dưỡng thế hệ học sinh MerryStar, khỏe mạnh, có sức đề kháng tốt, 
                                    đẹp về thể hình, yêu thích thể thao, tràn đầy năng lượng.
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', mb: 3 }}>
                                    Tại MerryStar, Chương trình phát triển thể chất chuyên sâu NOVA GYM được xây dựng theo tiêu chuẩn Quốc tế, 
                                    với mục tiêu hỗ trợ thế hệ trẻ em Việt Nam phát triển thể lực và tầm vóc vượt trội ngay từ giai đoạn đầu đời.
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, color: '#2C3E50' }}>
                                    Hiện nay, NOVA GYM là chương trình phát triển thể chất duy nhất tại Việt Nam được thiết kế theo hướng tiếp cận năng lực, 
                                    hỗ trợ tối đa cho sự phát triển cá nhân của từng trẻ theo nhịp độ và năng lực riêng.
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
                            }} />
                        </Box>

                        {/* Program Features */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{ mb: 3, textAlign: 'center' }}>
                                Nội dung học tập chính của chương trình
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr', md: 'repeat(3, 1fr)'}, gap: 3 }}>
                                {[
                                    {
                                        title: 'Phát triển vận động',
                                        desc: 'Luyện tập và làm chủ các kỹ năng vận động cơ bản, phát triển thể lực toàn diện',
                                        icon: '🏃‍♂️'
                                    },
                                    {
                                        title: 'Giáo dục Dinh dưỡng',
                                        desc: 'Trang bị kiến thức về sức khỏe và dinh dưỡng, hình thành thói quen ăn uống lành mạnh',
                                        icon: '🥗'
                                    },
                                    {
                                        title: 'Sức khỏe',
                                        desc: 'Học cách bảo vệ an toàn cho bản thân, tuân thủ các nguyên tắc an toàn về dinh dưỡng và vận động',
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
                                        <Typography variant="h4" sx={{ mb: 2 }}>
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
                        <Box sx={{ p: 4, backgroundColor: '#FFF3E0', borderRadius: 3, border: '2px solid #FF6B35' }}>
                            <Typography variant="h5" fontWeight={700} color="#2C3E50" sx={{ mb: 3, textAlign: 'center' }}>
                                Lợi ích cho trẻ
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '16px', lineHeight: 1.8, color: '#2C3E50', textAlign: 'center' }}>
                                Trẻ sẽ được trang bị các kiến thức về sức khỏe và dinh dưỡng, luyện tập và làm chủ các kỹ năng vận động, 
                                có thái độ, hành vi tích cực, từ đó hình thành các thói quen sinh hoạt năng động, lành mạnh. 
                                Trẻ cũng sẽ được học cách bảo vệ an toàn cho bản thân ở trong và ngoài trường học bằng cách tuân thủ 
                                các nguyên tắc an toàn về dinh dưỡng, sức khoẻ và vận động.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )
        },
    }

    return (
        <Box>
            <Container sx={{ mt: 5 }}>
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
        <>
            <SlideBar/>
            {renderCurrentSection()}
        </>
    )
}