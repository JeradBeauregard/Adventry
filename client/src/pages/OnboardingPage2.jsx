import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/onboarding.css";
import catImage2 from "../assets/cat2.png";
import { FaArrowLeft } from "react-icons/fa";

const OnboardingPage2 = () => {
  const navigate = useNavigate();

  const handlePreviousClick = () => {
    navigate("/onboarding1");
  };

  const handleNextClick = () => {
    navigate("/onboarding3");
  };

  return (
    <div className="onboarding-container">
      <div className="welcome-banner">
        <h1>Great , XYZ</h1>
      </div>

      <img src={catImage2} alt="Cute Cat" className="header-image-2" />

      <div className="question-box">
        <p className="question-label">What’s your current Education  level?</p>
        <textarea
          placeholder="Answer"
          className="answer-input"
          rows="8"
        ></textarea>

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

export default OnboardingPage2;
