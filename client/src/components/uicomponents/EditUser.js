import React, { useState } from "react";
import { Notyf } from "notyf";
import { X } from "lucide-react"; 

function EditUser({ user, onClose, onUpdate }) {
  
  const [formData, setFormData] = useState({
    username: user.username || "",
    fullName: user.fullName || "",
    email: user.email || "",
    departmentName: user.departmentName || "Administration",
    userId: user.userID,
    status: user.status || "active",
  }); 
  
  const notyf = new Notyf();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    console.log("formData is: =>",formData);
    try {
      const response = await fetch('/updateProfile', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        notyf.success("Profile updated successfully");
        onUpdate();
        onClose();
      } else {
        notyf.error(data.message || "Error updating profile");
      }
    } catch (err) {
      notyf.error("Network error");
      console.error(err);
    }
  };

  const resetPassword = async() => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset password to default username?"
    );

    const username = user.username;
    const userID = user.userID

    console.log("USer id is ", userID);

    if (confirmReset && username && userID) {
       
        const updatePassword = await fetch('/resetPassword', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: userID,
                defaultPassword: username
            })
        })

        if(updatePassword.ok){
            const response = await updatePassword.json()
            if(response.success){
                notyf.success(response.message);
            }else{
                notyf.error(response.error)
            }
        }else{
            console.log("Failed to reset Password")
            notyf.error("Failed to reset Password")
        }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[404px] p-6 relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Edit User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Department
            </label>
            <select
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value= "Administration">Administration</option>
              <option value= "Management">Management</option>
              <option value= "Studio">Studio</option>
              <option value= "Workshop">Workshop</option>
              <option value= "Warehouse">Warehouse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            onClick={resetPassword}
            className="bg-red-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-red-700 mt-4"
          >
            Reset Password
          </button>
        </div>

        <button
          onClick={handleUpdate}
          className="mt-6 w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-all"
        >
          Update User
        </button>
      </div>
    </div>
  );
}

export default EditUser;
