import React from 'react';

function Navbar() {
  return (
    <div className="bg-white sticky top-0 z-50 border-b px-4 sm:px-8 py-4">
      <div className="flex justify-end items-center space-x-2 sm:space-x-4">
        <button
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          title="Profile"
        >
          <i className="bx bx-user bx-sm"></i>
        </button>
        <button
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          title="Notification"
        >
          <i className="bx bx-bell bx-sm"></i>
        </button>
        <button
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          title="Settings"
        >
          <i className="bx bx-cog bx-sm"></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
