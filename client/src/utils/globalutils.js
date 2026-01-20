import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import Studio from '../department/Studio'; 
const notf = new Notyf();

  const API = process.env.REACT_APP_API;


const fetchUser = async () => {
  try {
    const user = await fetch(`${API}/getSession`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (user.ok) {
      const response = await user.json();
      console.log('session response:', response.username);
      if (response.success) {
        return response;
      } else {
        console.log('Error: No active Session');
        return null;
      }
    } else {
      console.log('an error occurred while fetching for user');
      return null;
    }
  } catch (error) {
    throw new Error('An error occurred: ', error);
  }
};

function formatCash(amount) {
    const num = Number(amount);

    if (isNaN(num)) {
        return "Invalid amount";
    }

    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


const session = async () => {
  const users = await fetchUser();
  
  if (!users) {
    console.error('user can not be found!');
    return null;
  }

  return {
    success: true,
    username: users.username,
    departmentId: users.department_Id,
    departmentName: users.departmentName,
    status:users.status,
    email: users.email,
    role: users.role,
    userId: users.userId,
  };
};

const getProgress = (status) => {
  switch (status) {
    case 'pending':
      return 5; 
    case 'approved':
      return 15
    case 'startdesign':
      return 30; 
    case 'completedesign':
      return 50; 
    case 'startproduction':
      return 55;
    case 'completeproduction':
      return 75; 
    case 'completed':
      return 100; 
    case 'dropped':
      return 0; 
    default:
      return 0;
  }
};

const getRole = (department) => {
  switch (department) {
    case 'Administration':
      return 'Admin';
    case 'Management':
      return 'Manager';
    case 'Studio':
      return 'Studio';
    case 'Warehouse':
      return 'Warehouse';
    case 'Workshop':
      return 'Workshop'; 
    default:
      return 'NO ROLE';
  }
};

const getStageName = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending — Waiting for approval';
    
    case 'approved':
      return 'approved — Waiting for Studio';
    
      case 'startdesign':
      return 'Design Phase — Work Started Studio';

    case 'completedesign':
      return 'Design Completed — Awaiting Production';

    case 'startproduction':
      return 'Production Phase — In Progress';

    case 'completeproduction':
      return 'Production Completed — Ready for Delivery';

    case 'completed':
      return 'Delivered — Project Completed';

    case 'dropped':
      return 'Project Dropped / Cancelled';

    default:
      return 'Unknown Stage';
  }
};


const viewStatus = async (departmentName) => {
  
  if(!departmentName){
    console.error('departname not specified');
    return 
  }

  switch (departmentName) {
    case 'Management':
    case 'Administration':
      return locator.getAdministrative_project_status();

    case 'Studio':
      return locator.getProject_status_studio();

    case 'Workshop':
      return locator.getProject_status_workshop();

    case 'Warehouse':
      return locator.getProject_status_warehouse();

    default:
      console.error("Unknown department:", departmentName);
      window.location.href = '/p/project-status';
  }

};

const newproject = async() => {
  const user = await fetchUser();

    if (!user) {
      console.error('User not found. Try logging in');
      return;
    }
    if (user.departmentName === 'Management' || user.departmentName === 'Administration') {
      window.location.href = '/p/addproject';
    } else {
      notf.error('user has no access rights for this resource')
    }
};

const dateFormat = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const locator = {
  addProject: () => {
    window.location.href = '/p/addproject';
  },
  getProjects: () => {
    window.location.href = '/p/projects';
  },
  getApprovals: () => {
    window.location.href = '/approvals';
  },
  getUserManagement: () => {
    window.location.href = '/admin/usermanagement';
  },
  getCompleted_projects: () => {
    window.location.href = '/p/completed-projects';
  },
  getAssignedProjects: ()=>{
        window.location.href = '/p/assigned-projects'
  },

  getAdministrative_project_status: async ()=>{
     const user = await fetchUser();
   
    if (!user) {
      console.error('User not found. Try logging in');
      return;
    }

    if (user.departmentName === 'Management' || user.departmentName === 'Administration') {
      window.location.href = '/admin/project-status';
    } else {
      console.error('user has no access rights for this resource');
    }
  },  
  
  getProject_status_studio: async () => {
    const user = await fetchUser();
    if (!user) {
      console.error('User not found. Try logging in');
      return;
    }
    window.location.href = '/studio/project-status?department=studio';
  },

  getProject_status_warehouse: async () => {
    const user = await fetchUser();
    if (!user) {
      console.error('User not found. Try logging in');
      return;
    }
    window.location.href = '/warehouse/project-status?department=warehouse';
  },

  getProject_status_workshop: async () => {
    const user = await fetchUser();
    if (!user) {
      console.error('User not found. Try logging in');
      return;
    }
    window.location.href = '/workshop/project-status?department=workshop';
  },

  getDepartments: () => {
    window.location.href = '/departments/all';
  },
  getAdministration: () => {
    window.location.href = '/department/Administration';
  },
  getManagement: () => {
    window.location.href = '/department/Management';
  },
  getStudio: () => {
    window.location.href = '/department/Studio';
  },
  getWarehouse: () => {
    window.location.href = '/department/Warehouse';
  },
  getWorkshop: () => {
    window.location.href = '/department/Workshop';
  },

  logout: async () => {
    try {
      const response = await fetch(`${API}/logout`, { method: 'GET' });
      if (response.ok) {
        notf.success('Logout Successfully');
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    } catch (error) {
      notf.error('Logout failed');
    }
  },
};


export { getProgress, locator, newproject, getStageName, getRole, formatCash,dateFormat, viewStatus, session, fetchUser };