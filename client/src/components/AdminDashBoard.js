import React from "react";
import { locator } from "../utils/globalutils";

const AdminDashBoard = () => {

  return (
    <div className="ml-64 flex min-h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bxs-plus-big text-blue-600"></i>
              </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">ADD NEW PROJECT</h3>
                <p className="text-gray-600 mb-4">Create and submit new projects for approval</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                    onClick={locator.addProject} 
                >
                    Add Project
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bx-folder-open text-green-600 bx-md"></i>
              </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">VIEW PROJECTS</h3>
                <p className="text-gray-600 mb-4">Monitor all project statuses and details</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                  onClick={locator.getProjects}
                >
                    View All
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bx-pulse text-amber-600 bx-md"></i>
              </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">PROJECT STATUS</h3>
                <p className="text-gray-600 mb-4">Track progress of all projects</p>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm"
                  onClick={locator.getProject_status}
                >
                    Check Status
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bx-check-circle text-purple-600 bx-md"></i>
              </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">COMPLETED PROJECTS</h3>
                <p className="text-gray-600 mb-4">View all completed projects</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
                  onClick={locator.getCompleted_projects}
                >
                    View Completed
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;