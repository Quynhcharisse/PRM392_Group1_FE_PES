import React from 'react';
import { Box } from '@mui/material';
import PredefinedQuestions from './PredefinedQuestions';

const ChatbotContainer = () => {
  const handleQuestionClick = (questionId) => {
    // Khi click vào câu hỏi có sẵn, mở chatbot Dify
    // Dify sẽ tự động xử lý việc mở chatbot
    console.log('Question clicked:', questionId);
  };

  return (
    <Box>
      {/* Predefined Questions */}
      <PredefinedQuestions onQuestionClick={handleQuestionClick} />
      
      {/* Chatbot đã được embed trực tiếp vào index.html */}
    </Box>
  );
};

export default ChatbotContainer;
