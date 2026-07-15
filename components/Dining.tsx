// app/components/Dining.tsx

"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";

const bambooDining = [
  {
    title: "Open-Air Courtyard",
    description: "Dine under the stars in our airy central hub.",
    image: "/images/restro1.png"
  },
  {
    title: "Intimate Pavilions",
    description:
      "Hand-crafted bamboo shelters for private moments.",
    image: "/images/restro2.png"
  },
  {
    title: "Family Clusters",
    description:
      "Spacious arrangements designed for gatherings.",
    image: "/images/restro3.png"
  },
];

const specials = [
  {
    title: "Authentic Paneer Tikka",
    description:
      "Cubed cottage cheese marinated in hung curd and our secret spice blend, charred in the clay oven.",
    price: "₹280",
    image: "/images/img2.png",
    badge: "Best Seller",
  },
  {
    title: "Rich Dal Makhani",
    description:
      "Slow-cooked black lentils overnight with butter and cream, finished with aromatic Kashmiri chilies.",
    price: "₹220",
    image: "/images/img3.png"
  },
  {
    title: "Handcrafted Butter Naan",
    description:
      "Traditional leavened bread, hand-stretched and cooked in a tandoor, brushed with melted pure ghee.",
    price: "₹45",
    image: "/images/img1.png"
  },
];


export default function Dining() {

  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore();

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-dark)] py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[var(--color-accent-gold)]/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--color-accent-green)]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* ========================= */}
        {/* BAMBOO DINING SECTION */}
        {/* ========================= */}

        <div className="mb-20 text-center">
          <p className="mb-3 text-xs md:text-sm uppercase tracking-[0.35em] text-[var(--color-accent-gold)] font-medium">
            Modern Rustic Ambiance
          </p>

          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Our Unique Bamboo Dining
          </h2>
        </div>

        <div className="mb-28 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bambooDining.map((space, index) => (
            <div
              key={index}
              className="group relative glass overflow-hidden rounded-3xl border border-[rgba(212,168,67,0.08)]  shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_60px_rgba(212,168,67,0.12)]"
            >
              <div className="relative h-[260px] sm:h-[340px] md:h-[430px] w-full overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <div className="absolute bottom-0 left-0 z-10 p-6">
                  <h3 className="mb-2 line-clamp-2 font-[family-name:var(--font-playfair)] text-xl md:text-3xl font-bold leading-tight text-[var(--color-accent-gold-light)]">
                    {space.title}
                  </h3>

                  <p className="max-w-xs text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)] font-light">
                    {space.description}
                  </p>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-500 group-hover:ring-[rgba(212,168,67,0.2)]" />
              </div>
            </div>
          ))}
        </div>

        {/* ========================= */}
        {/* CHEF SPECIALS SECTION */}
        {/* ========================= */}

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 ml-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent-gold)]">
              The Kitchen Masterpieces
            </p>

            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Chef's Signature Specials
            </h2>
          </div>

          <a
            href="/menu"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-gold)] transition-all hover:text-[var(--color-accent-gold-light)]"
          >
            View All Specialties

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {specials.map((item, index) => (
            <div
              key={index}
              className="group card-glow glass animate-[var(--animate-fade-in-up)] overflow-hidden rounded-3xl border border-[rgba(212,168,67,0.08)] shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_60px_rgba(212,168,67,0.12)]"            >
              {/* Image */}
              <div className="relative aspect-[50/28] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Badge */}
                {item.badge && (
                  <div className="absolute right-4 top-4 rounded-full bg-[var(--color-accent-gold)] px-4 py-1 text-xs font-semibold text-black shadow-lg">
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 truncate whitespace-nowrap font-[family-name:var(--font-playfair)] lg:text-xl md:text-lg font-bold text-[var(--color-text-primary)]">
                  {item.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {item.description}
                </p>

                {/* Footer */}

                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-lg font-extrabold text-white ">
                    {item.price}
                  </span>

                  {(() => {
                    const cartItem = cart.find((ci) => ci.name === item.title);

                    if (cartItem) {
                      return (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQty(cartItem.id)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c62828] text-lg font-bold text-white transition-all duration-300 hover:bg-[#a61f1f] hover:scale-110 cursor-pointer"
                          >
                            −
                          </button>

                          <span className="min-w-[24px] text-center text-base font-bold text-white">
                            {cartItem.quantity}
                          </span>

                          <button
                            onClick={() => increaseQty(cartItem.id)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c62828] text-lg font-bold text-white transition-all duration-300 hover:bg-[#a61f1f] hover:scale-110 cursor-pointer"
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
                            id: index + 1000,
                            name: item.title,
                            price: Number(item.price.replace("₹", "")),
                          })
                        }
                        className="rounded-full bg-[#c62828] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#a61f1f] hover:scale-105 cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    );
                  })()}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-500 group-hover:ring-[rgba(212,168,67,0.2)] " />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}