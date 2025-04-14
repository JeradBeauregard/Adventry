const express = require('express');
const userService = require('../services/UserService');
const router = express.Router();

// Render user management page
router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.render('user', { users });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new user
router.post('/create', async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { username, email, shards } = req.body;
        await userService.createUser(username, email, shards || 0);
        res.redirect('/userCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update user (including shards)
router.post('/update/:id', async (req, res) => {
    try {
        console.log("Request body for update:", req.body);
        const { username, email, shards } = req.body;
        await userService.updateUser(req.params.id, username, email, shards);
        res.redirect('/userCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a user
router.post('/delete/:id', async (req, res) => {
    try {
        console.log("Deleting user with ID:", req.params.id);
        await userService.deleteUser(req.params.id);
        res.redirect('/userCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
