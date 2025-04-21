const express = require("express");
const router = express.Router();
const JournalService = require("../services/JournalSessionService");
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../db");

//  Middleware-protected routes using JWT

// Start new journal
router.post("/StartJournal", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user?.user_id;
    const { title, first_message } = req.body;

    if (!user_id) return res.status(401).json({ error: "Unauthorized" });
    if (!title || !first_message) return res.status(400).json({ error: "Missing fields" });

    console.log(" Starting journal:", { user_id, title });

    const result = await JournalService.startJournal(user_id, title, first_message);
    res.json(result);
  } catch (error) {
    console.error(" Error in /StartJournal:", error.message);
    res.status(500).json({ error: "Failed to start journal: " + error.message });
  }
});

// Add message
router.post("/AddMessage", authMiddleware, async (req, res) => {
  try {
    const { journal_id, user_message } = req.body;
    if (!journal_id || !user_message) return res.status(400).json({ error: "Missing fields" });

    console.log(" AddMessage received:", { journal_id, user_message });

    const result = await JournalService.addMessage(journal_id, user_message);
    res.json(result);
  } catch (error) {
    console.error(" Error in /AddMessage:", error.message);
    res.status(500).json({ error: "Failed to add message: " + error.message });
  }
});

// Get journal by ID
router.get("/GetJournal/:id", authMiddleware, async (req, res) => {
  try {
    const journal_id = req.params.id;
    console.log(" Fetching journal:", journal_id);

    const result = await JournalService.getJournal(journal_id);
    res.json(result);
  } catch (error) {
    console.error("❌ Failed to load journal:", error.message);
    res.status(404).json({ error: "Journal not found." });
  }
});

// Get all journals for the logged-in user
router.get("/MyJournals", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user?.user_id;
    if (!user_id) return res.status(401).json({ error: "Unauthorized" });

    const result = await db.execute("SELECT id, title, created_at FROM journal_entries WHERE user_id = ?", [user_id]);
    res.json(result[0]);
  } catch (err) {
    console.error(" Error fetching journals:", err.message);
    res.status(500).json({ error: "Failed to get journals" });
  }
});


module.exports = router;
