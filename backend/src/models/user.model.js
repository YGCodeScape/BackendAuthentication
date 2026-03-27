const db = require("../db/db.js"); // your mysql connection

const User = {

    // Create User
    create: async (userData) => {
        const { fullName, email, password } = userData;

        const query = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `;

        const [result] = await db.execute(query, [fullName, email, password]);
        return result;
    },

    // Get All Users
    findAll: async () => {
        const [rows] = await db.execute("SELECT * FROM users");
        return rows;
    },

    // Find by Email
    findByEmail: async (email) => {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        return rows[0];
    }
};

module.exports = User;