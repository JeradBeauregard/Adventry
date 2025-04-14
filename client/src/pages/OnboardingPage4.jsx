import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/onboarding.css";
import catImage3 from "../assets/cat3.png";
import { FaArrowLeft } from "react-icons/fa";

const OnboardingPage3 = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handlePreviousClick = () => {
    navigate("/onboarding3");
  };

  const handleNextClick = () => {
    navigate("/onboarding5");
  };

  return (
    <div className="onboarding-container">
      <div className="welcome-banner">
        <h1>Great, XYZ</h1>
      </div>

      <img src={catImage3} alt="Cute Cat" className="header-image-4" />

      <div className="question-box">
        <p className="question-label">How often would you like to journal?</p>

        <div className="answer-box">
        <div className="checkbox-list">
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Daily</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span> A few times a week</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Weekly</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Occasionally</span>
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

export default OnboardingPage3;
