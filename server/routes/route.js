import { Router } from "express";
import loginDetails from "../data/dataservices/getLogin.js";
import CreateProject from "../data/dataservices/projectInit.js";
import loadProjects from "../data/dataservices/getProjects.js";
import statuses from "../data/dataservices/getProjectStatus.js";
import approveProject from "../data/dataservices/approveProject.js";
import rejectProject from "../data/dataservices/rejectProject.js";
import AdminStatus from "../data/dataservices/getAdminStatus.js";
import getusers from "../data/dataservices/getUsers.js";
import registerUser from "../data/dataservices/registerUser.js";
import UpdateStatus from "../data/dataservices/updatstatus.js";
import updateProfile from "../data/dataservices/updateProfile.js";
import changePassword from "../data/dataservices/changePassword.js";
import resetPassword from "../data/dataservices/resetPassword.js";
import getNotification from "../notiifications/services/getNotifications.js";
import isRead from "../notiifications/services/markAsRead.js";
import pool from '../data/dbconnector.js'

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});


router.post("/login", async (req, res) => {    
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: "Invalid request format" });
    }
    const { username, password } = req.body;

    try {
        const users = await loginDetails(username.trim(), password.trim());     

        req.session.userid = users.id;
        req.session.username = users.username;
        req.session.email = users.email;
        req.session.role = users.role;
        req.session.status = users.status;
        req.session.department_name = users.department_name;
        req.session.departId = users.departId;

        console.log("Session after login:", req.session);
        console.log("Session ID:", req.sessionID);

        
        req.session.save((err) => {
           
            if (err) {
                return res.status(500).json({ error: 'Session error' });
            }
            
            res.json({
                success: true,
                message: `${users.username} successfully logged in`,
                users: users,
                sessionData: req.session
            });
        });

    } catch (error) {
        if(error.message === 'username or password was not found'){
            res.status(401).json({ 
                success: false, 
                message: error.message 
            });
        }else{
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }
});

router.get('/Management', async (req, res) => {
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 
    const username = req.session.username;
    const userDepartmentID = req.session.department_Id;

    console.log(`user ID is =>` + userID + ` username is =>`+ username);
    
    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Management'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Management",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        message: `${username} successfully accessed management panel`,
        sessionData: req.session
    });
});

router.post('/approvProject', async (req, res) => {
  try {
    const { projectId, jobCard } = req.body;

    if (!projectId || !jobCard) {
      return res.status(400).json({
        success: false,
        message: "Invalid data received"
      });
    }

    const approvedProjects = await approveProject(jobCard);

    if (approvedProjects.success) {
      res.json(approvedProjects);
    } else {
      res.status(404).json(approvedProjects);
    }
  } catch (error) {
    console.error("Error approving project:", error);
    res.status(500).json({
      success: false,
      message: "Server error while approving project"
    });
  }
});

router.post('/rejectProject', async (req, res)=>{

    try {
        const { projectId, jobCard } = req.body;

        if (!projectId || !jobCard) {
        return res.status(400).json({
            success: false,
            message: "Invalid data received"
        });
        }

        const rejected =  await rejectProject(jobCard);
        
        if(rejected.success){
            res.json(rejected);
        } else {
        res.status(404).json(rejected);
        }

    } catch (error) {
        console.error("Error approving project:", error);
        res.status(500).json({
        success: false,
        message: "Server error while approving project"
        });
    }
});


router.post('/updatestatus', async (req, res) => {
    
    if(!req.body || typeof req.body !== 'object'){
        return res.status(400).json({
            success: false,
            message: "Invalid data received"
        })
    }
    const { status, jobcardno, assignedTo } = req.body;

    if (!status || !jobcardno) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const updatedstatus = await UpdateStatus(status, jobcardno, assignedTo || null);

    if(updatedstatus.success){
        res.status(200).json({
            success: true
        })
    }else{
        res.status(500).json(500)({
            success:false
        })
    } 
})


router.post('/projectInit', async (req, res) => {
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ success: false, message: "Invalid data received" });
    }

    const userId = req.session.userid;
    const formData = req.body;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: You must be logged in to initialize a project"
        });
    }

    try {
        const projectInit = await CreateProject(formData, userId);

        res.status(200).json({
            success: true,
            message: "Project Successfully Initialized.",
            projectData: projectInit,  
            sessionData: req.session
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error initializing project: " + error.message
        });
    }
});

