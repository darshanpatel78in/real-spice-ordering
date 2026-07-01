"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import { menuItems, categories as staticCategories, type MenuItem } from "@/lib/menu-data";
import CategoryFilter from "@/components/CategoryFilter";
import MenuCard from "@/components/MenuCard";
import CartBar from "@/components/CartBar";
import Footer from "@/components/Footer";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [menuData, setMenuData] = useState<MenuItem[]>(menuItems);

  const getCategoryList = (items: MenuItem[]) => {
    const categories = [...staticCategories];
    items.forEach((item) => {
      if (item.category && !categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
    return categories;
  };

  const categories = useMemo(() => getCategoryList(menuData), [menuData]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem("admin-added-menu-items");
    const deletedIdsRaw = window.localStorage.getItem("admin-deleted-menu-item-ids");

    let deletedIds: number[] = [];
    if (deletedIdsRaw) {
      try {
        const parsedDeleted = JSON.parse(deletedIdsRaw);
        if (Array.isArray(parsedDeleted)) {
          deletedIds = parsedDeleted;
        }
      } catch (error) {
        console.error("Failed to load deleted menu item ids:", error);
      }
    }

    if (!saved) {
      setMenuData(menuItems.filter((item) => !deletedIds.includes(item.id)));
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setMenuData([...menuItems, ...parsed].filter((item) => !deletedIds.includes(item.id)));
      } else {
        setMenuData(menuItems.filter((item) => !deletedIds.includes(item.id)));
      }
    } catch (error) {
      console.error("Failed to load saved menu items:", error);
      setMenuData(menuItems.filter((item) => !deletedIds.includes(item.id)));
    }
  }, []);

  const groupedItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredBySearch = menuData.filter((item) =>
      item.name.toLowerCase().includes(normalizedSearch)
    );

    const filteredByCategory =
      activeCategory === "All"
        ? filteredBySearch
        : filteredBySearch.filter((item) => item.category === activeCategory);

    return filteredByCategory.reduce<Record<string, typeof menuItems>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [activeCategory, searchTerm]);

  const slugifyCategory = (category: string) =>
    category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <main className="min-h-screen bg-bg-dark">
      <Header />

      <section className="px-4 pb-32 pt-8 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-accent-green">
              Crafted with Love
            </p>

            <h1 className="mb-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-text-primary md:text-4xl">
              Our Menu
            </h1>

            <div className="section-divider mx-auto mb-6 w-16" />
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative left-1/2 right-1/2 w-screen max-w-full -translate-x-1/2">
              <div className="relative w-full border border-border-subtle bg-bg-card shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search menu items"
                  className="w-full border-none bg-transparent px-14 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
                />
              </div>
            </div>

            <div className="relative left-1/2 right-1/2 w-screen max-w-full -translate-x-1/2">
              <CategoryFilter
                categoryOptions={categories}
                active={activeCategory}
                onChange={handleCategoryChange}
              />
            </div>
          </div>

          <div className="space-y-10">
            {Object.entries(groupedItems).map(([category, items]) => (
              <section
                key={category}
                id={slugifyCategory(category)}
                className="scroll-mt-24"
              >
                <div className="mb-5 border-b border-border-subtle pb-2">
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-text-primary text-center">
                    {category}
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((item, index) => (
                    <MenuCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {Object.keys(groupedItems).length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-text-muted">
                No items in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <CartBar />
      <Footer />
    </main>
  );
}
