import React from 'react';
import { Link } from 'react-router-dom';

function ServerError() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="rounded-xl p-8 max-w-md w-full text-center">

        <div className="text-red-600 mb-4">
          <i className="bx bx-server text-8xl"></i>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">500 - Server Error</h1>
        <p className="text-gray-600 mb-6">
           Something went wrong on our end.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <i className="bx bx-home"></i>
            Go Home
          </Link>
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <i className="bx bx-refresh"></i>
            Refresh
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? <br/>
            Contact support: <span className="text-blue-500">support@prs.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServerError;
