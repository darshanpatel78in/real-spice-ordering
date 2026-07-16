  import { NextResponse } from "next/server";
  import { menuItems, type MenuItem } from "@/lib/menu-data";
  import { searchIndex, normalize } from "@/lib/search-index";


  function normalizeWord(word: string): string {
    return word
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .replace(/ies$/, "y")
      .replace(/es$/, "")
      .replace(/s$/, "");
  }

  export async function POST(req: Request) {
    try {
      const { message } = await req.json();

      const query = message.toLowerCase().trim();

      // ----------------------------
      // Greetings
      // ----------------------------

      if (
        ["hi", "hello", "hey", "good morning", "good evening"].includes(query)
      ) {
        return NextResponse.json({
          reply:
            "Hello! 👋 Welcome to The Real Spice Restaurant. I can help you with our menu, prices, categories, dishes and recommendations.",
        });
      }

      if (
        [
          "bye",
          "goodbye",
          "see you",
          "see ya",
          "see you later",
          "thanks bye",
          "bye bye",
          "exit",
          "quit",
        ].includes(query)
      ) {
        return NextResponse.json({
          reply:
            "👋 Thank you for visiting The Real Spice Restaurant! Have a wonderful day. 😊🍽️",
        });
      }

      // ----------------------------
      // Full Menu
      // ----------------------------

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
            "\n\nAsk me about any category or dish 😊",
        });
      }

      // ----------------------------
      // Block Admin Questions
      // ----------------------------

      const adminKeywords = [
        "sale",
        "sales",
        "revenue",
        "profit",
        "earning",
        "dashboard",
        "analytics",
        "admin",
        "orders",
        "payments",
        "customer count",
        "monthly sale",
        "weekly sale",
        "daily sale",
      ];

      if (adminKeywords.some((word) => query.includes(word))) {
        return NextResponse.json({
          reply:
            "Sorry, I'm the customer assistant. I can help only with menu items, prices and recommendations.",
        });
      }

      let matches: MenuItem[] = [];

      // ----------------------------
      // Intent Detection
      // ----------------------------

      const wantsDescription =
        query.includes("description") ||
        query.includes("details") ||
        query.includes("about");

      const wantsIngredients =
        query.includes("ingredient") ||
        query.includes("ingredients") ||
        query.includes("contains") ||
        query.includes("made of");

      const wantsPrice =
        query.includes("price") ||
        query.includes("cost") ||
        query.includes("how much");

      const wantsRecommendation =
        query.includes("recommend") ||
        query.includes("suggest") ||
        query.includes("best") ||
        query.includes("special");

    const aiWords = [
  "healthy",
  "sweet",
  "spicy",
  "hot",
  "mild",
  "vegan",
  "vegetarian",
  "contains",
  "contain",
  "ingredient",
  "ingredients",
  "good",
  "kids",
  "children",
  "recommend",
  "suggest",
  "taste",
  "flavour",
  "flavor",
  "onion",
  "garlic"
];

  const isAIQuestion =
    aiWords.some(word => query.includes(word));

        console.log(
    matches.map(item => ({
      name: item.name,
      tags: item.tags
    }))
  );

      // ----------------------------
      // Price Filter
      // ----------------------------

      const underMatch = query.match(/under\s+(\d+)/);

      if (underMatch) {
        const maxPrice = Number(underMatch[1]);

        matches = menuItems.filter(
          (item) => item.price !== null && item.price <= maxPrice
        );

        return NextResponse.json({
          reply: matches.length
            ? matches
                .map((item) => `🍽️ ${item.name}\nPrice: ₹${item.price}`)
                .join("\n\n")
            : `Sorry, we don't have dishes under ₹${maxPrice}.`,
        });
      }
  // ----------------------------
  // Cheap / Expensive Items
  // ----------------------------

  const cheapWords = [
    "cheap",
    "cheapest",
    "low price",
    "low priced",
    "budget",
    "affordable",
    "economical",
    "less expensive"
  ];

  const expensiveWords = [
    "expensive",
    "costly",
    "premium",
    "luxury",
    "highest price",
    "high price",
    "most expensive"
  ];

  if (cheapWords.some(word => query.includes(word))) {

  const items = menuItems
    .filter(item => item.price !== null)
    .sort((a, b) => Number(a.price) - Number(b.price))
    .slice(0, 10);

    return NextResponse.json({
      reply:
        "💰 Cheapest items:\n\n" +
        items
          .map(item => `🍽️ ${item.name}\n₹${item.price}`)
          .join("\n\n")
    });
  }

  if (expensiveWords.some(word => query.includes(word))) {
    const items = menuItems
    .filter(item => item.price !== null)
    .sort((a, b) => Number(b.price) - Number(a.price))
    .slice(0, 10);

    return NextResponse.json({
      reply:
        "⭐ Most Expensive items:\n\n" +
        items
          .map(item => `🍽️ ${item.name}\n₹${item.price}`)
          .join("\n\n")
    });
  }
  // ----------------------------
  // Price Above Filter
  // ----------------------------

  const aboveMatch = query.match(
    /(above|over|greater than|more than)\s+(\d+)/
  );

  if (aboveMatch) {

    const minPrice = Number(aboveMatch[2]);

    const items = menuItems
      .filter(
        item =>
          item.price !== null &&
          item.price >= minPrice
      )
      .sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

    return NextResponse.json({
      reply: items.length
        ? `💎 Items above ₹${minPrice}:\n\n` +
          items
            .map(
              item =>
                `🍽️ ${item.name}\nPrice: ₹${item.price}`
            )
            .join("\n\n")
        : `No items found above ₹${minPrice}.`
    });

  }

  // ----------------------------
  // Price Between Filter
  // ----------------------------

  const betweenMatch = query.match(
    /between\s+(\d+)\s+(?:to|and)\s+(\d+)/
  );

  if (betweenMatch) {
    const minPrice = Number(betweenMatch[1]);
    const maxPrice = Number(betweenMatch[2]);

    const items = menuItems
      .filter(
        (item) =>
          item.price !== null &&
          item.price >= minPrice &&
          item.price <= maxPrice
      )
      .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

    return NextResponse.json({
      reply: items.length
        ? `💰 Items between ₹${minPrice} and ₹${maxPrice}:\n\n` +
          items
            .map(
              (item) =>
                `🍽️ ${item.name}\nPrice: ₹${item.price}`
            )
            .join("\n\n")
        : `Sorry, no items found between ₹${minPrice} and ₹${maxPrice}.`,
    });
  }
      // ----------------------------
      // Stop Words
      // ----------------------------

