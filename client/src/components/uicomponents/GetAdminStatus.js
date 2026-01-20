import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { dateFormat, formatCash, getProgress, getStageName } from "../../utils/globalutils";

const API = process.env.REACT_APP_API;

function GetAdminStatus() {
  const [statuses, setStatuses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function LoadAdminStatus() {
    try {
      const res = await fetch(`${API}/getAdminProjectStatus`);
      const data = await res.json();

      if (!res.ok) {
        setMessage(typeof data === "string" ? data : data.message);
        return;
      }

      const list = Array.isArray(data.priviledgesStatuses)
        ? data.priviledgesStatuses
        : [];

      if (list.length === 0) {
        setMessage("No active projects to view");
      } else {
        setStatuses(list);
      }
    } catch (err) {
      console.error(err);
      setMessage("Network Error fetching admin statuses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    LoadAdminStatus();
  }, []);

  if (loading)
    return <p className="text-gray-500 text-center mt-4">Loading...</p>;

  if (message && statuses.length === 0)
    return <p className="text-red-500 text-center mt-4">{message}</p>;

  return (
    <div className="px-4 sm:px-6 py-8 bg-gray-50 max-w-full md:ml-64">
      {statuses.map((item) => (
        <div
          key={item.jobCardNo}
          className="
            bg-white my-6 rounded-xl shadow-md p-5 sm:p-6
            flex flex-col md:flex-row md:justify-between md:items-start
          "
        >
          {/* LEFT SIDE */}
          <div className="flex-1 md:pr-8">
            <h2 className="text-lg font-semibold text-gray-800">
              {item.jobDetails}
            </h2>
            <p className="text-sm text-gray-500">
              Client: {item.clientContactName}
            </p>
            <p className="text-sm text-gray-500">
              Job Card: <span className="font-medium">{item.jobCardNo}</span>
            </p>
            <p className="text-sm text-gray-500">Prepared by: {item.preparedBy}</p>
            <p className="text-sm text-gray-500">
              Due: {dateFormat(item.deliveryDate)}
            </p>

            {/* Progress Bar */}
            <div className="mt-6 w-full">
              <p className="text-sm font-medium text-gray-700 mb-1">Progress</p>
              <ProgressBar
                completed={getProgress(item.status)}
                bgColor="#6366F1"
                height="20px"
                width="100%"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="
            flex flex-col mt-4 md:mt-0
            items-center md:items-end text-center md:text-right
          ">
            <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full mb-2">
              {getStageName(item.status)}
            </span>

            <p className="text-gray-800 font-semibold">
              MWK: {formatCash(Math.floor(item.totalCharge))}
            </p>

            <p className="text-sm text-gray-500">
              Department: {item.departmentName}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetAdminStatus;
