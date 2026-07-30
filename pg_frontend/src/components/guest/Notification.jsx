import React, { useEffect, useState } from "react";

function Notification({ tenantId, notificationCount }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // 🔹 Fetch all notifications
    fetch(`http://localhost:8080/api/notification/tenantNotification`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);

        // 🔹 Mark them as read in backend
        return fetch(`http://localhost:8080/api/notification/markAsRead`, {
          method: "POST",
          headers: { Authorization: `${token}` },
        });
      })
      .then(() => {
        notificationCount(0); // reset badge in UI
      })
      .catch((err) => console.error(err));
  }, [tenantId]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications yet.</p>
      ) : (
        <ul className="space-y-6 ">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-4 rounded-lg border-l-4 shadow-sm ${
                n.readStatus
                  ? "bg-gray-100 border-gray-300"
                  : "bg-blue-50 border-green-600"
              }`}
            >
              <p className="font-medium text-gray-700">{n.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(n.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
