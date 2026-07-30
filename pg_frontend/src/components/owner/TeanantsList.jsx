import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";


function TenantsList() {
  const [tenantsList, setTenantsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tenants", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: ` ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTenantsList(data))
      .catch((error) => console.error("Error fetching tenants:", error));
  }, []);

  return (
   <div className="p-6 md:ml-64 bg-gray-50 min-h-screen">
  {/* Header */}
 <div className="flex flex-col md:flex-row justify-between items-center m-10">
    <h1 className="text-3xl  font-bold text-[#1b4141]">Tenant's List </h1>
    <Link to="/admin/add-tenants">
      <button className="flex items-center gap-2 bg-gradient-to-r from-[#1b4141] to-[#2c7a7b] text-white font-semibold px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition transform">
        <Plus size={24} />
        Add Tenants
      </button>
    </Link>
  </div>
 

  {/* Table Container */}
  <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
    <table className="min-w-full text-sm sm:text-base">
      <thead>
        <tr className="bg-[#1b4141] text-white text-center">
          <th className="p-6 font-semibold">ID</th>
          <th className="p-6 font-semibold">Name</th>
          <th className="p-6 font-semibold">Phone</th>
          <th className="p-6 font-semibold">Email</th>
          <th className="p-6 font-semibold">Joined Date</th>
          <th className="p-6 font-semibold">Room No</th>
          <th className="p-6 font-semibold">Status</th>
        </tr>
      </thead>

      <tbody>
        {tenantsList.length > 0 ? (
          tenantsList.map((tenant, index) => (
            <tr
              key={tenant.id}
              className={`text-center transition-all duration-200 ${
                index % 2 === 0
                  ? "bg-white hover:bg-[#e5f3f3]"
                  : "bg-[#f7fcfc] hover:bg-[#e5f3f3]"
              } border-b border-gray-100`}
            >
              <td className="p-4 text-gray-800 font-medium">{tenant.id}</td>
              <td className="p-4 text-gray-800 font-semibold">
                {tenant.name}
              </td>
              <td className="p-4 text-gray-700">{tenant.phone}</td>
              <td className="p-4 text-gray-700">{tenant.email}</td>
              <td className="p-4 text-gray-700">{tenant.checkin_date}</td>
              <td className="p-4 text-gray-700">
                {tenant.room ? tenant.room.id : "Not In"}
              </td>
              <td className="p-4">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    tenant.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {tenant.status ? "In-PG" : "Leaved"}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="7"
              className="p-6 text-center text-gray-500 bg-gray-50 font-medium"
            >
              No tenants found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Floating Add Tenant Button */}
  
</div>
  );
}

export default TenantsList;







