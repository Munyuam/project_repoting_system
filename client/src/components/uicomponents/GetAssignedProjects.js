import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { Notyf } from "notyf";
import { dateFormat, getProgress, getStageName, viewStatus, newproject, session } from "../../utils/globalutils";

const API = process.env.REACT_APP_API;

function GetAssignedProjects() {
  const notf = new Notyf();

  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const LoadAssignedProjects = async () => {
    try {
      const response = await fetch(`${API}/getProjects`, { method: "GET" });

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data)) {
          const activeProjects = data.filter((item) => item.projectStatus !== "Notasks");
          setProjects(activeProjects);
          setMessage(null);
        } else if (typeof data === "object" && data !== null && "message" in data) {
          setMessage(data.message); 
          setProjects([]);
        }
      } else {
        notf.error("Failed to load assigned projects");
      }
    } catch (error) {
      notf.error(`Network error: ${error.message}`);
      console.error("Network error loading assigned projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    LoadAssignedProjects();

    async function fetchSession() {
      const sess = await session();
      setUser(sess);
    }

    fetchSession();
  }, []);

  if (!user) {
    return (
      <div className="px-4 sm:px-6 py-8 bg-gray-50 w-full md:ml-64">
        <p className="text-gray-500 text-center">Loading user...</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-8 bg-gray-50 w-full md:ml-64">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Assigned Projects</h1>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mb-4">
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium w-full sm:w-auto"
          onClick={() => viewStatus(user?.departmentName)}
        >
          View Status
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading assigned projects...</p>
      ) : projects.length > 0 ? (
        /* Table Container */
        <div className="overflow-x-auto shadow-md rounded-md">
          <table className="table-auto w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-100 font-thin text-sm sm:text-base">
                <th className="px-4 py-2 text-gray-600">JOB DETAILS</th>
                <th className="px-4 py-2 text-gray-600">CLIENT</th>
                <th className="px-4 py-2 text-gray-600">STATUS</th>
                <th className="px-4 py-2 text-gray-600">PROGRESS</th>
                <th className="px-4 py-2 text-gray-600">TOTAL (MWK)</th>
                <th className="px-4 py-2 text-gray-600">DEPARTMENT</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {projects.map((item, index) => (
                <tr
                  key={index}
                  className="text-sm sm:text-[15px] border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-2">{item.jobDetails}</td>
                  <td className="px-4 py-2">{item.clientContactName}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {getStageName(item.projectStatus)}
                    </span>
                  </td>
                  <td className="px-4 py-2 min-w-[150px]">
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
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {item.departmentName}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* No Data Card */
        <div className="flex flex-col items-center justify-center mt-16 text-center px-4">
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
            {message ? message : "No projects available for your department"}
          </p>
          <button
            className="px-6 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition w-full sm:w-auto"
            onClick={newproject}
          >
            Create First Project
          </button>
        </div>
      )}
    </div>
  );
}

export default GetAssignedProjects;
