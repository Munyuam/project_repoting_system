import sendNotificationToDepartments from "../../notiifications/services/projectNotification.js";
import pool from "../dbconnector.js";

const approveProject = async (jobCardNo) => {
  const assignedTo = 3; 

  try {
    const sql = `
      UPDATE projectTasks 
      SET assignedTo = ?, status = 'approved' 
      WHERE jobCardNo = ?
    `;
    const [result] = await pool.query(sql, [assignedTo, jobCardNo]);

    if (result.affectedRows === 0) {
      return { success: false, message: "No project found to update." };
    }

    const studioTitle = "New Project Assigned";
    const studioMessage = "A new job card has been added to your dashboard. Please review...";
    await sendNotificationToDepartments(assignedTo, studioTitle, studioMessage);

    const approvTitle = "New Project Approved";
    const approvMessage = `Project with Job Card #${jobCardNo} has been approved.`;
    const departmentId = 1; 
    await sendNotificationToDepartments(departmentId, approvTitle, approvMessage);

    return {
      success: true,
      message: "Project approved and notifications sent successfully.",
    };

  } catch (error) {
    console.error("Error in approveProject:", error);
    return {
      success: false,
      message: "Something went wrong while approving the project.",
      error: error.message,
    };
  }
};

export default approveProject;
