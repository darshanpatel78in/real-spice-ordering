import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: body.orderStatus,
        paymentStatus: body.paymentStatus,
        paymentMethod: body.paymentMethod,
      },
      { new: true } // returns updated document
    );

    if (!updatedOrder) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

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