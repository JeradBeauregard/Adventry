const express = require('express');
const journalService = require('../services/JournalService');
const router = express.Router();

// Render the journal page with all entries
router.get('/', async (req, res) => {
    try {
        const journals = await journalService.getAllJournals();
        res.render('journal', { journals });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new journal entry
router.post('/create', async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { userId, content } = req.body;
        await journalService.createJournal(userId, content);
        res.redirect('/journalCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a journal entry
router.post('/update/:id', async (req, res) => {
    try {
        console.log("Request body for update:", req.body);
        const { content } = req.body;
        await journalService.updateJournal(req.params.id, content);
        res.redirect('/journalCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a journal entry
router.post('/delete/:id', async (req, res) => {
    try {
        console.log("Deleting journal with ID:", req.params.id);
        await journalService.deleteJournal(req.params.id);
        res.redirect('/journalCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
