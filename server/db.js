const mysql = require('mysql2/promise'); // ✅ Use `promise` for async/await
require('dotenv').config(); // Load environment variables

// Create a MySQL connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,  // Max simultaneous connections ADJUST LATER
    queueLimit: 0
});

// Test database connection
async function testDatabaseConnection() {
    try {
        const connection = await db.getConnection();
        console.log('✅ Successfully connected to MySQL Database');
        connection.release(); // Release connection back to pool
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    }
}

// Run test on startup
testDatabaseConnection();

module.exports = db;
