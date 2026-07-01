"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import type { MenuItem } from "@/lib/menu-data";

type Props = {
  item: MenuItem;
  index: number;
  variant?: "grid" | "list";
};

export default function MenuCard({ item, index, variant = "grid" }: Props) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();
  const cartItem = cart.find((ci) => ci.id === item.id);
  const isDataUrlImage = item.image.startsWith("data:");

  const hasPrice = item.price !== null;

  const renderActions = () => {


    if (cartItem) {
      return (
        <div className="flex items-center gap-2 cursor-pointer">
          <button
            onClick={() => decreaseQty(item.id)}
            className="btn-shine rounded-full bg-[#c62828] px-5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#a61f1f] hover:shadow-[0_8px_30px_rgba(198,40,40,0.3)] cursor-pointer"
          >
            −
          </button>
          <span className="min-w-[24px] text-center text-sm font-semibold text-text-primary ">
            {cartItem.quantity}
          </span>
          <button
            onClick={() => increaseQty(item.id)}
            className="btn-shine rounded-full bg-[#c62828] px-5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#a61f1f] hover:shadow-[0_8px_30px_rgba(198,40,40,0.3)] cursor-pointer"
          >
            +
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() =>
          addToCart({
            id: item.id,
            name: item.name,
            price: item.price!,
          })
        }
        className="btn-shine rounded-full bg-[#c62828]  px-5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#a61f1f] hover:shadow-[0_8px_30px_rgba(198,40,40,0.3)] cursor-pointer "
      >
        Add to Cart
      </button>
    );
  };

  if (variant === "list") {
    return (
      <div className="rounded-2xl border border-border-subtle bg-bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {item.isVeg && (
                <span className="flex h-5 w-5 items-center justify-center rounded border border-green-500 bg-bg-dark/80">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
              )}
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-text-primary">
                {item.name}
              </h3>
            </div>

            {item.description && (
              <p className="mt-1 text-sm text-text-muted">{item.description}</p>
            )}

            {item.items && item.items.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.items.map((subItem: string) => (
                  <span
                    key={subItem}
                    className="rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-0.5 text-[10px] text-text-secondary"
                  >
                    {subItem}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {hasPrice ? (
              <p className="text-lg font-bold text-accent-gold">₹{item.price}</p>
            ) : (
              <p className="text-sm font-medium text-text-muted italic">
                Price on request
              </p>
            )}
            {renderActions()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`card-glow group rounded-2xl bg-bg-card border border-border-subtle overflow-hidden animate-fade-in-up stagger-${Math.min(index + 1, 10)}`}
    >
      {/* Image */}
      <div className="relative h-44 md:h-52 w-full overflow-hidden">
        {item.image ? (
          isDataUrlImage ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )
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
            <p className="text-xl font-bold text-accent-gold">₹{item.price}</p>
          ) : (
            <p className="text-sm font-medium text-text-muted italic">
              Price on request
            </p>
          )}

          {renderActions()}
        </div>
      </div>
    </div>
  );
}
