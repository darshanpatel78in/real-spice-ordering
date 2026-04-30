"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import type { MenuItem } from "@/lib/menu-data";

type Props = {
  item: MenuItem;
  index: number;
};

export default function MenuCard({ item, index }: Props) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();
  const cartItem = cart.find((ci) => ci.id === item.id);

  return (
    <div
      className={`card-glow group rounded-2xl bg-bg-card border border-border-subtle overflow-hidden animate-fade-in-up stagger-${Math.min(index + 1, 10)}`}
    >
      {/* Image */}
      <div className="relative h-44 md:h-52 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-accent-green/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {item.category}
        </span>

        {/* Veg indicator */}
        {item.isVeg && (
          <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded border border-green-500 bg-bg-dark/80 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-text-primary mb-1">
          {item.name}
        </h3>
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          {/* Price */}
          <p className="text-xl font-bold text-accent-gold">
            ₹{item.price}
          </p>

          {/* Add / Qty controls */}
          {cartItem ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated text-text-secondary hover:bg-accent-red hover:text-white transition-all duration-200 text-sm font-bold"
              >
                −
              </button>
              <span className="min-w-[24px] text-center text-sm font-semibold text-text-primary">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => increaseQty(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-green text-white hover:bg-accent-green-light transition-all duration-200 text-sm font-bold"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                })
              }
              className="btn-shine rounded-full bg-accent-red px-5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-accent-red-light hover:shadow-[0_4px_16px_rgba(198,40,40,0.3)]"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
