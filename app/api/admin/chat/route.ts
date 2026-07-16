import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { menuItems } from "@/lib/menu-data";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { message } = await req.json();

const query = message.toLowerCase().trim();
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
  "forecast",
  "prediction",
  "why",
  "reason",
  "improve"
];

const orders = await Order.find()
  .sort({ createdAt: -1 })
  .lean();

    const orderDetails = orders
  .map(
    (order: any) => `
Order #${order._id}
Customer: ${order.customerName}
Total: ₹${order.total}
Status: ${order.orderStatus}
`
  )
  .join("\n");

  const send = (reply: string) =>
    NextResponse.json({ reply });

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

    const totalCustomers = new Set(
  orders.map((o: any) => o.customerName)
).size;
if (
    query.includes("customer") ||
    query.includes("customers")
) {
    return send(
`Total Customers: ${totalCustomers}`
    );
}
const averageOrderValue =
    orders.length > 0
        ? Math.round(totalRevenue / orders.length)
        : 0;
        if (
    query.includes("average order") ||
    query.includes("average revenue")
) {
    return send(
`Average Order Value: ₹${averageOrderValue}`
    );
}
const highestOrder = [...orders].sort(
    (a:any,b:any)=>b.total-a.total
)[0];
if (
    query.includes("highest order") ||
    query.includes("largest order")
){
    return send(
`Highest Order

Customer: ${highestOrder.customerName}
Amount: ₹${highestOrder.total}`
    );
}
const lowestOrder = [...orders].sort(
    (a:any,b:any)=>a.total-b.total
)[0];
if (
    query.includes("lowest order") ||
    query.includes("smallest order")
){
    return send(
`Lowest Order

Customer: ${lowestOrder.customerName}
Amount: ₹${lowestOrder.total}`
    );
}
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

   const sortedItems = Object.entries(itemSales).sort(
  (a, b) => b[1] - a[1]
);

const bestSellingItems = sortedItems.slice(0, 10);
const leastSellingItems = sortedItems.slice(-10).reverse();



    //------------------------------------
    // Unsold Items
    //------------------------------------

    const unsoldItems = menuItems
      .filter((item) => !(item.name in itemSales))
      .map((item) => item.name);

const customerKeywords = [
  "recommend",
  "food recommendation",
  "description",
  "what should i eat"
];
const greetings = [
  "hi",
  "hello",
  "hey",
  "good morning",
  "good afternoon",
  "good evening"
];

if (greetings.includes(query)) {
  return NextResponse.json({
    reply:
      "Hello! I'm the Admin Assistant. Ask me about orders, revenue, payments, menu statistics, reports, or business insights."
  });
}
const goodbye = [
  "bye",
  "goodbye",
  "see you",
  "see ya",
  "exit",
  "quit"
];

if (goodbye.includes(query)) {
  const replies = [
    "👋 Goodbye! Have a productive day.",
    "😊 See you again! I'm here whenever you need restaurant insights.",
    "👋 Thanks for using the Admin Assistant. Have a great day!"
  ];

  return NextResponse.json({
    reply: replies[Math.floor(Math.random() * replies.length)]
  });
}
if (
  query === "help" ||
  query.includes("what can you do")
) {
  return NextResponse.json({
    reply: `
I can help with:

• Orders
• Revenue
• Payments
• Order Status
• Best Selling Items
• Least Selling Items
• Unsold Items
• Menu Categories
• Order Details
• Business Analysis & Insights
`
  });
}
if (
  query === "thanks" ||
  query === "thank you"
) {
  return NextResponse.json({
    reply:
      "You're welcome! Let me know if you need any restaurant statistics or business insights. 😊"
  });
}

if (
  customerKeywords.some((word) =>
    query.includes(word)
  )
) {
  return send(
      "This is the Admin Assistant. Customer menu recommendations are available only in the customer chatbot."
  );
}

if (
  query.startsWith("today") ||
  query.includes("daily")
) {
  return send(
     `
Today's Orders: ${dailyOrders.length}
Today's Revenue: ₹${dailyRevenue}
Today's Units Sold: ${dailyUnits}
`
  );
}

