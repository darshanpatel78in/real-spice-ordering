"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export default function Header() {
  const { cart } = useCartStore();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#120d0a]/95 px-4 py-4 text-white backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="text-lg font-bold text-orange-400">
          The Real Spice
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/">Menu</Link>

          <Link href="/cart" className="relative">
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-3 -top-3 rounded-full bg-orange-500 px-2 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <Link href="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}