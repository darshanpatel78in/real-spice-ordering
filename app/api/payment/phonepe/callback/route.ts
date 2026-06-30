import { NextResponse } from "next/server";
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

export async function POST(req: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const formData = await req.formData();

    const orderId = formData.get("orderId")?.toString() || null;
    const merchantTransactionId = formData.get("merchantTransactionId")?.toString() || null;
    const paymentStatus = formData.get("status")?.toString() || "COMPLETED";

    console.log("[PhonePe Callback] Received payload:", {
      orderId,
      merchantTransactionId,
      paymentStatus,
    });

    if (!orderId || !merchantTransactionId) {
      console.warn("[PhonePe Callback] Missing orderId or merchantTransactionId");
      return NextResponse.json({ success: false, message: "Missing orderId or merchantTransactionId" }, { status: 400 });
    }

    await connectDB();
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: paymentStatus === "FAILED" ? "FAILED" : "COMPLETED",
        merchantTransactionId,
      },
      { new: true }
    ).lean();

    if (!updatedOrder) {
      const fallbackUpdated = await updateFallbackOrder(orderId, {
        paymentStatus: paymentStatus === "FAILED" ? "FAILED" : "COMPLETED",
        merchantTransactionId,
      });

      if (!fallbackUpdated) {
        return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, order: fallbackUpdated });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("[PhonePe Callback] Error:", error);
    return NextResponse.json({ success: false, message: "Callback processing failed" }, { status: 500 });
  }
}
