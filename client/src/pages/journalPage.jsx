import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaMicrophone } from "react-icons/fa";
import "./../styles/journalpage.css";
import catImage3 from "../assets/cat3.png";

const JournalPage = () => {
  const { id: journalId } = useParams();
  const [chatHistory, setChatHistory] = useState([]);
  const [journalTitle, setJournalTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!journalId) return;

    fetch(`http://localhost:8888/JournalApi/GetJournal/${journalId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setJournalTitle(data.title);
        setChatHistory(
          data.messages.map((m) => ({
            type: m.sender === "user" ? "sent" : "received",
            content: m.message,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load journal:", err);
        setLoading(false);
      });
  }, [journalId]);

  const handleBack = () => {
    navigate("/homepage");
  };

  const handleFocusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || sending) return;

    setChatHistory((prev) => [...prev, { type: "sent", content: trimmed }]);
    setMessage("");
    setSending(true);

    try {
      const res = await fetch("http://localhost:8888/JournalApi/AddMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          journal_id: journalId,
          user_message: trimmed,
        }),
      });

      if (!res.ok) throw new Error("Failed to add message");

      const data = await res.json();
      setChatHistory((prev) => [...prev, { type: "received", content: data[1].message }]);
    } catch (err) {
      console.error("Failed to send message:", err);
      setChatHistory((prev) => [
        ...prev,
        { type: "received", content: "⚠️ Error: message failed to send." },
      ]);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="chat-loading">Loading journal...</p>;

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

      <div className="chat-title">{journalTitle}</div>

      {/* Chat History */}
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {sending && (
          <div className="message received">
            <div className="message-content">Typing...</div>
          </div>
        )}
      </div>

      {/* Input Row */}
      <div className="message-input">
        <button className="mic-button" disabled>
          <FaMicrophone />
        </button>
        <input
          type="text"
          ref={inputRef}
          placeholder="Type your next reflection..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className={`send-button ${message.length > 0 ? "active" : ""}`}
          onClick={handleSend}
          disabled={sending}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default JournalPage;
