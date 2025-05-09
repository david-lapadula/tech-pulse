import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
      <button 
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '×' : '💬'}
      </button>
      
      {isOpen && (
        <div className="chat-content">
          <div className="chat-header">
            <h3>Help & Support</h3>
          </div>
          <div className="chat-messages">
            {/* Messages will go here */}
          </div>
          <div className="chat-input">
            <input 
              type="text" 
              placeholder="Type your message..."
            />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow; 