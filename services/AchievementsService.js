const db = require('../db');

const getAllAchievements = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT achievements.id, users.username, achievements.name, achievements.description, achievements.isCompleted, achievements.earnedAt FROM achievements JOIN users ON achievements.userId = users.id ORDER BY achievements.earnedAt DESC',
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getAchievementById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT achievements.id, users.username, achievements.name, achievements.description, achievements.isCompleted, achievements.earnedAt FROM achievements JOIN users ON achievements.userId = users.id WHERE achievements.id = ?',
        [id], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

const createAchievement = async (userId, name, description, isCompleted = false, earnedAt = null) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO achievements (userId, name, description, isCompleted, earnedAt) VALUES (?, ?, ?, ?, ?)', 
        [userId, name, description, isCompleted, earnedAt], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId });
        });
    });
};

const updateAchievement = async (id, name, description, isCompleted, earnedAt) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE achievements SET name = ?, description = ?, isCompleted = ?, earnedAt = ? WHERE id = ?', 
        [name, description, isCompleted, earnedAt, id], (err) => {
            if (err) reject(err);
            else resolve({ message: "Achievement updated successfully" });
        });
    });
};

const deleteAchievement = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM achievements WHERE id = ?', [id], (err) => {
            if (err) reject(err);
            else resolve({ message: "Achievement deleted successfully" });
        });
    });
};

module.exports = { getAllAchievements, getAchievementById, createAchievement, updateAchievement, deleteAchievement };
