import React, { useState } from "react";
import { MessageSquare, Send, AlertCircle } from "lucide-react";

function RaiseComplaint({ tenantId }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/complaint/raise",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`, // token includes Bearer
          },
          body: JSON.stringify({ tenantId, text }), // now tenantId is a number
        }
      );

      if (!response.ok) throw new Error("Failed to submit complaint");

      const data = await response.json();
      console.log("Complaint submitted:", data);
      alert("Complaint submitted successfully!");
      setText("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div className="flex justify-center items-center m-30">
      <div className="shadow-xl rounded-2xl p-8 w-[65%] hover:shadow-2xl duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-full">
            <MessageSquare className="text-blue-600 w-6 h-5" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Raise a Complaint
          </h2>
        </div>

        {/* Info Section */}
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 text-sm px-3 py-2 rounded-lg mb-4 border border-yellow-200">
          <AlertCircle className="w-4 h-4" />
          <span>Please describe your issue clearly for quick resolution.</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-600 text-sm font-medium">
            Complaint Details
          </label>
          <textarea
            className="border border-gray-300 rounded-xl p-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
            placeholder="Describe your issue in detail..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="bg-[#1b4141] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#173a3a] transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <Send className="w-4 h-4" />
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default RaiseComplaint;
