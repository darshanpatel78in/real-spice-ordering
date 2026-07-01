import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { promises as fs } from "fs";
import path from "path";

async function saveOrderFallback(orderData: any) {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "orders.json");

  await fs.mkdir(dataDir, { recursive: true });

  let existingOrders: any[] = [];
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    existingOrders = JSON.parse(fileContent) as any[];
  } catch (readError) {
    if ((readError as NodeJS.ErrnoException).code !== "ENOENT") {
      throw readError;
    }
  }

  const savedOrder = {
    ...orderData,
    _id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  existingOrders.push(savedOrder);
  await fs.writeFile(filePath, JSON.stringify(existingOrders, null, 2), "utf-8");

  return savedOrder;
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log("[Orders API] Creating order with data:", body);

  try {
    await connectDB();

    const order = await Order.create(body);
    console.log("[Orders API] Order created with ID:", order._id);

    return NextResponse.json({
      success: true,
      order,
      db: true,
    });
  } catch (error) {
    console.error("ORDER_SAVE_ERROR:", error);

    try {
      const fallbackOrder = await saveOrderFallback(body);
      console.warn("ORDER_SAVE_FALLBACK: saved order locally", fallbackOrder._id);
      return NextResponse.json({
        success: true,
        order: fallbackOrder,
        fallback: true,
      });
    } catch (fallbackError) {
      console.error("ORDER_SAVE_FALLBACK_ERROR:", fallbackError);
      return NextResponse.json(
        {
          success: false,
          message: `Failed to save order: ${(error as Error).message || "unknown error"}`,
        },
        { status: 500 }
      );
    }
  }
}