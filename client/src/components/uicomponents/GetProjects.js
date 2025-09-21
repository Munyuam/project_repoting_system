import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import {getProgress, newproject, getStageName, viewStatus} from "../../utils/globalutils";

function GetProjects() {
  const [projects, setProjects] = useState([]);

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


        const activeprojects = data.filter((item) => {
            if(item.assignedTo !== -1 && item.taskName !== null){
              return item;
            }
        })
        setProjects(activeprojects)
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

  return (
    <div className="bg-gray-50 w-[80%] mx-64 px-6 py-8">
      <h1 className="text-4xl font-bold mb-6">Project List</h1>
      <div className="flex justify-end gap-3 mb-4">
        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium"
          onClick={viewStatus}
        >
          View Status
        </button>
        <button
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium"
          onClick={newproject}
        >
          Add Project
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-md">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 font-thin">
                <th className="px-4 py-2 text-gray-600">JOB DETAILS</th>
                <th className="px-4 py-2 text-gray-600">CLIENT</th>
                <th className="px-4 py-2 text-gray-600">STATUS</th>
                <th className="px-4 py-2 text-gray-600">PROGRESS</th>
                <th className="px-4 py-2 text-gray-600">TOTAL (MWK)</th>
                <th className="px-4 py-2 text-gray-600">DEPARTMENT</th>
              </tr>
            </thead>
            <tbody className="bg-white rounded-md">
              {projects.map((item, index) => (
                <tr key={index} className="text-[17px] border border-b-2 border-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <td className="px-4 py-2">{item.jobDetails}</td>
                  <td className="px-4 py-2">{item.clientContactName}</td>
                  <td className="px-4 py-2">
                     <span 
                        className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"    
                      >{getStageName(item.projectStatus)}</span>
                    </td>
                  <td className="px-4">
                    <ProgressBar
                      completed={getProgress(item.projectStatus)}
                      bgColor="#56A672"
                      baseBgColor="#e5e7eb"
                      height="15px"
                      labelAlignment="center"
                    />
                  </td>
                  <td className="px-4 py-2">{Math.floor(item.totalCharge)}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">{item.departmentName}</span>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16">
          <div className="w-12 h-12 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <p className="text-gray-500 mb-4">
            No projects available for your department
          </p>
          <button
            className="px-6 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 transition"
            onClick={newproject}
          >
            Create First Project
          </button>
        </div>
      )}
    </div>
  );
}

export default GetProjects;
