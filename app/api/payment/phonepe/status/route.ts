import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function POST(req: Request) {
  try {
    // PhonePe sends redirect payload via form data in POST
    const formData = await req.formData();
    
    // The redirect URL parameters (id, orderId) are available via the req.url
    const url = new URL(req.url);
    const merchantTransactionId = url.searchParams.get("id");
    const orderId = url.searchParams.get("orderId");

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;
    const env = process.env.PHONEPE_ENV;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (!merchantId || !saltKey || !saltIndex || !merchantTransactionId || !orderId) {
      return NextResponse.redirect(`${baseUrl}/payment/status?success=false&reason=missing_data`);
    }

    // Call PhonePe status API to securely verify the payment status
    const stringToHash = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey;
    const checksum = crypto.createHash("sha256").update(stringToHash).digest("hex") + "###" + saltIndex;

    const phonepeHost =
      env === "PROD"
        ? "https://api.phonepe.com/apis/hermes"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox";

    const response = await fetch(`${phonepeHost}/pg/v1/status/${merchantId}/${merchantTransactionId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    });

    const result = await response.json();

    await connectDB();
    
    if (result.success && result.data.state === "COMPLETED") {
      // Payment successful
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "COMPLETED",
        merchantTransactionId: merchantTransactionId,
      });
      return NextResponse.redirect(`${baseUrl}/payment/status?success=true&orderId=${orderId}`);
    } else {
      // Payment failed or pending
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "FAILED",
        merchantTransactionId: merchantTransactionId,
      });
      return NextResponse.redirect(`${baseUrl}/payment/status?success=false&orderId=${orderId}`);
    }
  } catch (error) {
    console.error("PHONEPE_STATUS_ERROR:", error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/payment/status?success=false&reason=error`);
  }
}
