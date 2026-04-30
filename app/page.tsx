"use client";

import { useState } from "react";
import { menuItems } from "@/lib/menu-data";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import MenuCard from "@/components/MenuCard";
import CartBar from "@/components/CartBar";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-bg-dark">
      {/* Hero */}
      <Hero />

      {/* Menu Section */}
      <section id="menu" className="px-4 pb-32 md:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section heading */}
          <div className="mb-8 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-accent-green font-medium mb-2">
              Crafted with Love
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-text-primary mb-3">
              Our Menu
            </h2>
            <div className="section-divider mx-auto w-16 mb-6" />
          </div>

          {/* Category filter */}
          <div className="mb-8">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Menu grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-muted text-lg">
                No items in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Floating Cart Bar */}
      <CartBar />

      {/* Footer */}
      <Footer />
    </main>
  );
}
