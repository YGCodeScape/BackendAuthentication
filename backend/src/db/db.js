const mysql = require('mysql2/promise');

// Database connection pool configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'SM@RTYB)Y$)##',
    database: process.env.DB_NAME || 'foodflix',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Connect to database function
function connectDB() {
    return pool.getConnection()
        .then((connection) => {
            console.log('✓ MySQL Database Connected Successfully!');
            console.log(`✓ Connected to database: ${dbConfig.database}`);
            connection.release();
            return pool;
        })
        .catch((error) => {
            console.error('✗ Database Connection Failed!');
            console.error('Error Details:', error.message);
            console.error('Code:', error.code);
            
            if (error.code === 'ER_ACCESS_DENIED_ERROR') {
                console.error('Please check your username and password.');
            } else if (error.code === 'ER_BAD_DB_ERROR') {
                console.error('Please check if the database exists.');
            } else if (error.code === 'ECONNREFUSED') {
                console.error('MySQL server is not running. Please start MySQL service.');
            }
            
            process.exit(1);
        });
}

module.exports = connectDB;