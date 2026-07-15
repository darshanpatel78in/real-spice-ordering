import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      {
        orderStatus: body.orderStatus,
        paymentStatus: body.paymentStatus,
        paymentMethod: body.paymentMethod,
      },
{ returnDocument: "after" }    );

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order",
      },
      { status: 500 }
    );
  }
}