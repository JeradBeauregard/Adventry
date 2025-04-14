const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const journalService = require("../services/JournalSessionService");
const authService = require("../services/authService");
require("dotenv").config();

let lastToken = null; // temporary token storage (testing only)

// Middleware to check token (for PUG pages only)
function requireAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/auth");
    
  try {
    const decoded = jwt.verify(lastToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/auth");
  }
}

// View all journals and form to start new one
router.get("/journals", requireAuth, async (req, res) => {
  try {
    const [rows] = await journalService.getAllJournalsByUser(req.user.user_id);
    res.render("userjournal", { journals: rows, username: req.user.username });
  } catch (error) {
    res.status(500).send("Error loading journals: " + error.message);
  }
});

// Handle starting a new journal
router.post("/journals", requireAuth, async (req, res) => {
  try {
    const { title, message } = req.body;
    await journalService.startJournal(req.user.user_id, title, message);
    res.redirect("/journals");
  } catch (error) {
    res.status(500).send("Failed to create journal: " + error.message);
  }
});

// Log out (clears token)
router.get("/logout", (req, res) => {
  lastToken = null;
  res.redirect("/auth");
});

// For testing login (used by login route)
router.post("/token", (req, res) => {
  lastToken = req.body.token;
  res.redirect("/journals");
});

module.exports = router;
