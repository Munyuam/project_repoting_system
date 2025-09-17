import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-lg text-gray-700 mb-6"><span className='text-red-500 font-bold'>404</span> | Page Not Found</p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/login"
            className="px-4 py-2 bg-gray-100 text-black rounded hover:bg-gray-200 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
