import React from 'react'
import { getProgress,locator } from '../utils/globalutils';
import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from 'react';

function ManagerDashBoard() {
 const [projects, setProjects] = useState([]);
 const notfy = new Error();
 
  const loadProjects = async () => {
     try {
       const response = await fetch("/getProjects", {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       });
 
       if(response.ok) {
         const data = await response.json();

         const projets = data.filter((item) => {
            return item.projectStatus !== "Notasks";
         })
         setProjects(projets);
       } else {
         notfy.error("Error occurred while connecting to database");
       }
     } catch (error) {
       notfy.error("Error while connecting to database", error);
     }
  };
 
   useEffect(() => {
     loadProjects();
   }, []);
 
  return (
    <div className="ml-64 flex min-h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
            <div className='w-full border border-none p-5'>
                    <h1 className='text-4xl text-black mb-2 uppercase'><span className='font-bold'>HELLO!</span> Welcome Mwiza</h1>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <i class='bxr  bx-user bx-md text-purple-600'  ></i> 
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">USER MANAGEMENT</h3>
                <p className="text-gray-600 mb-4">Add and manage system users</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
                  onClick={locator.getUserManagement}
                >
                    Check Users
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
              <div className="w-12 h-12 bg-[#fbd7d7] rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bx-circle-three-quarter-alt text-[#bd2d2d] bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">PENDING APPROVAL</h3>
              <p className="text-gray-600 mb-4">Review and approve submitted projects</p>
              <button className="bg-[#bd2d2d] hover:bg-[#ae2828] text-white px-4 py-2 rounded-md text-sm"
                onClick={locator.getApprovals}
              >
                View Approvals
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-[#c1e7ce] rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bx-check-circle text-[#4BA66A] bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">COMPLETED PROJECTS</h3>
              <p className="text-gray-600 mb-4">View all completed projects</p>
              <button className="bg-[#4BA66A] hover:bg-[#35754a] text-white px-4 py-2 rounded-md text-sm"
                onClick={locator.getCompleted_projects}
              >
                View Completed
              </button>
            </div>
            
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Recent Projects</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project, index) => {
                    if(index < 6){
                    return(
                    <tr key={project.projectId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{project.jobDetails}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${project.projectStatus === 'Completed' ? 'bg-green-100 text-green-800' : 
                            project.projectStatus === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {project.projectStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <ProgressBar
                                completed={getProgress(project.projectStatus)}
                                bgColor="#4E49F2"
                                baseBgColor="#e5e7eb"
                                height="15px"
                                labelAlignment="center"
                              />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={locator.getProject_status}
                        >
                          <i className="fas fa-eye"></i> View
                        </button>
                      </td>
                    </tr>
                  )}})}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashBoard
