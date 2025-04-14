import React from "react";
import "../styles/global.css";
import googleIcon from "../assets/google.png";
import facebookIcon from "../assets/facebook.png";
import twitterIcon from "../assets/twitter.png";

const SocialLoginButtons = () => {
  return (
    <div className="social-login-container">
      <button className="social-button google">
        <img src={googleIcon} alt="Google" className="social-icon" />
      </button>
      <button className="social-button facebook">
        <img src={facebookIcon} alt="Facebook" className="social-icon" />
      </button>
      <button className="social-button twitter">
        <img src={twitterIcon} alt="Twitter" className="social-icon" />
      </button>
    </div>
  );
};

export default SocialLoginButtons;
