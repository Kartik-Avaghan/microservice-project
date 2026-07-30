import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserPlus, Plus, Trash ,IndianRupee} from "lucide-react";

function RoomDetails() {
  const [roomDetails, setRoomDetails] = useState([]);
  const [deleteRoomById, setDeleteRoomById] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setRoomDetails(data))
      .catch((error) => console.log("Error in fetching room details", error));
  }, []);

  const handleDeleteRoom = (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    fetch(`http://localhost:8080/api/rooms/delete/${roomId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete room");
        return response.text();
      })
      .then((data) => {
        console.log(data);
        alert("Room deleted successfully!");
        // Remove deleted room from state to update table
        setRoomDetails((prev) => prev.filter((room) => room.id !== roomId));
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to delete room");
      });
  };

  return (
    <div className="p-6 md:ml-64  min-h-screen">
  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-center m-10">
    <h1 className="text-3xl  font-bold text-[#1b4141]">Room Details</h1>
    <Link to="/admin/add-rooms">
      <button className="flex items-center gap-2 bg-gradient-to-r from-[#1b4141] to-[#2c7a7b] text-white font-semibold px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition transform">
        <Plus size={24} />
        Add Room
      </button>
    </Link>
  </div>

  {/* Table for md+ screens */}
  <div className="hidden md:block overflow-x-auto rounded-2xl shadow-xl">
    <table className="w-full text-sm lg:text-base border-collapse">
      <thead className="bg-[#1b4141] text-white sticky top-0 shadow-lg">
        <tr>
          <th className="p-6 text-center">Room No.</th>
          <th className="p-6 text-center">Capacity</th>
          <th className="p-6 text-center">Occupied</th>
          <th className="p-6 text-center">Rent</th>
          <th className="p-6 text-center">Status</th>
          <th className="p-6 text-center">Add Tenants</th>
          <th className="p-6 text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {roomDetails.length > 0 ? (
          roomDetails.map((room ,index) => (
            <tr
              key={room.id}
              className={`text-center transition-all duration-200 ${
                index % 2 === 0
                  ? "bg-white hover:bg-[#e5f3f3]"
                  : "bg-[#f7fcfc] hover:bg-[#e5f3f3]"
              } border-b border-gray-100`}
            >
              <td className="p-3 font-medium text-[#1b4141]">{room.id}</td>
              <td className="p-3">{room.capacity}</td>
              <td className="p-3">{room.occupied}</td>
              <div className="flex justify-center items-center pt-4"><IndianRupee size={16}/>
              <td className="">{room.rent}</td></div>
              
              <td
                className={` font-semibold `}
              >
                <span className={`${
                  room.status === "Available" ? "text-green-700 bg-green-100 rounded-full px-4 py-2 " : "text-red-700 bg-red-100 rounded-full px-9 py-2 "
                }`}>{room.status}</span>
                
              </td>
              <td className="p-3 inline-flex items-center ">
                <Link to="/admin/add-tenants">
                  <UserPlus className="text-[#1b4141]  hover:text-[#2c7a7b] transition" size={22} />
                </Link>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <Trash size={22} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="p-4 text-center text-red-500 font-medium">
              No room details available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Card view for small screens */}
  {/* <div className="grid grid-cols-1 gap-6 md:hidden">
    {roomDetails.length > 0 ? (
      roomDetails.map((room) => (
        <div
          key={room.id}
          className="bg-white/70 backdrop-blur-md border border-[#1b4141]/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex justify-between items-center mb-3">
            <p className="text-[#1b4141] font-bold text-lg">Room {room.id}</p>
            <Link to="/add-tenants">
              <UserPlus className="text-[#1b4141] hover:text-[#2c7a7b]" size={24} />
            </Link>
          </div>
          <p className="text-sm text-[#1b4141]">
            <span className="font-semibold">Capacity:</span> {room.capacity}
          </p>
          <p className="text-sm text-[#1b4141]">
            <span className="font-semibold">Occupied:</span> {room.occupied}
          </p>
          <p className="text-sm text-[#1b4141]">
            <span className="font-semibold">Rent:</span> ${room.rent}
          </p>
          <div className="flex justify-between items-center mt-4">
            <p
              className={`text-sm font-semibold ${
                room.status === "Available" ? "text-green-600 bg-green-800 rounded-full p-4" : "text-red-600"
              }`}
            >
              {room.status}
            </p>
            <button
              onClick={() => handleDeleteRoom(room.id)}
              className="text-red-600 hover:text-red-800 transition"
            >
              <Trash size={22} />
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-red-500 font-medium">No room details available</p>
    )}
  </div> */}
</div>

  );
}

export default RoomDetails;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { UserPlus } from 'lucide-react';

// function RoomDetails() {
//   const [roomDetails, setRoomDetails] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:8080/api/rooms`,{
//         method:"GET"
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => setRoomDetails(data))
//       .catch((error) =>
//         console.log("Error in fetching room details", error)
//       );
//   }, []);

//   return (
//     <div className="p-4 sm:p-6 md:ml-64">
//       <h1 className="text-lg sm:text-2xl text-center font-bold mb-4">
//         Room Details
//       </h1>

//       {/* Responsive Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-500 border-collapse rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2 sm:p-3 ">Room Number</th>
//               <th className="p-2 sm:p-3 ">Room Capacity</th>
//               <th className="p-2 sm:p-3 ">Occupied</th>
//               <th className="p-2 sm:p-3 ">Rent</th>
//               <th className="p-2 sm:p-3 ">Status</th>
//               <th className="p-2 sm:p-3 ">Add Tenants</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roomDetails.length > 0 ? (
//               roomDetails.map((room) => (
//                 <tr
//                   key={room.id}
//                   className="hover:bg-gray-50 text-center border-t border-gray-300"
//                 >
//                   <td className="p-2 sm:p-3 ">{room.id}</td>
//                   <td className="p-2 sm:p-3 ">{room.capacity}</td>
//                   <td className="p-2 sm:p-3 ">{room.occupied}</td>
//                   <td className="p-2 sm:p-3 ">{room.rent}</td>
//                   <td
//                     className={`p-2 sm:p-3  font-semibold ${
//                       room.status === "Available"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {room.status}
//                   </td>
//                   <td className="p-2 sm:p-3 flex justify-center items-center"><Link to={"/add-tenants"}><UserPlus className="w-6 h-6"/></Link></td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="p-4 text-center text-red-500 border border-gray-300"
//                 >
//                   No room details available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default RoomDetails;
