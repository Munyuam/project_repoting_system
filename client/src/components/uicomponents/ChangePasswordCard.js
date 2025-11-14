import React, { useState } from "react";

const ChangePasswordCard = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword === oldPassword) {
      setError("New password must be different from old password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch("/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if(response.ok){
        const data = await response.json();
  
        if (data.success) {
          setSuccess("Password changed successfully!");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          setError(data.message || "Failed to change password.");
        }
      }

    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div className="bg-white shadow-xl rounded-2xl w-96 p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg text-gray-800">Change Password</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        <div className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <div>
            <label className="text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              placeholder="Enter old password"
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-md p-2 text-gray-900 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              placeholder="Enter your new password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-md p-2 text-gray-900 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm the new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-md p-2 text-gray-900 bg-gray-100"
            />
          </div>
        </div>

        <button
          className="mt-6 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleSave}
        >
          Save Password
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordCard;
