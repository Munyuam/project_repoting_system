import React, { useEffect, useState } from "react";

  const API = process.env.REACT_APP_API;


function ViewInsights({ departmentName, onClose }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`${API}/getProjectStatus?department=${departmentName}`);
        const data = await res.json();

        if (data.success) {
          setProject(data.project);
        }
      } catch (e) {
        console.error("Error fetching project insights:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [departmentName]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
        <p className="text-gray-600 text-sm">Loading insights...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
        <p className="text-red-500 text-sm">Project details not found</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      
      <div className="relative bg-white w-full sm:w-3/4 lg:w-1/2 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 transition"
        >
          <i className="bx bx-x text-4xl text-gray-700"></i>
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Project Insights</h2>
        </div>

        <div className="mb-5">
          <h3 className="text-2xl font-bold text-gray-800">{project.projectName}</h3>
          <p className="text-gray-500 text-sm">{project.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <span className={`px-3 py-1 rounded-full text-xs font-medium 
              ${project.status === "completed" ? "bg-green-200 text-green-800" : ""}
              ${project.status === "approved" ? "bg-blue-200 text-blue-800" : ""}
              ${project.status === "inprogress" ? "bg-yellow-200 text-yellow-800" : ""}
            `}>
              {project.status}
            </span>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Progress</p>
            <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <p className="text-right text-xs mt-1 text-gray-600">{project.progress}%</p>
          </div>

        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <i className="bx bx-flag-checkered"></i> Milestones
          </h4>

          {project.milestones && project.milestones.length > 0 ? (
            <ul className="space-y-2">
              {project.milestones.map((m, i) => (
                <li
                  key={i}
                  className="p-3 bg-gray-50 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <span>{m.name}</span>
                  <span className="text-sm text-gray-500">
                    {m.completed ? "✔ Done" : "⏳ Pending"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No milestones available.</p>
          )}
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <i className="bx bx-group"></i> Team Members
          </h4>

          <div className="flex flex-wrap gap-3">
            {project.team?.map((t, i) => (
              <div
                key={i}
                className="px-3 py-2 border rounded-lg text-sm text-gray-700 bg-white shadow-sm"
              >
                {t.fullname}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <i className="bx bx-line-chart"></i> Timeline Overview
          </h4>

          <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">📅 Timeline visualization</p>
            <div className="h-24 w-full bg-white rounded-lg mt-2 flex items-center justify-center text-gray-400">
              (Chart / pictorial timeline here)
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewInsights;
