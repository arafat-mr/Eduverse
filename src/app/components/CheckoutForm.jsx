"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeWrapper() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState();

  function CheckoutForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      if (!stripe || !elements) {
        return;
      }
      const amountWithoutComa = paymentData.amount.replace(",", "");

      // Create payment intent on the server
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amountWithoutComa),
          cus_name: paymentData.cus_name,
          cus_email: paymentData.cus_email,
          course_name: paymentData.course_name,
          name: "Test Product",
        }),
      });

      const data = await response.json();

      // Confirm payment on the client
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        // Payment succeeded
        // Clear cookie after use
        deleteCookie("paymentData");
        console.log("Payment successful!");
        router.push("/payment/success");
      }

      setLoading(false);
    };

    return (
      <form onSubmit={handleSubmit} className="">
        <div className="bg-amber-100 h-10 w-96 p-2">
          <CardElement />
        </div>
        {error && <div>{error}</div>}
        <div className="flex justify-center items-center">
          <button
            className="text-center text-xl  bg-blue-700 w-full"
            disabled={!stripe || loading}
            type="submit"
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </div>
      </form>
    );
  }
  // payment data get and delete from cookieStore
  useEffect(() => {
    // get data
    const data = getCookie("paymentData");

    if (!data) return;

    const paymentData = JSON.parse(data);
    console.log("Payment data:", paymentData);
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
  console.log(paymentData);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
