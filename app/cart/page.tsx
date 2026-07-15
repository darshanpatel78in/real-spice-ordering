"use client";

import { useCartStore } from "@/store/cart-store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } =
    useCartStore();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-bg-dark">
      <Header />
      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent-green font-medium mb-1">Review</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-text-primary">Your Cart</h1>
          </div>
          {cart.length > 0 && (
<button
  onClick={clearCart}
  className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-red-500 active:scale-95 cursor-pointer"
>              Clear All
            </button>
          )}
        </div>

        <div className="section-divider mb-8" />

        {cart.length === 0 ? (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-bg-card border border-border-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-text-primary mb-2">Your cart is empty</h2>
            <p className="text-sm text-text-muted mb-6">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/menu" className="btn-shine inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-green-light hover:shadow-[0_6px_20px_rgba(107,122,47,0.25)] cursor-pointer">
              ← Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, i) => (
              <div key={item.id} className="rounded-2xl bg-bg-card border border-border-subtle p-5 animate-fade-in-up"
style={{
  animationDelay: `${i * 0.05}s`,
}}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h2 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text-primary">{item.name}</h2>
                    <p className="text-sm text-text-muted mt-0.5">₹{item.price} each</p>
                  </div>
                  <p className="text-lg font-bold text-accent-gold">₹{item.price * item.quantity}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
  onClick={() => decreaseQty(item.id)}
  className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-700 text-white transition-all duration-200 hover:bg-yellow-500 active:scale-95 font-bold text-sm cursor-pointer"
>
  −
</button>

<span className="min-w-[28px] text-center font-semibold text-text-primary">
  {item.quantity}
</span>

<button
  onClick={() => increaseQty(item.id)}
  className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-700 text-white transition-all duration-200 hover:bg-yellow-500 active:scale-95 font-bold text-sm cursor-pointer"
>
  +
</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-xs text-text-muted hover:text-accent-red transition-colors duration-200 cursor-pointer">Remove</button>
                </div>
              </div>
            ))}

            {/* Order summary */}
            <div className="mt-6 rounded-2xl bg-bg-card border border-accent-green/20 p-5 animate-fade-in-up">
              <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text-primary mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Delivery</span>
                  <span className="text-accent-green">Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border-subtle flex justify-between items-center">
                <span className="text-base font-semibold text-text-primary">Total</span>
                <span className="text-2xl font-bold text-accent-gold">₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4 animate-fade-in-up">
              <Link href="/checkout" className="btn-shine block w-full rounded-full bg-[#c62828] py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-[#a61f1f] hover:shadow-[0_8px_30px_rgba(198,40,40,0.3)]">
                Proceed to Checkout
              </Link>
              <Link href="/menu" className="block w-full rounded-full border border-border-subtle py-3.5 text-center text-sm font-medium text-text-secondary transition-all duration-300 hover:border-accent-green/40 hover:text-text-primary">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
