import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AdminDashBoard from '../components/AdminDashBoard';
import 'notyf/notyf.min.css';
const API = process.env.REACT_APP_API;


function Administration() { 
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {  
    try {
      const response = await fetch(`${API}/Admin`, {
        method: 'GET',
        credentials: 'include' 
      });

      const result = await response.json();

      if (response.ok) {  
        if(result.sessionData && result.sessionData.userid && result.sessionData.department_name === 'Administration'){
          let _u = result.sessionData.username
          setUser(_u);
          setError(null);
        } else {
          setError({
            status: response.status,
            error: "You don't have administrator privileges"
          });
        }
      } else {
        setError({
          status: response.status,
          error: result.error || "Access denied"
        });
      }

    } catch (error) {
      console.error("Fetch error:", error.message);
      setError({
        status: 500,
        error: "Network error. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
          | {error?.error || "Unauthorized access, You might not have Administrial Priviledges"}
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
      <div className="flex-1">
        <Sidebar />
        <Navbar />
          <div className="w-full p-4 sm:p-6 md:p-8 md:ml-60">
            <h1 className="text-4xl uppercase sm:text-3xl md:text-4xl text-gray-900 mb-4">
              <span className='font-bold'>HELLO!</span>  Welcome {user}
            </h1>
          </div>
        <AdminDashBoard />
      </div>
    </div>
  );
}

export default Administration;