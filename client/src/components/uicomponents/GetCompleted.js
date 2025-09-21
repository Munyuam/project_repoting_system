import React, { useEffect, useState } from 'react'
import { dateFormat, getProgress, getStageName, newproject } from "../../utils/globalutils";
import ProgressBar from "@ramonak/react-progress-bar";
import { Notyf } from "notyf";

function GetCompleted() {
  const notf = new Notyf();
  const [completed, setcompleted] = useState([]);

  const LoadProjectStatus = async () => {
    try {
      const response = await fetch('/getProjects', { method: 'GET' });

      if (response.ok) {
        const data = await response.json();

        const completedProjects = Array.isArray(data)
          ? data.filter(item => item.projectStatus?.toLowerCase() === 'completed')
          : [];

        setcompleted(completedProjects);
      } else {
        notf.error(`Something broke while loading your completed: ${response.status} ${response.statusText}`);
        console.error(`Something broke while loading your completed: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      notf.error(`Network error: ${error.message}`);
    }
  };

  useEffect(() => {
    LoadProjectStatus();
  }, []);

  console.log(completed);

  return (
    <div className="px-6 py-8 bg-gray-50 max-w-[100%] ml-64">
      <h1 className="text-2xl font-bold mb-6">Completed Projects</h1>
      {completed.length > 0 ? (
        completed.map((item, index) => (
          <div key={index} className="bg-white my-6 rounded-xl shadow-md p-6 flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="flex-1 md:pr-8">
              <h2 className="text-lg font-semibold">{item.jobDetails}</h2>
              <p className="text-sm text-gray-500">Client: {item.clientName}</p>
              <p className="text-sm text-gray-500">
                Job Card: <span className="font-medium">{item.jobCardNo}</span>
              </p>
              <p className="text-sm text-gray-500">Prepared by: {item.preparedBy}</p>
              <p className="text-sm text-gray-500">Due: {dateFormat(item.deiveryDate)}</p>

              <div className="mt-6 w-full">
                <p className="text-sm font-medium text-gray-700 mb-1">Progress</p>
                <ProgressBar
                  completed={getProgress(item.projectStatus)}
                  bgColor="#5FBF50"
                  height="20px"
                  width="100%"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col items-end mt-4 md:mt-0">
              <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full mb-2">
                {getStageName(item.projectStatus)}
              </span>
              <p className="text-gray-800 font-semibold">MWK: {Math.floor(item.totalCharge)}</p>
            </div>
          </div>
        ))
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
            No completed projects available
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

export default GetCompleted;
