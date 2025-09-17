import pool from "../dbconnector.js";

const statuses = async () => {
    const completed_status = 'completed';
    
    try {
        const task_sql = `SELECT jobCardNo, taskName, assignedTo, status FROM projectTasks WHERE status != ?`;
        const [task_result] = await pool.query(task_sql, [completed_status]);  

        if (task_result.length === 0) {
            return []; 
        }

        const allProjectStatus = []; 
        
        for (const task of task_result) {
            const sqlProjects = `
                SELECT projectID, jobCardNo, clientContactName, jobDetails, preparedBy, deliveryDate, totalCharge
                FROM projects WHERE jobCardNo = ?
            `;
            const [project_result] = await pool.query(sqlProjects, [task.jobCardNo]);

            const deparment_sql = `
                SELECT departName, departmentID FROM departments WHERE departmentID = ?
            `;
            const [department_result] = await pool.query(deparment_sql, [task.assignedTo]);


            if (project_result.length > 0 && department_result.length > 0) {
                allProjectStatus.push({
                    jobCardNo: task.jobCardNo,
                    taskName: task.taskName,
                    departmentName: department_result[0].departName,
                    status: task.status,
                    projectID: project_result[0].projectID,
                    clientContactName: project_result[0].clientContactName,
                    jobDetails: project_result[0].jobDetails,
                    preparedBy: project_result[0].preparedBy,
                    deliveryDate: project_result[0].deliveryDate,
                    totalCharge: project_result[0].totalCharge
                });
            } else {
                console.warn(`No project found for jobCardNo: ${task.jobCardNo}`);  
            }
        }

        return allProjectStatus;  
    } catch (error) {
        console.error('Error in statuses:', error);  
        throw new Error("Problem With the Connection. Please try again later");  
    }
};

export default statuses;