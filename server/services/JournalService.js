const db = require('../db');

const getAllJournals = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT journals.id, users.username, journals.content, journals.createdAt FROM journals JOIN users ON journals.userId = users.id ORDER BY journals.createdAt DESC', 
        (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getJournalById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT journals.id, users.username, journals.content, journals.createdAt FROM journals JOIN users ON journals.userId = users.id WHERE journals.id = ?', [id], 
        (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

const createJournal = async (userId, content) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO journals (userId, content) VALUES (?, ?)', 
        [userId, content], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId });
        });
    });
};

const updateJournal = async (id, content) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE journals SET content = ? WHERE id = ?', 
        [content, id], (err) => {
            if (err) reject(err);
            else resolve({ message: "Journal updated successfully" });
        });
    });
};

const deleteJournal = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM journals WHERE id = ?', [id], (err) => {
            if (err) reject(err);
            else resolve({ message: "Journal deleted successfully" });
        });
    });
};

module.exports = { getAllJournals, getJournalById, createJournal, updateJournal, deleteJournal };
