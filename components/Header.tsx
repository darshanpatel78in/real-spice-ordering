"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { cart } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="glass-strong sticky top-0 z-50 w-full overflow-x-hidden px-4 py-3 md:py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border border-accent-green/30 transition-all duration-300 group-hover:border-accent-green/60 group-hover:shadow-[0_0_12px_rgba(107,122,47,0.3)]">
            <Image
              src="/logo.png"
              alt="The Real Spice"
              fill
              className="object-cover"
              priority
              sizes="100px"
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-[family-name:var(--font-playfair)] text-lg font-bold text-text-primary leading-tight">
              The Real Spice
            </p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-accent-gold/80">
              Authentic Cuisine
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className="text-[var(--color-text-secondary)] text-sm font-semibold transition-all duration-300 hover:text-[var(--color-accent-gold)] hover:scale-105 cursor-pointer">    Home
          </Link>
          <Link
            href="/menu"
            className="text-[var(--color-text-secondary)] text-sm font-semibold transition-all duration-300 hover:text-[var(--color-accent-gold)] hover:scale-105 cursor-pointer" >
            Menu
          </Link>

          {!isAdminPage && (
            <>
              <Link
                href="/cart"
                className="text-[var(--color-text-secondary)] text-sm font-semibold transition-all duration-300 hover:text-[var(--color-accent-gold)] hover:scale-105 cursor-pointer"
              >
                Cart
                {totalItems > 0 && (
                  <span className="absolute -right-5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent-red text-[10px] font-bold text-white animate-bounce-in">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link
                href="/checkout"
                className="text-[var(--color-text-secondary)] text-sm font-semibold transition-all duration-300 hover:text-[var(--color-accent-gold)] hover:scale-105 cursor-pointer"
              >
                Checkout
              </Link>
            </>
          )}
        </nav>
        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          {!isAdminPage && (
            <Link href="/cart" className="relative text-text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent-red text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <nav className="md:hidden mt-4 pb-2 border-t border-border-subtle pt-4 animate-fade-in-up space-y-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block text-text-secondary hover:text-accent-gold transition-colors py-1"
          >
            Home
          </Link>
          <Link
            href="/menu"
            onClick={() => setMenuOpen(false)}
            className="block text-text-secondary hover:text-accent-gold transition-colors py-1"
          >
            Menu
          </Link>

          {!isAdminPage && (
            <>
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="block text-text-secondary hover:text-accent-gold transition-colors py-1"
              >
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>

              <Link
                href="/checkout"
                onClick={() => setMenuOpen(false)}
                className="block text-text-secondary hover:text-accent-gold transition-colors py-1"
              >
                Checkout
              </Link>

            </>
          )}
        </nav>
      )}
    </header>
  );
}