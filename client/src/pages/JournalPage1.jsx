import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaArrowLeft, FaMicrophone } from "react-icons/fa";
import "./../styles/journalpage.css";
import catImage3 from "../assets/cat3.png";

const JournalPage1 = () => {
  const [title, setTitle] = useState("My Journal");
  const [isTitleEditable, setIsTitleEditable] = useState(true);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "received",
      content: "How are you feeling today?",
    },
  ]);
  const [journalId, setJournalId] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    navigate("/homepage");
  };

  const handleSend = async () => {
    const userMessage = message.trim();
    if (!userMessage || loading) return;

    setChatHistory((prev) => [...prev, { type: "sent", content: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      if (!journalId) {
        console.log("🟢 Creating new journal with:", { title, first_message: userMessage });

        const res = await fetch("http://localhost:8888/JournalApi/StartJournal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title,
            first_message: userMessage,
          }),
        });

        if (!res.ok) throw new Error("Failed to start journal");

        const data = await res.json();
        setJournalId(data.journalId);
        setChatHistory((prev) => [...prev, { type: "received", content: data.messages[1].message }]);
        setIsTitleEditable(false); // lock title
      } else {
        console.log("🟡 Sending message to journal:", journalId);

        const res = await fetch("http://localhost:8888/JournalApi/AddMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            journal_id: journalId,
            user_message: userMessage,
          }),
        });

        if (!res.ok) throw new Error("Failed to add message");

        const data = await res.json();
        setChatHistory((prev) => [...prev, { type: "received", content: data[1].message }]);
      }
    } catch (err) {
      console.error("❌ Journal error:", err.message);
      setChatHistory((prev) => [
        ...prev,
        { type: "received", content: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFocusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="chat-container" onClick={handleFocusInput}>
      {/* Header */}
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

      {/* Journal Title Input */}
      <div style={{ padding: "0 16px", marginTop: "10px", marginBottom: "8px" }}>
        {isTitleEditable ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter journal title..."
            style={{
              width: "100%",
              fontSize: "16px",
              padding: "8px 12px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              fontFamily: "inherit",
            }}
          />
        ) : (
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>{title}</div>
        )}
      </div>

      {/* Chat Area */}
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message received">
            <div className="message-content">Typing...</div>
          </div>
        )}
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
