const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const authMiddleware = require("../middleware/authMiddleware");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.register(username, email, password);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true if HTTPS
      sameSite: "lax"
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
});

// Authenticated user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.user_id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
