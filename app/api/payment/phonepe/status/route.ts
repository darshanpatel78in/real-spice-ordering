import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { promises as fs } from "fs";
import path from "path";

const FallbackDataDir = path.join(process.cwd(), "data");
const FallbackFilePath = path.join(FallbackDataDir, "orders.json");

async function loadFallbackOrders() {
  try {
    const fileContent = await fs.readFile(FallbackFilePath, "utf-8");
    return JSON.parse(fileContent) as any[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveFallbackOrders(orders: any[]) {
  await fs.mkdir(FallbackDataDir, { recursive: true });
  await fs.writeFile(FallbackFilePath, JSON.stringify(orders, null, 2), "utf-8");
}

async function updateFallbackOrder(orderId: string, updateData: Record<string, any>) {
  const orders = await loadFallbackOrders();
  const index = orders.findIndex(
    (order) => order._id?.toString() === orderId || order._id === orderId
  );

  if (index === -1) {
    return null;
  }

  const updatedOrder = {
    ...orders[index],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  orders[index] = updatedOrder;
  await saveFallbackOrders(orders);
  return updatedOrder;
}

async function setOrderPaymentStatus(orderId: string, status: string, merchantTransactionId: string) {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { paymentStatus: status, merchantTransactionId },
    { new: true }
  ).lean();

  if (updatedOrder) {
    return updatedOrder;
  }

  return updateFallbackOrder(orderId, {
    paymentStatus: status,
    merchantTransactionId,
  });
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const merchantTransactionId = url.searchParams.get("id");
    const orderId = url.searchParams.get("orderId");

    const merchantId = process.env.PHONEPE_MERCHANT_ID || process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY || process.env.NEXT_PUBLIC_PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || process.env.NEXT_PUBLIC_PHONEPE_SALT_INDEX;
    const env = process.env.PHONEPE_ENV || process.env.NEXT_PUBLIC_PHONEPE_ENV || "TEST";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (!merchantId || !saltKey || !saltIndex || !merchantTransactionId || !orderId) {
      return NextResponse.redirect(`${baseUrl}/payment/status?success=false&reason=missing_data`);
    }

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

    const isCompleted = result?.success && result?.data?.state === "COMPLETED";
    const paymentStatus = isCompleted ? "COMPLETED" : "FAILED";

    const updatedOrder = await setOrderPaymentStatus(orderId, paymentStatus, merchantTransactionId);

    if (!updatedOrder) {
      console.warn("[PhonePe Status] Order not found in Mongo or fallback:", orderId);
      return NextResponse.redirect(`${baseUrl}/payment/status?success=false&orderId=${orderId}`);
    }

    return NextResponse.redirect(`${baseUrl}/payment/status?success=${isCompleted}&orderId=${orderId}`);
  } catch (error) {
    console.error("PHONEPE_STATUS_ERROR:", error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/payment/status?success=false&reason=error`);
  }
}
