import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import axios from "axios";
import { dbConnect } from "@/lib/dbConnect";

const store_id = "eduve68bca73b3804d"; // from sandbox
const store_passwd = "eduve68bca73b3804d@ssl"; // from sandbox

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, cus_name, cus_email, course_name } = body;

    const tran_id = new ObjectId().toString();

    const data = {
      store_id,
      store_passwd,
      total_amount: amount,
      currency: "BDT",
      tran_id,
      success_url: `http://localhost:3000/api/payment/success`,
      fail_url: `http://localhost:3000/payment/fail`,
      cancel_url: `http://localhost:3000/payment/cancel`,
      ipn_url: `http://localhost:3000/payment/ipn`,
      product_name: "Eduverse",
      product_category: "Education",
      product_profile: "general",
      cus_name,
      cus_email,
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      ship_name: cus_name,
      ship_add1: "Dhaka",
      ship_city: "Dhaka",
      ship_country: "Bangladesh",
      shipping_method: "Courier",
      ship_postcode: 1000,
    };

    const iniResponse = await axios({
      url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(iniResponse, "ini tini");
    const paymentsCollection = await dbConnect("payments");

    const res = await paymentsCollection.insertOne({
      amount,
      cus_email,
      cus_name,
      course_name,
      tran_id,
      status: "pending",
    });
    console.log(res);

    const gateWayUrl = iniResponse?.data?.GatewayPageURL;
    console.log(gateWayUrl);

    return NextResponse.json({ url: gateWayUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
