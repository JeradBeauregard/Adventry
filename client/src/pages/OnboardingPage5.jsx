import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/onboarding.css";
import catImage2 from "../assets/cat2.png";
import { FaArrowLeft } from "react-icons/fa";

const OnboardingPage3 = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handlePreviousClick = () => {
    navigate("/onboarding4");
  };

  const handleNextClick = () => {
    navigate("/onboarding6");
  };

  return (
    <div className="onboarding-container">
      <div className="welcome-banner">
        <h1>Great, XYZ</h1>
      </div>

      <img src={catImage2} alt="Cute Cat" className="header-image-2" />

      <div className="question-box">
        <p className="question-label">What personality best describes your companion?</p>

        <div className="answer-box">
        <div className="checkbox-list">
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Playful & energetic</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Calm & supportive</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span> Wise & thoughtful</span>
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
