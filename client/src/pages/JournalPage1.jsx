import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMicrophone } from "react-icons/fa";
import "./../styles/journalpage.css";
import catImage3 from "../assets/cat3.png";

const JournalPage1 = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "received", // Received message from the bot/character
      content: "How do you feel mentally and emotionally after three classes today?",
    },
  ]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleBack = () => {
    navigate("/homepage"); // Navigate back to homepage
  };

  const handleSend = () => {
    if (message.trim().length > 0) {
      // Add user message to chat history
      setChatHistory((prev) => [
        ...prev,
        { type: "sent", content: message },
      ]);
      setMessage("");
    }
  };

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="chat-container" onClick={handleFocusInput}>
      <div className="chat-header">
        <div className="header-content">
          <button className="back-button" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <div className="chat-character chat-character-bg">
            <img src={catImage3} alt="Chat character" className="cat-image" />
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="message-input">
        <button className="mic-button">
          <FaMicrophone />
        </button>
        <input
          type="text"
          ref={inputRef}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={`send-button ${message.length > 0 ? "active" : ""}`}
          onClick={handleSend}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default JournalPage1;
