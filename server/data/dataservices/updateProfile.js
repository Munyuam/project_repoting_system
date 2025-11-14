import pool from "../dbconnector.js";

const updateProfile = async (username, email, department, userId, status, fullname = null) => {
  if (!username || !email || !department || !userId) {
    return { success: false, message: "All fields are required." };
  }

  const departmentID = await getDepartmentID(department);
  
  if (!departmentID) return { success: false, message: "Invalid department selected." };

  try {
    let sql, params;

    console.log("the fullname is: "+ fullname)
    console.log('username '+username+ ' email '+ email +' departmentID '+departmentID+ ' userID  '+ userId+ 'status '+ status +'fullname '+ fullname)

    if (fullname) {
      sql = "UPDATE users SET departmentID = ?, username = ?, fullName = ?, email =?, status = ? WHERE userID = ?";
      params = [departmentID, username,fullname, email, status, userId];
    } else {
      sql = "UPDATE users SET departmentID = ?, username = ?, email = ?, status = ? WHERE userID = ?";
      params = [departmentID, username, email, status, userId];
    }

    const [result] = await pool.query(sql, params);
    console.log("the result is: ", result);  

    if (result.affectedRows > 0) {
      const [updatedUser] = await pool.query("SELECT userID, username, fullName, email, departmentID FROM users WHERE userID = ?", [userId]);
      return { success: true, message: "Profile updated successfully.", user: updatedUser[0] };
    } 
    else {
      return { success: false, message: "No changes were made or user not found." };
    }
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return { success: false, message: "Database error occurred." };
  }
};

async function getDepartmentID(department) {
  try {
    const sql = "SELECT departmentID FROM departments WHERE departName = ?";
    const [rows] = await pool.query(sql, [department]);

    return rows.length > 0 ? rows[0].departmentID : null;
  } catch (error) {
    console.error("Error fetching department ID:", error.message);
    return null;
  }
}

export default updateProfile;
