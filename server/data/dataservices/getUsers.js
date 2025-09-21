import pool from "../dbconnector.js";

const getusers = async () => {
  try {
    const sql = `
      SELECT 
        u.userID,
        u.username,
        u.fullName,
        u.email,
        u.departmentID,
        d.departName AS departmentName
      FROM users u
      INNER JOIN departments d 
        ON u.departmentID = d.departmentID
    `;

    const [result] = await pool.query(sql);

    return result; 
  } catch (err) {
    throw new Error("Failed to get users: " + err.message);
  }
};

export default getusers;
