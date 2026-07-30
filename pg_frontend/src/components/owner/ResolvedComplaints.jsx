import React, { useEffect, useState } from "react";
import { CheckCircle2, Bed, User, CalendarDays, Clock } from "lucide-react";

function ResolvedComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/complaint/resolved`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setComplaints(Array.isArray(data) ? data : [data]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex  justify-center  md:ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col w-full p-8 ">
      <h1 className=" text-3xl font-bold text-[#1b4141] mb-10 ml-20">
        Resolved Complaints
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl shadow-lg p-6 border border-green-100 flex flex-col sm:flex-row justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-2 text-green-800 font-semibold text-xl">
                <CheckCircle2 className="text-green-500 w-6 h-6" />
                Complaint #{c.id}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-green-600" />
                  <span>{c.roomId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span>{c.complaintTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-green-600" />
                  <span>{c.complaintDate}</span>
                </div>
              </div>

              <div className="bg-gray-100 px-4 py-3 rounded-2xl border border-gray-200 mt-8">
                <p className="text-gray-800">
                  <span className="font-semibold text-green-900">Issue:</span>{" "}
                  {c.text}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              Resolved
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ResolvedComplaints;
