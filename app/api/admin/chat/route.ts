import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { menuItems } from "@/lib/menu-data";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { message } = await req.json();

    const query = message.toLowerCase();
    let reply = "";

    const analysisKeywords = [
  "analyze",
  "analysis",
  "insight",
  "insights",
  "report",
  "summary",
  "trend",
  "compare",
  "performance",
  "suggest",
  "recommend",
  "forecast",
  "prediction",
  "why",
  "reason",
  "improve"
];

    const orders = await Order.find().lean();

    const orderDetails = orders
  .map((order: any) => `
Order ID: ${order._id}
Customer: ${order.customerName}
Items: ${order.items
  ?.map((i: any) => `${i.name} x${i.quantity}`)
  .join(", ")}
Total: ₹${order.total}
Payment: ${order.paymentMethod}
Payment Status: ${order.paymentStatus}
Order Status: ${order.orderStatus}
Date: ${new Date(order.createdAt).toLocaleString()}
`)
  .join("\n----------------\n");

    //------------------------------------
    // Today's Date
    //------------------------------------

    const now = new Date();

    //------------------------------------
    // Daily Orders
    //------------------------------------

    const dailyOrders = orders.filter((order: any) => {
      const d = new Date(order.createdAt);

      return d.toDateString() === now.toDateString();
    });

    //------------------------------------
    // Weekly Orders
    //------------------------------------

    const weekAgo = new Date();

    weekAgo.setDate(now.getDate() - 7);

    const weeklyOrders = orders.filter((order: any) => {
      return new Date(order.createdAt) >= weekAgo;
    });

    //------------------------------------
    // Monthly Orders
    //------------------------------------

    const monthlyOrders = orders.filter((order: any) => {
      const d = new Date(order.createdAt);

      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });

    //------------------------------------
    // Revenue Calculator
    //------------------------------------

    const getRevenue = (list: any[]) =>
      list.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

    //------------------------------------
    // Unit Sales
    //------------------------------------

    const getUnits = (list: any[]) =>
      list.reduce((sum, order) => {
        const qty =
          order.items?.reduce(
            (itemSum: number, item: any) =>
              itemSum + Number(item.quantity),
            0
          ) || 0;

        return sum + qty;
      }, 0);

    //------------------------------------
    // Basic Statistics
    //------------------------------------

    const totalRevenue = getRevenue(orders);

    const dailyRevenue = getRevenue(dailyOrders);

    const weeklyRevenue = getRevenue(weeklyOrders);

    const monthlyRevenue = getRevenue(monthlyOrders);

    const totalUnits = getUnits(orders);

    const dailyUnits = getUnits(dailyOrders);

    const weeklyUnits = getUnits(weeklyOrders);

    const monthlyUnits = getUnits(monthlyOrders);

    //------------------------------------
    // Order Status
    //------------------------------------

    const newOrders = orders.filter(
      (o: any) => o.orderStatus === "NEW"
    ).length;

    const preparingOrders = orders.filter(
      (o: any) => o.orderStatus === "PREPARING"
    ).length;

    const readyOrders = orders.filter(
      (o: any) => o.orderStatus === "READY"
    ).length;

    const deliveredOrders = orders.filter(
      (o: any) => o.orderStatus === "DELIVERED"
    ).length;

    const cancelledOrders = orders.filter(
      (o: any) => o.orderStatus === "CANCELLED"
    ).length;

    //------------------------------------
    // Payment Status
    //------------------------------------

    const paidOrders = orders.filter(
      (o: any) => o.paymentStatus === "PAID"
    ).length;

    const pendingPayments = orders.filter(
      (o: any) => o.paymentStatus === "PENDING"
    ).length;

    //------------------------------------
    // Payment Methods
    //------------------------------------

    const codOrders = orders.filter(
      (o: any) => o.paymentMethod === "COD"
    ).length;

    const upiOrders = orders.filter(
      (o: any) => o.paymentMethod === "UPI"
    ).length;

    //------------------------------------
    // Menu Statistics
    //------------------------------------

    const totalMenuItems = menuItems.length;

    const totalCategories = new Set(
      menuItems.map((m) => m.category)
    ).size;

    const vegItems = menuItems.filter(
      (m) => m.isVeg
    ).length;

    const nonVegItems = menuItems.filter(
      (m) => !m.isVeg
    ).length;

    //------------------------------------
    // Highest & Lowest Price
    //------------------------------------

    const cheapestDish = [...menuItems].sort(
      (a, b) => (a.price || 0) - (b.price || 0)
    )[0];

    const expensiveDish = [...menuItems].sort(
      (a, b) => (b.price || 0) - (a.price || 0)
    )[0];

    //------------------------------------
    // Category Count
    //------------------------------------

    const categoryStats = [...new Set(menuItems.map(i => i.category))]
      .map(category => ({
        category,
        count: menuItems.filter(i => i.category === category).length
      }));

    //------------------------------------
    // Item Sales Map
    //------------------------------------

    const itemSales: Record<string, number> = {};

    orders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        itemSales[item.name] =
          (itemSales[item.name] || 0) +
          Number(item.quantity);
      });
    });
        //------------------------------------
    // Best Selling Items
    //------------------------------------

    const bestSellingItems = Object.entries(itemSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    //------------------------------------
    // Least Selling Items
    //------------------------------------

    const leastSellingItems = Object.entries(itemSales)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 10);

    //------------------------------------
    // Unsold Items
    //------------------------------------

    const unsoldItems = menuItems
      .filter((item) => !(item.name in itemSales))
      .map((item) => item.name);

    //------------------------------------
    // New Menu Items
    //------------------------------------

    const newItems = [...menuItems]
      .sort((a, b) => b.id - a.id)
      .slice(0, 10);

    //------------------------------------
    // Menu List
    //------------------------------------

    const menuText = menuItems
      .map(
        (item) =>
          `${item.name} | ₹${item.price} | ${item.category}`
      )
      .join("\n");

