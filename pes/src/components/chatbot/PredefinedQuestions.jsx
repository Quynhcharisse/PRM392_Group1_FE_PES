import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const PredefinedQuestions = ({ onQuestionClick }) => {
  const questions = [
    {
      id: 'question1',
      text: 'Tôi muốn biết về trường mầm non MerryStar',
      icon: '🏫'
    },
    {
      id: 'question2', 
      text: 'Hồ sơ học sinh là gì?',
      icon: '📋'
    },
    {
      id: 'question3',
      text: 'Chương trình giáo dục như thế nào?',
      icon: '📚'
    },
    {
      id: 'question4',
      text: 'Đội ngũ giáo viên ra sao?',
      icon: '👩‍🏫'
    },
    {
      id: 'question5',
      text: 'Chính sách tuyển sinh như thế nào?',
      icon: '📝'
    }
  ];

  const handleQuestionClick = (questionId) => {
    // Gọi hàm callback để xử lý câu hỏi
    if (onQuestionClick) {
      onQuestionClick(questionId);
    }
    
    // Cũng có thể trigger chatbot Dify nếu cần
    // Bạn có thể customize logic này tùy theo cách Dify xử lý predefined questions
  };

  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: '#f8f9fa', 
      borderRadius: 2, 
      mb: 2,
      border: '1px solid #e9ecef'
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          color: '#1C64F2',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        💬 Câu hỏi thường gặp
      </Typography>
      
      <Grid container spacing={2}>
        {questions.map((question) => (
          <Grid item xs={12} sm={6} md={4} key={question.id}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleQuestionClick(question.id)}
              sx={{
                p: 2,
                textAlign: 'left',
                justifyContent: 'flex-start',
                borderColor: '#1C64F2',
                color: '#1C64F2',
                '&:hover': {
                  backgroundColor: '#1C64F2',
                  color: 'white',
                  borderColor: '#1C64F2'
                },
                borderRadius: 2,
                minHeight: '60px',
                fontSize: '0.9rem',
                lineHeight: 1.4
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ fontSize: '1.2rem' }}>{question.icon}</span>
                <span>{question.text}</span>
              </Box>
            </Button>
          </Grid>
        ))}
      </Grid>
      
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 2, 
          textAlign: 'center', 
          color: '#6c757d',
          fontStyle: 'italic'
        }}
      >
        Click vào câu hỏi để được trả lời nhanh chóng! 🤖
      </Typography>
    </Box>
  );
};

export default PredefinedQuestions;
