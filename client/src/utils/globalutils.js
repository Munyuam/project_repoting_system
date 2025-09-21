
const getProgress = (status) => {
    switch (status) {
      case "pending":
        return 25;
      case "workstartedstudio":
        return 50;
      case "workedstartedworkshop":
        return 75;
      case "completed":
        return 100;
      default:
        return 0;
    }
};

const getRole = (department) =>{

  switch(department){
    case "Administration":
      return "Admin";

    case "Management":
      return "Manager";

    case "Studio":
      return "Studio";
      
    case "Warehouse":
      return "Warehouse";
      
    case "Workshop":
      return "Worskhop";

     default:
        return "NO ROLE";
    }
}

const getStageName = (status) => {
    switch (status) {
      case "pending":
        return "pending - not approved";
      case "workstartedstudio":
        return "Approved - studio work started";
      case "workedstartedWorkshop":
        return "Inprogress- Workshop Work Started";
      case "completed":
        return "completed";
      default:
        return "Unknown Stage";
    }
};

function viewStatus() {
    window.location.href = "/p/project-status";
}

function newproject() {
    window.location.href = "/p/addproject";
}

function dateFormat (date){
    const  d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const locator = {
      addProject: ()=>{
        window.location.href = '/p/addproject'
      },
      getProjects: ()=>{
        window.location.href = '/p/projects'
      },

      getApprovals : ()=>{
        window.location.href = '/approvals'
      },

      getUserManagement: ()=>{
        window.location.href = '/admin/usermanagment'
      },
    
      getCompleted_projects: ()=>{
        window.location.href = '/p/completed-projects'
      },


      getProject_status : ()=>{
        window.location.href = '/p/project-status'
      },

      getAssignedProjects: ()=>{
        window.location.href = '/p/assigned-projects'
      },

      getDepartments: ()=>{
        window.location.href = '/departments/all'
      },

      getAdmininstration: ()=> {
        window.location.href ='/department/Administration'
      },

      getManagement: ()=> {
        window.location.href ='/department/Management'
      },

      getStudio: ()=> {
        window.location.href ='/department/Studio'
      },

      getWarehouse: ()=>{
        window.location.href ='/department/Warehouse'
      },

      getWorkshop : ()=>{
        window.location.href ='/department/Workshop'
      }


}

module.exports = {getProgress, locator, newproject, getStageName, getRole, dateFormat, viewStatus}

