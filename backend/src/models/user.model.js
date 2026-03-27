const { pool } = require("../db/db");

const User = {

    // Create User
    create: async ({ fullName, email, password }) => {
        const query = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            fullName,
            email,
            password
        ]);

        return result;
    },

    // Get All Users
    findAll: async () => {
        const [rows] = await pool.execute("SELECT * FROM users");
        return rows;
    },

    // Find by Email
    findByEmail: async (email) => {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        return rows[0];
    }
};

module.exports = User;