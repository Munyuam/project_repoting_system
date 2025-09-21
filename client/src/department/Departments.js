import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { locator } from '../utils/globalutils'

function Departments() {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    try {
      const response = await fetch("/getProjects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        const activeprojects = data.filter((item) => {
          return item.assignedTo !== -1 && item.taskName !== null;
        });

        setProjects(activeprojects);
        console.log(activeprojects);
      } else {
        console.log("Error occurred while connecting to database");
      }
    } catch (error) {
      console.log("Error while connecting to database", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const getProjectCount = (deptId) => {
    return projects.filter((p) => p.assignedTo === deptId).length;
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="ml-64 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Departments</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            onClick={locator.getProjects}
          >
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Management</h3>
                <p className="text-gray-600 text-sm">Management and administrative tasks</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="bx bx-shield text-green-600 bx-md"></i>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Active Projects:{" "}
              <span className="font-semibold">{getProjectCount(2)}</span>
            </p>
            <a href="/department/Administration" className="text-blue-600 text-sm cursor-pointer hover:underline mt-2">
              Click to view department details
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Studio</h3>
                <p className="text-gray-600 text-sm">Creative design and development</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <i className="bx bx-briefcase-alt text-pink-600 bx-md"></i>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Active Projects:{" "}
              <span className="font-semibold">{getProjectCount(3)}</span>
            </p>
            <a href="/department/Studio" className="text-blue-600 cursor-pointer text-sm hover:underline mt-2">
              Click to view department details
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Workshop</h3>
                <p className="text-gray-600 text-sm">Production and manufacturing</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="bx bx-wrench text-orange-600 bx-md"></i>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Active Projects:{" "}
              <span className="font-semibold">{getProjectCount(4)}</span>
            </p>
            <a href="/department/Workshop" className="text-blue-600 cursor-pointer text-sm hover:underline mt-2">
              Click to view department details
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Warehouse</h3>
                <p className="text-gray-600 text-sm">Storage and inventory management</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <i className="bx bx-cube text-teal-600 bx-md"></i>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Active Projects:{" "}
              <span className="font-semibold">{getProjectCount(5)}</span>
            </p>
            <a href="/department/Warehouse" className="text-blue-600 cursor-pointer text-sm hover:underline mt-2">
              Click to view department details
            </a>
          </div>

        </div>
      </div>
    </>
  )
}

export default Departments
