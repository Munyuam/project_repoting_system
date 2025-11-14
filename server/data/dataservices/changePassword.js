import pool from "../dbconnector.js";
import bcrypt from "bcrypt";

const changePassword = async (userID, newPassword, oldPassword) => {
  try {
    const [result] = await pool.query(
      "SELECT password FROM users WHERE userID = ?",
      [userID]
    );

    if (result.length === 0) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    const dbPassword = result[0].password;

    const isMatch = await bcrypt.compare(oldPassword, dbPassword);
    if (!isMatch) {
      return {
        success: false,
        message: "Old password is incorrect.",
      };
    }

    const isSame = await bcrypt.compare(newPassword, dbPassword);
    if (isSame) {
      return {
        success: false,
        message: "New password must be different from the old password.",
      };
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const [updateResult] = await pool.query(
      "UPDATE users SET password = ? WHERE userID = ?",
      [newHashedPassword, userID]
    );

    if (updateResult.affectedRows > 0) {
      return {
        success: true,
        message: "Password updated successfully.",
      };
    } else {
      return {
        success: false,
        message: "Password update failed.",
      };
    }
  } catch (err) {
    console.error("DB error:", err.message);
    throw new Error("Password Authorization was denied.");
  }
};

export default changePassword;
