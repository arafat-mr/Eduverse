"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  // payment data get and delete from cookieStore
  useEffect(() => {
    // get data
    const data = getCookie("paymentData");

    if (!data) return;

    const paymentData = JSON.parse(data);
    // console.log(paymentData);
    setPaymentData(paymentData);

    // const initPayment = async () => {
    //   try {
    //     const res = await axios.post("/api/payment", {
    //       ...paymentData,
    //       cus_phone: "01711111111", // required
    //     });

    //     if (res.data.url) {
    //       // Clear cookie after use
    //       deleteCookie("paymentData");

    //       // Redirect to SSLCommerz Gateway
    //       window.location.href = res.data.url;
    //     } else {
    //       alert("Payment init failed: " + (res.data.error || "Unknown error"));
    //     }
    //   } catch (error) {
    //     alert("Payment error: " + error.message);
    //   }
    // };

    // initPayment();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const amountWithoutComa = paymentData.amount.replace(",", "");
      console.log(amountWithoutComa);
      const res = await axios.post("api/payment", {
        amount: Number(amountWithoutComa),
        cus_name: paymentData.cus_name,
        cus_email: paymentData.cus_email,
        course_name: paymentData.course_name,
      });

      const { url } = res.data;

      if (url) {
        // Clear cookie after use
        deleteCookie("paymentData");
        window.location.href = url; // redirect to SSLCommerz
      } else {
        alert("Payment failed: " + (res.data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Payment error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="btn btn-primary px-8 py-4 text-lg"
      >
        {loading ? "Redirecting..." : "Pay with SSLCommerz"}
      </button>
    </div>
  );
}
