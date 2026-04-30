import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const order = await Order.create(body);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
  console.log("ORDER_SAVE_ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Failed to save order",
    },
    { status: 500 }
  );
}
}