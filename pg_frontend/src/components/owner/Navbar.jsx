import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bed,
  FileText,
  CreditCard,
  ChevronDown,
  ChevronUp,
  LogOut,
  Upload,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [owner, setOwner] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch owner details
  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/owner/getOwner", {
          method:"GET",
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch owner");
        const data = await response.json();
        // Assuming only one admin owner — take first element
        setOwner(data[0]);
      } catch (error) {
        console.error("Error fetching owner:", error);
      }
    };
    fetchOwner();
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  //  Handle image upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await fetch("http://localhost:8080/api/owner/admin/upload-profile", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      alert("Profile image uploaded successfully!");

      // Refresh owner data to show new image
      const updated = await fetch("http://localhost:8080/api/owner/getOwner", {
        headers: { Authorization: `${token}` },
      });
      const newData = await updated.json();
      setOwner(newData[0]);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-[#08373d] h-14 px-4">
        <button onClick={() => setToggle(!toggle)} className="text-white">
          {toggle ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
        </button>
        <h1 className="text-white font-semibold text-lg">PG Management</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1b4141] text-white flex flex-col shadow-xl transition-transform duration-300 z-50
          ${toggle ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center pt-10 pb-6 relative">
          <div className="relative group">
            <img
              src={
                owner?.profileImage
                  ? `http://localhost:8080${owner.profileImage}`
                  : "https://via.placeholder.com/80"
              }
              alt="User Avatar"
              className="w-20 h-20 rounded-full border-4 border-[#234A4F] object-cover"
            />
            {/* Upload Button */}
            <label
              htmlFor="file-upload"
              className="absolute bottom-0 right-0 bg-[#285268] p-1 rounded-full cursor-pointer hover:bg-[#34717a]"
              title="Upload new image"
            >
              <Upload size={16} />
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </div>
          <h2 className="text-lg font-semibold mt-3">
            {owner?.username || "Admin"}
          </h2>
          <p className="text-sm text-gray-300">{owner?.email || "admin@email.com"}</p>
        </div>

        {/* Menu */}
        <ul className="flex-1 space-y-1 px-3">
          {[
            { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { to: "/admin/tenants", icon: Users, label: "Tenants" },
            { to: "/admin/rooms-details", icon: Bed, label: "Rooms" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#1C3A3E]"
                      : "text-gray-200 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-bg"
                        className="absolute inset-0 bg-[#E0F2FE] rounded-l-full rounded-r-3xl -left-3 -right-3 shadow-lg "
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <Icon
                      size={20}
                      className={`z-10 ${
                        isActive ? "text-[#1C3A3E]" : "text-gray-200"
                      }`}
                    />
                    <span className="z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Complaints Dropdown */}
          <li>
            <div
              onClick={() => setComplaintOpen(!complaintOpen)}
              className="flex items-center justify-between p-3 cursor-pointer rounded-xl hover:bg-[#285268] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} />
                <span>Complaints</span>
              </div>
              {complaintOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            <AnimatePresence>
              {complaintOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-8 mt-1 overflow-hidden space-y-1"
                >
                  {[
                    { to: "/admin/complaint/pending", label: "Pending" },
                    { to: "/admin/complaint/resolved", label: "Resolved" },
                  ].map((sub, i) => (
                    <NavLink
                      key={i}
                      to={sub.to}
                      className={({ isActive }) =>
                        `relative block p-2 pl-6 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? "bg-[#E0F2FE] text-[#1C3A3E]"
                            : "text-gray-200 hover:bg-[#285268]"
                        }`
                      }
                    >
                      <span className="relative z-10">{sub.label}</span>
                    </NavLink>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Payment Dropdown */}
          <li>
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between p-3 cursor-pointer rounded-xl hover:bg-[#285268] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <CreditCard size={20} />
                <span>Payment</span>
              </div>
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-8 mt-1 overflow-hidden space-y-1"
                >
                  {[
                    { to: "/admin/payments/paid", label: "Paid" },
                    { to: "/admin/payments/pending", label: "Pending" },
                  ].map((sub, i) => (
                    <NavLink
                      key={i}
                      to={sub.to}
                      className={({ isActive }) =>
                        `relative block p-2 pl-6 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? "bg-[#E0F2FE] text-[#1C3A3E]"
                            : "text-gray-200 hover:bg-[#285268]"
                        }`
                      }
                    >
                      <span className="relative z-10">{sub.label}</span>
                    </NavLink>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Logout */}
        <div className="px-4 mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white hover:text-green-950 text-gray-200 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            onClick={() => setToggle(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;






















