import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { Notyf } from "notyf";
import { dateFormat, formatCash, getProgress, getStageName, session } from "../../utils/globalutils";

const API = process.env.REACT_APP_API;


function GetProjectStatus() {
  const [statuses, setStatuses] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null); 
  const notf = new Notyf();

  const LoadProjectStatus = async () => {
    try {
      let query = window.location.search;
      const response = await fetch(`${API}/getProjectStatus${query}`);

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data)) {
          const activeprojects = data.filter(item => item.status !== "dropped");

          if (activeprojects.length === 0) {
            setStatuses([]);
            setMessage("No active projects at the moment.");
          } else {
            setStatuses(activeprojects);
            setMessage(null);
          }
        } else {
          setStatuses([]);
          setMessage(data || "No active projects available.");
        }
      } else {
        notf.error("Failed to load project status");
      }
    } catch (error) {
      notf.error(`Network error: ${error.message}`);
      console.error("Network error loading statuses:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status, jobcardno, assignedto) => {
    setButtonLoading(jobcardno);

    const statusdata = { status, jobcardno, assignedTo: assignedto };

    try {
      const response = await fetch(`${API}/updatestatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statusdata),
      });

      if (response.ok) {
        const updatedstatus = await response.json();
        if (updatedstatus.success) {
          notf.success(`${status} was successful`);
          setStatuses([]);
          setLoading(true);
          setTimeout(() => LoadProjectStatus(), 200);
        } else {
          notf.error(`An error occurred during ${status}`);
        }
      }
    } catch (error) {
      notf.error(`Network error: ${error.message}`);
      console.error("Network error updating status:", error);
    } finally {
      setButtonLoading(null);
    }
  };

  const renderActionButton = (item) => {
    if (!user) return null;

    const userDept = user.departmentName?.toLowerCase();
    const projectDept = item.departmentName?.toLowerCase();
    const canAct = userDept === projectDept;

    const isLoading = buttonLoading === item.jobCardNo;
    const Spinner = <span className="loader border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>;

    if (!canAct) return <span className="text-gray-400 italic text-sm">Not authorized</span>;

    if (projectDept === "studio") {
      return item.status === "startdesign" && item.status !== "completedesign" ? (
        <button
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white m-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 w-full sm:w-auto"
          onClick={() => updateStatus("completedesign", item.jobCardNo, 4)}
        >
          {isLoading ? Spinner : "Complete Design"}
        </button>
      ) : (
        <button
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white m-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 w-full sm:w-auto"
          onClick={() => updateStatus("startdesign", item.jobCardNo, 3)}
        >
          {isLoading ? Spinner : "Start Design"}
        </button>
      );
    }

    if (projectDept === "workshop") {
      return item.status === "startproduction" && item.status !== "completeproduction" ? (
        <button
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white m-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 w-full sm:w-auto"
          onClick={() => updateStatus("completeproduction", item.jobCardNo, 5)}
        >
          {isLoading ? Spinner : "Complete Production"}
        </button>
      ) : (
        <button
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white m-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 w-full sm:w-auto"
          onClick={() => updateStatus("startproduction", item.jobCardNo, 4)}
        >
          {isLoading ? Spinner : "Start Production"}
        </button>
      );
    }

    if (projectDept === "warehouse") {
      return item.status === "completeproduction" ? (
        <button
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white m-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 w-full sm:w-auto"
          onClick={() => updateStatus("completed", item.jobCardNo, 100)}
        >
          {isLoading ? Spinner : "Deliver to Client"}
        </button>
      ) : <span></span>;
    }

    return <span className="text-gray-400 italic text-sm">Not assigned</span>;
  };

  useEffect(() => {
    async function loadUser() {
      const sess = await session();
      setUser(sess);
    }

    loadUser();
    LoadProjectStatus();
  }, []);

  return (
    <div className="px-4 sm:px-6 py-8 bg-gray-50 w-full lg:ml-64 lg:max-w-[calc(100%-16rem)]">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Project Status</h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading project statuses...</p>
      ) : statuses.length > 0 ? (
        <div className="space-y-6">
          {statuses.map((item) => (
            <div
              key={item.jobCardNo}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:justify-between md:items-start gap-4"
            >
              <div className="flex-1 md:pr-4">
                <h2 className="text-lg font-semibold">{item.jobDetails}</h2>
                <p className="text-sm text-gray-500">Client: {item.clientContactName}</p>
                <p className="text-sm text-gray-500">
                  Job Card: <span className="font-medium">{item.jobCardNo}</span>
                </p>
                <p className="text-sm text-gray-500">Prepared by: {item.preparedBy}</p>
                <p className="text-sm text-gray-500">Due: {dateFormat(item.deliveryDate)}</p>

                <div className="mt-4 w-full">
                  <p className="text-sm font-medium text-gray-700 mb-1">Progress</p>
                  <ProgressBar
                    completed={getProgress(item.status)}
                    bgColor="#6366F1"
                    height="20px"
                    width="100%"
                    className="w-full"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {renderActionButton(item)}
                </div>
              </div>

              <div className="flex flex-col items-end mt-4 md:mt-0">
                <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full mb-2">
                  {getStageName(item.status)}
                </span>
                <p className="text-gray-800 font-semibold">
                  MWK: {formatCash(Math.floor(item.totalCharge))}
                </p>
                <p className="text-sm text-gray-500">Current: {item.departmentName}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 text-center">
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
          <p className="text-gray-500 mb-4">{message || "No active projects available"}</p>
        </div>
      )}
    </div>
  );
}

export default GetProjectStatus;
