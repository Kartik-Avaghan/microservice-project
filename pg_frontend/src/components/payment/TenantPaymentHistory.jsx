import React from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

function TenantPaymentHistory({ payments = [], onClose }) {
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      {/* Modal Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col border border-[#c7d9d9] animate-slideUp">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-[#1b4141] text-white rounded-t-3xl">
          <h3 className="text-xl font-semibold tracking-wide">Payment History</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-y-auto px-6 py-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-[#f3f9f9] text-[#1b4141] uppercase text-xs tracking-wide sticky top-0">
              <tr>
                <th className="p-3">Month</th>
                <th className="p-3">Payment Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-[#f1f7f7] transition duration-200"
                  >
                    <td className="p-3 font-medium text-gray-700">{p.month}</td>
                    <td className="p-3 text-gray-600">{p.payment_date || "—"}</td>
                    <td className="p-3 text-gray-700 font-semibold">₹{p.amount}</td>
                    <td className="p-3 text-center">
                      {p.status ? (
                        <span className="flex justify-center items-center gap-1 text-green-600 font-medium">
                          <CheckCircle size={16} />
                          Paid
                        </span>
                      ) : (
                        <span className="flex justify-center items-center gap-1 text-red-500 font-medium">
                          <XCircle size={16} />
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No payment history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {/* <div className="flex justify-end border-t border-gray-200 px-6 py-3 bg-[#f9f9f9] rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-medium bg-[#1b4141] text-white hover:bg-[#163636] transition-all duration-300 shadow-md"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default TenantPaymentHistory;
