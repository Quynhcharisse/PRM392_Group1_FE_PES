import React, { useEffect } from 'react';
import '../../styles/chatbot.css';

const DifyChatbot = () => {
  useEffect(() => {
    // Cấu hình chatbot Dify
    window.difyChatbotConfig = {
      token: 'z1E1PcMVF4SjUdtc',
      inputs: {
        // You can define the inputs from the Start node here
        // key is the variable name
        // e.g.
        // name: "NAME"
      },
      systemVariables: {
        // user_id: 'YOU CAN DEFINE USER ID HERE',
        // conversation_id: 'YOU CAN DEFINE CONVERSATION ID HERE, IT MUST BE A VALID UUID',
      },
      userVariables: {
        // avatar_url: 'YOU CAN DEFINE USER AVATAR URL HERE',
        // name: 'YOU CAN DEFINE USER NAME HERE',
      },
    };

    console.log('Dify config set:', window.difyChatbotConfig);

    // Kiểm tra xem script đã tồn tại chưa
    const existingScript = document.getElementById('z1E1PcMVF4SjUdtc');
    if (existingScript) {
      console.log('Dify script already exists');
      return;
    }

    // Tạo script element để load Dify embed script
    const script = document.createElement('script');
    script.src = 'https://udify.app/embed.min.js';
    script.id = 'z1E1PcMVF4SjUdtc';
    script.defer = true;
    
    script.onload = () => {
      console.log('Dify script loaded successfully');
    };
    
    script.onerror = () => {
      console.error('Failed to load Dify script');
    };
    
    // Thêm script vào document
    document.head.appendChild(script);
    console.log('Dify script added to document');

    // Tạo style element cho chatbot
    const style = document.createElement('style');
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      // Xóa script khi component unmount
      const existingScript = document.getElementById('z1E1PcMVF4SjUdtc');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Xóa style
      const existingStyle = document.querySelector('style');
      if (existingStyle && existingStyle.textContent.includes('dify-chatbot-bubble-button')) {
        existingStyle.remove();
      }
    };
  }, []);

  // Component này không render gì, chỉ load script
  return null;
};

export default DifyChatbot;
