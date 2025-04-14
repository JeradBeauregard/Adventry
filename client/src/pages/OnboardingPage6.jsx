import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/onboarding.css";
import catImage1 from "../assets/cat1.png";
import { FaArrowLeft } from "react-icons/fa";

const OnboardingPage3 = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handlePreviousClick = () => {
    navigate("/onboarding5");
  };

  const handleNextClick = () => {
    navigate("/onboarding7");
  };

  return (
    <div className="onboarding-container">
      <div className="welcome-banner">
        <h1>Great, XYZ</h1>
      </div>

      <img src={catImage1} alt="Cute Cat" className="header-image-3" />

      <div className="question-box">
        <p className="question-label">Would you like your companion to send you encouraging reminders?</p>

        <div className="answer-box">
        <div className="checkbox-list-2">
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>Yes</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>No</span>
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
