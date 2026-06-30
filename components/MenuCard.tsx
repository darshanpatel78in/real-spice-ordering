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

  const hasPrice = item.price !== null;

  return (
    <div
      className={`card-glow group rounded-2xl bg-bg-card border border-border-subtle overflow-hidden animate-fade-in-up stagger-${Math.min(index + 1, 10)}`}
    >
      {/* Image */}
      <div className="relative h-44 md:h-52 w-full overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            role="img"
            aria-label={item.name}
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url('/images/placeholder.svg')` }}
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />

        {/* Category badge */}
        {/* <span className="absolute top-3 left-3 rounded-full bg-accent-green/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {item.category}
        </span> */}

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

        {/* Thali items list */}
        {item.items && item.items.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {item.items.map((subItem: string) => (
              <span
                key={subItem}
                className="rounded-full bg-bg-elevated px-2.5 py-0.5 text-[10px] text-text-secondary border border-border-subtle"
              >
                {subItem}
              </span>
            ))}
          </div>
        )}

        {/* Description (for non-thali items) */}
        {!item.items && item.description && (
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          {/* Price */}
          {hasPrice ? (
            <p className="text-xl font-bold text-accent-gold">
              ₹{item.price}
            </p>
          ) : (
            <p className="text-sm font-medium text-text-muted italic">
              Price on request
            </p>
          )}

          {/* Add / Qty controls */}
          {hasPrice ? (
            cartItem ? (
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
                    price: item.price!,
                  })
                }
                className="btn-shine rounded-full bg-accent-red px-5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-accent-red-light hover:shadow-[0_4px_16px_rgba(198,40,40,0.3)]"
              >
                Add to Cart
              </button>
            )
          ) : (
            <a
              href="https://wa.me/919408227397?text=Hi%2C%20I%20want%20to%20enquire%20about%20the%20price%20of%20" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine rounded-full bg-accent-green px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-accent-green-light"
            >
              Enquire
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
