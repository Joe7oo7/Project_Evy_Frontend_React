import React, { useState, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    // Set the iframe URL to the Gradio server URL (replace if it's running on another host)
    setIframeUrl('http://127.0.0.1:7861/');
  }, []);

  return (
    <div className='app-container'>
      <iframe
        src={iframeUrl}
        title="Chatbot With Evy"
        style={{ width: '100%', height: '500px', border: 'none'}}
      />
    </div>
  );
}

export default Chatbot;
