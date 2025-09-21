import React, { useEffect, useState } from "react";
import { Notyf } from "notyf";
import { getRole } from "../../utils/globalutils";

function GetUserManagement() {
  const notyf = new Notyf();
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    role: 1, 
  });

  const registerUser = async () => {
    try {
      const response = await fetch("/registerUser", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newUser = await response.json();
        console.log(newUser);
        notyf.success("User registered successfully");
        getUsers(); 

        setFormData({
            username: "",
            fullName: "",
            email: "",
            role: 1, 
        })
        
      } else {
        notyf.error("Error registering new user");
      }
    } catch (error) {
      console.log("Network Error " + error);
      notyf.error("Network Error");
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch("/getUsers", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        notyf.error("Error getting users");
      }
    } catch (error) {
      notyf.error("Network Error: " + error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "role" ? parseInt(value, 10) : value, // role is an integer
    });
  };

  const handleClearForm = () => {
    setFormData({ username: "", fullName: "", email: "", role: 1 });
  };

  const roleColors = {
    Admin: "bg-green-100 text-green-700",
    Manager: "bg-blue-100 text-blue-700",
    Studio: "bg-purple-100 text-purple-700",
    Workshop: "bg-orange-100 text-orange-700",
    Warehouse: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="p-6 w-[80%] mx-64">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full border rounded-lg px-3 py-2"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value={1}>Admin</option>
            <option value={2}>Manager</option>
            <option value={3}>Studio</option>
            <option value={4}>Workshop</option>
            <option value={5}>Warehouse</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={registerUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Add User
          </button>
          <button
            onClick={handleClearForm}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700"
          >
            Clear Form
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3 font-medium">{user.username}</td>
                <td className="px-4 py-3">{user.fullName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      roleColors[getRole(user.departmentName)] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {getRole(user.departmentName)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">System User</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetUserManagement;
