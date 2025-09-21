import React, { useEffect, useState } from "react";
import { getProgress, newproject, dateFormat } from "../../utils/globalutils";
import { Notyf } from "notyf";

function GetPending() {
  const [pendings, setPendings] = useState([]);
  const notf = new Notyf();

  const loadPendings = async () => {
    try {
      const response = await fetch("/getProjects", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data)) {
          const pendingProjects = data.filter(
            (project) => project.projectStatus === "pending" && project.assignedTo === 2
          );
          setPendings(pendingProjects);
        }
      } else {
        console.error("Error occurred while connecting to database");
      }
    } catch (error) {
      console.error("Error while connecting to database", error);
    }
  };

  useEffect(() => {
    loadPendings();
  }, []);

  async function approveProject(proId, jobCardNo){
   try {    
        const response = await fetch('/approvProject',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(
              {
                projectId: proId,
                jobCard: jobCardNo 
              }
            )
        })

        if(response.ok){
          const approved = await response.json();

          notf.success(approved.message);
          
          setTimeout(()=>{
            window.location.reload()
          }, 1500)

        }else{
          notf.error("Error Getting the approved projects")
        }
    } catch (error) {
          notf.error(`Network Error: ${error}`)
    }
  }

  async function rejectProject(proId, jobCardNo){
    try {    
        const response = await fetch('/rejectProject',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(
              {
                projectId: proId,
                jobCard: jobCardNo 
              }
            )
        })

        if(response.ok){
          const rejected = await response.json();
          notf.success(rejected.message);
          
          setTimeout(()=>{
            window.location.reload()
          }, 1500)

        }else{
          notf.error("Error Getting the rejected projects")
        }
    } catch (error) {
          notf.error(`Network Error: ${error}`)
    }
  }

  return (
    <div className="bg-gray-50 w-[80%] mx-64 px-6 py-8">
      <h1 className="text-4xl font-bold mb-6">Pending Approvals</h1>
      {pendings.length > 0 ? (
        <div className="space-y-6">
          {pendings.map((item) => (
            <div
              key={item.projectID}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{item.jobDetails}</h2>
                <p className="text-sm text-gray-700"><span className="font-medium">Client:</span> {item.clientContactName}</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Job Card:</span> {item.jobCardNo}</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Prepared by:</span> {item.preparedBy}</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Submitted:</span> {dateFormat(item.currentDate)}</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Quantity:</span> {item.qty}</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Size:</span> {item.overallSize}</p>

                <div className="mt-3">
                  <p className="font-medium">Job Description:</p>
                  <p className="bg-gray-50 rounded-md px-3 py-2 text-sm text-gray-600">{item.jobDescription}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <div>
                  <p className="font-bold text-lg">MWK {Math.floor(item.totalCharge)}</p>
                  <p className="text-sm text-gray-500">Delivery: {dateFormat(item.deliveryDate)}</p>
                </div>

                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                  {getProgress(item.projectStatus)}% Complete
                </span>

                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={()=> rejectProject(item.projectID, item.jobCardNo)}
                  >
                    Reject
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    onClick={ ()=> approveProject(item.projectID, item.jobCardNo) }
                  >
                    Approve Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16">
          <div className="w-12 h-12 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" />
            </svg>
          </div>
          <p className="text-gray-500 mb-4">Great! No pendings available for your department</p>
          <button
            className="px-6 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 transition"
            onClick={newproject}
          >
            Jump into a new Project
          </button>
        </div>
      )}
    </div>
  );
}

export default GetPending;