const customerKeywords = [
  "recommend",
  "recommendation",
  "eat",
  "drink",
  "menu",
  "starter",
  "dessert",
  "juice",
  "paneer",
  "biryani",
  "pizza",
  "burger",
  "taste",
  "ingredients",
  "description",
  "spicy",
  "delicious",
  "best dish",
  "what should i eat"
];
if (
  query === "hi" ||
  query === "hello" ||
  query === "hey"
) {
  return NextResponse.json({
    reply:
      "Hello! I'm the Admin Assistant. You can ask me about orders, revenue, payments, sales, menu statistics, and reports."
  });
}

if (
  customerKeywords.some((word) =>
    query.includes(word)
  )
) {
  return NextResponse.json({
    reply:
      "This is the Admin Assistant. Customer menu recommendations are available only in the customer chatbot."
  });
}

if (
  query.includes("today") ||
  query.includes("daily")
) {
  return NextResponse.json({
    reply: `
Today's Orders: ${dailyOrders.length}
Today's Revenue: ₹${dailyRevenue}
Today's Units Sold: ${dailyUnits}
`
  });
}

else if (
  query.includes("week") ||
  query.includes("weekly")
) {
  return NextResponse.json({
  reply: `
Weekly Orders: ${weeklyOrders.length}
Weekly Revenue: ₹${weeklyRevenue}
Weekly Units Sold: ${weeklyUnits}
`
});
}

else if (
  query.includes("month") ||
  query.includes("monthly")
) {
 return NextResponse.json({
  reply: `
Monthly Orders: ${monthlyOrders.length}
Monthly Revenue: ₹${monthlyRevenue}
Monthly Units Sold: ${monthlyUnits}
`
 });
}

else if (
  query.includes("revenue") ||
  query.includes("sales") ||
  query.includes("income") ||
  query.includes("earnings")
) {
return NextResponse.json({
  reply: `Total Revenue: ₹${totalRevenue}`
});
}

else if (
  query.includes("total orders")
) {
 return NextResponse.json({
  reply: `Total Orders: ${orders.length}`
});
}

