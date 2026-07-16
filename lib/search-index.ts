import { menuItems } from "./menu-data";

function normalize(word: string) {
  return word
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/ies$/, "y")
    .replace(/es$/, "")
    .replace(/s$/, "");
}

export const searchIndex = menuItems.map((item) => {
  const words = [
    item.name,
    item.category,
    item.description ?? "",
    ...(item.items ?? []),
    ...(item.tags ?? [])
  ]
    .join(" ")
    .split(/\s+/)
    .map(normalize);

  return {
    item,
    words: [...new Set(words)],
  };
});

export { normalize };