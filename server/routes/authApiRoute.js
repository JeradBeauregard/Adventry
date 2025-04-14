const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

// Register user
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await authService.register(username, email, password);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Get current user
const authMiddleware = require("../middleware/authMiddleware");
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.user_id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
