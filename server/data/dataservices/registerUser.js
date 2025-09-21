import pool from "../dbconnector.js";

const registerUser = async (role, username, fullName, email, password) => {
    try {
        const sql = `
          INSERT INTO users (departmentID, username, fullname, email, password) 
          VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(sql, [role, username, fullName, email, password]);
        return result;
    } catch (error) {
        throw new Error("Connection Error: failed to register user -> " + error.message);
    }
};

export default registerUser;
