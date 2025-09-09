"use client";

import { useState, useEffect } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all payments
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/payments");
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Add new payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userId || !amount || !method) {
      setError("userId, amount, and method are required");
      return;
    }

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, amount, method }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add payment");

      setPayments((prev) => [...prev, data]);
      setUserId("");
      setAmount("");
      setMethod("");
      setSuccess("Payment recorded successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      {/* Add Payment Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[120px]"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[120px]"
        />
        <input
          type="text"
          placeholder="Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[120px]"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Payment
        </button>
      </form>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      {/* Payments List */}
      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">User ID</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Method</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr key={pay._id}>
                <td className="border px-2 py-1">{pay._id}</td>
                <td className="border px-2 py-1">{pay.userId}</td>
                <td className="border px-2 py-1">{pay.amount}</td>
                <td className="border px-2 py-1">{pay.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
