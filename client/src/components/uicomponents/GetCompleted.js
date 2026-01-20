import React, { useEffect, useState, useMemo } from 'react';
import {
  dateFormat,
  formatCash,
  getProgress,
  getStageName,
  newproject,
} from "../../utils/globalutils";
import ProgressBar from "@ramonak/react-progress-bar";
import { Notyf } from "notyf";

function GetCompleted() {
  const notyf = new Notyf();
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
    
  const API = process.env.REACT_APP_API;

  const LoadProjectStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/getCompleted`, { method: 'GET' });
      if (response.ok) {
        const completedProjects = await response.json();
        setCompleted(completedProjects);
      } else {
        notyf.error(`Failed to load completed projects: ${response.status}`);
      }
    } catch (error) {
      notyf.error(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    LoadProjectStatus();
  }, []);

  const filteredProjects = useMemo(() => {
    if (!searchTerm) return completed;
    const lowerSearch = searchTerm.toLowerCase();
    return completed.filter(project =>
      project.jobDetails?.toLowerCase().includes(lowerSearch) ||
      project.clientContactName?.toLowerCase().includes(lowerSearch) ||
      project.jobCardNo?.toLowerCase().includes(lowerSearch)
    );
  }, [completed, searchTerm]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Completed Projects</h1>
            <div className="mt-4 sm:mt-0 relative">
              <input
                type="text"
                placeholder="Search by job, client, or job card..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No projects found" : "No completed projects yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? "Try adjusting your search term." : "When projects are completed, they'll appear here."}
              </p>
              {!searchTerm && (
                <button onClick={newproject} className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition">
                  Create Your First Project
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProjects.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {item.jobDetails}
                        </h2>
                        <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full whitespace-nowrap ml-2">
                          {getStageName(item.projectStatus)}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Client:</span> {item.clientContactName}</p>
                        <p><span className="font-medium">Job Card:</span> {item.jobCardNo}</p>
                        <p><span className="font-medium">Prepared by:</span> {item.preparedBy}</p>
                        <p><span className="font-medium">Due:</span> {dateFormat(item.deliveryDate)}</p>
                      </div>
                      <div className="mt-5">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">Progress</span>
                          <span>{getProgress(item.projectStatus)}%</span>
                        </div>
                        <ProgressBar
                          completed={getProgress(item.projectStatus)}
                          bgColor="#10b981"
                          height="10px"
                          borderRadius="6px"
                          isLabelVisible={false}
                        />
                      </div>
                      <div className="mt-5 pt-4 border-t border-gray-200">
                        <p className="text-right text-lg font-bold text-gray-900">
                          MWK {formatCash(Math.floor(item.totalCharge))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    Previous
                  </button>
                  <div className="flex space-x-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 rounded-lg transition ${
                          currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetCompleted;