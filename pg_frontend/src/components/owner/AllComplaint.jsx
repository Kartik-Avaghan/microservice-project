import { div, li, span } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  User,
  Clock,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Bed,
} from "lucide-react";

function AllComplaint() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/complaint/pending`, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
        Authorization: ` ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setComplaints(Array.isArray(data) ? data : [data]))
      .catch((error) => console.log("There is error in fetching", error));
  }, []);

  const resolveComplaint = (id) => {
    fetch(`http://localhost:8080/api/complaint/resolve/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json",
         Authorization: ` ${localStorage.getItem("token")}`,
       },
     

    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fetching in Error");
        }
        return response.json();
      })
      .then((updateComplaint) => {
        setComplaints((prevComplaint) =>
          prevComplaint.filter((c)=> c.id != id)
        );
      })
      .catch((error) => console.log("Error in fetchind data", error));
  };

  return (
    <div className="flex  justify-center  md:ml-64 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col w-full p-8">
        <h1 className=" text-3xl md:text-3xl font-bold text-[#1b4141] mb-10  ml-20">
        PG Complaints Overview
      </h1>
      
      

      {/* Complaint Cards */}
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
  {complaints.map((complaint) => (
    <div
      key={complaint.id}
      className="bg-white w-full rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-indigo-100 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
    >
      {/* Left Section: Complaint Info */}
      <div className="flex flex-col gap-4 sm:w-3/4">
        {/* Complaint Header */}
        <div className="flex items-center gap-2 text-indigo-900 font-semibold text-xl">
          <AlertTriangle className="text-yellow-500 w-6 h-6" />
          Complaint #{complaint.id}
        </div>

        {/* Complaint Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-700">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">{complaint.roomId}</span>
          </div>

          <div   className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span>{complaint.complaintTime}</span>
          </div>
         
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            <span>{complaint.complaintDate}</span>
          </div>
           <div className="flex items-center gap-2 sm:col-span-2" >
            <User className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">{complaint.tenantName}</span>
          </div>
          
        </div>

        {/* Complaint Text */}
        <div className="bg-gray-100 px-4 py-3 rounded-2xl border border-gray-200 mt-2">
          <p className="text-gray-800">
            <span className="font-semibold text-indigo-900">Issue:</span>{" "}
            <span className="text-red-600 font-medium">{complaint.text}</span>
          </p>
        </div>
      </div>

      {/* Right Section: Status + Action */}
      <div className="flex flex-col items-start sm:items-end justify-between sm:w-1/4 gap-4">
        <div className="flex items-center gap-2">
          {complaint.status ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-semibold">Resolved</span>
            </>
          ) : (
            <>
              <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />
              <span className="text-yellow-600 font-semibold">Pending</span>
            </>
          )}
        </div>

        {!complaint.status && (
          <button
            onClick={() => resolveComplaint(complaint.id)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark as Resolved
          </button>
        )}
      </div>
    </div>
  ))}
</div>
</div>

    </div>
  );
}

export default AllComplaint;
