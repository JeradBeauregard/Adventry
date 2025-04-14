const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const journalService = require("../services/JournalSessionService"); // session = AI journaling flow
const journalServ = require("../services/JournalService"); // user journal listing
const authService = require("../services/authService");
require("dotenv").config();

function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/auth");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/auth");
  }
}

// View all journals + form
router.get("/journals", requireAuth, async (req, res) => {
  try {
    const journals = await journalServ.getAllJournalsForUser(req.user.user_id);
    res.render("userjournal", { journals, username: req.user.username });
  } catch (error) {
    res.status(500).send("Error loading journals: " + error.message);
  }
});

// Create a new journal
router.post("/create", requireAuth, async (req, res) => {
  try {
    const { title, message } = req.body;
    const { journalId } = await journalService.startJournal(req.user.user_id, title, message);
    res.redirect(`/journal/${journalId}`);
  } catch (error) {
    res.status(500).send("Failed to create journal: " + error.message);
  }
});

// View a specific journal (conversation)
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const journalId = req.params.id;
    const journal = await journalService.getJournal(journalId);

    // Optional: check journal ownership (if journal.user_id is available)
    res.render("journalView", {
      journalId,
      title: journal.title,
      messages: journal.messages
    });
  } catch (error) {
    res.status(404).send("Could not load journal: " + error.message);
  }
});

// Add a reply message to the journal
router.post("/:id/reply", requireAuth, async (req, res) => {
  try {
    const journalId = req.params.id;
    const userMessage = req.body.message;

    await journalService.addMessage(journalId, userMessage);
    res.redirect(`/journal/${journalId}`);
  } catch (error) {
    res.status(500).send("Failed to reply: " + error.message);
  }
});

// Log out (clears token cookie)
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth");
});

// DEV ONLY: Simulate login via token
router.post("/token", (req, res) => {
  res.cookie("token", req.body.token, { httpOnly: true });
  res.redirect("/journal/journals");
});

module.exports = router;
