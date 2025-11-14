import React from "react";
import { locator } from "../../utils/globalutils";

function SettingsCard({ onClose, onLogout }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-start justify-end p-4">
      <div className="bg-white w-80 sm:w-96 h-auto my-6 mr-6 rounded-2xl shadow-xl overflow-hidden">
        
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        <div className="px-6 py-4 space-y-5 text-sm text-gray-700">
          {/* <button className="w-full text-left hover:text-gray-900">General Settings</button>
          <button className="w-full text-left hover:text-gray-900">Account Settings</button>
          <button className="w-full text-left hover:text-gray-900">Privacy & Security</button>
          <button className="w-full text-left hover:text-gray-900">Notification Preferences</button> */}
          <p className="text-left hover:text-gray-500 text-md">
             This function is under development...
          </p>
        </div>

        <div className="border-t my-2"></div>

        <div className="px-6 pb-5">
          <button 
            onClick={locator.logout}
            className="text-red-500 flex items-center space-x-2 hover:text-red-600"
          >
            <i className="bx bx-log-out text-xl"></i>
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default SettingsCard;
