// app/api/create-payment/route.js
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, cus_name, cus_email, course_name, name } =
      await request.json();

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { name },
    });
    console.log(paymentIntent, "new");
    // save to mongoDb
    if (paymentIntent.id) {
      // insert the payment in db
      const paymentsCollection = await dbConnect("payments");
      const insertPayment = await paymentsCollection.insertOne({
        tran_id: paymentIntent.id,
        cus_name,
        cus_email,
        course_name,
        pay_at: new Date(),
        status: "success",
      });
      console.log(insertPayment);
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
