import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserPlus, Home, Phone, Mail } from "lucide-react";

function AddTenants() {
    const navigate=useNavigate();
const[addTenants,setAddTenants]=useState({
    name:"",
    phone:"",
    email:"",
    roomId:""
})

const handleChanges=(e)=>{
    const{name,value}=e.target;
    setAddTenants({...addTenants,[name]:value})
}




const handleSubmit = (e) => {
  e.preventDefault();
  fetch(`http://localhost:8080/api/tenants/addTenant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: ` ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      name: addTenants.name,
      phone: addTenants.phone,
      email: addTenants.email,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Tenant added successfully:", data);
      setAddTenants({
        name: "",
        phone: "",
        email: "",
        roomId: "",
      });
      navigate("/tenants");
    })
    .catch((error) => console.log("Error in fetching tenants:", error));
};









  return (
     
    <div className="p-6 md:ml-64 flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl w-full sm:w-[80vw] md:w-[50vw] lg:w-[35vw] p-8 transition-all duration-300 hover:shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <UserPlus className="w-8 h-8 text-[#1b4141]" />
          <h1 className="text-3xl font-bold text-[#1b4141]">Add Tenant</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Room ID */}
          <div className="flex flex-col">
            <label htmlFor="roomid" className="text-sm font-medium text-gray-600 mb-1">
              Room ID
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#1b4141]">
              <Home className="text-[#1b4141] mr-2 w-5 h-5" />
              <input
                type="number"
                id="roomid"
                name="roomId"
                placeholder="Enter room ID"
                value={addTenants.roomId}
                onChange={handleChanges}
                className="outline-none w-full"
                required
              />
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#1b4141]">
              <UserPlus className="text-[#1b4141] mr-2 w-5 h-5" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter tenant name"
                value={addTenants.name}
                onChange={handleChanges}
                className="outline-none w-full"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#1b4141]">
              <Phone className="text-[#1b4141] mr-2 w-5 h-5" />
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={addTenants.phone}
                onChange={handleChanges}
                className="outline-none w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#1b4141]">
              <Mail className="text-[#1b4141] mr-2 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={addTenants.email}
                onChange={handleChanges}
                className="outline-none w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#1b4141] text-white font-semibold py-3 rounded-lg mt-4 hover:bg-[#173a3a] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Add Tenant
          </button>
        </form>
      </div>
    </div>
     )
}

export default AddTenants;

