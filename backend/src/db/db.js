const mysql = require('mysql2/promise');

// DB Config
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
};

// Create pool
const pool = mysql.createPool(dbConfig);

// Check connection
async function connectDB() {
    try {
        const connection = await pool.getConnection();
        console.log("✓ MySQL Connected Successfully");
        connection.release();
    } catch (error) {
        console.error("✗ DB Connection Failed:", error.message);
        process.exit(1);
    }
}

module.exports = { pool, connectDB };