else if (
    query.includes("order status")||
  query.includes("new orders") ||
  query.includes("preparing") ||
  query.includes("ready") ||
  query.includes("delivered") ||
  query.includes("cancelled")


) {
 return NextResponse.json({
  reply: `
NEW: ${newOrders}
PREPARING: ${preparingOrders}
READY: ${readyOrders}
DELIVERED: ${deliveredOrders}
CANCELLED: ${cancelledOrders}
`
});
}
else if (
  query.includes("payment status") ||
  query.includes("payment") ||
  query.includes("paid") ||
  query.includes("pending")
) {
return NextResponse.json({
  reply: `
Payment Summary

Paid Orders: ${paidOrders}
Pending Payments: ${pendingPayments}

COD Orders: ${codOrders}
UPI Orders: ${upiOrders}
`
});
}

else if (
  query.includes("best selling") ||
  query.includes("most sold")||
  query.includes("top selling")
) {
return NextResponse.json({
  reply: `
Top Selling Items

${bestSellingItems
.map(([name, qty]) => `${name}: ${qty}`)
.join("\n")}
`
});
}

else if (
  query.includes("least selling")||
  query.includes("lowest selling")

) {
  return NextResponse.json({
  reply: `
Lowest Selling Items

${leastSellingItems
.map(([name, qty]) => `${name} : ${qty}`)
.join("\n")}
`
  });
}

else if (
  query.includes("unsold")
) {
return NextResponse.json({
  reply: `
Unsold Items

${unsoldItems.join("\n")}
`
});
}

else if (
  query.includes("cheapest")||
  query.includes("lowest price")
) {
  return NextResponse.json({
  reply: `
Cheapest Item

${cheapestDish.name}
₹${cheapestDish.price}
`
});
}

else if (
  query.includes("expensive")||
  query.includes("highest price") ||
query.includes("costliest")
) {
  return NextResponse.json({
  reply: `
Most Expensive Item

${expensiveDish.name}
₹${expensiveDish.price}
`
});
}

else if (
  query.includes("category")
) {
  return NextResponse.json({
  reply: categoryStats
    .map(c => `${c.category}: ${c.count}`)
    .join("\n")
});
}

else if (
  query.includes("menu")
) {
  return NextResponse.json({
  reply: menuText
});
}

else if (
  query.includes("order details") ||
  query.includes("show orders") ||
  query.includes("list orders") ||
  query.includes("customer order")
) {
  return NextResponse.json({
  reply: `
Order Details

${orderDetails}
`
});
}


const needsAI = analysisKeywords.some(word =>
  query.includes(word)
);

if (!needsAI) {
  return NextResponse.json({
    reply:
      "I don't have that information. Please ask about orders, sales, payments, menu, or request an analysis."
  });
}

const analysisContext = `
Total Orders: ${orders.length}

Today's Orders: ${dailyOrders.length}
Weekly Orders: ${weeklyOrders.length}
Monthly Orders: ${monthlyOrders.length}

Total Revenue: ₹${totalRevenue}
Today's Revenue: ₹${dailyRevenue}
Weekly Revenue: ₹${weeklyRevenue}
Monthly Revenue: ₹${monthlyRevenue}

Paid Orders: ${paidOrders}
Pending Payments: ${pendingPayments}

Best Selling Items:
${bestSellingItems.map(([n,q])=>`${n}: ${q}`).join("\n")}

Least Selling Items:
${leastSellingItems.map(([n,q])=>`${n}: ${q}`).join("\n")}

Unsold Items:
${unsoldItems.join("\n")}
`;

    //------------------------------------
    // Build Prompt
    //------------------------------------

    const prompt = `
You are the Restaurant Manager AI.

Dashboard:
${analysisContext}

Question:
${message}

Rules:
- Give management insights only.
- Use only the dashboard.
- Never invent numbers.
- Maximum 5 sentences.
- Suggest improvements if appropriate.
`;
    //------------------------------------
    // Ask Ollama
    //------------------------------------

    const response = await fetch(
      "http://127.0.0.1:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  model: "llama3.2:3b",
  prompt,
  stream: false,
  options: {
  temperature: 0,
  top_p: 0.2,
  top_k: 20,
  repeat_penalty: 1.2,
  num_predict: 80,
}
}),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      reply: data.response,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      reply:
        "Admin AI is currently unavailable.",
    });
  }
}