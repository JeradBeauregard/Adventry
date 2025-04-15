import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./../styles/signIn.css";
import SocialLoginButtons from "../components/SocialLoginButtons";
import avatar from "../assets/avatar.png";

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 💥 Context login method
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Step 1: Authenticate
      const res = await fetch("http://localhost:8888/authApi/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Login failed");
      }

      // Step 2: Get user info
      const userRes = await fetch("http://localhost:8888/authApi/me", {
        credentials: "include"
      });

      if (!userRes.ok) throw new Error("Failed to fetch user profile");

      const userData = await userRes.json();

      // Step 3: Save to context and redirect
      login(userData);
      navigate("/homepage");
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Login failed: " + err.message);
    }
  };

  return (
    <div className="sign-in-container">
      <h1 className="adventry_title">ADVENTRY</h1>
      <img src={avatar} alt="Avatar" className="avatar" />

      <h2 className="signin-heading">Sign in to your account</h2>

      <form className="signin" onSubmit={handleSignIn}>
        <label htmlFor="email" className="input-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="jon.smith@email.com"
          className="input-field"
          required
        />

        <label htmlFor="password" className="input-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          className="input-field"
          required
        />

        {error && <p className="error-text" style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

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
