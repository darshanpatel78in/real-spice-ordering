import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { promises as fs } from "fs";
import path from "path";

function toISOStringSafe(value: any) {
  if (!value) return undefined;
  if (typeof value === "string") {
    return new Date(value).toISOString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  try {
    return new Date(value).toISOString();
  } catch {
    return undefined;
  }
}

function serializeOrder(order: any) {
  return {
    ...order,
    _id: order._id?.toString(),
    createdAt: toISOStringSafe(order.createdAt),
    updatedAt: toISOStringSafe(order.updatedAt),
  };
}

async function loadFallbackOrders() {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "orders.json");

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent) as any[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveFallbackOrders(orders: any[]) {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "orders.json");
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8");
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

export async function GET() {
  const fallbackOrders = await loadFallbackOrders();

  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    const serializedOrders = orders.map((order: any) => serializeOrder(order));

    return NextResponse.json({
      success: true,
      orders: [...serializedOrders, ...fallbackOrders].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  } catch (error) {
    console.error("[Admin Orders] GET error:", error);
    return NextResponse.json({
      success: true,
      orders: fallbackOrders.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      fallback: true,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, orderStatus, paymentStatus } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "orderId is required." },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    let updatedOrder: any = null;
    try {
      await connectDB();
      updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
        new: true,
      }).lean();
    } catch (dbError) {
      console.warn("[Admin Orders] PATCH DB error, falling back to local storage:", dbError);
    }

    if (updatedOrder) {
      return NextResponse.json({
        success: true,
        order: serializeOrder(updatedOrder),
      });
    }

    const fallbackUpdated = await updateFallbackOrder(orderId, updateData);
    if (!fallbackUpdated) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: serializeOrder(fallbackUpdated),
      fallback: true,
    });
  } catch (error) {
    console.error("[Admin Orders] PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to update order." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const requestBody = await req.json().catch(() => ({} as any));
    const orderId = requestBody.orderId || new URL(req.url).searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "orderId is required." },
        { status: 400 }
      );
    }

    let deletedOrder: any = null;
    try {
      await connectDB();
      deletedOrder = await Order.findByIdAndDelete(orderId).lean();
    } catch (dbError) {
      console.warn("[Admin Orders] DELETE DB error, falling back to local storage:", dbError);
    }

    if (deletedOrder) {
      return NextResponse.json({ success: true, order: serializeOrder(deletedOrder) });
    }

    const fallbackOrders = await loadFallbackOrders();
    const orderIndex = fallbackOrders.findIndex(
      (order) => order._id?.toString() === orderId || order._id === orderId
    );

    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 }
      );
    }

    const [deleted] = fallbackOrders.splice(orderIndex, 1);
    await saveFallbackOrders(fallbackOrders);

    return NextResponse.json({ success: true, order: deleted, fallback: true });
  } catch (error) {
    console.error("[Admin Orders] DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to delete order." },
      { status: 500 }
    );
  }
}
