import React, { useEffect, useState } from "react";
import {
  Clock,
  CalendarDays,
  IndianRupee,
  User,
  Home,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  Bed,
} from "lucide-react";

function PaymentPending() {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [reminderMessage, setReminderMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/payment/pending`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment data");
        }

        const data = await response.json();
        setPendingPayments(data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
        setError("Unable to load pending payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const paymentReminder = async (tenantId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8080/api/payment/generateReminders/${tenantId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("The response was not ok");
      }
      const data = await response.text();
      setReminderMessage(data);
    } catch (error) {
      console.log("Error in posting the data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center md:ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col w-full p-8">
        <h1 className="text-3xl font-bold text-[#1b4141] mb-10 ml-20">
          Pending Rent Payments
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-600">
            <Loader2 className="animate-spin w-8 h-8 mr-2 text-indigo-600" />
            Loading pending payments...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-medium">{error}</div>
        ) : pendingPayments.length === 0 ? (
          <div className="text-center text-gray-600 font-medium">
            🎉 No pending rent payments! All tenants are up to date.
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
            {pendingPayments.map((tenant) => (
              <div
                key={tenant.id}
                className="bg-white w-full rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-indigo-100 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
              >
                {/* LEFT SECTION */}
                <div className="flex flex-col gap-4 sm:w-3/4">
                  {/* Header */}
                  <div className="flex items-center gap-2 text-indigo-900 font-semibold text-xl">
                    <AlertCircle className="text-red-500 w-6 h-6" />
                    Tenant #{tenant.id}
                  </div>

                  {/* Tenant Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-indigo-600" />
                      <span className="font-medium">{tenant.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-indigo-600" />
                      <span>{tenant.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-indigo-600" />
                      <span>{tenant.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-indigo-600" />
                      <span>
                        Room ID:{" "}
                        <span className="font-semibold text-gray-800">
                          {tenant.room?.id || "Not Assigned"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-indigo-600" />
                      <span className="text-red-600 font-semibold">
                        ₹{tenant.room?.rent?.toLocaleString() || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-indigo-600" />
                      <span>
                        Check-in:{" "}
                        <span className="font-medium text-gray-800">
                          {tenant.checkin_date || "Not Available"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-indigo-600" />
                      <span>
                        Check-out:{" "}
                        <span className="font-medium text-gray-800">
                          {tenant.checkout_date || "Still Staying"}
                        </span>
                      </span>
                    </div>

                    {/* <div className="flex items-center gap-2 sm:col-span-2">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <span className="text-yellow-600 font-semibold">
                        Payment Pending
                      </span>
                    </div> */}
                  </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex flex-col justify-between  sm:items-end  sm:w-1/4 gap-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-yellow-600 font-semibold">
                      Pending
                    </span>
                  </div>

                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2"
                    onClick={() => paymentReminder(tenant.id)}
                  >
                    <Clock className="w-4 h-4" />
                    Send Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentPending;
