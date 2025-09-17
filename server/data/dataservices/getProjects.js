import pool from "../dbconnector.js";

const loadProjects = async () => {
  const sql = `
    SELECT projectID, userID, jobCardNo, jobDetails, clientContactName, totalCharge 
    FROM projects
  `;
  const [projects] = await pool.query(sql);

  if (projects.length === 0) {
    throw new Error("Could not find the data you are looking for.");
  }

  const allProjects = [];

  for (const project of projects) {
    const taskSql = "SELECT * FROM projectTasks WHERE jobCardNo = ?";
    const [tasks] = await pool.query(taskSql, [project.jobCardNo]);

    if (tasks.length === 0) {
      allProjects.push({
        projectId: project.projectID,
        userId: project.userID,
        jobCardNo: project.jobCardNo,
        jobDetails: project.jobDetails,
        clientName: project.clientContactName,
        totalCharge: project.totalCharge,
        taskId: null,
        projectStatus: "No tasks",
        taskName: null,
        assignedTo: null,
        departmentName: null,
      });
      continue;
    }

    const task = tasks[0];

    let departmentName = null;
    if (task.assignedTo) {
      const getDepartment =
        "SELECT departmentID, departName FROM departments WHERE departmentID = ?";
      const [department] = await pool.query(getDepartment, [task.assignedTo]);
      if (department.length > 0) {
        departmentName = department[0].departName;
      }
    }

    allProjects.push({
      projectId: project.projectID,
      userId: project.userID,
      jobCardNo: project.jobCardNo,
      jobDetails: project.jobDetails,
      clientName: project.clientContactName,
      totalCharge: project.totalCharge,
      taskId: task.taskID,
      projectStatus: task.status,
      taskName: task.taskName,
      assignedTo: task.assignedTo,
      departmentName: departmentName,
    });
  }

  return allProjects;
};

export default loadProjects;
