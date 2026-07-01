"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function CartBar() {
  const { cart } = useCartStore();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-2xl animate-slide-up">
      <div className="glass rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-accent-green/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-text-primary">
              {totalItems} {totalItems === 1 ? "item" : "items"} added
            </p>
            <p className="text-lg font-bold text-accent-gold">
              ₹{totalAmount}
            </p>
          </div>

          <Link
            href="/cart"
            className="btn-shine flex items-center gap-2 rounded-full bg-[#c62828] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#a61f1f] hover:shadow-[0_4px_16px_rgba(198,40,40,0.35)]"
          >
            <span>View Cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
