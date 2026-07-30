import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  IndianRupee,
  User,
  Home,
  Clock,
  CheckCircle2,
  Loader2,
  Bed,
  BanknoteArrowUp,
} from "lucide-react";

function PaymentHistory() {
  const [paidPayments, setPaidPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(paidPayments);


  const presentMonth= new Date().toLocaleString("default",{month:"long"}).toUpperCase();

  const totalPaidAmount = paidPayments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/payment/paidPayments/${presentMonth}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch paid payment data");
        }

        const data = await response.json();
        
        setPaidPayments(data);
        
      } catch (error) {
        console.error("Error fetching paid payments:", error);
        setError("Unable to load payment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [presentMonth]);

  return (
    <div className="flex justify-center md:ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col w-full p-8">
        <h1 className="text-3xl md:text-3xl font-bold text-[#1b4141] mb-10 ml-20">
          Payment History
        </h1>

       {/*  Summary Section */}
        {paidPayments.length > 0 && (
          <div className="ml-20 mb-10 flex flex-col sm:flex-row gap-4">
            {/* <div className="bg-green-50 border border-green-200 text-green-800 font-semibold rounded-2xl px-6 py-3 shadow-sm">
               Total Paid Amount: ₹{totalPaidAmount.toLocaleString()}
            </div> */}
            <div className="flex gap-2 bg-[#1b4141] border border-green-200 text-white font-semibold rounded-2xl px-6 py-3 shadow-sm">
              <BanknoteArrowUp />Total Payments: <span className="text-xl   font-semibold">{paidPayments.length}</span>
            </div>
          </div>
        )}



        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-600">
            <Loader2 className="animate-spin w-8 h-8 mr-2 text-green-600" />
            Loading payment history...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-medium">{error}</div>
        ) : paidPayments.length === 0 ? (
          <div className="text-center text-gray-600 font-medium">
            No previous payment records found.
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
            {paidPayments.map((payment) => (
              <div
                key={payment.id}
                className="bg-white w-full rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-green-100 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
              >
                {/* Left Section */}
                <div className="flex flex-col gap-4 sm:w-3/4">
                  {/* Header */}
                  <div className="flex items-center gap-2 text-green-900 font-semibold text-xl">
                    <CheckCircle2 className="text-green-600 w-6 h-6" />
                    Payment #{payment.id}
                  </div>

                  {/* Payment Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-green-600" />
                      <span className="font-medium">{payment.tenant.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-green-600" />
                      <span>{payment.room.id || "Room not assigned"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-semibold">
                        ₹{payment.amount || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:col-span-2">
                      <CalendarDays className="w-5 h-5 text-green-600" />
                      <span>
                        Payment Date:{" "}
                        <span className="font-medium text-gray-800">
                          {payment.payment_date || "N/A"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-semibold">
                        On Time
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-start sm:items-end justify-between sm:w-1/4 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-semibold">Paid</span>
                  </div>

                  {/* <button
                    onClick={() => alert(`View receipt for ${payment.tenantName}`)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2"
                  >
                    <IndianRupee className="w-4 h-4" />
                    View Receipt
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;
