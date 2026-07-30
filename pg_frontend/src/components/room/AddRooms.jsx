import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddRooms() {
  const [formData, setFormData] = useState({
    roomId:"",
    capacity: "",
    rent: "",
    status: "",
  });


  const navigate=useNavigate();

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    fetch("http://localhost:8080/api/rooms/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`, 
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add room");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Room added:", data);
       
        setFormData({ roomId:"" ,capacity: "", rent: "", status: "" });
        navigate("/rooms-details")
      })
      .catch((error) => {
        console.error("Error:", error);
       
      });
    }
      
      
      return(
      <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 transition duration-300 hover:shadow-2xl">
        <h2 className="flex items-center  justify-center gap-1 text-3xl font-bold text-center text-[#1b4141] mb-6">
          <Plus size={28} />Add New Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

<div className="relative">
            <input
              type="number"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
              className=" w-full border border-gray-300 rounded-lg p-3 focus:border-[#1b4141] focus:ring focus:ring-[#1b4141] outline-none transition-all"
              placeholder="Room Number"
            />
            
          </div>

          {/* Capacity */}
          <div className="relative">
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className=" w-full border border-gray-300 rounded-lg px-3 py-3 focus:border-[#1b4141] focus:ring focus:ring-[#1b4141] outline-none transition-all"
              placeholder="Capacity"
            />
            
          </div>

          {/* Rent */}
          <div className="relative">
            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              step="0.01"
              required
              className="peer w-full border border-gray-300 rounded-lg p-3 focus:border-[#1b4141] focus:ring focus:ring-[#1b4141] outline-none transition-all"
              placeholder="Rent Amount"
            />
            
          </div>

          {/* Status */}
          <div className="relative">
            <label className="block text-gray-600 text-sm mb-1 font-medium">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1b4141] focus:ring focus:ring-[#1b4141] outline-none transition-all bg-white"
            >
              <option value=""> Available</option>
              
              <option value="Occupied" className=" text-gray-600">Occupied</option>
              <option value="Maintenance" className=" text-gray-600">Maintenance</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#1b4141] to-[#207575] text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-200"
          >
            Add Room
          </button>
        </form>

       
      </div>
    </div>
    )
 
};

export default AddRooms;
