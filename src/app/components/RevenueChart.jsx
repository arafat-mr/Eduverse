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
  LabelList,
} from "recharts";

export default function RevenueChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await fetch("/api/admin/total-revenue-admin");
        const data = await res.json();

        // Prepare last 4 days
        const today = new Date();
        const last4Days = [];
        for (let i = 3; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          last4Days.push(d);
        }

        // Aggregate revenue per date
        const grouped = {};
        data.forEach((item) => {
          const payAtField = item.pay_at || item["pay_at "] || null;
          if (!payAtField) return;

          let payDate;

          if (payAtField.$date?.$numberLong) {
            payDate = new Date(Number(payAtField.$date.$numberLong));
          } else if (
            typeof payAtField === "string" ||
            payAtField instanceof String
          ) {
            payDate = new Date(payAtField);
          } else if (typeof payAtField === "number") {
            payDate = new Date(payAtField);
          } else return;

          if (isNaN(payDate.getTime())) return; // skip invalid

          const dateStr = payDate.toLocaleDateString();
          if (!grouped[dateStr]) grouped[dateStr] = 0;
          grouped[dateStr] += item.amount || 0;
        });

        // Map last 4 days
        const chartArray = last4Days.map((d) => {
          const dateStr = d.toLocaleDateString();
          return { date: dateStr, revenue: grouped[dateStr] || 0 };
        });

        setChartData(chartArray);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-white">
        {" "}
        <div className="w-full h-60 flex justify-center items-center">
          Loading chart{" "}
          <span className="loading loading-spinner ml-2 text-white"></span>
        </div>
      </div>
    );

  return (
    <div className="w-full h-96 mt-6 p-4 rounded-xl shadow-lg bg-blue-900 text-white">
      <h2 className="text-xl font-bold mb-4 text-center">
        Total Revenue (Last 4 Days)
      </h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            stroke="#4b5563"
            strokeDasharray="2 2"
            vertical={true}
            horizontal={true}
          />
          <XAxis
            dataKey="date"
            stroke="#ffffff"
            tick={{ fill: "#ffffff", fontSize: 14 }}
            angle={isMobile ? -55 : 0} 
            textAnchor={isMobile ? "end" : "middle"}
            interval={0}
            height={isMobile ? 80 : 30}
          />
          <YAxis
            allowDecimals={false}
            stroke="#ffffff"
            tick={{ fill: "#ffffff", fontSize: 14 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e40af", border: "none" }}
            itemStyle={{ color: "#ffffff" }}
            formatter={(value) => `${value.toLocaleString()} BDT`}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#34d399"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          >
            <LabelList
              dataKey="revenue"
              position="top"
              formatter={(val) => `${val.toLocaleString()}`}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
