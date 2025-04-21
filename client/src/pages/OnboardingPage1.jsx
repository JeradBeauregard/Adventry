import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/onboarding.css";
import catImage1 from "../assets/cat1.png";

const questions = [
  "What are your current goals?",
  "What do you struggle with most?",
  "What helps you feel grounded?",
  "How do you want to feel more often?",
  "What's something you're proud of?",
];

const OnboardingPage1 = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (answers[currentStep].trim() === "") {
      return setError("Please answer the question before continuing.");
    }

    setError("");

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        q0: answers[0],
        q1: answers[1],
        q2: answers[2],
        q3: answers[3],
        q4: answers[4],
      };

      const res = await fetch("http://localhost:8888/journal/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit onboarding");
      }

      navigate("/homepage");
    } catch (err) {
      console.error(err.message);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="onboarding-container">
      <div className="welcome-banner">
        <h1>Welcome!</h1>
      </div>

      <img src={catImage1} alt="Cute Cat" className="header-image" />
      <p className="start-quiz-text">Start Quiz</p>

      <div className="question-box">
        <p className="question-label">{currentStep + 1}. {questions[currentStep]}</p>
        <textarea
          placeholder="Answer"
          className="answer-input"
          value={answers[currentStep]}
          onChange={handleChange}
          rows="4"
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="next-button" onClick={handleNext}>
          {currentStep === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage1;
