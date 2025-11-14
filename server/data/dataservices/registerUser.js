import pool from "../dbconnector.js";
import bcrypt from "bcrypt";

const registerUser = async (role, username, fullName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const sql = `
          INSERT INTO users (departmentID, username, fullname, email, password, status) 
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(sql, [role, username, fullName, email, hashedPassword, 'active']);
        return result;
    } catch (error) {
        throw new Error("Connection Error: failed to register user -> " + error.message);
    }
};

export default registerUser;
