import React, { useEffect, useState } from 'react';
import { session, locator } from '../utils/globalutils';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

function DeptDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    session()
      .then((depart) => {
        console.log('Session data:', depart);
        setUser(depart);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Session fetch error:', err);
        setError('Failed to load session data. Please log in.');
        setLoading(false);
      });
  }, []);

  function IdentifyUser() {
    if (!user) {
      notyf.error('Please log in to access the dashboard.');
      return null;
    }
    const departmentName = user.departmentName.toLowerCase();
    const { departmentId, username } = user;
    if (departmentName === 'studio') {
      return 'studio';
    } else if (departmentName === 'workshop') {
      return 'workshop';
    } else if (departmentName === 'warehouse') {
      return 'warehouse';
    } else {
      notyf.error('Unauthorized department. Please contact support.');
      return null;
    }
  }

  function RenderDashBoard(department) {
    if (!department) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>
          <p className="text-gray-600 mt-2">Please log in or contact support to access the dashboard.</p>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            onClick={locator.logout}
            aria-label="Log in to access dashboard"
          >
            Log In
          </button>
        </div>
      );
    }

    const departmentButtons = {
      studio: [
        {
          title: 'ASSIGNED PROJECTS',
          description: 'View projects assigned to Studio',
          icon: 'bxr  bx-desk',
          color: 'amber',
          onClick: locator.getAssignedProjects,
          ariaLabel: 'View assigned Studio projects',
          btnTitle: 'Assigned Projects'
        },
        {
          title: 'PROJECT STATUS',
          description: 'Track Studio project progress',
          icon: 'bx-pulse',
          color: 'blue',
          onClick: locator.getProject_status_studio,  
          ariaLabel: 'Check Studio project status',
          btnTitle: 'Check Project Status'
        },
        {
          title: 'COMPLETED WORK',
          description: 'View completed Studio projects',
          icon: 'bx-check-circle',
          color: 'green',
          onClick: locator.getCompleted_projects,
          ariaLabel: 'View completed Studio projects',
          btnTitle: 'Check Completed Projects'
        },
        {
          title: 'DEPARTMENTS',
          description: 'View all department information',
          icon: 'bx-buildings',
          color: 'red',
          onClick: locator.getDepartments,
          ariaLabel: 'View departments',
          btnTitle: 'View Departments' 
        },
      ],
      workshop: [
        {
          title: 'WORKSHOP PROJECTS',
          description: 'View projects assigned to Workshop',
          icon: 'bxr  bx-hard-hat',
          color: 'blue',
          onClick: locator.getAssignedProjects,
          ariaLabel: 'View assigned Workshop projects',
          btnTitle: 'Workshop Projects' 
        },
        {
          title: 'WORKSHOP STATUS',
          description: 'Track Workshop project progress',
          icon: 'bx-cog',
          color: 'purple',
          onClick: locator.getProject_status_workshop,
          ariaLabel: 'Check Workshop project status',
          btnTitle: 'Workshop Status'  
        },
        {
          title: 'COMPLETED WORK',
          description: 'View completed Workshop projects',
          icon: 'bx-check-circle',
          color: 'green',
          onClick: locator.getCompleted_projects,
          ariaLabel: 'View completed Workshop projects',
          btnTitle: 'Check Completed Projects'  
        },
        {
          title: 'DEPARTMENTS',
          description: 'View all department information',
          icon: 'bx-buildings',
          color: 'gray',
          onClick: locator.getDepartments,
          ariaLabel: 'View departments',
          btnTitle: 'View Departments'  
        },
      ],
      warehouse: [
        {
          title: 'WAREHOUSE PROJECTS',
          description: 'View projects assigned to Warehouse',
          icon: 'bx-box',
          color: 'amber',
          onClick: locator.getAssignedProjects,
          ariaLabel: 'View assigned Warehouse projects',
          btnTitle: 'Warehouse Projects'  
        },
        {
          title: 'WAREHOUSE STATUS',
          description: 'Track Warehouse Project Status',
          icon: 'bx-barcode',
          color: 'blue',
          onClick: locator.getProject_status_warehouse,
          ariaLabel: 'Check Warehouse Warehouse status',
          btnTitle: 'Warehouse Status'  
        },
        {
          title: 'COMPLETED WORK',
          description: 'View completed Warehouse projects',
          icon: 'bx-check-circle',
          color: 'green',
          onClick: locator.getCompleted_projects,
          ariaLabel: 'View completed Warehouse projects',
          btnTitle: 'Check Completed Projects'  
        },
        {
          title: 'DEPARTMENTS',
          description: 'View all department information',
          icon: 'bx-buildings',
          color: 'red',
          onClick: locator.getDepartments,
          ariaLabel: 'View departments',
          btnTitle: 'View Departments'  
        },
      ],
    };

    const buttons = departmentButtons[department] || [];

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {department.charAt(0).toUpperCase() + department.slice(1)} Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {buttons.map((btn, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div
                className={`w-12 h-12 bg-${btn.color}-100 rounded-lg flex items-center justify-center mb-4`}
              >
                <i className={`bx ${btn.icon} text-lg text-${btn.color}-600 bx-md`} aria-hidden="true"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{btn.title}</h3>
              <p className="text-gray-600 mb-4">{btn.description}</p>
              <button
                className={`bg-${btn.color}-600 hover:bg-${btn.color}-700 text-white px-4 py-2 rounded-md text-sm`}
                onClick={btn.onClick}
                aria-label={btn.ariaLabel}
              >
                {btn.btnTitle}  
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ml-64 flex min-h-screen bg-gray-50">
        <div className="flex-1 p-6 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 flex min-h-screen bg-gray-50">
        <div className="flex-1 p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            onClick={locator.logout}
            aria-label="Log in to access dashboard"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-64 flex min-h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">{RenderDashBoard(IdentifyUser())}</div>
    </div>
  );
}

export default DeptDashboard;