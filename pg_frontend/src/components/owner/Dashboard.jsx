import React, { useEffect, useState } from "react";

import { HousePlus, UserRound, Building2, Activity } from "lucide-react";

function Dashboard() {
  const [availableRooms, setAvailableRooms] = useState(0);
  const [activeTenants, setActiveTenants] = useState(0);
  const [roomsSummary, setRoomsSummary] = useState([]);
  const [user, setUser] = useState({ username: "Admin" });

  const token = localStorage.getItem("token");

  // Fetch total available rooms
  useEffect(() => {
    fetch(`http://localhost:8080/api/rooms/totalRooms/count`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setAvailableRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  // Fetch active tenants
  useEffect(() => {
    fetch(`http://localhost:8080/api/tenants/active/tenants`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setActiveTenants(data))
      .catch((err) => console.error("Error fetching tenants:", err));
  }, []);

  // Fetch rooms summary
  useEffect(() => {
    fetch(`http://localhost:8080/api/rooms/summary`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setRoomsSummary(data))
      .catch((err) => console.error("Error fetching summary:", err));
  }, []);

  return (
    <div className="md:ml-64 p-6 flex  bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col w-full justify-center items-center ">
        <h1 className="text-3xl md:text-3xl font-bold text-[#1b4141] mb-10 ">
        Dashboard Overview
      </h1>
      
      

      {/* Unified Summary Card */}
      <div className=" rounded-3xl  w-[90vw] md:w-[70vw] p-8 transition-transform hover:scale-[1.01] duration-300">
        {/* Top Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="flex flex-col items-center justify-center border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center text-indigo-950 mb-2">
              <HousePlus className="mr-2 w-6 h-6" />
              <h2 className="text-xl font-semibold">Available Rooms</h2>
            </div>
            <span className="text-5xl font-bold text-green-500">
              {availableRooms}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center text-indigo-950 mb-2">
              <UserRound className="mr-2 w-6 h-6" />
              <h2 className="text-xl font-semibold">Active Tenants</h2>
            </div>
            <span className="text-5xl font-bold text-blue-500">
              {activeTenants}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Room Summary Section */}
        <h3 className="text-2xl font-semibold text-indigo-950 mb-6 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-indigo-700" />
          Room Summary
        </h3>

        <div className="space-y-6">
          {roomsSummary.map((room) => (
            <div
              key={room.capacity}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300 bg-gray-50"
            >
              {/* Room Header */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
                  <Activity className="text-yellow-500 w-5 h-5" />
                  {room.capacity} Sharing
                </h4>
                <span
                  className={`px-4 py-1 text-sm font-semibold rounded-full ${
                    room.availableRooms > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {room.availableRooms > 0 ? "Available" : "Full"}
                </span>
              </div>

              {/* Room Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-600">Total Rooms</span>
                  <span className="font-medium">{room.totalRooms}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-600">Available Beds</span>
                  <span className="font-medium">{room.availableRooms}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-600">Occupied</span>
                  <span className="font-medium">{room.occupiedTenants}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-600">Room IDs</span>
                  <span className="font-medium truncate">
                    {room.RoomId.length > 0 ? room.RoomId.join(", ") : "None"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
