"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CoursePaymentsChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("/api/admin/course-payments");
        const data = await res.json();

        const today = new Date();

        // Last 4 days
        const last4Days = [];
        for (let i = 3; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          last4Days.push(d);
        }

        // Group payments by date
        const grouped = {};
        data.forEach(item => {
          const payDate = new Date(item.pay_at);
          const dateStr = payDate.toLocaleDateString();
          if (!grouped[dateStr]) grouped[dateStr] = 0;
          grouped[dateStr] += 1;
        });

        // Map last 4 days
        const chartArray = last4Days.map(d => {
          const dateStr = d.toLocaleDateString();
          return { date: dateStr, payments: grouped[dateStr] || 0 };
        });

        setChartData(chartArray);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div className="text-center py-10 text-white">Loading chart...</div>;

  return (
    <div className="w-full mt-6 p-4 bg-blue-900 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Course Payments (Last 4 Days)</h2>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            {/* Cartesian grid with full horizontal & vertical lines */}
            <CartesianGrid stroke="#2563eb" strokeDasharray="4 4" vertical={true} horizontal={true} />
            
            <XAxis
              dataKey="date"
              stroke="#ffffff"
              tick={{ fill: "#ffffff", fontSize: 14 }}
              interval={0} // show all dates
            />
            <YAxis
              allowDecimals={false}
              stroke="#ffffff"
              tick={{ fill: "#ffffff", fontSize: 14 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e40af", border: "none" }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Line
              type="monotone"
              dataKey="payments"
              stroke="#3b82f6"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
