import React from 'react'
import { locator } from '../utils/globalutils';

function DeptDashboard() {
  
return (
    <div className="ml-64 flex min-h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bx bx-task text-pink-600 bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">ASSIGNED PROJECTS</h3>
              <p className="text-gray-600 mb-4">View projects assigned to your department</p>
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm"
                onClick={locator.getAssignedProjects}
              >
                View Assigned
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bx bx-pulse text-blue-600 bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">PROJECT STATUS</h3>
              <p className="text-gray-600 mb-4">Track progress of ongoing projects</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                onClick={locator.getCompleted_projects}
              >
                Check Status
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bx bx-check-circle text-green-600 bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">COMPLETED WORK</h3>
              <p className="text-gray-600 mb-4">View your completed projects</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                onClick={locator.getCompleted_projects}
              >
                View Completed
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bx bx-buildings text-red-600 bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">DEPARTMENTS</h3>
              <p className="text-gray-600 mb-4">View department information</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                onClick={locator.getDepartments}
              >
                View Departments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default DeptDashboard
