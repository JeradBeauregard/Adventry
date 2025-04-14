import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/onboarding.css";
import catImage1 from "../assets/cat1.png";

const OnboardingPage1 = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/onboarding2");
  };

  return (
    <div className="onboarding-container">
      <div className="welcome-banner">
        <h1>Welcome, XYZ</h1>
      </div>

      <img src={catImage1} alt="Cute Cat" className="header-image" />
      <p className="start-quiz-text">Start Quiz</p>

      <div className="question-box">
        <p className="question-label">What’s your name or nickname?</p>
        <textarea
          placeholder="Answer"
          className="answer-input"
          rows="8"
        ></textarea>

        <button className="next-button" onClick={handleNextClick}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage1;
