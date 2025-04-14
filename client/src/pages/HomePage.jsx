import React from "react";
import { Link } from 'react-router-dom';
import "./../styles/home.css";
import catImage from "../assets/cat.png";
import { FaSearch, FaUser, FaCalendarAlt, FaPlus, FaHome } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Top Row */}
      <div className="top-bar">
        <div className="points-badge">
          <span role="img" aria-label="gem">💎</span> 6,112
        </div>
        <FaSearch className="search-icon" />
      </div>

      <div className="cat-notif-row">
        <img src={catImage} alt="Cute Cat" className="cat-img-small" />
        <div>
            <div className="date-text">
            {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
            })}
            </div>
            <div className="notification-box">
              <div className="notif-title">Notification</div>
              <div className="notif-body">Welcome Jay! Excited for your first journal?</div>
            </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="pill-row">
        <span className="pill active">All</span>
        <span className="pill">Personal</span>
        <span className="pill">Family</span>
        <span className="pill">School</span>
        <span className="pill">+</span>
      </div>

      {/* Prompt Title */}
      <div className="section-title">Prompts ▼</div>

      {/* Prompt Cards */}
      <div className="prompt-card green">
        <div className="prompt-title">Morning Reflection</div>
        <div className="prompt-text">
          "If you could describe your mood this morning in one word, what would it be? Why do you think you feel this way?"
        </div>
        <div className="emoji">😊</div>
      </div>

      <div className="prompt-card yellow">
        <div className="prompt-title">School Experience</div>
        <div className="prompt-text">
          "What’s one thing you learned or experienced in class today that stood out to you? How did it make you feel?"
        </div>
        <div className="emoji">😍</div>
      </div>

      <div className="prompt-card pink">
        <div className="prompt-title">Memorable Moments</div>
        <div className="prompt-text">
          "Think about a recent moment with your family that made you smile. What happened, and why was it special?"
        </div>
        <div className="emoji">😁</div>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <FaHome className="nav-icon active" />
        <FaUser className="nav-icon" />
        <FaCalendarAlt className="nav-icon" />
        <Link to="/JournalPage1" className="nav-icon plus-icon">
          <FaPlus />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
