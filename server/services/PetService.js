const db = require('../db');

const getAllPets = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT pets.id, users.username, pets.name, pets.type, pets.level, pets.happiness, pets.createdAt FROM pets JOIN users ON pets.userId = users.id ORDER BY pets.createdAt DESC',
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getPetById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT pets.id, users.username, pets.name, pets.type, pets.level, pets.happiness, pets.createdAt FROM pets JOIN users ON pets.userId = users.id WHERE pets.id = ?',
        [id], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

const createPet = async (userId, name, type, level = 1, happiness = 50) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO pets (userId, name, type, level, happiness) VALUES (?, ?, ?, ?, ?)', 
        [userId, name, type, level, happiness], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId });
        });
    });
};

const updatePet = async (id, name, type, level, happiness) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE pets SET name = ?, type = ?, level = ?, happiness = ? WHERE id = ?', 
        [name, type, level, happiness, id], (err) => {
            if (err) reject(err);
            else resolve({ message: "Pet updated successfully" });
        });
    });
};

const deletePet = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM pets WHERE id = ?', [id], (err) => {
            if (err) reject(err);
            else resolve({ message: "Pet deleted successfully" });
        });
    });
};

module.exports = { getAllPets, getPetById, createPet, updatePet, deletePet };
