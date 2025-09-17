import pool from "../dbconnector.js";

const loginDetails = async (username, password) => {
    try {
        const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        const [result] = await pool.query(sql, [username, password]);
        
        if (result.length !== 0) {
            const user = result[0];
            const department_Id = user.departmentID;

            const department_query = "SELECT * FROM departments WHERE departmentID = ?";
            const [result_set] = await pool.query(department_query, [department_Id]); 

            if (result_set.length !== 0) { 
                const depart = result_set[0];

                return {
                    id: user.userID,
                    username: user.username, 
                    fullname: user.full_name,
                    email: user.email,
                    role: user.role,
                    department_name: depart.departName
                };
            } else {
                return {
                    id: user.userID,
                    username: user.username,
                    fullname: user.full_name,
                    email: user.email,
                    role: user.role,
                    department_name: "Department Not Found"
                };
            }
        } else {
            throw new Error('username or password was not found');
        }
    } catch (err) {
        throw new Error('Authentication failed');
    }
}

export default loginDetails;