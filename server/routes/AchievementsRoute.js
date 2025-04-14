const express = require('express');
const achievementService = require('../services/AchievementsService');
const router = express.Router();

// Render the achievement management page with all achievements
router.get('/', async (req, res) => {
    try {
        const achievements = await achievementService.getAllAchievements();
        res.render('achievements', { achievements });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new achievement
router.post('/create', async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { userId, name, description, isCompleted, earnedAt } = req.body;
        await achievementService.createAchievement(userId, name, description, isCompleted, earnedAt);
        res.redirect('/achievementsCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update an achievement
router.post('/update/:id', async (req, res) => {
    try {
        console.log("Request body for update:", req.body);
        const { name, description, isCompleted, earnedAt } = req.body;
        await achievementService.updateAchievement(req.params.id, name, description, isCompleted, earnedAt);
        res.redirect('/achievementsCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete an achievement
router.post('/delete/:id', async (req, res) => {
    try {
        console.log("Deleting achievement with ID:", req.params.id);
        await achievementService.deleteAchievement(req.params.id);
        res.redirect('/achievementsCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
