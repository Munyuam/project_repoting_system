import pool from "../dbconnector.js";

const loadProjects = async () => {
  const [projects] = await pool.query("SELECT * FROM projects");

  if (projects.length === 0) {
    throw new Error("Could not find the data you are looking for.");
  }

  const dropped = "dropped";
  const allProjects = await Promise.all(
    projects.map(async (project) => {
      const [tasks] = await pool.query(
        "SELECT * FROM projectTasks WHERE jobCardNo = ? AND status != ? AND assignedTo != ?",
        [project.jobCardNo, dropped, -1]
      );

      if (tasks.length === 0) {
        return {
          ...project,
          taskId: null,
          projectStatus: "Notasks",
          taskName: null,
          assignedTo: null,
          departmentName: null,
        };
      }

      const task = tasks[0];
      let departmentName = null;

      if (task.assignedTo) {
        const [department] = await pool.query(
          "SELECT departName FROM departments WHERE departmentID = ?",
          [task.assignedTo]
        );
        departmentName = department.length > 0 ? department[0].departName : null;
      }

      return {
        ...project,
        taskId: task.taskID,
        projectStatus: task.status,
        taskName: task.taskName,
        assignedTo: task.assignedTo,
        departmentName,
      };
    })
  );

  return allProjects;
};

loadProjects();

export default loadProjects;
