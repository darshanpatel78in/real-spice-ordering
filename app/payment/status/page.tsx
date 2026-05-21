"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();

  const isSuccess = searchParams.get("success") === "true";
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess, clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-up">
      {isSuccess ? (
        <>
          <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-accent-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-text-primary mb-2">
            Payment Successful!
          </h1>
          <p className="text-text-secondary mb-8 max-w-md">
            Your order {orderId ? `(#${orderId.slice(-6)}) ` : ""}has been placed successfully. 
            We will start preparing your delicious food right away!
          </p>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-bg-elevated border border-border-subtle rounded-full text-sm font-medium text-text-primary hover:border-accent-green/40 transition-all duration-200"
            >
              Back to Home
            </Link>
            {/* You could add a button to open WhatsApp here as well, since payment is now complete */}
          </div>
        </>
      ) : (
        <>
          <div className="w-20 h-20 bg-accent-red/20 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-accent-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-text-primary mb-2">
            Payment Failed
          </h1>
          <p className="text-text-secondary mb-8 max-w-md">
            Unfortunately, your payment could not be processed. Please try again or use a different payment method.
          </p>
          <div className="flex gap-4">
            <Link
              href="/checkout"
              className="btn-shine px-6 py-3 bg-accent-red rounded-full text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-red-light"
            >
              Try Again
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <main className="min-h-screen bg-bg-dark pt-24 pb-12">
      <Suspense fallback={<div className="text-center text-text-primary mt-20">Loading...</div>}>
        <StatusContent />
      </Suspense>
    </main>
  );
}
