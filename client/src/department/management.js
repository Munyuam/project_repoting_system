import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ManagerDashBoard from "../components/ManagerDashboard";
const API = process.env.REACT_APP_API;



function Management() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {

    try {
      const response = await fetch(`${API}/Management`, { method: "GET" });

      if (response.ok) {
        const result = await response.json();

        if (
          result.sessionData &&
          result.sessionData.userid &&
          result.sessionData.department_name === "Management"
        ) {
          setUser(result.sessionData.username);
          setError(null);
        } else {
          setError({
            status: response.status,
            message: "You don't have Managerial Privileges",
          });
        }
      } else {
        setError({
          status: response.status,
          message: "Access denied, you might not have Manaferial Priviledges",
        });
      }
    } catch (err) {
      setError({
        status: 500,
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex items-center space-x-2 text-blue-600">
          <i className="bx bx-loader-alt animate-spin text-3xl"></i>
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          <span className="text-xl font-semibold text-red-900">
            {error?.status || 401}
          </span>{" "}
          | {error?.error || "Unauthorized access, you might not have Managerial Priviledges"}
        </p>
        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-4 py-2 bg-gray-100 text-black rounded hover:bg-gray-200 transition"
          >
            Go to Login
          </button>  
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
          <div className="w-full p-4 sm:p-6 md:p-8 md:ml-60">
            <h1 className="text-4xl uppercase sm:text-3xl md:text-4xl text-gray-900 mb-4">
              <span className='font-bold'>HELLO!</span>  Welcome {user}
            </h1>
          </div>
        <ManagerDashBoard />      
        </div>
    </div>
    
  );
}

export default Management;
