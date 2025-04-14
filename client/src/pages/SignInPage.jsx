import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/signIn.css";
import SocialLoginButtons from "../components/SocialLoginButtons";
import avatar from "../assets/avatar.png";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/onboarding1");
  };

  return (
    <div className="sign-in-container">
      <h1 className="adventry_title">ADVENTRY</h1>
      <img src={avatar} alt="Avatar" className="avatar" />
      
      <h2 className="signin-heading">Sign in your account</h2>

      <form className="signin" onSubmit={handleSignIn}>
        <label htmlFor="email" className="input-label">Email</label>
        <input type="email" id="email" placeholder="jon.smith@email.com" className="input-field" />

        <label htmlFor="password" className="input-label">Password</label>
        <input type="password" id="password" placeholder="********" className="input-field" />

        <a href="#" className="forgot-password">Forgot Password?</a>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>

      <p className="or-text">or sign in with</p>
      <SocialLoginButtons />

      <p className="sign-up-text">
        Don't have an account? <Link to="/signup" className="sign-up-link">SIGN UP</Link>
      </p>
    </div>
  );
};

export default SignInPage;
