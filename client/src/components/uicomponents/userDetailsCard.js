import React, { useEffect, useState } from "react";
import { session } from "../../utils/globalutils";
import { Notyf } from "notyf";
const nofy = new Notyf();

const API = process.env.REACT_APP_API;


const UserDetailsCard = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    status: "",
    departmentName: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchUser() {
    setLoading(true);
    
    try {
      const sess = await session();
      setUser(sess);
      setFormData({
        username: sess.username || "",
        email: sess.email || "",
        userId: sess.userId || "",
        status: sess.status || "",
        departmentName: sess.departmentName || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API}/updateProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
        nofy.success('Profile updated. Re-login required to see changes');
        await fetchUser();
      } else {
        setMessage(result.error || "Failed to update profile.");
        nofy.error('Failed to update profile')
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Try again later.");
      nofy.error('Network error. Try again later.')
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white shadow-xl rounded-2xl w-96 p-6 flex justify-center items-center">
          <div className="loader border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div className="bg-white shadow-xl rounded-2xl w-96 p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg text-gray-800">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        <div className="space-y-4">
            <div>
            <input
              type="text"
              name="username"
              value={formData.userId}
              readOnly
              hidden
              className="mt-1 w-full bg-gray-100 border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-full bg-gray-100 border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full bg-gray-100 border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

            <div>
            {/* <label className="text-sm font-medium text-gray-700">status</label> */}
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              hidden
              className="mt-1 w-full bg-gray-100 border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {message && (
            <p className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <div>
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 rounded-md px-4 py-2 text-white w-full flex justify-center items-center"
            >
              {saving ? (
                <span className="loader border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
