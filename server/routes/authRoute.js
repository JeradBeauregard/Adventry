const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authService = require("../services/authService");
require("dotenv").config();

// Render registration and login form
router.get("/auth", (req, res) => {
  res.render("authTestView");
});

// Handle registration
router.post("/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await authService.register(username, email, password);
    res.redirect("/auth");
  } catch (error) {
    res.status(400).send("Registration failed: " + error.message);
  }
});

// Handle login and set token cookie, redirect to onboarding if not completed
const onboardingService = require("../services/OnboardingService");

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.cookie("token", token, { httpOnly: true });

    // Decode to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const onboardingDone = await onboardingService.isOnboardingComplete(decoded.user_id);

    if (!onboardingDone) {
      return res.redirect("/journal/onboarding");
    }

    res.redirect("/journal/journals"); // or /auth/me if you still want the profile
  } catch (error) {
    res.status(401).send("Login failed: " + error.message);
  }
});


// Display user info after login
router.get("/auth/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("No token found. Please log in.");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authService.getUserById(decoded.user_id);
    res.render("userProfile", { user });
  } catch (error) {
    res.status(400).send("Could not load user profile: " + error.message);
  }
});



module.exports = router;