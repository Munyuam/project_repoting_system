import pool from "../dbconnector.js";

const loadProjects = async () => {
  const sql = `SELECT * FROM projects`;
  const [projects] = await pool.query(sql);

  if (projects.length === 0) {
    throw new Error("Could not find the data you are looking for.");
  }

  const allProjects = [];
  const dropped = "dropped";

  for (const project of projects) {
    const taskSql = "SELECT * FROM projectTasks WHERE jobCardNo = ? AND status != ? AND assignedTo != ?";
    const [tasks] = await pool.query(taskSql, [project.jobCardNo, dropped, -1]);

    if (tasks.length === 0) {
      allProjects.push({
        ...project, 
        taskId: null,
        projectStatus: "Notasks",
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
      ...project,
      taskId: task.taskID,
      projectStatus: task.status,
      taskName: task.taskName,
      assignedTo: task.assignedTo,
      departmentName,
    });
  }

  return allProjects;
};

export default loadProjects;
