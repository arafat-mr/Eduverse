"use client";
import dynamic from "next/dynamic";

// Use dynamic import to avoid SSR issues with Stripe
const StripeWrapper = dynamic(() => import("../components/CheckoutForm"), {
  ssr: false,
});

export default function CheckoutPage() {
  return (
    <div className="flex h-[calc(100vh-89px)] justify-center items-center bg-white  text-black flex-col text-4xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ">
      <h1 className="pb-9">Pay With Stripe</h1>
      <StripeWrapper />
    </div>
  );
}