router.get('/getProjects', async (req, res) => {
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 
    const username = req.session.username;
    const userDepartmentID = req.session.departId;

    console.log("The project department of user is => " + userDepartmentID);
    console.log("The userID of the user is => " + userID);

    if (!userDepartment || !userID) {
        return res.status(401).json("Access denied — Please login.");
    }

    try {
        const projects = await loadProjects();

        console.log("User ID:", userID);
        console.log("User Department ID:", userDepartmentID);

        // Filter projects for this department or admins (ID 1 or 2)
        const filteredProjects = projects.filter(project => 
            project.assignedTo == userDepartmentID || userDepartmentID == 1 || userDepartmentID == 2
        );

        // Sort projects: assignedTo == 100 goes last
        filteredProjects.sort((a, b) => {
            if (a.assignedTo === 100 && b.assignedTo !== 100) return 1;
            if (a.assignedTo !== 100 && b.assignedTo === 100) return -1;
            return a.assignedTo - b.assignedTo; // Optional secondary sort by assignedTo
        });

        console.log("These are the filtered and sorted Projects:", filteredProjects);

        if (filteredProjects.length > 0) {
            return res.status(200).json(filteredProjects);
        } else {
            return res.status(200).json({ message: "No project assigned to this department." });
        }

    } catch (error) {
        console.error("Error loading projects:", error);
        return res.status(500).json("Server error loading projects.");
    }
});



router.get('/getProjectStatus', async (req, res) => {
  const userID = req.session.userid;
  const userDepartment = req.session.department_name;
  const department = req.query.department?.toLowerCase();

  if (!userID || !userDepartment || !department) {
    return res.status(403).json("Access denied. Login first");
  }

  try {
    const projectStatus = await statuses(department);

    return projectStatus.length > 0
      ? res.status(200).json(projectStatus)
      : res.status(404).json("No projects available for your department");

  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to load statuses");
  }
});

router.get('/getAdminProjectStatus', async(req, res)=>{

  const userID = req.session.userid;
  const userDepartment = req.session.department_name;

  if (!userID || !userDepartment) {
    return res.status(403).json("Access denied. Login first");
  }

  try {
    const AdminProjectStatus = await AdminStatus();

    const AdminStatuses = Object.values(AdminProjectStatus)

    if(AdminProjectStatus){
        return res.status(200).json({
            success:true, 
            priviledgesStatuses: AdminStatuses  
        })
    }else{
        return res.status(500).json({
            success:false,
            message: 'An Error Occured while fetching data'
        })
    }

  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to load statuses");
  }
})

router.get('/getCompleted', async (req, res) => {
  try {
    const projects = await loadProjects(); 

    if (projects) {

      const filteredProjects = projects.filter(
        (project) => project.assignedTo === 100 && project.projectStatus === 'completed'
      );

      console.log("This is the filtered projects: "+filteredProjects);

      res.status(200).json(filteredProjects);

    } else {
      console.error('Error: Expected an array of projects from loadProjects');
      res.status(500).json({ error: 'Invalid data returned from loadProjects' });
    }

  } catch (error) {
    console.error('Error fetching completed projects:', error);
    res.status(500).json({ error: 'Failed to load completed projects' });
  }
});


router.get("/getUsers", async (req, res) => {
  try {
    const users = await getusers();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to load users" });
  }
});


router.post('/registerUser', async (req, res) => {
    
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: "Invalid request format" });
    }

    const { username, fullName, email, role } = req.body;
    
    console.log(req.body);
    console.log(role)

    const generatePassword = (username, fullname) => {
        let pass = "";
        if (typeof username === "string" && typeof fullname === "string") {
            let userPlaceholder = username[0] || "";
            let namePlaceholder = fullname[0] || "";
            pass = userPlaceholder + namePlaceholder + new Date().getFullYear();
        }
        return pass;
    };

    const password = generatePassword(username, fullName);

    try {
        const registered = await registerUser(role, username, fullName, email, password);            
        console.log(registered);
        res.status(201).json({ message: "User registered successfully", result: registered });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/Admin', async (req, res) => {
  console.log("SESSION ID:", req.sessionID);
  console.log("SESSION ID:", req.sessionID);
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 
    const username = req.session.username;

    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Administration'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Administrators only",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        sessionData: req.session,
    });

});


