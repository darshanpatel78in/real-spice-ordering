"use client";

import React from "react";

type Props = {
  categoryOptions: string[];
  active: string;
  onChange: (cat: string) => void;
};

export default function CategoryFilter({ categoryOptions, active, onChange }: Props) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = (container: HTMLDivElement) => {
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 1);
  };

  const scrollCategories = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const offset = direction === "left" ? -280 : 280;
    container.scrollBy({ left: offset });
  };

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollState(container);

    const handleScroll = () => updateScrollState(container);
    const handleResize = () => updateScrollState(container);

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollCategories("left")}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white shadow-lg transition hover:bg-white/20 cursor-pointer "
          aria-label="Scroll categories left"
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      )}

      <div
        ref={scrollRef}
        className="scrollbar-hide flex w-full gap-2 overflow-x-auto border border-border-subtle bg-bg-card/90 px-10 py-3 text-text-secondary shadow-sm md:justify-start"
      >
        {categoryOptions.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`
              shrink-0
              cursor-pointer
              rounded-2xl
              border
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-300
              backdrop-blur-sm
              bg-accent-red/10
              active:scale-95
              ${
                active === cat
                  ? "border-accent-red bg-accent-red text-white shadow-[0_0_20px_rgba(198,40,40,0.35)]"
                  : "border-border-subtle bg-bg-card text-text-secondary hover:border-accent-red/40 hover:bg-bg-elevated hover:text-white"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollCategories("right")}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white shadow-lg transition hover:bg-white/20 cursor-pointer"
          aria-label="Scroll categories right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
