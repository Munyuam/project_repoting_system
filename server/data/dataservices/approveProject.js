import pool from "../dbconnector.js";

const approveProject = async (jobCardNo) => {
  const assignedTo = 3;
  try {
    const sql = `
      UPDATE projectTasks 
      SET assignedTo = ?, status = 'workstartedstudio' 
      WHERE jobCardNo = ?
    `;
    
    const [result] = await pool.query(sql, [assignedTo, jobCardNo]);

    if (result.affectedRows > 0) {
      return { success: true, message: "Project approved successfully" };
    } else {
      return { success: false, message: "No project found to update" };
    }

  } catch (error) {
    throw new Error("Something went wrong while approving the project: " + error.message);
  }
};

export default approveProject;
