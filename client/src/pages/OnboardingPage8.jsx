import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/onboarding.css";
import catImage2 from "../assets/cat2.png";
import { FaArrowLeft } from "react-icons/fa";

const OnboardingPage8 = () => {
  const navigate = useNavigate();

  const handlePreviousClick = () => {
    navigate("/onboarding7");
  };

  const handleNextClick = () => {
    navigate("/homepage");
  };

  return (
    <div className="onboarding-container">
      <div className="welcome-banner">
        <h1>Great , XYZ</h1>
      </div>

      <img src={catImage2} alt="Cute Cat" className="header-image-2" />

      <div className="question-box">
        <p className="question-label">How do you usually feel at the end of the day?</p>
        <div className="answer-box">
        <div className="checkbox-list">
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Very Happy</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Happy</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span> Neutral</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Stressed</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Sad</span>
          </label>
        </div>
        </div>

        <div className="button-container">
        <button className="icon-button" onClick={handlePreviousClick}>
            <FaArrowLeft />
        </button>
        <button className="next-button1" onClick={handleNextClick}>
            NEXT
        </button>
        </div>

      </div>
    </div>
  );
};

export default OnboardingPage8;
