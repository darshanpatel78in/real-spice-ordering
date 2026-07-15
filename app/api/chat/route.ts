import { NextResponse } from "next/server";
import { menuItems, type MenuItem } from "@/lib/menu-data";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const query = message.toLowerCase().trim();

 if (
      ["hi", "hello", "hey", "good morning", "good evening"].includes(query)
    ) {
      return NextResponse.json({
        reply:
          "Hello! 👋 Welcome to The Real Spice Restaurant. I can help you with our menu, prices, categories, and dish recommendations.",
      });
    }

    if (
      query === "menu" ||
      query.includes("show menu") ||
      query.includes("full menu") ||
      query.includes("what's on the menu") ||
      query.includes("what do you have")
    ) {
      const categories = [...new Set(menuItems.map((m) => m.category))];

      return NextResponse.json({
        reply:
          "Our menu includes:\n\n• " +
          categories.join("\n• ") +
          "\n\nAsk me about any category or dish for more details. 😊",
      });
    }

    const adminKeywords = [
  "sale",
  "sales",
  "revenue",
  "earning",
  "profit",
  "order",
  "orders",
  "payment",
  "pending payment",
  "dashboard",
  "analytics",
  "admin",
  "monthly sale",
  "weekly sale",
  "daily sale",
  "best selling",
  "most sold",
  "least sold",
  "unsold",
  "total revenue",
  "customer count",
];

if (adminKeywords.some((word) => query.includes(word))) {
  return NextResponse.json({
    reply:
      "Sorry, I'm the customer assistant. I can help with our menu, dishes, prices, categories, and restaurant information only. 😊",
  });
}

let matches: MenuItem[] = []; 
   // ----------------------------
    // Category Intent Detection
    // ----------------------------

    if (query.includes("juice")) {
      matches = menuItems.filter(
        (item) =>
          item.category === "Fresh Fruit Juice" ||
          item.category === "Real Packed Juice Glass" ||
          item.name.toLowerCase().includes("juice")
      );
    } else if (query.includes("pantry")) {
      matches = menuItems.filter(
        (item) => item.category === "Pantry"
      );
    } else if (query.includes("soup")) {
      matches = menuItems.filter(
        (item) => item.category === "Soup"
      );
    } else if (
      query.includes("roti") ||
      query.includes("naan") ||
      query.includes("paratha")
    ) {
      matches = menuItems.filter(
        (item) => item.category === "Tandoori Roti"
      );
    } else if (query.includes("paneer")) {
      matches = menuItems.filter(
        (item) =>
          item.category === "Real Spice Paneer Special" ||
          item.category === "Veg Tandoori Starter" ||
          item.name.toLowerCase().includes("paneer")
      );
    } else if (
      query.includes("rice") ||
      query.includes("biryani") ||
      query.includes("pulav") ||
      query.includes("pulao")
    ) {
      matches = menuItems.filter(
        (item) =>
          item.category === "Spice Rice and Biryani" ||
          item.category === "Chinese Rice & Noodles"
      );
    } else if (query.includes("dessert") || query.includes("sweet")) {
      matches = menuItems.filter(
        (item) => item.category === "Dessert"
      );
    } else if (
      query.includes("starter") ||
      query.includes("chinese")
    ) {
      matches = menuItems.filter(
        (item) =>
          item.category === "Chinese Veg Starter"
      );
    } else if (query.includes("dal")) {
      matches = menuItems.filter(
        (item) =>
          item.category === "Real Dal Spice" ||
          item.name.toLowerCase().includes("dal")
      );
    }

    // ----------------------------
    // Normal Search
    // ----------------------------

    if (matches.length === 0) {
        const words: string[] = query
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

      matches = menuItems.filter((item) => {
        const searchable = [
          item.name,
          item.category,
          item.description ?? "",
          ...(item.items ?? []),
        ]
          .join(" ")
          .toLowerCase();

        return words.some((word: string) => searchable.includes(word));
      });
    }

    // ----------------------------
    // Exact Dish Match
    // ----------------------------

    const exact = menuItems.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    if (exact.length > 0) {
      matches = exact;
    }

    // Remove duplicates

    matches = matches.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.id === item.id)
    );

    // Limit results

    matches = matches.slice(0, 10);

    // ----------------------------
    // Nothing Found
    // ----------------------------

    if (matches.length === 0) {
      return NextResponse.json({
        reply:
          "Sorry, I couldn't find any matching dish on our menu.",
      });
    }

    // ----------------------------
    // Build Context
    // ----------------------------

const wantsDescription =
  query.includes("description") ||
  query.includes("details") ||
  query.includes("about") ||
  query.includes("what is") ||
  query.includes("tell me about");

const wantsIngredients =
  query.includes("ingredient") ||
  query.includes("ingredients") ||
  query.includes("made of") ||
  query.includes("contains");


const context = matches
  .map((m) => {
    let text = `
Dish: ${m.name}
Price: ₹${m.price}
Category: ${m.category}
`;

    if (wantsDescription) {
      text += `Description: ${m.description ?? "No description"}\n`;
    }

    if (wantsIngredients) {
      text += `Ingredients: ${
        m.items?.join(", ") || "Not available"
      }\n`;
    }

    return text;
  })
  .join("\n");

    const prompt = `
You are the official customer assistant of The Real Spice Restaurant.

Customer asked:

"${message}"

Relevant menu:

${context}

Rules:

- Answer ONLY using the menu provided.
- Never invent dishes.
- Never invent prices.
- Mention prices whenever a dish is discussed.
- Show descriptions ONLY if the customer asks.
- Show ingredients ONLY if the customer asks.
- If multiple dishes match, use bullet points.
- If asked for recommendations, recommend only from the menu above.
- Never answer questions about sales, revenue, payments, orders, or restaurant analytics.
- If asked an admin/business question, politely say you only help customers.
- Keep the answer under 100 words.
- Use simple English.
`;
    // ----------------------------
    // Ollama
    // ----------------------------

    const response = await fetch(
      "http://127.0.0.1:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2.5:0.5b",
          prompt,
          stream: false,
          options: {
            temperature: 0.2,
            num_predict: 300,          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Unable to connect to Ollama");
    }

    const data = await response.json();

    return NextResponse.json({
      reply: data.response.trim(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      reply:
        "Sorry, the AI assistant is currently unavailable.",
    });
  }
}