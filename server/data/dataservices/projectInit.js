import pool from "../dbconnector.js";

const InitialiseProject = async (formData, userId) => {

    const taskName = ()=>{

        let tname  = "job_task";
        let hexs = "123456789ABCDEF";

        for(let i = 0; i < hexs.length ; i ++){
            tname += hexs[Math.floor(Math.random() * hexs.length)]; 
        }

        return tname;
    }

    let {
        current_date,
        current_time,
        job_card_no,
        client_contact_name,
        job_details,
        qty,
        overall_size,
        delivery_date,
        job_description,
        prepared_by,
        total_charge
    } = formData

    try {
        const sql = `INSERT INTO projects
                (
                    userID,
                    jobCardNo,
                    jobDescription,
                    currentDate,
                    currentTime,
                    clientContactName,
                    jobDetails,
                    qty,
                    overallSize,
                    deliveryDate,
                    preparedBy,
                    totalCharge
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
                `
        const [result] = await pool.query(sql, 
                                    [
                                        userId, 
                                        job_card_no, 
                                        job_description,
                                        current_date, 
                                        current_time, 
                                        client_contact_name, 
                                        job_details, 
                                        qty, 
                                        overall_size,
                                        delivery_date, 
                                        prepared_by, 
                                        total_charge
                                    ]);
        if(result.affectedRows > 0){
                const assignedTo = 2;
                const job_status = 'pending';
                
                try {
                    const create_task_sql = `INSERT INTO projectTasks (jobCardNo, taskName, assignedTo, status)VALUES (?,?,?,?)`;
                    const [task_result_set]=  await pool.query(create_task_sql, [job_card_no, taskName(), assignedTo, job_status]);

                    if(task_result_set.affectedRows > 0){
                        return { projectId: result.insertId, taskId: task_result_set.insertId };
                    }else{
                        console.log("An error occurred during the execution");
                    }

                } catch (error) {
                    console.log("Debugging Statement SQL2 "+error);
                }
        }
    } catch (err) {
        throw new Error('Project initialization failed: ' + err.message);
    }
}

export default InitialiseProject;