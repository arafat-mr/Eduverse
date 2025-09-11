"use client";

import WithRole from "@/app/components/WithRole";
import React, { useEffect, useState } from "react";

function truncateText(text, maxLength = 40) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payments");
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <button
          onClick={fetchPayments}
          className="btn btn-sm btn-outline rounded-lg border-white text-white hover:bg-white hover:text-blue-900"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="w-full h-60 flex justify-center items-center">
          <span className="loading loading-spinner text-white"></span>
        </div>
      ) : payments.length === 0 ? (
        <div className="bg-blue-950 rounded-lg shadow p-6 text-white">
          <p className="text-lg font-medium">No payments found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-blue-950 rounded-lg shadow p-4">
          <table className="min-w-[600px] w-full text-white border-collapse border border-gray-600">
            <thead className="bg-blue-800 font-mono">
              <tr>
                <th className="p-3 border-b border-gray-600">Course Name</th>
                <th className="p-3 border-b border-gray-600">Customer Email</th>
                <th className="p-3 border-b border-gray-600">Amount</th>
                <th className="p-3 border-b border-gray-600">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-blue-900 font-mono text-sm">
                  <td className="p-3 border-b border-gray-600">{truncateText(p.course_name, 40)}</td>
                  <td className="p-3 border-b border-gray-600">{p.cus_email}</td>
                  <td className="p-3 border-b border-gray-600">{p.amount}</td>
                  <td className="p-3 border-b border-gray-600">{truncateText(p.tran_id, 15)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Wrap with admin-only protection
export default WithRole(PaymentsPage, ["admin"]);
