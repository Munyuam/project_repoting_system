import pool from "../dbconnector.js";

const rejectProject = async (jobCardNo) => {
  const assignedTo = -1; // mark project as rejected/unassigned
  try {
    const sql = `
      UPDATE projectTasks 
      SET assignedTo = ?, status = 'dropped' 
      WHERE jobCardNo = ?
    `;
    
    const [result] = await pool.query(sql, [assignedTo, jobCardNo]);

    if (result.affectedRows > 0) {
      return { success: true, message: "Project rejected successfully" };
    } else {
      return { success: false, message: "No project found to reject" };
    }

  } catch (error) {
    throw new Error("Something went wrong while rejecting the project: " + error.message);
  }
};

export default rejectProject;
