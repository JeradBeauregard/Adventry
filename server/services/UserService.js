const db = require('../db');

const getAllUsers = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, username, email, shards FROM users', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const getUserById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, username, email, shards FROM users WHERE id = ?', [id], (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        });
    });
};

const createUser = async (username, email, shards = 0) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, email, passwordHash, shards) VALUES (?, ?, ?, ?)', 
            [username, email, 'hashedpassword', shards], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId });
        });
    });
};

const updateUser = async (id, username, email, shards) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET username = ?, email = ?, shards = ? WHERE id = ?', 
            [username, email, shards, id], (err) => {
            if (err) reject(err);
            else resolve({ message: "User updated successfully" });
        });
    });
};

const deleteUser = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
            if (err) reject(err);
            else resolve({ message: "User deleted successfully" });
        });
    });
};



module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
