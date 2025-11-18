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

    // Tạo style element cho chatbot - đảm bảo position fixed để không scroll theo trang
    const style = document.createElement('style');
    style.id = 'dify-chatbot-custom-styles';
    style.textContent = `
      #dify-chatbot-bubble-button {
        z-index: 10000 !important;
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        top: auto !important;
        left: auto !important;
      }
      #dify-chatbot-bubble-window {
        z-index: 10001 !important;
        position: fixed !important;
        bottom: 80px !important;
        right: 20px !important;
        top: auto !important;
        left: auto !important;
        margin: 0 !important;
        transform: none !important;
      }
      @media (max-width: 768px) {
        #dify-chatbot-bubble-button {
          bottom: 15px !important;
          right: 15px !important;
        }
        #dify-chatbot-bubble-window {
          bottom: 70px !important;
          right: 16px !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Thêm observer để đảm bảo position fixed được áp dụng khi chatbot được tạo
    const observer = new MutationObserver(() => {
      const button = document.getElementById('dify-chatbot-bubble-button');
      const window = document.getElementById('dify-chatbot-bubble-window');
      
      if (button) {
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.top = 'auto';
        button.style.left = 'auto';
      }
      
      if (window) {
        window.style.position = 'fixed';
        window.style.bottom = '80px';
        window.style.right = '20px';
        window.style.top = 'auto';
        window.style.left = 'auto';
        window.style.margin = '0';
        window.style.transform = 'none';
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Cleanup function
    return () => {
      // Disconnect observer
      observer.disconnect();
      
      // Xóa script khi component unmount
      const existingScript = document.getElementById('z1E1PcMVF4SjUdtc');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Xóa style
      const existingStyle = document.getElementById('dify-chatbot-custom-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Component này không render gì, chỉ load script
  return null;
};

export default DifyChatbot;
