import pool from "../dbconnector.js";
import sendNotificationToDepartments from "../../notiifications/services/projectNotification.js";

const UpdateStatus = async (status, jobnumber, assignedTo = null) => {
  try {
    let sql;
    let params;

    if (status.toLowerCase().startsWith("complete") && assignedTo !== null) {
      sql = `
        UPDATE projectTasks
        SET status = ?, assignedTo = ?
        WHERE jobCardNo = ?;
      `;
      params = [status, assignedTo, jobnumber];
    } else {
      sql = `
        UPDATE projectTasks
        SET status = ?
        WHERE jobCardNo = ?;
      `;
      params = [status, jobnumber];
    }

    const [result] = await pool.query(sql, params);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: `No project found with job card number '${jobnumber}'.`,
      };
    }

    if (assignedTo !== null) {
      let title;
      let message;

      if (assignedTo <= 6) {
        title = "New Project Assigned";
        message = `A new job card (#${jobnumber}) has been added to your dashboard. Please review it as soon as possible.`;
        
        await sendNotificationToDepartments(assignedTo, title, message);
      } 
      else {
        title = "Completed Project Success";
        message = `Job Card (#${jobnumber}) has been completed successfully.`;

        await sendNotificationToDepartments(1, title, message);
        await sendNotificationToDepartments(2, title, message);
      }

    }

    return {
      success: true,
      message: `Project status '${status}' updated successfully.`,
    };

  } catch (error) {
    console.error("Error updating status:", error);
    return {
      success: false,
      message: "Failed to update project status.",
      error: error.message,
    };
  }
};

export default UpdateStatus;
