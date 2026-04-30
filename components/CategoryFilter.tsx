"use client";

import { categories } from "@/lib/menu-data";

type Props = {
  active: string;
  onChange: (cat: string) => void;
};

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2 px-4 md:px-0 md:justify-center md:flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
            active === cat
              ? "bg-accent-green text-white shadow-[0_4px_16px_rgba(107,122,47,0.35)]"
              : "bg-bg-elevated text-text-secondary hover:bg-bg-elevated/80 hover:text-text-primary border border-border-subtle"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
