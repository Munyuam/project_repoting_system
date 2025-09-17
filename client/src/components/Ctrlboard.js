import React from 'react'
import { useState } from 'react';

function Ctrlboard() {
    const [projects, setProjects] = useState([
    { id: 1, name: 'Summer Campaign', status: 'In Progress', progress: 65 },
    { id: 2, name: 'Product Launch', status: 'Completed', progress: 100 },
    { id: 3, name: 'Brand Redesign', status: 'Planning', progress: 20 },
  ]);
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                Add Project
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bx-folder-open text-green-600 bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">VIEW PROJECTS</h3>
              <p className="text-gray-600 mb-4">Monitor all project statuses and details</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
                View All
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <i class='bxr  bx-user bx-md text-purple-600'  ></i> 
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">USER MANAGEMENT</h3>
                <p className="text-gray-600 mb-4">Add and manage system users</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm">
                    Check Users
                </button>
            </div>

            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bx-pulse text-amber-600 bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">PROJECT STATUS</h3>
              <p className="text-gray-600 mb-4">Track progress of all projects</p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm">
                Check Status
              </button>
            </div>
    
             <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-[#fbd7d7] rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bx-circle-three-quarter-alt text-[#bd2d2d] bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">PENDING APPROVAL</h3>
              <p className="text-gray-600 mb-4">Review and approve submitted projects</p>
              <button className="bg-[#bd2d2d] hover:bg-[#ae2828] text-white px-4 py-2 rounded-md text-sm">
                View Approvals
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="w-12 h-12 bg-[#c1e7ce] rounded-lg flex items-center justify-center mb-4">
                <i className="bxr  bx-check-circle text-[#4BA66A] bx-md"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">COMPLETED PROJECTS</h3>
              <p className="text-gray-600 mb-4">View all completed projects</p>
              <button className="bg-[#4BA66A] hover:bg-[#35754a] text-white px-4 py-2 rounded-md text-sm">
                View Completed
              </button>
            </div>
            
          </div>

          {/* Project Status Table */}
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
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full 
                              ${project.progress === 100 ? 'bg-green-600' : 
                                project.progress > 50 ? 'bg-blue-600' : 'bg-yellow-500'}`} 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{project.progress}% complete</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <i className="fas fa-edit"></i> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ctrlboard
