import pool from "../../data/dbconnector.js";
import { sendMail } from "../mailer.js";
import getDepartmentMembers from "../services/getDepartmentMembers.js";

const sendNotificationToDepartments = async (departmentID, title, message) => {
  const isRead = 0;
  const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

  if (!departmentID) {
    return { success: false, message: "Target department ID is required." };
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO notifications (targetDepartment, title, message, isRead, createdAt) 
       VALUES (?, ?, ?, ?, ?)`,
      [departmentID, title, message, isRead, createdAt]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Failed to insert notification." };
    }

    const members = await getDepartmentMembers(departmentID);

    if (!members.success) {
      return { success: true, message: "Notification saved but no emails." };
    }

    const emailList = members.emails.join(","); 
    const contentDetails = {
      fullname: "Department Members",
      username: "System"
    };

    await sendMail(emailList, title, message, contentDetails);

    return {
      success: true,
      message: "Notification sent successfully.",
      notificationID: result.insertId,
      departmentID,
    };

  } catch (error) {
    console.error("Error sending notification:", error);
    return {
      success: false,
      message: "Database error while sending notification.",
      error: error.message,
    };
  }
};

export default sendNotificationToDepartments;
