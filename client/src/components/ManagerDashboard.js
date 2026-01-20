import React, { useState, useEffect } from 'react';
import { dateFormat, getProgress, locator } from '../utils/globalutils';
import ProgressBar from "@ramonak/react-progress-bar";
import 'notyf/notyf.min.css';

const API = process.env.REACT_APP_API;


function ManagerDashBoard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const response = await fetch(`${API}/getProjects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const projets = data.filter((item) => item.projectStatus !== "Notasks");
        setProjects(projets);
      } else {
        console.error("Error occurred while connecting to database");
      }
    } catch (error) {
      console.error("Error while connecting to database", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="lg:ml-64 flex min-h-screen bg-gray-50">
      <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Management Dashboard
        </h2>

        {/* ====== TOP GRID CARDS ====== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          {/* Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <i className="bxr bxs-plus-big text-blue-600 text-lg"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ADD NEW PROJECT</h3>
            <p className="text-gray-600 mb-4">Create and submit new projects for approval</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
              onClick={locator.addProject}
            >
              Add Project
            </button>
          </div>

          {/* Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <i className="bxr bx-folder-open text-green-600 bx-md text-lg"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">VIEW PROJECTS</h3>
            <p className="text-gray-600 mb-4">Monitor all project statuses and details</p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
              onClick={locator.getProjects}
            >
              View All
            </button>
          </div>

          {/* Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <i className="bxr bx-user bx-md text-purple-600 text-lg"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">USER MANAGEMENT</h3>
            <p className="text-gray-600 mb-4">Add and manage system users</p>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
              onClick={locator.getUserManagement}
            >
              Check Users
            </button>
          </div>

          {/* Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <i className="bxr bx-pulse text-amber-600 bx-md texl-lg"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">PROJECT STATUS</h3>
            <p className="text-gray-600 mb-4">Track progress of all projects</p>
            <button
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
              onClick={locator.getAdministrative_project_status}
            >
              Check Status
            </button>
          </div>

          {/* Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-12 h-12 bg-[#fbd7d7] rounded-lg flex items-center justify-center mb-4">
              <i className="bxr bx-circle-three-quarter-alt text-[#bd2d2d] bx-md text-lg"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">PENDING APPROVAL</h3>
            <p className="text-gray-600 mb-4">Review and approve submitted projects</p>
            <button
              className="bg-[#bd2d2d] hover:bg-[#ae2828] text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
              onClick={locator.getApprovals}
            >
              View Approvals
            </button>
          </div>

          {/* Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-12 h-12 bg-[#c1e7ce] rounded-lg flex items-center justify-center mb-4">
              <i className="bxr bx-check-circle text-[#4BA66A] bx-md text-lg"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">COMPLETED PROJECTS</h3>
            <p className="text-gray-600 mb-4">View all completed projects</p>
            <button
              className="bg-[#4BA66A] hover:bg-[#35754a] text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
              onClick={locator.getCompleted_projects}
            >
              View Completed
            </button>
          </div>

        </div>

        {/* ====== RECENT PROJECTS TABLE ====== */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Recent Projects</h2>
          </div>

          {loading ? (
            <p className="text-center py-6 text-gray-600">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-center py-6 text-gray-600">No projects found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Initialized</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.slice(0, 6).map((project) => (
                    <tr key={project.projectId}>
                      <td className="px-6 py-4 whitespace-nowrap">{project.jobDetails}</td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              project.projectStatus === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : project.projectStatus === 'In Progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {project.projectStatus}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <ProgressBar
                          completed={getProgress(project.projectStatus)}
                          bgColor="#4E49F2"
                          baseBgColor="#e5e7eb"
                          height="20"
                          labelAlignment="center"
                          labelSize="12px"
                          borderRadius="10px"
                        />
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {dateFormat(project.currentDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ManagerDashBoard;