router.get('/studio', async (req, res) => { 
    console.log("SESSION ID:", req.sessionID);
    console.log("Session ID on studio:", req.sessionID);
    console.log("Session object:", req.session);

    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 

    console.log("userID: "+ req.session.userid);

    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Studio'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Studio only",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        sessionData: req.session,
    });
});

router.get('/warehouse', async (req, res) => { 
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 

    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Warehouse'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Warehouse only",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        sessionData: req.session,
    });
});

router.get('/workshop', async (req, res) => { 
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 

    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Workshop'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Workshop only",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        sessionData: req.session,
    });
});

router.get('/geturl', async (req, res,next) => { 
    const userID = req.session.userid;
    const userDepartment = req.session.department_name;

    if(userID && userDepartment){

        res.status(200).json({
            success: true,
            sessionData: req.session
        })
    }else{
       res.status(500).json({
         success:false,
        sessionData: null
       })
    }
})

router.post('/updateProfile', async (req, res) => {

    console.log("Request Body: ",req.body);

  const { username, email, departmentName, userId, status, fullName } = req.body;

  if (!username || !email || !departmentName || !userId) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const updatedProfile = await updateProfile(username, email, departmentName, userId, status, fullName);

    if (updatedProfile.success) {
      return res.json({
        success: true,
        message: updatedProfile.message,
        user: updatedProfile.user,
      });
    } else {
      return res.status(400).json({ success: false, message: updatedProfile.message });
    }
  } catch (error) {
    console.error('Error updating profile:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.get('/getSession', (req, res)=>{
    if(!req.session){
        console.log("No user Logins Found!");
        return res.status(500).json({success: false, message: "no user Login found!"})
    }else{
        return res.status(200).json({
            success: true,
            userId: req.session.userid,
            username: req.session.username,
            email: req.session.email,
            status:req.session.status,
            role: req.session.role, 
            departmentName: req.session.department_name ,
            department_Id: req.session.departId 
        })
    }
})

router.post("/changePassword", async (req, res) => {
  if (!req.session || !req.session.userid) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  const { oldPassword, newPassword } = req.body;
  const userID = req.session.userid;

  try {
    const result = await changePassword(userID, newPassword, oldPassword);
    res.json(result);
  } catch (error) {
    console.error("Error changing password:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get('/getNotifications', async (req, res)=>{
    if(!req.session || !req.session.departId ){
        return res.status(401).json({ success: false, message: "Not logged in" });
    }

    const departmentID = req.session.departId
    const userID = req.session.userid
    console.log("the found departmentID is: "+departmentID+ "An user Id is: "+ userID)

    try {
        const notifications = await isRead.getUnreadNotifications(userID);

        console.log(notifications);

        if(notifications.success){
        
            console.log("Notifications successfully retrieved");

            return res.json({
                success: true,
                message: notifications.message,
                notifications: notifications.data,
                notificationCount: notifications.count
            })
        }else{
            return res.json({ success: false, message: notifications.message || "Failed to get notifications for this department" });
        }
    } catch (error) {
            console.error("Error retrieving notifications: ", error.message);
            return res.status(500).json({ success: false, message: "Internal server error" });
    }

})

router.post('/markAsRead', async (req, res) => {
  const { notificationID } = req.body;
  const userID = req.session.userid;

  try {
    const result = await isRead.markAsRead(notificationID, userID);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message || "Notification not found"
      });
    }

    return res.json({
      success: true,
      message: "Notification marked as read"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

router.post('/markAllAsRead', async (req, res) => {
  const userID = req.session.userid;

  try {
    const result = await isRead.markAllAsRead(userID);

    if (!result.success) {
      return res.json({ success: false, message: result.message });
    }

    return res.json({
      success: true,
      message: "All notifications marked as read"
    });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});


router.post('/resetPassword', async (req, res) => {
  if (!req.session || !req.session.userid) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  const { userID, defaultPassword } = req.body;

  try {
    const result = await resetPassword(userID, defaultPassword);

    if (result.success) {
      return res.json({ success: true, message: result.message });
    } else {
      return res.json({ success: false, message: result.message || "Failed to reset password" });
    }
  } catch (error) {
    console.error("Error changing password:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.get('/logout', async (req, res,next) => { 
    if(req.session){    
        req.session.destroy((error)=>{
            if(error){
                return next(error)
            }else{
                res.clearCookie('connect.sid');
                return res.redirect('/')
            }
        });

    }else{
        res.json("No session Found to Logout")
    }
});

export default router;