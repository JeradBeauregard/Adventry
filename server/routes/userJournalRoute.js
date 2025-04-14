const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const journalService = require("../services/JournalSessionService");
const journalServ = require("../services/JournalService");
const onboardingService = require("../services/OnboardingService");
require("dotenv").config();

// Middleware: Check if logged in
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

// Optional Middleware: Check if onboarding is complete
async function requireOnboarding(req, res, next) {
  const completed = await onboardingService.isOnboardingComplete(req.user.user_id);
  if (!completed) return res.redirect("/journal/onboarding");
  next();
}

// ✅ ONBOARDING ROUTES

// Show onboarding form
router.get("/onboarding", requireAuth, async (req, res) => {
  const completed = await onboardingService.isOnboardingComplete(req.user.user_id);
  if (completed) return res.redirect("/journal/journals");

  const questions = [
    "What are your current goals?",
    "What do you struggle with most?",
    "What helps you feel grounded?",
    "How do you want to feel more often?",
    "What's something you're proud of?"
  ];

  res.render("onboarding", { questions });
});

// Handle onboarding form submission
router.post("/onboarding", requireAuth, async (req, res) => {
  const userId = req.user.user_id;

  const questions = [
    "What are your current goals?",
    "What do you struggle with most?",
    "What helps you feel grounded?",
    "How do you want to feel more often?",
    "What's something you're proud of?"
  ];

  const answers = questions.map((q, i) => ({
    question: q,
    answer: req.body[`q${i}`]
  }));

  await onboardingService.saveOnboardingAnswers(userId, answers);
  res.redirect("/journal/journals");
});

// ✅ JOURNAL ROUTES

// View all journals
router.get("/journals", requireAuth, requireOnboarding, async (req, res) => {
  try {
    const journals = await journalServ.getAllJournalsForUser(req.user.user_id);
    res.render("userjournal", { journals, username: req.user.username });
  } catch (error) {
    res.status(500).send("Error loading journals: " + error.message);
  }
});

// Create a new journal
router.post("/create", requireAuth, requireOnboarding, async (req, res) => {
  try {
    const { title, message } = req.body;
    const { journalId } = await journalService.startJournal(req.user.user_id, title, message);
    res.redirect(`/journal/${journalId}`);
  } catch (error) {
    res.status(500).send("Failed to create journal: " + error.message);
  }
});

// View journal conversation
router.get("/:id", requireAuth, requireOnboarding, async (req, res) => {
  try {
    const journalId = req.params.id;
    const journal = await journalService.getJournal(journalId);

    res.render("journalView", {
      journalId,
      title: journal.title,
      messages: journal.messages
    });
  } catch (error) {
    res.status(404).send("Could not load journal: " + error.message);
  }
});

// Add reply to journal
router.post("/:id/reply", requireAuth, requireOnboarding, async (req, res) => {
  try {
    const journalId = req.params.id;
    const userMessage = req.body.message;

    await journalService.addMessage(journalId, userMessage);
    res.redirect(`/journal/${journalId}`);
  } catch (error) {
    res.status(500).send("Failed to reply: " + error.message);
  }
});

// ✅ AUTH & DEV ROUTES

// Log out (clears cookie)
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth");
});

// DEV: Simulate login via token
router.post("/token", (req, res) => {
  res.cookie("token", req.body.token, { httpOnly: true });
  res.redirect("/journal/journals");
});

module.exports = router;
