import React, { useEffect, useState } from "react";
import { Loader, CreditCard, History, CircleCheckBig } from "lucide-react";
import TenantPaymentHistory from "./TenantPaymentHistory";

function TenantPayment({ tenantId }) {
  const [tenant, setTenant] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    fetchTenantDetails();
  }, [tenantId]);

  const fetchTenantDetails = async () => {
  try {
    const res = await fetch(`http://localhost:8080/api/tenants/tenantProfile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setTenant(data);
    setPayments(data.payments || []);

    //  Detect if payment for the current month (like "NOVEMBER") is already done
    const now = new Date();
    const currentMonth = now
      .toLocaleString("default", { month: "long" })
      .toUpperCase(); // convert to match backend format
    const currentYear = now.getFullYear();

    const paidThisMonth = data.payments?.some(
      (p) =>
        p.status === true &&
        p.month?.toUpperCase() === currentMonth &&
        p.year === currentYear
    );

    setHasPaid(paidThisMonth);
  } catch (err) {
    console.error("Error fetching tenant:", err);
  } finally {
    setLoading(false);
  }
};


  const handlePayment = async () => {
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8080/api/payment/pay/${tenantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setHasPaid(true);
        setMessage(
          ` ${tenant?.name} has successfully paid ₹${data.amount} for ${data.month} ${data.year}`
        );
        fetchTenantDetails();
      } else {
        setMessage(` ${data}`);
      }
    } catch (err) {
      setMessage(" Error processing payment");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh] text-[#1b4141]">
        <Loader className="animate-spin" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold text-[#1b4141] mb-8 text-center">
        PG Payment
      </h2>

      {/*  If Paid: Show only success message and history button */}
      {hasPaid ? (
        <div className="flex flex-col  items-center w-full max-w-2xl bg-white/90 border border-green-200 shadow-lg rounded-3xl p-8 text-center ">
          <div className="text-[#1b4141] text-xl font-semibold mb-6">
            {message ||
              <><CircleCheckBig className="inline-block mr-2" />{`Payment for ${new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })} has been cleared.`}</>}
          </div>

          <button
            onClick={() => setShowHistory((prev) => !prev)}
            className="group flex justify-center items-center gap-2 mx-auto px-6 py-3 rounded-xl border border-[#1b4141] text-[#1b4141] font-medium hover:bg-[#1b4141] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <History
              className="transition-transform group-hover:rotate-12"
              size={20}
            />
            {showHistory ? "Hide Payment History" : "View Payment History"}
          </button>
        </div>
      ) : (
        //  Show payment card only if payment not done
        <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-md border border-green-100 shadow-2xl rounded-3xl p-8">
          {/* Top Border Accent */}
          <div className="absolute top-0 left-0 w-full h-3 bg-[#1b4141] rounded-t-3xl"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1b4141] mb-1">
                PG Rent Payment
              </h2>
              <p className="text-gray-500 text-sm">
                Pay your rent quickly and securely
              </p>
            </div>
            <CreditCard className="text-[#1b4141]" size={36} />
          </div>

          {/* Tenant Details */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-gray-700 text-lg">
            <div>
              <span className="font-semibold text-[#1b4141] block">Tenant:</span>
              <span>{tenant?.name}</span>
            </div>
            <div>
              <span className="font-semibold text-[#1b4141] block">Room No:</span>
              <span>{tenant?.room?.id}</span>
            </div>
            <div>
              <span className="font-semibold text-[#1b4141] block">Rent:</span>
              <span>₹{tenant?.room?.rent}</span>
            </div>
            <div>
              <span className="font-semibold text-[#1b4141] block">Month:</span>
              <span>
                {new Date().toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePayment}
              className="group flex-1 flex justify-center items-center gap-2 py-3 rounded-xl text-white text-lg font-medium bg-[#1b4141] hover:bg-[#163636] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <CreditCard
                className="transition-transform group-hover:scale-110"
                size={20}
              />
              Pay Rent ₹{tenant?.room?.rent}
            </button>

            <button
              onClick={() => setShowHistory((prev) => !prev)}
              className="group flex-1 flex justify-center items-center gap-2 py-3 rounded-xl border border-[#1b4141] text-[#1b4141] font-medium hover:bg-[#1b4141] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <History
                className="transition-transform group-hover:rotate-12"
                size={20}
              />
              {showHistory ? "Hide History" : "View History"}
            </button>
          </div>

          {/* Message */}
          {message && (
            <p
              className={`mt-5 text-center text-sm font-medium rounded-xl py-3 transition-all ${
                message.includes("✅")
                  ? "text-green-700 bg-green-100 border border-green-300"
                  : message.includes("⚠️")
                  ? "text-yellow-700 bg-yellow-100 border border-yellow-300"
                  : "text-red-700 bg-red-100 border border-red-300"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      )}

      {/*  Payment History Modal */}
      {showHistory && (
        <TenantPaymentHistory
          payments={payments}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}

export default TenantPayment;









// import React, { useEffect, useState } from "react";
// import { Loader, CreditCard, History } from "lucide-react";
// import TenantPaymentHistory from "./TenantPaymentHistory";

// function TenantPayment({ tenantId }) {
//   const [tenant, setTenant] = useState(null);
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [showHistory, setShowHistory] = useState(false);
//   const [hasPaid, setHasPaid] = useState(false);

//   useEffect(() => {
//     fetchTenantDetails();
//   }, [tenantId]);

//   const fetchTenantDetails = async () => {
//     try {
//       const res = await fetch(`http://localhost:8080/api/tenants/tenantProfile`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       setTenant(data);
//       setPayments(data.payments || []);
//     } catch (err) {
//       console.error("Error fetching tenant:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayment = async () => {
//     setMessage("");
//     try {
//       const res = await fetch(`http://localhost:8080/api/payment/pay/${tenantId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setHasPaid(true);
//         setMessage(
//           ` ${tenant?.name} has successfully paid ₹${data.amount} for ${data.month} ${data.year}`
//         );
//         fetchTenantDetails();
//       } else {
//         setMessage(`⚠️ ${data}`);
//       }
//     } catch (err) {
//       setMessage(" Error processing payment");
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-[80vh] text-[#1b4141]">
//         <Loader className="animate-spin" size={40} />
//       </div>
//     );

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-6 ">
//       {/* Header */}
//       <h2 className="text-3xl font-bold text-[#1b4141] mb-8 text-center">
//         Tenant Payment Portal
//       </h2>

//       {/* If paid, show success message only */}
//       {hasPaid ? (
//         <div className="w-full max-w-2xl bg-white/90 border border-green-200 shadow-lg rounded-3xl p-8 text-center animate-fadeIn">
//           <div className="text-[#1b4141] text-xl font-semibold">
//             {message}
//           </div>

//           <div className="mt-6">
//             <button
//               onClick={() => setShowHistory((prev) => !prev)}
//               className="group flex justify-center items-center gap-2 mx-auto px-6 py-3 rounded-xl border border-[#1b4141] text-[#1b4141] font-medium hover:bg-[#1b4141] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
//             >
//               <History
//                 className="transition-transform group-hover:rotate-12"
//                 size={20}
//               />
//               {showHistory ? "Hide Payment History" : "View Payment History"}
//             </button>
//           </div>
//         </div>
//       ) : (
//         // Rent Payment Card (only shown if payment not yet made)
//         <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-md border border-green-100 shadow-2xl rounded-3xl p-8">
//           {/* Top Border Accent */}
//           <div className="absolute top-0 left-0 w-full h-3 bg-[#1b4141] rounded-t-3xl"></div>

//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-[#1b4141] mb-1">
//                 PG Rent Payment
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 Pay your rent quickly and securely
//               </p>
//             </div>
//             <CreditCard className="text-[#1b4141]" size={36} />
//           </div>

//           {/* Tenant Details */}
//           <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-gray-700 text-lg">
//             <div>
//               <span className="font-semibold text-[#1b4141] block">Tenant:</span>
//               <span>{tenant?.name}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-[#1b4141] block">Room No:</span>
//               <span>{tenant?.room?.id}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-[#1b4141] block">Rent:</span>
//               <span>₹{tenant?.room?.rent}</span>
//             </div>
//             <div>
//               <span className="font-semibold text-[#1b4141] block">Month:</span>
//               <span>
//                 {new Date().toLocaleString("default", {
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </span>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="my-6 border-t border-gray-200"></div>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={handlePayment}
//               className="group flex-1 flex justify-center items-center gap-2 py-3 rounded-xl text-white text-lg font-medium bg-[#1b4141] hover:bg-[#163636] transition-all duration-300 shadow-md hover:shadow-lg"
//             >
//               <CreditCard
//                 className="transition-transform group-hover:scale-110"
//                 size={20}
//               />
//               Pay Rent ₹{tenant?.room?.rent}
//             </button>

//             <button
//               onClick={() => setShowHistory((prev) => !prev)}
//               className="group flex-1 flex justify-center items-center gap-2 py-3 rounded-xl border border-[#1b4141] text-[#1b4141] font-medium hover:bg-[#1b4141] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
//             >
//               <History
//                 className="transition-transform group-hover:rotate-12"
//                 size={20}
//               />
//               {showHistory ? "Hide History" : "View History"}
//             </button>
//           </div>

//           {/* Message */}
//           {message && (
//             <p
//               className={`mt-5 text-center text-sm font-medium rounded-xl py-3 transition-all ${
//                 message.includes("✅")
//                   ? "text-green-700 bg-green-100 border border-green-300"
//                   : message.includes("⚠️")
//                   ? "text-yellow-700 bg-yellow-100 border border-yellow-300"
//                   : "text-red-700 bg-red-100 border border-red-300"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Payment History Section */}
//       {showHistory && (
//   <TenantPaymentHistory
//     payments={payments}
//     onClose={() => setShowHistory(false)}
//   />
// )}

//     </div>
//   );
// }

// export default TenantPayment;
