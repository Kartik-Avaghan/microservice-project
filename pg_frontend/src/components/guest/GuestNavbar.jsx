import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  NotepadText,
  Bell,
  CreditCard,
  LogOut,
  Menu,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RaiseComplaint from "./RaiseComplaint";
import Notification from "./Notification";
import TenantPayment from "../payment/TenantPayment";

function GuestNavbar() {
  const [tenant, setTenant] = useState(null);

  const [toggle, setToggle] = useState(false); // mobile toggle
  const [collapsed, setCollapsed] = useState(false); // collapse toggle for desktop
  const [activeTab, setActiveTab] = useState("notifications");
  const navigate = useNavigate();

  const [notificationCount, setNotificationCount] = useState(0);

  // const tenantId =id || localStorage.getItem("tenantId")

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/main-page");
      return;
    }
    fetch(`http://localhost:8080/api/tenants/tenantProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTenant(data);

         // 🔹 Fetch unread notification count
      return fetch(`http://localhost:8080/api/notification/unreadCount`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
    })
    .then((res) => (res.ok ? res.json() : 0))
    .then((count) => {
      setNotificationCount(count);
    })

      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleUpload = async (selectedFile) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await fetch(`http://localhost:8080/api/tenants/upload-profile`, {
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const profileRes = await fetch(
        `http://localhost:8080/api/tenants/tenantProfile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await profileRes.json();
      setTenant(data);
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile image");
    }
  };

  if (!tenant)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-700">
        <p className="animate-pulse text-lg">Loading your profile...</p>
      </div>
    );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-[#08373d] h-14 px-4">
        <button onClick={() => setToggle(!toggle)} className="text-white">
          {toggle ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
        </button>
        <h1 className="text-white font-semibold text-lg">PG Guest</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1b4141] text-white flex flex-col shadow-xl transition-all duration-300 z-50
          ${
            toggle ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
          }
          ${collapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* Collapse Button (only visible on desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block absolute -right-3 top-6 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700 transition"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center pt-10 pb-6">
          <div className="relative group cursor-pointer">
            <img
              src={
                tenant.profileImage
                  ? `http://localhost:8080${tenant.profileImage}`
                  : "https://via.placeholder.com/80"
              }
              alt="User Avatar"
              className={`rounded-full border-4 border-[#234A4F] object-cover group-hover:scale-105 transition-transform duration-300 ${
                collapsed ? "w-12 h-12" : "w-20 h-20"
              }`}
            />
            {!collapsed && (
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            )}
          </div>

          {!collapsed && (
            <>
              <h2 className="text-lg font-semibold mt-3">{tenant.name}</h2>
              <p className="text-sm text-gray-300 font-medium">
                Room No {tenant.room?.id} | {tenant.room?.capacity} Sharing
              </p>
            </>
          )}
        </div>

        {/* Menu Section */}
        <ul className="flex-1 space-y-1 px-3">
          {[
            { id: "notification", icon: Bell, label: "Notifications" },
            { id: "complaint", icon: NotepadText, label: "Raise Complaint" },
            { id: "dopayment", icon: CreditCard, label: "Do Payment" }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative w-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-[#E0F2FE] rounded-l-full rounded-r-3xl -left-3 -right-3 shadow-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <div
                  className={`relative flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } p-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#1C3A3E]"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`z-10 ${
                      isActive ? "text-[#1C3A3E]" : "text-gray-200"
                    }`}
                  />
                  {!collapsed && <span className="z-10">{item.label}</span>}

                  {/* ✅ Add Notification Badge */}
                  {!collapsed &&
                    item.id === "notification" &&
                    notificationCount > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                        {notificationCount}
                      </span>
                    )}
                </div>
              </button>
            );
          })}
        </ul>

        {/* Logout Button */}
        <div className="px-4 mb-6">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-white hover:text-green-950 text-gray-200 transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
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

      {/* Content Area */}
      <div
        className={`flex-1 overflow-y-auto p-6 ml-0 bg-gray-50 min-h-screen transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {activeTab === "notification" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className=" p-6 rounded-2xl "
          >
            <Notification
              tenantId={tenant.id}
              notificationCount={setNotificationCount}
            />
          </motion.div>
        )}

        {activeTab === "complaint" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className=" p-6 rounded-2xl "
          >
            <RaiseComplaint tenantId={tenant.id} />
          </motion.div>
        )}
        {activeTab === "dopayment" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className=" p-6 rounded-2xl "
          >
            <TenantPayment tenantId={tenant.id} />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default GuestNavbar;


