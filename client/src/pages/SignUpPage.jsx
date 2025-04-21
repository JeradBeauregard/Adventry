import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./../styles/signUp.css";
import SocialLoginButtons from "../components/SocialLoginButtons";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword, termsAccepted } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setError("Please fill out all fields.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (!termsAccepted) {
      return setError("You must accept the terms and policy.");
    }

    try {
      // Step 1: Register
      const registerRes = await fetch("http://localhost:8888/authApi/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: name, email, password }),
      });

      if (!registerRes.ok) {
        const errorText = await registerRes.text();
        throw new Error(errorText || "Registration failed");
      }

      // Step 2: Login
      const loginRes = await fetch("http://localhost:8888/authApi/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        const errorText = await loginRes.text();
        throw new Error(errorText || "Auto-login failed");
      }

      // Step 3: Fetch user profile
      const userRes = await fetch("http://localhost:8888/authApi/me", {
        credentials: "include",
      });

      if (!userRes.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userData = await userRes.json();

      // Step 4: Save to context and redirect based on onboarding
      login(userData);

      if (userData.has_completed_onboarding) {
        navigate("/homepage");
      } else {
        navigate("/onboarding1");
      }
    } catch (err) {
      console.error("Sign up error:", err.message);
      setError("Sign up failed: " + err.message);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <h1 className="logo">A</h1>
      </div>

      <h2 className="signup-heading">Create Your Account</h2>

      <form className="signup" onSubmit={handleSubmit}>
        <label htmlFor="name" className="input-label">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Jon Smith"
          className="input-field"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email" className="input-label">Email</label>
        <input
          type="email"
          id="email"
          placeholder="jon.smith@email.com"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="input-label">Password</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          className="input-field"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="********"
          className="input-field"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div className="terms-container">
          <input
            type="checkbox"
            id="termsAccepted"
            className="checkbox"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          <label htmlFor="termsAccepted" className="terms-label">
            I understand the terms & policy.
          </label>
        </div>

        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

        <button className="sign-up-button" type="submit">Sign Up</button>
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
