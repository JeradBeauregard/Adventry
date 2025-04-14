const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function register(username, email, password) {
    const [existing] = await db.execute("SELECT * FROM users WHERE email = ? OR username = ?", [email, username]);
    if (existing.length > 0) throw new Error("Username or email already in use.");

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
        "INSERT INTO users (username, email, passwordHash) VALUES (?, ?, ?)",
        [username, email, password_hash]
    );

    return { id: result.insertId, username, email };
}

async function login(email, password) {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) throw new Error("Invalid credentials.");

    const user = users[0];
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) throw new Error("Invalid credentials.");

    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
}

async function getUserById(id) {
    const [users] = await db.execute("SELECT id, username, email, created_at FROM users WHERE id = ?", [id]);
    if (users.length === 0) throw new Error("User not found.");
    return users[0];
}

module.exports = { register, login, getUserById };
