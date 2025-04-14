const express = require('express');
const petService = require('../services/PetService');
const router = express.Router();

// Render the pet management page with all pets
router.get('/', async (req, res) => {
    try {
        const pets = await petService.getAllPets();
        res.render('pet', { pets });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new pet
router.post('/create', async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { userId, name, type, level, happiness } = req.body;
        await petService.createPet(userId, name, type, level, happiness);
        res.redirect('/petCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a pet
router.post('/update/:id', async (req, res) => {
    try {
        console.log("Request body for update:", req.body);
        const { name, type, level, happiness } = req.body;
        await petService.updatePet(req.params.id, name, type, level, happiness);
        res.redirect('/petCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a pet
router.post('/delete/:id', async (req, res) => {
    try {
        console.log("Deleting pet with ID:", req.params.id);
        await petService.deletePet(req.params.id);
        res.redirect('/petCMS');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