const stopWords = [
  "show",
  "give",
  "list",
  "all",
  "item",
  "items",
  "food",
  "foods",
  "dish",
  "dishes",
  "please",
  "recommend",
  "suggest",
  "me",
  "the",
  "is",
  "are",
  "what",
  "of",
  "with",
  "for",
  "want",
  "need",
  "price",
  "prices",
  "cost",
  "how",
  "much",
  "only"
];

  const searchWords = query
    .split(/\s+/)
    .map(normalize)
    .filter(
      (word:string) =>
        word.length > 0 &&
        !stopWords.includes(word)
    );

const scored = searchIndex
  .map(({ item, words }) => {

    let score = 0;

    for (const search of searchWords) {

      if (
        normalize(item.name).includes(search)
      ) {
        score += 100;
      }

      if (
        item.tags?.some(tag => normalize(tag) === search)
      ) {
        score += 30;
      }

      if (
        words.includes(search)
      ) {
        score += 5;
      }
    }

    return { item, score };

  });

const maxScore = Math.max(...scored.map(s => s.score));

matches = scored
.filter(s => s.score >= 30)
  .sort((a,b)=>b.score-a.score)
  .map(s=>s.item);
  console.log(matches.map(i => i.name));
if (matches.length === 0) {
    return NextResponse.json({
      reply: "Sorry, I couldn't find any matching dish."
    });
  }
    const needsAI =
  isAIQuestion ||
  wantsRecommendation;
  if (!needsAI) {

  if (wantsPrice) {
    return NextResponse.json({
      reply: matches
        .map(item => `🍽️ ${item.name}\nPrice: ₹${item.price}`)
        .join("\n\n")
    });
  }

  if (wantsDescription) {
    return NextResponse.json({
      reply: matches
        .map(item =>
          `🍽️ ${item.name}\nDescription: ${item.description ?? "Not available"}`
        )
        .join("\n\n")
    });
  }

  if (wantsIngredients) {
    return NextResponse.json({
      reply: matches
        .map(item =>
          `🍽️ ${item.name}\nIngredients: ${item.items?.join(", ") ?? "Not available"}`
        )
        .join("\n\n")
    });
  }

  return NextResponse.json({
    reply: matches
      .map(item => `🍽️ ${item.name}`)
      .join("\n")
  });

}

      // ----------------------------
      // Build AI Context
      // ----------------------------
const context = `
Dish: ${matches[0].name}
Category: ${matches[0].category}
Price: ₹${matches[0].price}
Description: ${matches[0].description ?? ""}
Tags: ${matches[0].tags?.join(", ") ?? ""}
Ingredients: ${matches[0].items?.join(", ") ?? ""}
`; 
      // ----------------------------
      // Build Prompt
      // ----------------------------

const prompt = `
You are the customer assistant of The Real Spice Restaurant.

Answer ONLY using the dish information below.

${context}

Customer Question:
${message}

Rules:

- Answer ONLY about this dish.
- Never mention any other dish.
- Never recommend another dish unless asked.
- If the information is not present, reply:
  "This information is not available in our menu."
- Maximum 2 short sentences.
`;
      // ----------------------------
      // Ask Ollama
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
              num_predict: 120,
            },
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
      console.error("Chatbot Error:", error);

      return NextResponse.json({
        reply:
          "Sorry, the AI assistant is currently unavailable. Please try again later.",
      });
    }
  }