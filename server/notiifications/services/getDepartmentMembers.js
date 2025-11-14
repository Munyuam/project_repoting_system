import pool from '../../data/dbconnector.js';

const getDepartmentMembers = async (departmentID) => {
  if (!departmentID) {
    return {
      success: false,
      message: "Department was not found",
    };
  }

  try {
    const sql = `SELECT userID, username, email, fullname FROM users WHERE departmentID = ? AND status != ?`;
    const [rows] = await pool.query(sql, [departmentID, "inactive"]);

    if (rows.length === 0) {
      return { success: false, message: "No active users found" };
    }

    return {
      success: true,
      message: "Users retrieved",
      members: rows,
      emails: rows.map(u => u.email),
      usernames: rows.map(u => u.username),
      fullnames: rows.map(u => u.fullname),
    };

  } catch (error) {
    return {
      success: false,
      message: "Query failed",
      error: error.message,
    };
  }
};

export default getDepartmentMembers;
