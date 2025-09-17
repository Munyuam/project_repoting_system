import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [deptOpen, setDeptOpen] = useState(false);

  const departments = [
    {name: 'Administration', url: '/department/Administration'},
    {name: 'Management', url: '/department/Management'},
    {name: 'Department', url: '/component/Department'},
    {name: 'Studio', url: '/department/Studio'},
    {name: 'Warehouse', url: '/department/Warehouse'},
    {name: 'Workshop', url: '/department/Workshop'}
  ];

  return (
    <div className='w-64 bg-gray-900 text-white flex flex-col h-screen fixed'>
      <div className='p-6'>
        <div className='flex space-x-3 flex-row'>
          <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-lg'>R</span>
          </div>
          
          <div className='flex flex-col'>
            <h2 className='font-bold text-white text-xl'>PROJECT</h2>
            <h2 className='text-sm text-gray-300'>REPORT</h2>
          </div>
        </div>
      </div>

      <nav className='flex-1 px-4 py-6 space-y-2'>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`
          }
        >
          <i className='bx bx-home text-2xl'></i>
          <span>HOME</span>
        </NavLink>

        <NavLink 
          to="/p/project-status" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`
          }
        >
          <i className='bx bx-task text-2xl'></i>
          <span>STATUS</span>
        </NavLink>

        <NavLink 
          to="/p/completed-projects" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`
          }
        >
          <i className='bx bx-check-circle text-2xl'></i>
          <span>COMPLETED TASKS</span>
        </NavLink>

        <div className='relative'>
          <button
            onClick={() => setDeptOpen(!deptOpen)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
              window.location.pathname.includes('/department') 
                ? 'bg-gradient-to-br from-green-500 to-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <div className='flex items-center space-x-3'>
              <i className='bx bx-building text-2xl'></i>
              <span>DEPARTMENTS</span>
            </div>
            <i className={`bx bx-chevron-${deptOpen ? 'up' : 'down'} text-xl`}></i>
          </button>

          {deptOpen && (
            <div className='ml-8 mt-1 space-y-1'>
              {departments.map((dept) => (
                <NavLink
                  key={dept.url}
                  to={dept.url}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm rounded-lg transition-colors ${
                      isActive ? 'bg-[#3D5A73] text-white' : 'text-gray-300 hover:bg-gray-700'
                    }`
                  }
                >
                  {dept.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className='p-1 bg-red-500 m-3 rounded-lg'>
        <button className='flex items-center space-x-3 w-full px-4 py-3 text-white hover:bg-red-600 rounded-lg transition-colors'
        
        onClick={(()=>{window.location.href = '/login'})}>
          <i className='bx bx-log-out text-xl'></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;