import { dbConnect } from "@/lib/dbConnect";
import axios from "axios";
import { redirect } from "next/navigation";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("hit");
    // SSLCommerz will send POST data here
    const body = await req.formData(); // SSLCommerz sends data as form-data
    const paymentSuccess = {};

    // Convert formData into an object
    for (const [key, value] of body.entries()) {
      paymentSuccess[key] = value;
    }

    // validation from ssl database for secure the payment
    const { data } = await axios.get(
      `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${paymentSuccess.val_id}&store_id=eduve68bca73b3804d&store_passwd=eduve68bca73b3804d@ssl&format=json`
    );
    console.log("isvaile", data);
    if (data.status !== "VALID") {
      return NextResponse.json({ message: "Invalid Payment" });
    }

    // update the payment in db
    const paymentsCollection = await dbConnect("payments");
    const updatePayment = await paymentsCollection.updateOne(
      {
        tran_id: data.tran_id,
      },
      { $set: { status: "success" } }
    );

    // Redirect user to a success page
    return NextResponse.redirect(new URL("/payment/success", req.url));
  } catch (error) {
    console.error("❌ Payment success handler error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
