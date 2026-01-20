import React, { useEffect, useState } from "react";
import { getProgress, newproject, dateFormat } from "../../utils/globalutils";
import { Notyf } from "notyf";

const API = process.env.REACT_APP_API;


function GetPending() {
  const [pendings, setPendings] = useState([]);
  const [loadingApprove, setLoadingApprove] = useState(null);
  const [loadingReject, setLoadingReject] = useState(null);

  const notf = new Notyf();

  const loadPendings = async () => {
    try {
      const response = await fetch(`${API}/getProjects`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data)) {
          const pendingProjects = data.filter(
            (project) =>
              project.projectStatus === "pending" &&
              project.assignedTo === 2
          );

          setPendings(pendingProjects);
        }
      } else {
        console.error("Error occurred while connecting to database");
      }
    } catch (error) {
      console.error("Error while connecting to database", error);
    }
  };

  useEffect(() => {
    loadPendings();
  }, []);

  async function approveProject(proId, jobCardNo) {
    try {
      
      setLoadingApprove(proId);

      const response = await fetch(`${API}/approvProject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: proId,
          jobCard: jobCardNo,
        }),
      });

      if (response.ok) {
        const approved = await response.json();
        notf.success(approved.message);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        notf.error("Error Getting the approved projects");
      }
    } 
    catch (error) {
      notf.error(`Network Error: ${error}`);
    } 
    finally{
      setLoadingApprove(null);
    }
  }

  async function rejectProject(proId, jobCardNo) {
    try {
      
      setLoadingReject(proId);

      const response = await fetch(`${API}/rejectProject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: proId,
          jobCard: jobCardNo,
        }),
      });

      if (response.ok) {
        const rejected = await response.json();
        notf.success(rejected.message);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        notf.error("Error Getting the rejected projects");
      }
    } catch (error) {
      notf.error(`Network Error: ${error}`);
    }finally{
      setLoadingReject(null);
    }
  }

  return (
    <div
      className="
        bg-gray-50 
        w-full 
        px-4 sm:px-6 py-8
        lg:ml-64 lg:max-w-[calc(100%-16rem)]
      "
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-6">
        Pending Approvals
      </h1>

      {pendings.length > 0 ? (
        <div className="space-y-6">
          {pendings.map((item) => (
            <div
              key={item.projectID}
              className="
                bg-white shadow-md rounded-xl p-6 
                flex flex-col md:flex-row 
                justify-between items-start 
                gap-6
              "
            >
              <div className="flex-1 break-words">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">
                  {item.jobDetails}
                </h2>

                <p className="text-sm text-gray-700">
                  <span className="font-medium">Client:</span>{" "}
                  {item.clientContactName}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-medium">Job Card:</span>{" "}
                  {item.jobCardNo}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-medium">Prepared by:</span>{" "}
                  {item.preparedBy}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-medium">Submitted:</span>{" "}
                  {dateFormat(item.currentDate)}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-medium">Quantity:</span> {item.qty}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-medium">Size:</span>{" "}
                  {item.overallSize}
                </p>

                <div className="mt-3">
                  <p className="font-medium">Job Description:</p>
                  <p
                    className="
                      bg-gray-50 rounded-md px-3 py-2 
                      text-sm text-gray-600
                    "
                  >
                    {item.jobDescription}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <div className="text-right">
                  <p className="font-bold text-lg">
                    MWK {Math.floor(item.totalCharge)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Delivery: {dateFormat(item.deliveryDate)}
                  </p>
                </div>

                <span
                  className="
                    bg-yellow-100 text-yellow-800 
                    text-xs font-medium px-2 py-1 
                    rounded-full
                  "
                >
                  {getProgress(item.projectStatus)}% Complete
                </span>

                <div
                  className="
                    flex flex-col sm:flex-row 
                    gap-3 w-full md:w-auto
                  "
                >
                  <button
                    className="
                      w-full sm:w-auto
                      px-4 py-2 
                      bg-red-500 text-white 
                      rounded-md hover:bg-red-600 
                      transition disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    disabled={loadingReject === item.projectID}
                    onClick={() => rejectProject(item.projectID, item.jobCardNo)}
                  >
                    {loadingReject === item.projectID ? "Rejecting..." : "Reject"}
                  </button>


                 <button
                  className="
                    w-full sm:w-auto
                    px-4 py-2 
                    bg-green-600 text-white 
                    rounded-md hover:bg-green-700 
                    transition disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  disabled={loadingApprove === item.projectID}
                  onClick={() => approveProject(item.projectID, item.jobCardNo)}
                >
                  {loadingApprove === item.projectID ? "Approving..." : "Approve Project"}
                </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-gray-400 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
            />
            <circle cx="12" cy="12" r="3" fill="none" />
          </svg>

          <p className="text-gray-500 mb-4">
            Great! No pendings available for your department.
          </p>

          <button
            className="
              px-6 py-2 
              rounded-md bg-green-400 text-white 
              hover:bg-green-500 transition
            "
            onClick={newproject}
          >
            Jump into a new Project
          </button>
        </div>
      )}
    </div>
  );
}

export default GetPending;
