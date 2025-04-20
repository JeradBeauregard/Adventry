import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./../styles/home.css";
import catImage from "../assets/cat.png";
import { FaSearch, FaUser, FaCalendarAlt, FaPlus, FaHome } from "react-icons/fa";

const HomePage = () => {
  const { user, loading } = useAuth();
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    if (user) {
      fetch("http://localhost:8888/JournalApi/MyJournals", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setJournals(sorted);
        })
        .catch((err) => console.error("Failed to fetch journals:", err));
    }
  }, [user]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="home-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="points-badge">
          <span role="img" aria-label="gem">💎</span> 6,112
        </div>
        <FaSearch className="search-icon" />
      </div>

      {/* Cat & Notification */}
      <div className="cat-notif-row">
        <img src={catImage} alt="Cat" className="cat-img-small" />
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
            <div className="notif-body">
              Welcome back, {user.username || "friend"}! Ready to reflect?
            </div>
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

      {/* Journals */}
      <div className="section-title">Your Journals ▼</div>
      <div className="journal-scroll-box">
        {journals.length === 0 ? (
          <p className="prompt-text" style={{ marginTop: "14px" }}>
            No journals yet. Tap the + below to start one!
          </p>
        ) : (
          journals.map((journal, index) => (
            <Link
              to={`/Journal/${journal.id}`}
              key={journal.id}
              className={`prompt-card ${index % 3 === 0 ? "green" : index % 3 === 1 ? "yellow" : "pink"}`}
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
              <div className="prompt-title">{journal.title}</div>
              <div className="prompt-text">
                Created on{" "}
                {new Date(journal.created_at).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="emoji">📖</div>
            </Link>
          ))
        )}
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
