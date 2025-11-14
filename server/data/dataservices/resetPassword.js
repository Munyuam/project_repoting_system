import pool from "../dbconnector.js";
import bcrypt from "bcrypt";

const resetPassword = async (userid, defaultPassKey)=> {
  
  const hashedPassword = await bcrypt.hash(defaultPassKey, 10)
  
  try{
    const [updateResult] = await pool.query(
      "UPDATE users SET password = ? WHERE userID = ?",
      [hashedPassword, userid]
    );

    if(updateResult.affectedRows > 0){
      return ({
        success: true,
        message: "Reset password was successfull"
      })
    }else{
      return ({
        success: false,
        message: "Reset passsword failed"
      })
    }
  }catch(error){
    console.error("DB erorr", error.message);
    throw new Error("Password Authorizarion was denied")
  }
}

export default resetPassword