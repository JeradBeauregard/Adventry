import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signUp.css";
import SocialLoginButtons from "../components/SocialLoginButtons";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="sign-up-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h1 className="logo">A</h1>
      </div>

      <h2 className="signup-heading">Create Your Account</h2>

      <form className="signup">
        <label htmlFor="name" className="input-label">Name</label>
        <input type="text" id="name" placeholder="Jon Smith" className="input-field" />

        <label htmlFor="email" className="input-label">Email</label>
        <input type="email" id="email" placeholder="jon.smith@email.com" className="input-field" />

        <label htmlFor="password" className="input-label">Password</label>
        <input type="password" id="password" placeholder="********" className="input-field" />

        <label htmlFor="confirm-password" className="input-label">Confirm Password</label>
        <input type="password" id="confirm-password" placeholder="********" className="input-field" />

        <div className="terms-container">
          <input type="checkbox" id="terms" className="checkbox" />
          <label htmlFor="terms" className="terms-label">I understand the terms & policy.</label>
        </div>

        <button className="sign-up-button">Sign Up</button>
      </form>

      <p className="or-text">or sign up with</p>
      <SocialLoginButtons />

      <p className="sign-in-text">
        Have an account? <Link to="/" className="sign-in-link">SIGN IN</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
