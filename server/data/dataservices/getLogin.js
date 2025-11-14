import pool from "../dbconnector.js";
import bcrypt from "bcrypt";

const loginDetails = async (username, password) => {
  try {
    const [result] = await pool.query("SELECT * FROM users WHERE username = ? && status != ?", [username, 'inactive']);

    if (result.length === 0) {
      throw new Error("Username or password is incorrect");
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Username or password is incorrect");
    }

    const [deptResult] = await pool.query(
      "SELECT * FROM departments WHERE departmentID = ?",
      [user.departmentID]
    );

    const department = deptResult.length > 0 ? deptResult[0] : null;

    return {
      id: user.userID,
      username: user.username,
      _passkey: user.password, 
      fullname: user.full_name,
      email: user.email,
      role: user.role,
      department_name: department ? department.departName : "Department Not Found",
      departId: department ? department.departmentID : "Department number Not found",
    };

  } catch (err) {
    console.error("Login error:", err.message);
    throw new Error("Authentication failed");
  }
};

export default loginDetails;