if (
  query.includes("week") ||
  query.includes("weekly")
) {
  return send(
   `
Weekly Orders: ${weeklyOrders.length}
Weekly Revenue: ₹${weeklyRevenue}
Weekly Units Sold: ${weeklyUnits}
`
);
}

if (
  query.includes("month") ||
  query.includes("monthly")
) {
 return send( `
Monthly Orders: ${monthlyOrders.length}
Monthly Revenue: ₹${monthlyRevenue}
Monthly Units Sold: ${monthlyUnits}
`
 );
}

if (
  query.includes("total orders")
) {
 return send(
   `Total Orders: ${orders.length}`
);
}

 if (
    query.includes("order status")||
  query.includes("new orders") ||
  query.includes("preparing") ||
  query.includes("ready") ||
  query.includes("delivered") ||
  query.includes("cancelled")
) {
 return send ( `
NEW: ${newOrders}
PREPARING: ${preparingOrders}
READY: ${readyOrders}
DELIVERED: ${deliveredOrders}
CANCELLED: ${cancelledOrders}
`);
}

if (
  query.includes("payment status") ||
  query.includes("payment") ||
  query.includes("paid") ||
  query.includes("pending")
) {
return send( `
Payment Summary

Paid Orders: ${paidOrders}
Pending Payments: ${pendingPayments}

COD Orders: ${codOrders}
UPI Orders: ${upiOrders}
`);
}

 if (
  query.includes("menu")
) {
  
return send(
    "Please use the Menu Management page to view all menu items."
);
}

if (
  query.includes("best selling") ||
  query.includes("most sold")||
  query.includes("top selling")
) {
return send (`
Top Selling Items

${bestSellingItems
.map(([name, qty]) => `${name}: ${qty}`)
.join("\n")}
`
);
}

 if (
  query.includes("least selling")||
  query.includes("lowest selling")

) {
  return send( `
Lowest Selling Items

${leastSellingItems
.map(([name, qty]) => `${name} : ${qty}`)
.join("\n")}
`
  );
}

 if (
  query.includes("unsold")
) {
return send(`
Unsold Items

${unsoldItems.join("\n")}
`
);
}

 if (
  query.includes("cheapest")||
  query.includes("lowest price")
) {
  return send( `
Cheapest Item

${cheapestDish.name}
₹${cheapestDish.price}
`);
}

 if (
  query.includes("expensive")||
  query.includes("highest price") ||
query.includes("costliest")
) {
  return send( `
Most Expensive Item

${expensiveDish.name}
₹${expensiveDish.price}
`
);
}

 if (
  query.includes("category")
) {
  return send ( categoryStats
    .map(c => `${c.category}: ${c.count}`)
    .join("\n")
);
}

 if (
  query.includes("order details") ||
  query.includes("show orders") ||
  query.includes("list orders") ||
  query.includes("customer order")
) {
  return send ( `
Order Details

${orderDetails}
`
);
}


const needsAI =
    analysisKeywords.some(word => query.includes(word)) ||
    query.startsWith("why") ||
    query.startsWith("how can") ||
    query.startsWith("how do") ||
    query.startsWith("what should") ||
    query.startsWith("which should");


if (!needsAI) {
  console.log("Unknown Admin Query:", message);
  return send (
      "I don't have that information. Please ask about orders, sales, payments, menu, or request an analysis."
  );
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

Answer ONLY management analysis questions.

Never answer factual dashboard questions because those are already handled by the application.

Only provide:
- insights
- comparisons
- trends
- recommendations
- improvements

If the question is not analytical, reply:

"This question should be answered directly by the dashboard."
Restaurant Dashboard

${analysisContext}

Today's Date:
${new Date().toLocaleDateString()}                                          

Question:
${message}

Rules

- Use ONLY the dashboard data.
- Never invent values.
- Give practical business advice.
- Explain reasons.
- Suggest improvements.
- Maximum 5 short sentences.
- Never answer menu questions.
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

    return send (
       data.response.trim(),
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      reply:
        "Admin AI is currently unavailable.",
    });
  }
}