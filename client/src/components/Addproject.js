import React, { useState } from 'react'
import Navbar from './Navbar'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { ClipLoader } from 'react-spinners';

const notfy = new Notyf();
  const API = process.env.REACT_APP_API;

function Addproject() {
  const generateJobCardNo = () => {
    let jobId = 'JBC';
    let _st = '123456789ABCDF';
    for (let i = 0; i < _st.length - 4; i++) {
      jobId += _st[Math.floor(Math.random() * _st.length)];
    }
    return jobId;
  };

  const getTime = () => {
    const time = new Date();
    return `${time.getHours()}:${time.getMinutes()}`;
  };

  const currentDate = () => {
    const d = new Date();
    const date = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${date}`;  
  };

  const [formData, setFormData] = useState({
    current_date: currentDate(),
    current_time: getTime(),
    job_card_no: generateJobCardNo(),
    client_contact_name: '',
    job_details: '',
    qty: '',
    overall_size: '',
    delivery_date: '',
    job_description: '',
    prepared_by: '',
    total_charge: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const formValidator = () => {
    let tempErrors = {}
    if (!formData.current_date) tempErrors.current_date = 'Date is required'
    if (!formData.current_time) tempErrors.current_time = 'Time is required'
    if (!formData.client_contact_name.trim()) tempErrors.client_contact_name = "Client's name & contacts are required"
    if (!formData.job_details.trim()) tempErrors.job_details = 'Job details are required'
    if (!formData.overall_size.trim()) tempErrors.overall_size = 'Overall Size required'
    if (!formData.qty || formData.qty <= 0) tempErrors.qty = 'Quantity must be greater than 0'
    if (!formData.delivery_date) tempErrors.delivery_date = 'Delivery date is required'
    if (!formData.job_description.trim()) tempErrors.job_description = 'Job description is required'
    if (!formData.prepared_by) tempErrors.prepared_by = 'Prepared by is required'
    if (!formData.total_charge || formData.total_charge <= 0) tempErrors.total_charge = 'Total charge must be greater than 0'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formValidator()) {
      notfy.success("Validation Passed.. Initiating process")
      setLoading(true)
      const postProject = async () => {
        try {
          const response = await fetch(`${API}/projectInit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            notfy.success("Project Initialized successfully");
            setFormData({
              current_date: currentDate(),
              current_time: getTime(),
              job_card_no: generateJobCardNo(),
              client_contact_name: '',
              job_details: '',
              qty: '',
              overall_size: '',
              delivery_date: '',
              job_description: '',
              prepared_by: '',
              total_charge: '',
            });
            setLoading(false);
          } else {
            notfy.error("Error initializing project");
            setLoading(false);
          }
        } catch (error) {
          notfy.error("Server error: " + error.message);
          setLoading(false);
        }
      };
      setTimeout(postProject, 1000); // reduced timeout for responsiveness
    } else {
      notfy.error("Validation failed")
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar hasSidebar={false} />
      <div className="flex-grow flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">NEW PROJECT</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Date, Time, Job Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date:</label>
                <input type="date" name="current_date" value={formData.current_date} onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"/>
                {errors.current_date && <p className="text-red-500 text-xs">{errors.current_date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time:</label>
                <input type="time" name="current_time" value={formData.current_time} onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"/>
                {errors.current_time && <p className="text-red-500 text-xs">{errors.current_time}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Card No:</label>
                <input type="text" name="job_card_no" value={formData.job_card_no} readOnly
                  className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-600"/>
              </div>
            </div>

            {/* Client & Job Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client's Name & Contacts *</label>
                <input type="text" name="client_contact_name" value={formData.client_contact_name} onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"/>
                {errors.client_contact_name && <p className="text-red-500 text-xs">{errors.client_contact_name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Details *</label>
                <input type="text" name="job_details" value={formData.job_details} onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"/>
                {errors.job_details && <p className="text-red-500 text-xs">{errors.job_details}</p>}
              </div>
            </div>

            {/* Quantity, Size, Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Quantity:</label>
                <input type="number" name="qty" value={formData.qty} onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"/>
                {errors.qty && <p className="text-red-500 text-xs">{errors.qty}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Overall Size:</label>
                <input type="text" name="overall_size" placeholder='e.g 2 by 2' value={formData.overall_size} onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Delivery Date:</label>
                <input type="date" name="delivery_date" value={formData.delivery_date} onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"/>
                {errors.delivery_date && <p className="text-red-500 text-xs">{errors.delivery_date}</p>}
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h3 className="text-center font-semibold mb-2">Job Costing and Drawing Information</h3>
              <p className="text-center text-sm text-gray-600 mb-2">Description of Service / Item</p>
              <textarea rows="5" name="job_description" value={formData.job_description} onChange={handleChange}
                placeholder="Enter job description, costing details, and drawing information..."
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"/>
              {errors.job_description && <p className="text-red-500 text-xs">{errors.job_description}</p>}
            </div>

            {/* Prepared By & Total Charge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prepared By:</label>
                <select name="prepared_by" value={formData.prepared_by} onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200">
                  <option value="">-- Select --</option>
                  <option value="Admin">Administrator</option>
                  <option value="Manager">Manager</option>
                </select>
                {errors.prepared_by && <p className="text-red-500 text-xs">{errors.prepared_by}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total Charged (MWK):</label>
                <input type="number" step="0.01" name="total_charge" value={formData.total_charge} onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"/>
                {errors.total_charge && <p className="text-red-500 text-xs">{errors.total_charge}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button type="button" onClick={() => window.history.go(-1)}
                className="px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition w-full sm:w-auto">
                CANCEL
              </button>
              <button type="submit" disabled={loading}
                className={`px-6 py-2 rounded text-white transition flex items-center justify-center gap-2 w-full sm:w-auto ${
                  loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
                }`}>
                {loading ? <><ClipLoader size={18} color="#fff"/> Saving...</> : "SAVE PROJECT"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addproject;
