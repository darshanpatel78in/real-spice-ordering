import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { orderId, amount, phone } = await req.json();

    console.log("[PhonePe Init] Request received:", { orderId, amount, phone });

    if (!orderId || !amount) {
      console.error("[PhonePe Init] Missing required fields:", { orderId, amount });
      return NextResponse.json(
        { success: false, message: "Missing orderId or amount" },
        { status: 400 }
      );
    }

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;
    const env = process.env.PHONEPE_ENV;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (!merchantId || !saltKey || !saltIndex) {
      console.error("[PhonePe Init] Missing credentials:", { merchantId: !!merchantId, saltKey: !!saltKey, saltIndex: !!saltIndex });
      return NextResponse.json(
        { success: false, message: "PhonePe credentials are not configured" },
        { status: 500 }
      );
    }

    // Amount must be in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(amount * 100);

    // Create a unique transaction ID for this attempt
    const merchantTransactionId = `T${Date.now()}`;

    // Callback URL is typically for server-to-server webhook
    // Redirect URL is where the user will be sent after payment
    const data = {
      merchantId,
      merchantTransactionId,
      merchantUserId: `U${phone || "GUEST"}`,
      amount: amountInPaise,
      redirectUrl: `${baseUrl}/api/payment/phonepe/status?id=${merchantTransactionId}&orderId=${orderId}`,
      redirectMode: "POST",
      callbackUrl: `${baseUrl}/api/payment/phonepe/callback`,
      mobileNumber: phone || "",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payloadMain = Buffer.from(JSON.stringify(data)).toString("base64");
    const stringToHash = payloadMain + "/pg/v1/pay" + saltKey;
    const checksum =
      crypto.createHash("sha256").update(stringToHash).digest("hex") +
      "###" +
      saltIndex;

    const phonepeHost =
      env === "PROD"
        ? "https://api.phonepe.com/apis/hermes"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox";

    console.log("[PhonePe Init] Calling PhonePe API:", { phonepeHost, merchantId, merchantTransactionId });

    const response = await fetch(`${phonepeHost}/pg/v1/pay`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({
        request: payloadMain,
      }),
    });

    const result = await response.json();
    console.log("[PhonePe Init] PhonePe response:", result);

    if (result.success) {
      return NextResponse.json({
        success: true,
        redirectUrl: result.data.instrumentResponse.redirectInfo.url,
        merchantTransactionId,
      });
    } else {
      console.error("[PhonePe Init] PhonePe API Error:", result);
      return NextResponse.json(
        {
          success: false,
          message: result.message || result.data?.message || "Payment initiation failed",
          code: result.code || result.data?.code,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("[PhonePe Init] Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during payment initiation", error: String(error) },
      { status: 500 }
    );
  }
}
